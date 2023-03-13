<template>
	<form class="create_form">
		<div class="form_image" @click="openInput">
			<img
				id="preview"
				src=""
				alt="preview"
				ref="previewRef"
				v-show="preview"
			/>
			<a-empty v-if="!preview" :description="null" />
			<a-input
				id="input"
				hidden
				@change="changeInput"
				type="file"
				accept=".png, .jpg, .jpeg"
			/>
		</div>
		<div class="form_text">
			<a-input
				v-model:value="title"
				show-count
				:maxlength="25"
				placeholder="title"
				:disabled="isLoading"
				allow-clear
			/>
			<br />
			<a-textarea
				v-model:value="body"
				:auto-size="{ minRows: 9, maxRows: 9 }"
				placeholder="message"
				:disabled="isLoading"
				allow-clear
			/>
			<div class="form_controls">
				<a-button
					html-type="submit"
					@click="submitPost"
					:disabled="!title || !body || !preview"
					:loading="isLoading"
					>Submit</a-button
				>
				<a-popconfirm
					v-if="$route.name === 'editpost'"
					title="Are you sure?"
					ok-text="Yes"
					cancel-text="No"
					@confirm="handleDelete"
				>
					<a-button :loading="isLoading" :disabled="isLoading"
						>Delete</a-button
					></a-popconfirm
				>
			</div>
		</div>
	</form>
</template>

<script>
import { defineComponent, ref } from "vue";
import {
	uploadPost,
	changePost,
	downloadPost,
	deletePost,
} from "@/firebase/methods";
import { PATH_POSTS } from "@/firebase/constants";
import { BLANK_PIXEL_SRC } from "@/utils/blank_pixel_src";
import { message } from "ant-design-vue";
export default defineComponent({
	setup() {
		const title = ref("");
		const body = ref("");
		const post = ref("");
		const previewRef = ref();
		return {
			title,
			body,
			post,
			previewRef,
		};
	},
	data() {
		return {
			isLoading: false,
			oldPreviewName: "",
			preview: null,
		};
	},
	methods: {
		setIsLoading(value) {
			this.isLoading = value;
		},

		setImgSrc(value) {
			this.previewRef.src = value;
		},
		openInput() {
			if (this.isLoading) return;
			const input = document.querySelector("#input");
			input.click();
		},

		changeInput(e) {
			if (!e.target.files.length) return;
			const file = Array.from(e.target.files)[0];
			this.setImgSrc(BLANK_PIXEL_SRC);
			this.preview = file;
			const reader = new FileReader();
			reader.onload = (e) => {
				this.setImgSrc(e.target.result);
			};
			reader.readAsDataURL(file);
		},

		submitPost(e) {
			e.preventDefault();
			if (!this.title || !this.body || !this.preview) return; //CHECK
			const uid = this.$store.state.auth.currentUser.uid;
			const author = this.$store.state.auth.currentUser.displayName;

			this.setIsLoading(true);

			if (this.$route.name === "createpost") {
				uploadPost(uid, author, this.title, this.body, this.preview)
					.then(() => {
						message.success(`Post "${this.title}" added`);
						this.title = "";
						this.body = "";
						this.preview = null;
					})
					.finally(() => {
						this.setIsLoading(false);
					});
			} else if (this.$route.name === "editpost") {
				changePost(this.post, this.title, this.body, this.preview)
					.then(() => {
						message.success(`Post "${this.title}" changed`);
					})
					.finally(() => {
						this.setIsLoading(false);
						const id = this.post.id;
						this.$router.push({ name: PATH_POSTS, params: { id } });
					});
			}
		},
		handleDelete() {
			this.setIsLoading(true);
			const id = this.post.id;
			const previewName = this.post.previewName;
			deletePost(id, previewName)
				.then(() => {
					message.success(`Post "${this.title}" deleted`);
					this.$router.push({ name: "main" });
				})
				.finally(() => {
					this.setIsLoading(false);
				});
		},
		async getPost() {
			const post = await downloadPost(this.$route.params.id);
			this.post = post;
			this.setImgSrc(post.previewURL);
			this.preview = "preview";
			this.title = post.title;
			this.body = post.body;
		},
	},
	mounted() {
		// EDIT POST
		if (this.$route.params.id) {
			this.getPost();
		}
	},
	watch: {
		$route() {
			this.title = "";
			this.body = "";
			this.preview = null;
			this.post = null;
			this.setImgSrc(BLANK_PIXEL_SRC);
		},
	},
});
</script>

<style lang="scss" scoped>
.create_form {
	display: flex;
	justify-content: center;
	gap: 20px;
	width: 100%;
	max-height: 325px;
	max-width: 768px;
}
.form_image {
	cursor: pointer;
	border: 1px solid #d9d9d9;
	background-color: #fffbfb;
	border-radius: 2px;
	width: 262px;
	height: 262px;
	min-height: 256px;

	display: flex;
	justify-content: center;
	align-items: center;
	transition: all 0.33s;
	overflow: hidden;
}
.form_image:hover {
	border-color: #1890ff;
}

.form_image img {
	width: 100%;
	height: 100%;
	object-fit: cover;
	animation: a_img 0.15s;
}
.form_text {
	width: 65%;
	display: flex;
	flex-direction: column;
}
.form_controls {
	margin-top: 10px;
	display: flex;
	gap: 10px;
	align-self: flex-end;
}

@media (max-width: 645px) {
	.create_form {
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		max-height: max-content;
	}
	.form_text {
		width: 100%;
	}
}

@keyframes a_img {
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
}
</style>
