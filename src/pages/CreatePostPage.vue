<template>
	<form class="create_form">
		<div class="form_image" @click="openInput">
			<img id="preview" src="" alt="preview" v-if="preview" />
			<h1 v-if="!preview">?</h1>
			<a-input
				id="input"
				hidden
				@change="changeInput"
				type="file"
				accept=".png, .jpg, .jpeg"
			/>
		</div>
		<div class="form_text">
			<a-input
				v-model:value="title"
				show-count
				:maxlength="25"
				placeholder="title"
				:disabled="isLoading"
			/>
			<br />
			<a-textarea
				v-model:value="body"
				:auto-size="{ minRows: 10, maxRows: 10 }"
				placeholder="message"
				:disabled="isLoading"
			/>

			<a-button
				class="form_btn"
				html-type="submit"
				@click="submitPost"
				:loading="isLoading"
				>Submit</a-button
			>
		</div>
	</form>
</template>

<script>
import { defineComponent, ref } from "vue";
import { uploadPost } from "@/firebase/methods";

export default defineComponent({
	setup() {
		const title = ref("");
		const body = ref("");
		return {
			title,
			body,
		};
	},
	data() {
		return {
			isLoading: false,
			preview: null,
		};
	},
	methods: {
		setIsLoading(value) {
			this.isLoading = value;
		},

		openInput() {
			if (this.isLoading) return;
			const input = document.querySelector("#input");
			input.click();
		},

		changeInput(e) {
			const file = Array.from(e.target.files)[0];
			this.preview = file;
			const reader = new FileReader();
			reader.onload = (e) => {
				const preview = document.querySelector("#preview");
				preview.src = e.target.result;
			};
			reader.readAsDataURL(file);
		},

		submitPost(e) {
			e.preventDefault();
			if (!this.title || !this.body || !this.preview) return; //CHECK
			const uid = this.$store.state.auth.currentUser.uid;

			// const body = JSON.stringify(this.body);
			// console.log(body);

			this.setIsLoading(true);
			uploadPost(uid, this.title, this.body, this.preview).then(() => {
				this.setIsLoading(false);
				this.title = "";
				this.body = "";
				this.preview = null;
			});
		},
	},
});
</script>

<style scoped>
.create_form {
	display: flex;
	justify-content: center;
	width: 100%;
	max-height: 325px;
}
.form_image {
	cursor: pointer;
	border: 1px solid #d9d9d9;
	border-radius: 2px;
	width: 100%;
	height: 100%;
	min-height: 325px;
	max-height: 325px;
	min-width: 275px;
	width: 35%;
	display: flex;
	justify-content: center;
	align-items: center;
	transition: all 0.33s;
	overflow: hidden;
}
.form_image:hover {
	border-color: #1890ff;
}

.form_image img {
	width: 100%;
	height: 100%;
	object-fit: cover;
}
.form_text {
	margin-left: 20px;
	width: 65%;
	display: flex;
	flex-direction: column;
}
.form_btn {
	margin-top: 10px;
	align-self: flex-end;
}
</style>
