<template>
	<div>
		<h3>Post list</h3>
		<div class="posts-list" v-if="posts.length">
			<a-card
				hoverable
				size="small"
				v-for="post in posts"
				:key="post.id"
				@click="$router.push(`/posts/${post.id}`)"
			>
				{{ post.id }}: {{ post.title }}
			</a-card>
		</div>
		<h1 v-else>LOADING...</h1>
	</div>
</template>

<script>
export default {
	data() {
		return {
			posts: [],
		};
	},
	methods: {
		addPosts(posts) {
			//console.log(posts);
			this.posts = posts;
		},
	},
	mounted() {
		fetch("https://jsonplaceholder.typicode.com/posts")
			.then((response) => response.json())
			.then((json) => this.addPosts(json));
	},
};
</script>

<style scoped>
.posts-list {
	display: flex;
	flex-direction: column;
	gap: 10px;
}
</style>
