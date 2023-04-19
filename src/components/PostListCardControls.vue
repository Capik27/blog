<template>
	<div
		v-if="
			$store.state.auth.currentUser &&
			$store.state.auth.currentUser.uid === post.uid
		"
		class="card_controls"
	>
		<a-tooltip placement="top">
			<template #title>
				<span>Edit</span>
			</template>
			<a class="card_controls-link" @click="handleEdit"><edit-outlined /></a>
		</a-tooltip>

		<a-popconfirm
			title="Are you sure?"
			ok-text="Yes"
			cancel-text="No"
			@confirm="handleConfirm"
			@cancel="handleCancel"
		>
			<a-tooltip placement="top">
				<template #title>
					<span>Delete</span>
				</template>
				<a class="card_controls-link"><delete-outlined /></a>
			</a-tooltip>
		</a-popconfirm>
	</div>
</template>

<script>
import {
	// SettingOutlined,
	EditOutlined,
	DeleteOutlined,
} from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import { deletePost } from "@/firebase/methods";
export default {
	components: { EditOutlined, DeleteOutlined },
	props: {
		post: {
			type: Object,
			required: true,
		},
		deleteCard: {
			type: Function,
			required: true,
		},
	},
	methods: {
		handleEdit() {
			const id = this.post.id;
			this.$router.push({
				name: "editpost",
				params: { id },
			});
		},
		handleDelete() {
			const previewName = this.post.previewName;
			const id = this.post.id;
			const parent = document.querySelector(`[data-id="${id}"]`);
			parent.classList.add("card_deleting_animation");
			deletePost(id, previewName)
				.then(() => {
					message.success(`Post "${this.post.title}" deleted`);
					this.$router.push({ name: "main" });
				})
				.catch((error) => {
					message.error(`Error: ` + error.code);
				});
			setTimeout(() => {
				this.deleteCard(id);
			}, 330);
		},
		handleConfirm() {
			this.handleDelete();
		},
		handleCancel() {
			// message.error("Click on No");
		},
	},
};
</script>

<style scoped lang="scss">
.card_controls {
	display: flex;
	gap: 4px;
	justify-content: center;
	align-items: center;
	transition: all 0.33s;
}

.card_controls-link {
	height: 14px;
	display: flex;
	justify-content: center;
	align-items: center;
	color: rgba(0, 0, 0, 0.25);

	span {
		font-size: 14px;
		text-decoration: none;
		transition: all 0.33s;
	}

	&:hover span {
		color: #1890ff;
	}
}
</style>
