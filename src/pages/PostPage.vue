<template>
	<div class="post_container" v-if="post">
		<div class="post">
			<div class="post_preview">
				<img :src="post.previewURL" :alt="post.previewName" />
			</div>
			<div class="post_col">
				<h2 class="post_title">{{ post.title }}</h2>
				<span class="post_author-container">
					<span class="post_author"> by {{ post.author }} </span
					><span class="post_date">{{ getMessageDate(post.createdAt) }} </span>
				</span>

				<p class="post_body">{{ post.body }}</p>
				<p class="post_upd" v-if="post.changedAt">
					upd. {{ getMessageDate(post.changedAt) }}
				</p>
			</div>
		</div>
		<div
			class="post_controls"
			v-if="$store.state.auth.currentUser.uid === post.uid"
		>
			<a-button :disabled="isLoading" @click="handleEdit">Edit</a-button>
			<a-popconfirm
				title="Are you sure?"
				ok-text="Yes"
				cancel-text="No"
				@confirm="handleDelete"
			>
				<a-button :loading="isLoading">Delete</a-button></a-popconfirm
			>
		</div>
		<ComList v-if="!isLoading" :id="post.id" />
		<a-spin size="large" v-else class="loading-comments" />
	</div>
	<a-spin size="large" v-if="!post" class="loading" />
</template>

<script>
import ComList from "@/components/ComList.vue";
import { downloadPost, deletePost } from "@/firebase/methods";
import D2S from "@/utils/D2S";
export default {
	components: { ComList },
	data() {
		return {
			post: null,
			isLoading: false,
		};
	},
	methods: {
		setPost(value) {
			this.post = value;
		},
		getMessageDate(timestamp) {
			return D2S(timestamp);
		},

		handleEdit() {
			const id = this.post.id;
			this.$router.push({
				name: "editpost",
				params: { id },
			});
		},
		handleDelete() {
			this.isLoading = true;
			const id = this.post.id;
			const previewName = this.post.previewName;
			deletePost(id, previewName).then(() => {
				this.isLoading = false;
				this.$router.push({ name: "main" });
			});
		},
		update() {
			downloadPost(this.$route.params.id).then((post) => {
				this.setPost(post);
			});
		},
	},
	created() {
		this.update();
	},
};
</script>

<style scoped>
.loading {
	margin-top: 127px;
}
.loading-comments {
	margin-top: 50px;
}

.post_container {
	display: flex;
	flex-direction: column;
	gap: 10px;
	width: fit-content;
	max-width: 768px;
}
.post_controls {
	display: flex;
	gap: 10px;
	justify-content: flex-end;
}

.post {
	display: flex;
	flex-wrap: nowrap;
	padding: 10px;
	background-color: #fffbfb;
	border: 1px solid hsl(0, 0%, 90%);
	border-radius: 4px;
	gap: 10px;
}
.post h1 {
	margin: 0px;
}
.post_col {
	display: flex;
	flex-direction: column;
	min-width: 256px;
	max-height: 256px;
}
.post_title {
	margin-bottom: 5px;
	line-height: 20px;
}
.post_author-container {
	display: flex;
	align-items: center;
	padding-bottom: 10px;
	opacity: 0.85;
}
.post_author {
	font-size: 11px;
	line-height: 13px;
	font-weight: 500;
	margin-right: 5px;
	white-space: pre;
}
.post_date {
	display: inline-block;
	font-size: 10px;
	line-height: 10px;
}
.post_upd {
	display: inline-block;
	font-size: 10px;
	line-height: 10px;
	margin: 3px 0 0 0;
	align-self: flex-end;
}
.post_body {
	margin: 0;
	flex-grow: 1;
	/* overflow: hidden; */
	overflow-y: auto;
	white-space: pre-wrap;
	max-height: 200px;
}
.post_preview {
	/* float: left; */
	border: 1px solid #d9d9d9;
	overflow: hidden;
	border-radius: 2px;
	min-width: 256px;
	width: 256px;
	height: 256px;
	background-color: rgb(219, 219, 219);
}
.post_preview img {
	object-fit: cover;
	width: 100%;
	height: 100%;
}

@media (max-width: 645px) {
	.post {
		flex-direction: column;
	}
	.post_preview {
		align-self: center;
	}
}
</style>
