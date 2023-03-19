<template>
	<PostForm
		v-if="post"
		ref="postFormRef"
		:post="post"
		:onSubmit="submit"
		:onDelete="handleDelete"
	/>
	<a-spin size="large" v-else />
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

			this.$refs.postFormRef.setIsLoading(true);

			changePost(this.post, title, body, preview)
				.then(() => {
					message.success(`Post "${this.post.title}" changed`);
				})
				.finally(() => {
					this.$refs.postFormRef.setIsLoading(false);
					const id = this.post.id;
					this.$router.push({ name: PATH_POSTS, params: { id } });
				});
		},

		handleDelete() {
			this.$refs.postFormRef.setIsDeleting(true);
			const id = this.post.id;
			const previewName = this.post.previewName;
			deletePost(id, previewName)
				.then(() => {
					message.success(`Post "${this.post.title}" deleted`);
					this.$router.push({ name: "main" });
				})
				.finally(() => {
					this.$refs.postFormRef.setIsDeleting(false);
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
