<template>
	<div class="post_container" v-if="post">
		<div class="post">
			<div class="post_preview">
				<img :src="post.previewURL" :alt="post.previewName" />
			</div>
			<div class="post_col">
				<h1>{{ post.title }}</h1>
				<span>{{ post.body }}</span>
			</div>
		</div>
		<div
			class="post_controls"
			v-if="$store.state.auth.currentUser.uid === post.uid"
		>
			<a-button>Edit</a-button>
			<a-button>Delete</a-button>
		</div>
		<ComList :id="post.id" />
	</div>

	<h2 v-if="!post">Loading...</h2>
</template>

<script>
import ComList from "@/components/ComList.vue";
import { downloadPost } from "@/firebase/methods";
import D2S from "@/utils/D2S";
export default {
	components: { ComList },
	data() {
		return {
			post: null,
		};
	},
	methods: {
		setPost(value) {
			this.post = value;
		},
		getMessageDate(id) {
			return D2S(id);
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
.post_container {
	display: flex;
	flex-direction: column;
	gap: 10px;
	width: fit-content;
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
}
.post_preview {
	float: left;
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
