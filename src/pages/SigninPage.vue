<template>
	<div class="sign_container">
		<a-button
			@click="handleLoginGoogle"
			:loading="isGooLoading"
			:disabled="isGooLoading || isDefLoading"
			class="sign_google"
		>
			<template #icon><GoogleOutlined class="sign_google-icon" /></template>
		</a-button>
		<div class="line" />
		<a-form
			class="form"
			:model="formState"
			@finish="handleFinish"
			@finishFailed="handleFinishFailed"
		>
			<a-form-item>
				<a-input
					v-model:value="formState.email"
					placeholder="Email"
					:disabled="isGooLoading || isDefLoading"
				>
					<template #prefix><MailOutlined class="sign_icon" /></template>
				</a-input>
			</a-form-item>
			<a-form-item>
				<a-input-password
					v-model:value="formState.pass"
					type="password"
					placeholder="Password"
					:disabled="isGooLoading || isDefLoading"
				>
					<template #prefix><LockOutlined class="sign_icon" /></template>
				</a-input-password>
			</a-form-item>
			<a-form-item class="sign_default">
				<a-button
					class="sign_default-btn"
					type="primary"
					html-type="submit"
					:loading="isDefLoading"
					:disabled="
						formState.user === '' ||
						formState.pass === '' ||
						isGooLoading ||
						isDefLoading
					"
				>
					Log in
				</a-button>
			</a-form-item>
		</a-form>
	</div>
</template>

<script>
import {
	MailOutlined,
	LockOutlined,
	GoogleOutlined,
} from "@ant-design/icons-vue";
import { defineComponent, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { loginGoogle, loginDefault } from "@/firebase/methods";

export default defineComponent({
	components: {
		MailOutlined,
		LockOutlined,
		GoogleOutlined,
	},
	setup() {
		const router = useRouter();
		const isGooLoading = ref(false);
		const isDefLoading = ref(false);
		const formState = reactive({
			email: "",
			pass: "",
		});
		const handleFinish = () => {
			// console.log(values, formState);
			isDefLoading.value = true;
			loginDefault(formState.email, formState.pass)
				.then(() => {
					router.push("/");
					isDefLoading.value = false;
				})
				.catch((error) => {
					isDefLoading.value = false;
					console.log("error / ", error);
				});
		};
		const handleFinishFailed = (errors) => {
			console.log(errors);
		};
		const handleLoginGoogle = () => {
			isGooLoading.value = true;
			loginGoogle().then(() => {
				router.push({ name: "main" });
				isGooLoading.value = false;
			});
		};

		return {
			isGooLoading,
			isDefLoading,
			formState,
			handleFinish,
			handleFinishFailed,
			handleLoginGoogle,
		};
	},
});
</script>

<style scoped>
.sign_container {
	display: flex;
	flex-direction: column;
	padding: 10px;
	background-color: #fffbfb;
	border: 1px solid hsl(0, 0%, 90%);
	border-radius: 4px;
}
.line {
	border-bottom: 1px solid #d9d9d9;
	margin: 24px 0;
	width: 90%;
	align-self: center;
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
}
.line:after {
	position: absolute;
	content: "or";
	color: #9b9b9bc0;
	background-color: #ffffff;
	padding: 0 3px;
	z-index: 1;
	top: -5px;
	font-size: 10px;
	line-height: 8px;
}
.form {
	display: flex;
	flex-direction: column;
}
.sign_google {
	width: 100%;
	flex-grow: 1;
}
.sign_default {
	align-self: center;
	width: 90%;
	margin: 0;
}
.sign_default-btn {
	width: 100%;
}
.sign_google-icon {
	transition: all 0.3s;
	color: rgba(0, 0, 0, 0.25);
	font-size: 16px;
	line-height: 16px;
}
.sign_icon {
	color: rgba(0, 0, 0, 0.25);
}
</style>
