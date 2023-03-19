<template>
	<div class="posts-list" v-if="posts && posts.length">
		<a-input @change="searchChange" allow-clear class="search">
			<template #prefix> <SearchOutlined /> </template
		></a-input>
		<a-card
			class="card"
			hoverable
			size="small"
			v-for="post in filtered"
			:key="post.id"
			:data-id="post.id"
			@click.prevent="cardClick"
		>
			<div class="card_post">
				<div class="post_preview">
					<img :src="post.previewURL" :alt="post.previewName" />
				</div>
				<div class="post_desc">
					<h3>{{ post.title }}</h3>
					<span class="post_author">by {{ post.author }}</span>
				</div>
			</div>
			<PostListCardControls :updateList="updateList" :post="post" />
		</a-card>
	</div>
	<h1 v-if="posts && !posts.length">No posts yet</h1>
	<a-spin v-if="!posts" class="loading" size="large" />
</template>

<script>
import { SearchOutlined } from "@ant-design/icons-vue";
import PostListCardControls from "@/components/PostListCardControls.vue";
import { downloadPosts, deletePost } from "@/firebase/methods";
import { PATH_POSTS } from "@/firebase/constants";
export default {
	components: {
		PostListCardControls,
		SearchOutlined,
	},
	data() {
		return {
			posts: null,
			filtered: null,
		};
	},
	methods: {
		setFilteredPosts(value) {
			this.filtered = value;
		},
		cardClick(e) {
			if (e.target.class === "card_delete") return;
			const parent = e.target.closest(".card");
			const id = parent.dataset.id;
			this.$router.push({ name: PATH_POSTS, params: { id } });
		},

		handleDelete(e) {
			const parent = e.target.closest(".card");
			const previewName = e.target.dataset.preview;
			const id = e.target.dataset.id;
			parent.classList.add("card_deleting_animation");
			setTimeout(() => {
				deletePost(id, previewName);
				this.updateList(id);
			}, 330);
		},
		searchChange(e) {
			this.setFilteredPosts(
				this.posts.filter(
					(post) =>
						post.title.toLowerCase().includes(e.target.value) ||
						post.author.toLowerCase().includes(e.target.value)
				)
			);
		},
		updateList(id) {
			this.setFilteredPosts(this.filtered.filter((post) => post.id !== id));
		},
	},
	created() {
		downloadPosts().then((res) => {
			this.setFilteredPosts(res);
			this.posts = res;
		});
	},
};
</script>

<style lang="scss" scoped>
.loading {
	margin-top: 55px;
}

.posts-list {
	width: 100%;
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(210px, 300px));
	justify-content: center;
	gap: 10px;

	/* display: flex;
	flex-wrap: wrap; */
}
.card_post {
	display: flex;
}

.search {
	margin-bottom: 25px;
	grid-column: 1 / -1;
}

.post_preview {
	margin-right: 10px;
	border: 1px solid #d9d9d9;
	overflow: hidden;
	border-radius: 2px;
	width: 64px;
	min-width: 64px;
	height: 64px;
	background-color: rgb(219, 219, 219);
	overflow: hidden;
}
.post_preview img {
	object-fit: cover;
	width: 100%;
	height: 100%;
}

.post_desc {
	display: flex;
	flex-direction: column;
	justify-content: space-around;
}
.post_desc h3 {
	margin: 0;
	line-height: 22px;
	max-height: 44px;
	word-break: break-word;
	overflow: hidden;
}
.post_author {
	font-size: 11px;
	line-height: 12px;
}
.card {
	background-color: #fffbfb;
	border: 1px solid hsl(0, 0%, 90%);
	border-radius: 2px;
	overflow: hidden;
	position: relative;
	flex-grow: 1;
	transition: all 0.33s;

	&:hover {
		.card_controls {
			opacity: 1;
		}
	}
}

.card_deleting_animation {
	transition: all 0.33s;
	transform: scale(0);
}
</style>
