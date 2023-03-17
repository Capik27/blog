<template>
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
	},

	data() {
		return {
			isLoading: false,
			preview: null,
			title: "",
			body: "",
		};
	},
	methods: {
		setPreviewImage(file) {
			this.preview = file;
		},

		getFormParams() {
			const { title, body, preview } = this;
			return { title, body, preview };
		},

		reset() {
			this.title = "";
			this.body = "";
			this.$refs.imageFormRef.reset();
			this.preview = null;
		},
	},
	mounted() {
		if (this.post) {
			// console.log("post", this.post);
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
