<template>
	<div>
		<a-button @click="loginGoogle" :loading="isLoading" :disabled="isLoading"
			>Login Google</a-button
		>
	</div>
</template>

<script>
import {
	GoogleAuthProvider,
	signInWithPopup,
	// signInWithEmailAndPassword, $router.push('/')"
} from "firebase/auth";

export default {
	data() {
		return {
			isLoading: false,
		};
	},
	methods: {
		setIsLoading(value) {
			this.isLoading = value;
		},

		async loginGoogle() {
			this.setIsLoading(true);
			const provider = new GoogleAuthProvider();
			signInWithPopup(this.$store.state.auth, provider)
				.then((result) => {
					GoogleAuthProvider.credentialFromResult(result);
					this.$router.push("/");
					this.setIsLoading(false);
				})
				.catch((error) => {
					throw new Error(error);
				});
		},
	},
};
</script>

<style></style>
