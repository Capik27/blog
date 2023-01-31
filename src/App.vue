<template>
	<NavBar />
	<div id="content">
		<router-view></router-view>
	</div>
	<!-- <a-input v-model:value="inputValue" placeholder="enter" />
	<a-button @click="add">{{ count }}</a-button>
	<SignIn style="width: 300px" />
	<posts-list :posts="arr" /> -->
</template>

<script>
// import PostsList from "@/components/PostsList.vue";
// import SignIn from "@/components/sign/SignIn.vue";
import NavBar from "@/components/NavBar.vue";

export default {
	components: { NavBar },
	data() {
		return {
			inputValue: "",
			count: 0,
			arr: [
				{ value: 1, name: "name1" },
				{ value: 2, name: "name2" },
				{ value: 3, name: "name3" },
				{ value: 4, name: "name4" },
				{ value: 5, name: "name5" },
			],
		};
	},
	methods: {
		add() {
			this.count++;
		},
	},
};
</script>

<style>
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}
#content {
	padding: 20px;
}
</style>
