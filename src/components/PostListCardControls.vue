<template>
	<div
		v-if="post.uid === $store.state.auth.currentUser.uid"
		@click.stop
		class="card_controls"
	>
		<a-tooltip placement="bottom">
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
			<a-tooltip placement="bottom">
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
		updateList: {
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
				this.updateList(id);
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

<style scoped>
.card_controls {
	height: 14px;
	font-size: 14px;
	display: flex;
	gap: 4px;
	justify-content: center;
	align-items: center;
	position: absolute;
	right: 4px;
	top: 4px;
}

.card_controls-link {
	color: rgba(0, 0, 0, 0.25);
	text-decoration: none;

	font-size: 14px;
	transition: all 0.33s;
}
.card_controls-link:hover {
	opacity: 1;
	color: #1890ff;
}
</style>
