<template>
	<div class="navbar">
		<div>
			<a-button @click="$router.push('/')" v-if="$store.state.auth.currentUser"
				>Posts</a-button
			>
			<a-button type="text" @click="changeTheme">Theme</a-button>
			<a-button
				type="text"
				@click="$router.push('/createpost')"
				v-if="$store.state.auth.currentUser"
				>Create post</a-button
			>
		</div>

		<div class="navbar__sign" v-if="!$store.state.auth.currentUser">
			<a-button type="text" @click="$router.push('/signin')">Sign in</a-button>
			<a-button type="text" @click="$router.push('/register')"
				>Register</a-button
			>
		</div>
		<div class="navbar__sign" v-else>
			<strong>{{ $store.state.auth.currentUser.displayName }}</strong>
			<a-button type="text" @click="logout">Logout</a-button>
		</div>
	</div>
</template>

<script>
import { signOut } from "firebase/auth";
export default {
	methods: {
		logout() {
			// console.log("logout", this.$store.state.auth.currentUser);
			signOut(this.$store.state.auth);
			this.$router.push("/signin");
		},
		changeTheme() {
			//
		},
	},
};
</script>

<style scoped>
.navbar {
	background-color: hsl(0, 0%, 90%);
	border-bottom: 1px solid #f8f8f8;
	padding: 10px 20px;
	display: flex;
	justify-content: space-between;
}
</style>
