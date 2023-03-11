<template>
	<div class="navbar">
		<div>
			<a-button
				type="ghost"
				@click="$router.push({ name: 'main' })"
				v-if="$store.state.auth.currentUser"
				>Posts</a-button
			>
			<a-button type="text" @click="handleChangeTheme">Theme</a-button>
			<a-button
				type="text"
				@click="$router.push({ name: 'createpost' })"
				v-if="$store.state.auth.currentUser"
				>Create post</a-button
			>
		</div>

		<div class="navbar__sign" v-if="!$store.state.auth.currentUser">
			<a-button type="text" @click="$router.push({ name: 'signin' })"
				>Sign in</a-button
			>
			<a-button type="text" @click="$router.push({ name: 'register' })"
				>Register</a-button
			>
		</div>
		<div class="navbar__sign" v-else>
			<strong class="navbar-nickname">{{
				$store.state.auth.currentUser.displayName
			}}</strong>
			<a-button type="text" @click="handleLogout">Logout</a-button>
		</div>
	</div>
</template>

<script>
import { logoutAcc } from "@/firebase/methods";
export default {
	methods: {
		handleLogout() {
			this.$router.push({ name: "signin" }).then(() => {
				const auth = this.$store.state.auth;
				logoutAcc(auth);
			});
		},
		handleChangeTheme() {
			// this.$store.commit("toggleTheme");
			document.querySelector("body").classList.toggle("dark");

			// if (this.$store.state.theme) {
			// 	console.log("D");
			// 	import("@/dark.js");
			// } else {
			// 	console.log("L");
			// 	import("@/light.js");
			// }

			// this.$emit("changeTheme", this.$store.state.theme);
		},
	},
};
</script>

<style scoped>
.navbar {
	background-color: hsl(0, 0%, 89%);
	border-bottom: 1px solid #f8f8f8;
	padding: 10px 20px;
	display: flex;
	justify-content: space-between;
	border-bottom-left-radius: 4px;
	border-bottom-right-radius: 4px;
}
.navbar-nickname {
	padding: 0 15px;
}
</style>
