<template>
	<div class="post" v-if="post">
		<div class="post_preview">
			<img :src="post.previewURL" :alt="post.previewName" />
		</div>
		<div class="post_col">
			<h1>{{ post.title }}</h1>
			<pre>{{ post.body }}</pre>
		</div>
	</div>
	<h2 v-else>Loading...</h2>
</template>

<script>
import { downloadPost } from "@/firebase/methods";
export default {
	data() {
		return {
			post: null,
		};
	},
	methods: {
		setPost(value) {
			this.post = value;
		},
	},
	created() {
		downloadPost(this.$route.params.id).then((post) => {
			this.setPost(post);
		});
	},
};
</script>

<style scoped>
.post {
	display: flex;
}
.post_col {
	display: flex;
	flex-direction: column;
}
.post_preview {
	margin-right: 10px;
	border: 1px solid #d9d9d9;
	overflow: hidden;
	border-radius: 2px;
	width: 256px;
	height: 256px;
	background-color: rgb(219, 219, 219);
}
.post_preview img {
	object-fit: cover;
	width: 100%;
	height: 100%;
}
</style>
