<template>
	<div class="posts-list">
		<post-item
			v-for="post in posts"
			:post="post"
			:key="post"
			style="width: 300px"
		/>
	</div>
</template>

<script>
import PostItem from "./PostItem.vue";

export default {
	components: { PostItem },
	name: "posts-list",
	props: {
		posts: {
			type: Array,
			requared: true,
		},
	},
};
</script>

<style scoped>
.posts-list {
	display: flex;
	flex-direction: column;
	padding-top: 10px;
	gap: 10px;
}
</style>
