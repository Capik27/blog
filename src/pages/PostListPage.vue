<template>
	<div
		class="posts-list"
		v-if="posts && posts.length && likes && $store.state.auth.currentUser"
	>
		<SearchForm :executor="searchHandler" class="input_gr" />
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
			<div class="card_options" @click.stop>
				<PersonalLike
					:parentUpd="updLike"
					:postId="post.id"
					:valueId="
						likes?.[post.id]?.[$store.state.auth.currentUser.uid]?.uid
							? likes[post.id][$store.state.auth.currentUser.uid].uid
							: ''
					"
				/>
				<PostListCardControls :deleteCard="deleteCard" :post="post" />
			</div>
		</a-card>
	</div>
	<h1 v-if="posts && !posts.length">No posts yet</h1>
	<a-spin v-if="!posts" class="loading" size="large" />
</template>

<script>
import PostListCardControls from "@/components/PostListCardControls.vue";
import PersonalLike from "@/components/PersonalLike.vue";
import SearchForm from "@/components/SearchForm.vue";
import dateInRange from "@/utils/dateInRange";
import { downloadPosts, downloadLikesBase } from "@/firebase/methods";
import { PATH_POSTS } from "@/firebase/constants";
export default {
	components: {
		PersonalLike,
		PostListCardControls,
		SearchForm,
	},
	data() {
		return {
			posts: null,
			filtered: null,
			timefiltered: null,
			timeFilter: "all",
			likes: null,
			likedFilter: false,
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

		updLike(postId) {
			const uid = this.$store.state.auth.currentUser.uid;

			if (this.likes[postId]?.[uid]) {
				if (this.likedFilter) {
					this.filtered = this.filtered.filter((p) => postId !== p.id);
				}
				delete this.likes[postId]?.[uid];
			} else {
				if (this.likes[postId]) {
					this.likes[postId][uid] = { uid };
				} else {
					this.likes[postId] = { [uid]: { uid } };
				}
			}
		},

		searchHandler(value, selectType, timeFilter, likedFilter) {
			let result;
			// Фильтруем по времени
			if (timeFilter !== this.timeFilter) {
				result = this.posts.filter((post) =>
					dateInRange(post.createdAt.toDate(), timeFilter)
				);
				this.timeFilter = timeFilter;
				this.timefiltered = result;
			}
			// Фильтруем по лайкам
			let likedFiltered = [];
			this.likedFilter = likedFilter;
			if (likedFilter) {
				for (let p of this.timefiltered) {
					if (this.likes[p.id]?.[this.$store.state.auth.currentUser.uid]) {
						likedFiltered.push(p);
					}
				}
			} else {
				likedFiltered = this.timefiltered;
			}
			// Фильтруем по параметру автор/тайтл
			result = likedFiltered.filter((post) =>
				post?.[selectType].toLowerCase().includes(value.toLowerCase())
			);

			this.setFilteredPosts(result);
		},
		deleteCard(id) {
			this.setFilteredPosts(this.filtered.filter((post) => post.id !== id));
			this.timefiltered = this.timefiltered.filter((post) => post.id !== id);
			this.posts = this.posts.filter((post) => post.id !== id);
		},
	},
	created() {
		const postsPromise = downloadPosts();
		const likesPromise = downloadLikesBase();
		Promise.all([postsPromise, likesPromise])
			.then((responses) => {
				const [res_posts, res_likesObj] = responses;
				this.setFilteredPosts(res_posts);
				this.timefiltered = res_posts;
				this.posts = res_posts;

				this.likes = res_likesObj;
				// console.log("res post", res_posts);
				// console.log("res likes", res_likesObj);
			})
			.catch(() => {
				// Обработка ошибки
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

.input_gr {
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

	&_options {
		height: 14px;
		font-size: 14px;
		display: flex;
		gap: 4px;
		justify-content: center;
		align-items: center;
		position: absolute;
		right: 4px;
		top: 4px;
		transition: all 0.33s;
		opacity: 0;
	}

	&:hover {
		.card_options {
			opacity: 1;
		}
	}
}

.card_deleting_animation {
	transition: all 0.33s;
	transform: scale(0);
}
</style>
