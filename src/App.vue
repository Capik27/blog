<template>
	<a-spin v-if="reload" class="reloader" size="large" />
	<div class="app_container" v-else>
		<NavBar :key="navbarKey" />
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
			reload: false,
			navbarKey: 0,
		};
	},
	methods: {},
	created() {
		//CHECK IF RELOAD PAGE WITH AUTH
		if (sessionStorage.user) {
			this.reload = true;
			const period = 125;
			const timer = setInterval(() => {
				if (this.$store.state.auth.currentUser) {
					this.navbarKey++;
					this.$router.push(sessionStorage.page);
					this.reload = false;
					clearInterval(timer);
				}
			}, period);
		}
		//CHECK THEME WITH AUTH
		if (localStorage.theme) {
			document.querySelector("body").classList.add("dark");
		}
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

.reloader {
	align-self: center;
	justify-self: center;
}
.app_container {
	max-width: 1920px;
	flex-grow: 1;
	transition: all 0.33s;
}

#content {
	padding: 50px 24px 24px 24px;
	display: flex;
	flex-direction: column;
	align-items: center;
	overflow-x: hidden;
}

html {
	overflow-x: hidden;

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
}

@media(max-width: 400px) {
	#content {
		padding: 12px;
	}
}


</style>
