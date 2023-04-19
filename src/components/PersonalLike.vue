<template>
	<div class="card_like">
		<a
			@click="toggleLike"
			:class="likeId ? 'card_like-btn__liked' : 'card_like-btn__notliked'"
		>
			<a-tooltip placement="top" v-if="likeId">
				<template #title>
					<span>Liked</span>
				</template>
				<HeartFilled />
			</a-tooltip>
			<a-tooltip placement="top" v-else>
				<template #title>
					<span>Not liked</span>
				</template>
				<HeartOutlined />
			</a-tooltip>
		</a>
	</div>
</template>

<script>
import { HeartFilled, HeartOutlined } from "@ant-design/icons-vue";
import { downloadLikes, uploadLike, deleteLike } from "@/firebase/methods";
export default {
	components: { HeartFilled, HeartOutlined },
	props: {
		parentUpd: {
			type: Function,
		},
		postId: {
			type: String,
			required: true,
		},
		valueId: {
			type: String,
		},
	},
	data() {
		return {
			likeId: null,
		};
	},
	methods: {
		async updateLikeId(uid) {
			const likes = await downloadLikes(this.postId);
			this.likeId = this.findLike(uid, likes);
		},
		findLike(uid, likesArr) {
			return likesArr[uid]?.uid;
		},

		toggleLike() {
			if (this.likeId) {
				deleteLike(this.likeId, this.postId);
				this.likeId = null;
			} else {
				const uid = this.$store.state.auth.currentUser.uid;
				uploadLike(this.postId, uid).then(() => {
					this.updateLikeId(uid);
				});
			}
			if (this.parentUpd) {
				this.parentUpd(this.postId);
			}
		},
	},
	created() {
		if (this.valueId) {
			this.likeId = this.valueId;
		} else {
			this.updateLikeId(this.$store.state.auth.currentUser.uid);
		}
	},
};
</script>
<style scoped lang="scss">
.card_like {
	span {
		color: rgba(0, 0, 0, 0.25);
		font-size: 14px;
		transition: all 0.33s;
	}

	%btn {
		height: 14px;
		width: 14px;
		display: flex;
		align-items: center;
		justify-content: center;
		text-decoration: none;
		transition: all 0.33s;
	}

	&-btn__liked {
		@extend %btn;
		&:hover span {
			color: rgba(255, 0, 0, 0.9);
		}
	}

	&-btn__notliked {
		@extend %btn;
		&:hover span {
			color: #1890ff;
		}
	}
}
</style>
