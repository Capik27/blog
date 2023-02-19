<template>
	<form class="create_form">
		<div class="form_image" @click="openInput">
			<img id="preview" src="" alt="preview" v-if="file" />
			<h1 v-if="!file">?</h1>
			<a-input
				id="input"
				hidden
				v-model:value="file"
				@change="changeInput"
				type="file"
				accept=".png, .jpg, .jpeg"
			/>
		</div>
		<div class="form_text">
			<a-input
				v-model:value="title"
				show-count
				:maxlength="50"
				placeholder="title"
			/>
			<br />
			<a-textarea
				v-model:value="body"
				:auto-size="{ minRows: 10, maxRows: 10 }"
				placeholder="message"
			/>

			<a-button class="form_btn" html-type="submit">Submit</a-button>
		</div>
	</form>
</template>
<script>
import { defineComponent, ref } from "vue";
export default defineComponent({
	setup() {
		const title = ref("");
		const body = ref("");
		const file = ref("");
		return {
			title,
			body,
			file,
		};
	},
	methods: {
		openInput() {
			const input = document.querySelector("#input");
			input.click();
		},
		changeInput(e) {
			const file = Array.from(e.target.files)[0];

			const reader = new FileReader();

			reader.onload = (e) => {
				const preview = document.querySelector("#preview");
				preview.src = e.target.result;
			};

			reader.readAsDataURL(file);
		},
	},
});
</script>

<style>
.create_form {
	display: flex;
	justify-content: center;
	width: 100%;
	max-height: 325px;
}
.form_image {
	cursor: pointer;
	border: 1px solid black;
	width: 100%;
	height: 100%;
	min-height: 325px;
	min-width: 325px;
	/* max-width: 325px; */

	object-fit: cover;
	width: 35%;
	display: flex;
	justify-content: center;
	align-items: center;
}
.form_image img {
	width: 100%;
	height: 100%;
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
