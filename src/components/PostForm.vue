<template>
	<form class="create-edit_form">
		<div class="create-edit_inputs">
			<ImageForm
				ref="imageFormRef"
				:source="post?.previewURL"
				:returnImageFile="setPreviewImage"
			/>
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
			</div>
		</div>
		<div class="form_controls">
			<a-button
				html-type="submit"
				@click.prevent="submit"
				:disabled="isDeleting || isLoading"
				:loading="isLoading"
				>Submit</a-button
			>
			<a-button :disabled="isDeleting || isLoading" @click="reset" v-if="!post"
				>Reset</a-button
			>
			<a-popconfirm
				v-if="post"
				title="Are you sure?"
				ok-text="Yes"
				cancel-text="No"
				@confirm="deletePost"
			>
				<a-button :loading="isDeleting" :disabled="isDeleting || isLoading"
					>Delete</a-button
				></a-popconfirm
			>
		</div>
	</form>
</template>

<script>
import { defineComponent } from "vue";
import ImageForm from "@/components/ImageForm.vue";
export default defineComponent({
	components: {
		ImageForm,
	},
	props: {
		post: {
			type: Object,
			default: null,
		},
		onSubmit: {
			type: Function,
		},
		onDelete: {
			type: Function,
		},
	},

	data() {
		return {
			title: "",
			body: "",
			preview: null,
			isLoading: false,
			isDeleting: false,
		};
	},
	methods: {
		setPreviewImage(file) {
			this.preview = file;
		},
		setIsLoading(value) {
			this.isLoading = value;
		},
		setIsDeleting(value) {
			this.isDeleting = value;
		},

		getFormParams() {
			const { title, body, preview } = this;
			return { title, body, preview };
		},
		// RESET
		reset() {
			this.title = "";
			this.body = "";
			this.preview = null;
			this.$refs.imageFormRef.reset();
		},
		// SUBMIT
		submit() {
			// if (!this.title || !this.body || !this.preview) return; //CHECK

			if (this.onSubmit) {
				// console.log("onSubmit");
				this.onSubmit();
			}
		},
		// DELETE
		deletePost() {
			if (this.onDelete) {
				// console.log("onDelete");
				this.onDelete();
			}
		},
	},
	mounted() {
		if (this.post) {
			this.preview = this.post.previewURL;
			this.title = this.post.title;
			this.body = this.post.body;
		}
	},
});
</script>
s

<style lang="scss" scoped>
.create-edit_inputs {
	display: flex;
	justify-content: center;
	gap: 20px;
	width: 100%;
	max-height: 325px;
	max-width: 768px;
}

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
.form_text {
	width: 65%;
	display: flex;
	flex-direction: column;
}

@media (max-width: 645px) {
	.create-edit_inputs {
		flex-direction: column;
		align-items: center;
		max-height: max-content;
	}
	.form_text {
		width: 100%;
	}
}
</style>
