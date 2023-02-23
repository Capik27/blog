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
				:data-id="post.id"
				@click.prevent="cardClick"
			>
				<div class="post">
					<div class="post_preview">
						<img :src="post.previewURL" :alt="post.previewName" />
					</div>
					<span>{{ post.title }}</span>
				</div>
				<div
					:data-preview="post.previewName"
					:data-id="post.id"
					class="card_delete"
					title="delete"
					@click.stop="handleDelete"
				>
					&#10006;
				</div>
			</a-card>
		</div>
		<h1 v-if="posts && !posts.length">No posts yet</h1>
		<h1 v-if="!posts">Loading...</h1>
	</div>
</template>

<script>
import { downloadAllPosts, deletePost } from "@/firebase/methods";
import { DIR_NAME } from "@/firebase/constants";
export default {
	data() {
		return {
			posts: null,
		};
	},
	methods: {
		setPosts(value) {
			this.posts = value;
		},
		cardClick(e) {
			if (e.target.class === "card_delete") return;
			const parent = e.target.closest(".card");
			const id = parent.dataset.id;
			this.$router.push(`/${DIR_NAME}/${id}`);
		},

		handleDelete(e) {
			const parent = e.target.closest(".card");
			const previewName = e.target.dataset.preview;
			const id = e.target.dataset.id;
			parent.classList.add("card_deleting_animation");
			setTimeout(() => {
				deletePost(id, previewName);
				this.setPosts(this.posts.filter((post) => post.id !== id));
			}, 330);
		},
	},
	created() {
		downloadAllPosts().then((res) => {
			this.setPosts(res);
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
	overflow: hidden;
	position: relative;
}
.card_deleting_animation {
	transition: all 0.33s;
	transform: scale(0);
}
.card_delete {
	width: 16px;
	height: 16px;
	display: flex;
	justify-content: center;
	align-items: center;
	position: absolute;
	right: 5px;
	top: 5px;
	opacity: 0.5;
	transition: all 0.33s;
}
.card_delete:hover {
	opacity: 1;
}
</style>
