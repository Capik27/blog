<template>
	<div class="app_container">
		<NavBar />
		<div id="content">
			<router-view />
		</div>
	</div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";

export default {
	components: { NavBar },
	data() {
		return {
			//themeClass: "app_container",
		};
	},
	methods: {
		changeTheme(e) {
			console.log("emit", e);
		},
	},
};
</script>

<style lang="scss">
@import "@/dark.scss";
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}
#app {
	display: flex;
	justify-content: center;
	height: 100vh;
}
.app_container {
	max-width: 1920px;
	flex-grow: 1;
	transition: all 0.33s;
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
	background-color: rgba(126, 126, 126, 0.336);
	border: transparent;
	border-radius: 2px;
}

::-webkit-scrollbar-track {
	-webkit-box-shadow: 5px 5px 5px -5px rgba(34, 60, 80, 0.123) inset;
	background-color: transparent;
}
</style>
