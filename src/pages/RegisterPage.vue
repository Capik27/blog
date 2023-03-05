<template>
	<div class="form_container">
		<a-form
			class="form"
			ref="formRef"
			name="custom-validation"
			:model="formState"
			:rules="rules"
			@finish="handleFinish"
			@validate="handleValidate"
			@finishFailed="handleFinishFailed"
		>
			<a-form-item has-feedback name="name">
				<a-input
					v-model:value="formState.name"
					placeholder="Username"
					autocomplete="off"
					:disabled="isLoading"
				>
					<template #prefix><UserOutlined class="form_icon" /></template
				></a-input>
			</a-form-item>
			<a-form-item has-feedback name="email">
				<a-input
					v-model:value="formState.email"
					placeholder="Email"
					autocomplete="off"
					:disabled="isLoading"
				>
					<template #prefix><MailOutlined class="form_icon" /></template
				></a-input>
			</a-form-item>
			<a-form-item has-feedback name="pass">
				<a-input-password
					v-model:value="formState.pass"
					type="password"
					placeholder="Password"
					autocomplete="off"
					:disabled="isLoading"
				>
					<template #prefix><LockOutlined class="form_icon" /></template
				></a-input-password>
			</a-form-item>
			<a-form-item has-feedback name="checkPass">
				<a-input
					v-model:value="formState.checkPass"
					placeholder="Confirm password"
					type="password"
					autocomplete="off"
					:disabled="isLoading"
				>
					<template #prefix><LockOutlined class="form_icon" /></template
				></a-input>
			</a-form-item>
			<a-form-item class="form_controls">
				<div class="form_controls-container">
					<a-button
						:loading="isLoading"
						:disabled="
							formState.name === '' ||
							formState.email === '' ||
							formState.pass === '' ||
							formState.checkPass === ''
						"
						type="primary"
						html-type="submit"
						>Submit</a-button
					>
					<a-button :loading="isLoading" @click="resetForm">Reset</a-button>
				</div>
			</a-form-item>
		</a-form>
	</div>
</template>
<script>
import {
	UserOutlined,
	MailOutlined,
	LockOutlined,
} from "@ant-design/icons-vue";
import { EMAIL_REGEXP } from "@/utils/reg_exp";
import { registerAuth } from "@/firebase/methods";
import { defineComponent, reactive, ref } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
	components: { UserOutlined, MailOutlined, LockOutlined },
	setup() {
		const router = useRouter();
		const formRef = ref();
		const isLoading = ref(false);
		const formState = reactive({
			name: "",
			email: "",
			pass: "",
			checkPass: "",
		});
		const checkName = async (_rule, value) => {
			if (!value) {
				return Promise.reject("Name is required");
			} else {
				return Promise.resolve();
			}
		};
		const checkEmail = async (_rule, value) => {
			if (!value.match(EMAIL_REGEXP)) {
				return Promise.reject("Not valid email");
			} else {
				return Promise.resolve();
			}
		};
		const validatePass = async (_rule, value) => {
			if (value === "") {
				return Promise.reject("Please input the password");
			} else {
				if (value.length >= 6) {
					if (formState.checkPass !== "") {
						formRef.value.validateFields("checkPass");
					}
					return Promise.resolve();
				} else {
					return Promise.reject("Password from 6 characters");
				}
			}
		};
		const validatePass2 = async (_rule, value) => {
			if (value === "") {
				return Promise.reject("Please input the password again");
			} else if (value !== formState.pass) {
				return Promise.reject("Two inputs don't match!");
			} else {
				return Promise.resolve();
			}
		};

		const rules = {
			name: [
				{
					required: true,
					validator: checkName,
					trigger: "change",
				},
			],
			email: [
				{
					required: true,
					validator: checkEmail,
					trigger: "change",
				},
			],
			pass: [
				{
					required: true,
					validator: validatePass,
					trigger: "change",
				},
			],
			checkPass: [
				{
					required: true,
					validator: validatePass2,
					trigger: "change",
				},
			],
		};
		const resetForm = () => {
			formRef.value.resetFields();
		};

		const handleFinish = ({ name, email, pass }) => {
			isLoading.value = true;
			registerAuth(name, email, pass)
				.then(() => {
					router.push({
						name: "main",
					});
				})
				.catch((error) => {
					console.log("error", error);
				})
				.finally(() => {
					resetForm();
					isLoading.value = false;
				});
			// console.log("handleFinish", values);
		};
		const handleFinishFailed = (errors) => {
			console.log("errors", errors);
		};

		const handleValidate = () => {
			// console.log("args", args);
		};

		return {
			formState,
			formRef,
			rules,
			isLoading,
			handleFinishFailed,
			handleFinish,
			resetForm,
			handleValidate,
		};
	},
});
</script>

<style scoped>
.form_container {
	padding: 10px;
	background-color: #fffbfb;
	border: 1px solid hsl(0, 0%, 90%);
	border-radius: 4px;
	max-width: 240px;
	width: 100%;
}
.form {
	display: flex;
	flex-direction: column;
	width: 100%;
}
.form_controls {
	width: 90%;
	align-self: center;
	display: flex;
	margin: 0;
}
.form_controls-container {
	width: 100%;
	display: flex;
	gap: 10px;
}
.form_controls-container button {
	width: 100%;
}
.form_icon {
	color: rgba(0, 0, 0, 0.25);
}
</style>
