<template>
	<form class="create-edit_form" v-if="post">
		<PostForm :post="post" ref="postFormRef" />
		<div class="form_controls">
			<a-button
				html-type="submit"
				@click.prevent="submit"
				:disabled="isDeleting || isLoading"
				:loading="isLoading"
				>Submit</a-button
			>
			<a-popconfirm
				v-if="post"
				title="Are you sure?"
				ok-text="Yes"
				cancel-text="No"
				@confirm="handleDelete"
			>
				<a-button :loading="isDeleting" :disabled="isDeleting || isLoading"
					>Delete</a-button
				></a-popconfirm
			>
		</div>
	</form>
	<a-spin size="large" v-if="!post" />
</template>

<script>
import { message } from "ant-design-vue";
import { defineComponent } from "vue";
import { PATH_POSTS } from "@/firebase/constants";
import { changePost, downloadPost, deletePost } from "@/firebase/methods";
import PostForm from "@/components/PostForm.vue";
export default defineComponent({
	components: {
		PostForm,
	},
	data() {
		return {
			isLoading: false,
			isDeleting: false,
			post: "",
		};
	},
	methods: {
		getFormParams() {
			return this.$refs.postFormRef.getFormParams();
		},
		submit() {
			const { title, body, preview } = this.getFormParams();
			if (!title || !body || !preview) return; //CHECK

			this.isLoading = true;

			changePost(this.post, title, body, preview)
				.then(() => {
					message.success(`Post "${this.post.title}" changed`);
				})
				.finally(() => {
					this.isLoading = false;
					const id = this.post.id;
					this.$router.push({ name: PATH_POSTS, params: { id } });
				});
		},

		handleDelete() {
			this.isDeleting = true;
			const id = this.post.id;
			const previewName = this.post.previewName;
			deletePost(id, previewName)
				.then(() => {
					message.success(`Post "${this.post.title}" deleted`);
					this.$router.push({ name: "main" });
				})
				.finally(() => {
					this.isDeleting = false;
				});
		},
	},
	mounted() {
		downloadPost(this.$route.params.id).then((res) => {
			this.post = res;
		});
	},
});
</script>

<style lang="scss" scoped>
.create-edit_form {
	display: flex;
	flex-direction: column;
	max-height: max-content;
	width: 100%;
	max-width: 768px;
}

.form_controls {
	margin-top: 10px;
	display: flex;
	gap: 10px;
	align-self: flex-end;
}
</style>
