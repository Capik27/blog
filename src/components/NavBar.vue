<template>
	<div class="navbar">
		<a-button @click="$router.push('/')">Blog</a-button>
		<div class="navbar__sign">
			<a-button type="text" @click="$router.push('/signin')">Sign in</a-button>
			<a-button type="text" @click="$router.push('/register')"
				>Register</a-button
			>
		</div>
	</div>
</template>

<script>
export default {
	//
};
</script>

<style scoped>
.navbar {
	background-color: #ececec;
	border-bottom: 1px solid #f8f8f8;
	padding: 10px 20px;
	display: flex;
	justify-content: space-between;
}
</style>
