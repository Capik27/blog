<template>
	<div v-if="post">
		<h1>{{ post.title }}</h1>
		<p>{{ post.body }}</p>
	</div>
	<h2 v-else>LOADING...</h2>
</template>

<script>
export default {
	data() {
		return {
			post: null,
		};
	},
	methods: {
		setPost(post) {
			//console.log(post);
			this.post = post;
		},
	},
	created() {
		fetch(`https://jsonplaceholder.typicode.com/posts/${this.$route.params.id}`)
			.then((response) => response.json())
			.then((json) => this.setPost(json));
	},
};
</script>

<style></style>
