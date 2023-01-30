<template>
	<a-card
		hoverable
		size="small"
		:key="post"
		:title="post.name"
		style="width: 300px"
	>
		<template #extra><a href="#">more</a></template>
		<p>{{ post.value }}> {{ Math.random() }}</p>
	</a-card>
</template>

<script>
export default {
	name: "post-item",
	props: {
		post: {
			type: Object,
			requared: true,
		},
	},
};
</script>
<style></style>
