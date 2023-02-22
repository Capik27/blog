<template>
	<div>
		<h2>Post list:</h2>
		<div class="posts-list" v-if="posts && posts.length">
			<a-card
				class="card"
				hoverable
				size="small"
				v-for="post in posts"
				:key="post.id"
				@click="$router.push(`/posts/${post.id}`)"
			>
				<div class="post">
					<div class="post_preview">
						<img :src="post.previewURL" alt="post_preview" />
					</div>
					<span>{{ post.title }}</span>
				</div>
			</a-card>
		</div>
		<h1 v-if="posts && !posts.length">No posts yet</h1>
		<h1 v-if="!posts">Loading...</h1>
	</div>
</template>

<script>
import { downloadAllPosts } from "@/firebase/methods";
export default {
	data() {
		return {
			posts: null,
		};
	},
	methods: {
		addPosts(value) {
			this.posts = value;
		},
	},
	created() {
		downloadAllPosts().then((res) => {
			this.addPosts(res);
		});
	},
};
</script>

<style scoped>
.posts-list {
	display: flex;
	flex-direction: column;
	gap: 10px;
}
.post {
	display: flex;
	align-items: center;
}

.post_preview {
	margin-right: 10px;
	border-radius: 2px;
	width: 64px;
	height: 64px;
	background-color: rgb(219, 219, 219);
	overflow: hidden;
}
.post_preview img {
	object-fit: cover;
	width: 100%;
	height: 100%;
}

.card {
	background-color: #fffbfb;
	border: 1px solid hsl(0, 0%, 90%);
	border-radius: 2px;
}
</style>
