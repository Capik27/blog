<template>
	<div class="navbar">
		<div>
			<a-button
				@click="$router.push({ name: 'main' })"
				v-if="$store.state.auth.currentUser"
				>Posts</a-button
			>
			<a-button type="text" @click="changeTheme">Theme</a-button>
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
			<strong>{{ $store.state.auth.currentUser.displayName }}</strong>
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
		changeTheme() {},
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
</style>
