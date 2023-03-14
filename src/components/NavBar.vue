<template>
	<div class="navbar navbar_full">
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
			<div class="navbar-nickname">
				<strong>{{ $store.state.auth.currentUser.displayName }}</strong>
				<a-button type="text" @click="handleLogout">Logout</a-button>
			</div>
		</div>
	</div>
	<div class="navbar navbar_mob">
		<div>
			<a-tooltip placement="bottom">
				<template #title>
					<span>Posts</span>
				</template>
				<a-button
					class="navbar-icon"
					type="text"
					@click="$router.push({ name: 'main' })"
					v-if="$store.state.auth.currentUser"
				>
					<template #icon><HomeFilled /></template>
				</a-button>
			</a-tooltip>

			<a-tooltip placement="bottom">
				<template #title>
					<span>Theme</span>
				</template>
				<a-button class="navbar-icon" type="text" @click="handleChangeTheme">
					<template #icon><BgColorsOutlined /></template
				></a-button>
			</a-tooltip>

			<a-tooltip placement="bottom">
				<template #title>
					<span>Create post</span>
				</template>
				<a-button
					class="navbar-icon"
					type="text"
					@click="$router.push({ name: 'createpost' })"
					v-if="$store.state.auth.currentUser"
					><template #icon><FormOutlined /></template
				></a-button>
			</a-tooltip>
		</div>

		<div class="navbar__sign" v-if="!$store.state.auth.currentUser">
			<a-tooltip placement="bottom">
				<template #title>
					<span>Sign in</span>
				</template>
				<a-button
					class="navbar-icon"
					type="text"
					@click="$router.push({ name: 'signin' })"
					><template #icon><LoginOutlined /></template
				></a-button>
			</a-tooltip>

			<a-tooltip placement="bottom">
				<template #title>
					<span>Register</span>
				</template>
				<a-button
					class="navbar-icon"
					type="text"
					@click="$router.push({ name: 'register' })"
					><template #icon><UserAddOutlined /></template
				></a-button>
			</a-tooltip>
		</div>
		<div class="navbar__sign" v-else>
			<div class="navbar-nickname">
				<strong>{{ $store.state.auth.currentUser.displayName }}</strong>
				<a-tooltip placement="bottomRight">
					<template #title>
						<span>{{ $store.state.auth.currentUser.displayName }}</span>
					</template>
					<a-button class="navbar-icon navbar-user" type="text" @click.stop>
						<template #icon><UserOutlined /></template
					></a-button>
				</a-tooltip>
			</div>

			<a-tooltip placement="bottom">
				<template #title>
					<span>Logout</span>
				</template>
				<a-button class="navbar-icon" type="text" @click="handleLogout">
					<template #icon><LogoutOutlined /></template
				></a-button>
			</a-tooltip>
		</div>
	</div>
</template>

<script>
import { logoutAcc } from "@/firebase/methods";
import {
	HomeFilled,
	FormOutlined,
	LoginOutlined,
	LogoutOutlined,
	UserAddOutlined,
	UserOutlined,
	BgColorsOutlined,
} from "@ant-design/icons-vue";
export default {
	components: {
		HomeFilled,
		FormOutlined,
		LoginOutlined,
		LogoutOutlined,
		UserOutlined,
		UserAddOutlined,
		BgColorsOutlined,
	},
	methods: {
		handleLogout() {
			logoutAcc().then(() => {
				delete sessionStorage.user;
				this.$router.push({ name: "signin" });
			});
		},
		handleChangeTheme() {
			// this.$store.commit("toggleTheme");
			document.querySelector("body").classList.toggle("dark");

			if (sessionStorage.theme) {
				delete sessionStorage.theme;
			} else {
				sessionStorage.theme = "dark";
			}
		},
	},
};
</script>

<style lang="scss" scoped>
.navbar {
	background-color: hsl(0, 0%, 89%);
	border-bottom: 1px solid #f8f8f8;
	padding: 10px 20px;
	display: flex;
	justify-content: space-between;
	border-bottom-left-radius: 4px;
	border-bottom-right-radius: 4px;
}
.navbar_mob {
	display: none;
}
.navbar-nickname {
	display: inline-block;
	strong {
		padding: 0 15px;
	}
	.navbar-user {
		display: none;
	}
}
.navbar-icon {
	transition: all 0.3s;
	color: rgba(0, 0, 0, 0.55);
}

@media (max-width: 550px) {
	.navbar_full {
		display: none;
	}
	.navbar_mob {
		display: flex;
	}
}

@media (max-width: 375px) {
	.navbar-nickname {
		strong {
			display: none;
		}
		.navbar-user {
			display: inline-block;
		}
	}
}
</style>
