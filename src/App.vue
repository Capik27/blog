<template>
	<div class="app_container">
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
			navbarKey: 0,
		};
	},
	methods: {},
	created() {
		//CHECK IF RELOAD PAGE WITH AUTH
		if (sessionStorage.user) {
			const period = 125;
			const timer = setInterval(() => {
				if (this.$store.state.auth.currentUser) {
					const path = "/blog";
					const index = sessionStorage.redirect.indexOf(path) + path.length;
					const redirect = sessionStorage.redirect.slice(index);
					delete sessionStorage.redirect;

					this.navbarKey++;

					if (redirect && redirect != location.href) {
						this.$router.push(redirect);
					}
					clearInterval(timer);
				}
			}, period);
		}
		//CHECK THEME WITH AUTH
		if (sessionStorage.theme) {
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
</style>
