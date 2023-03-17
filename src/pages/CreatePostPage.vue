<template>
	<form class="create-edit_form">
		<PostForm ref="postFormRef" />
		<div class="form_controls">
			<a-button
				html-type="submit"
				@click.prevent="submit"
				:disabled="isLoading"
				:loading="isLoading"
				>Submit</a-button
			>
			<a-button :disabled="isLoading" @click="resetForms">Reset</a-button>
		</div>
	</form>
</template>

<script>
import { message } from "ant-design-vue";
import { defineComponent } from "vue";
import { uploadPost } from "@/firebase/methods";
import PostForm from "@/components/PostForm.vue";
export default defineComponent({
	components: {
		PostForm,
	},
	data() {
		return {
			isLoading: false,
		};
	},
	methods: {
		getFormParams() {
			return this.$refs.postFormRef.getFormParams();
		},
		resetForms() {
			this.$refs.postFormRef.reset();
		},
		submit() {
			const { title, body, preview } = this.getFormParams();
			if (!title || !body || !preview) return; //CHECK

			this.isLoading = true;

			const uid = this.$store.state.auth.currentUser.uid;
			const author = this.$store.state.auth.currentUser.displayName;

			uploadPost(uid, author, title, body, preview)
				.then(() => {
					message.success(`Post "${title}" added`);
					this.resetForms();
				})
				.finally(() => {
					this.isLoading = false;
				});
		},
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
