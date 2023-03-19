<template>
	<PostForm ref="postFormRef" :onSubmit="submit" />
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
			isSubmiting: false,
		};
	},
	methods: {
		getFormParams() {
			return this.$refs.postFormRef.getFormParams();
		},
		submit() {
			const { title, body, preview } = this.getFormParams();
			if (!title || !body || !preview) return; //CHECK

			this.$refs.postFormRef.setIsLoading(true);

			const uid = this.$store.state.auth.currentUser.uid;
			const author = this.$store.state.auth.currentUser.displayName;

			uploadPost(uid, author, title, body, preview)
				.then(() => {
					message.success(`Post "${title}" added`);
					this.$refs.postFormRef.reset();
				})
				.finally(() => {
					this.$refs.postFormRef.setIsLoading(false);
				});
		},
	},
});
</script>
