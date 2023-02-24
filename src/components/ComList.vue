<template>
	<div class="post_comments" v-if="comments">
		<div class="comment" v-for="com in comments" :key="com.id">
			<div>
				<span class="comment_author">{{ com.name }}</span>
				<div class="comment_date">
					<span>{{ getMessageDate(com.createdAt) }}</span>
				</div>
			</div>
			<span class="comment_body">
				{{ com.value }}
			</span>
			<div
				v-if="com.uid === $store.state.auth.currentUser.uid"
				:data-id="com.id"
				:data-postid="id"
				class="comment_delete"
				title="delete"
				@click.stop="handleDelete"
			>
				&#10006;
			</div>
		</div>
	</div>
	<h1 v-if="comments && !comments.length">No comments yet</h1>
	<h1 v-if="!comments">Loading...</h1>
	<ComForm :upd="update" :id="id" />
</template>

<script>
import ComForm from "@/components/ComForm.vue";
import { downloadComments, deleteComment } from "@/firebase/methods";
import D2S from "@/utils/D2S";
export default {
	components: { ComForm },
	props: {
		id: {
			type: String,
			required: true,
		},
	},
	data() {
		return {
			comments: null,
		};
	},
	methods: {
		setComments(value) {
			this.comments = value;
		},
		getMessageDate(id) {
			return D2S(id);
		},
		handleDelete(e) {
			const parent = e.target.closest(".comment");
			const id = e.target.dataset.id;
			const postId = e.target.dataset.postid;
			parent.classList.add("comment_deleting_animation");
			setTimeout(() => {
				deleteComment(id, postId);
				this.setComments(this.comments.filter((com) => com.id !== id));
			}, 330);
		},

		update() {
			downloadComments(this.id).then((comments) => {
				this.setComments(comments);
			});
		},
	},
	created() {
		this.update();
	},
};
</script>

<style scoped>
.post_comments {
	display: flex;
	flex-direction: column;
	gap: 10px;
}
.comment {
	display: flex;
	flex-direction: column;
	gap: 5px;
	position: relative;
	background: linear-gradient(#ffffff, #dadada);
	border-radius: 8px;
	padding: 10px;
	max-width: 600px;
	transition: all 0.33s;
}
/* .comment:hover {
	transform: translateX(5px);
} */
.comment_author {
	font-size: 18px;
	line-height: 20px;
	font-weight: 500;
	margin-right: 10px;
	white-space: nowrap;
}
.comment_date {
	display: inline-block;
	font-size: 13px;
	line-height: 15px;
}
.comment_body {
	line-height: 18px;
	overflow-wrap: break-word;
}
.comment_deleting_animation {
	transition: all 0.33s;
	transform: scale(0);
}

.comment_delete {
	width: 10px;
	height: 10px;
	font-size: 10px;
	display: flex;
	justify-content: center;
	align-items: center;
	position: absolute;
	cursor: pointer;
	right: 5px;
	top: 10px;
	opacity: 0.5;
	transition: all 0.33s;
}
.comment_delete:hover {
	opacity: 1;
}
</style>
