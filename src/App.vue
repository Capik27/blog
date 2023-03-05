<template>
	<div class="app_container">
		<NavBar />
		<div id="content">
			<router-view />
		</div>
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
/* @import "~ant-design-vue/dist/antd.dark.css"; */
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}
#app {
	display: flex;
	justify-content: center;
}
.app_container {
	max-width: 1920px;
	flex-grow: 1;
}
#content {
	padding: 24px;
	display: flex;
	flex-direction: column;
	align-items: center;
}
::-webkit-scrollbar {
	width: 4px;
	background-color: transparent;
}

::-webkit-scrollbar-thumb {
	background-color: hsl(0, 0%, 89%);
	border: 0.5px solid rgba(255, 255, 255, 0.062);
	border-radius: 2px;
}

::-webkit-scrollbar-track {
	-webkit-box-shadow: 5px 5px 5px -5px rgba(34, 60, 80, 0.1) inset;
	background-color: transparent;
}
</style>
