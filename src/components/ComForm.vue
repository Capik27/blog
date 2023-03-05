<template>
	<form class="comment_form">
		<a-input
			v-model:value="value"
			:auto-size="{ minRows: 1, maxRows: 5 }"
			placeholder="your comment"
			:disabled="isLoading"
			ref="inputRef"
		/>

		<a-button
			class="comment_btn"
			html-type="submit"
			@click="submit"
			:loading="isLoading"
			:disabled="!value"
			>Submit</a-button
		>
	</form>
</template>

<script>
import { defineComponent, ref } from "vue";
import { uploadComment } from "@/firebase/methods";

export default defineComponent({
	props: {
		id: {
			type: String,
			required: true,
		},
		upd: {
			type: Function,
			required: true,
		},
	},
	setup() {
		const value = ref("");
		const isLoading = ref(false);
		const inputRef = ref();

		return {
			value,
			isLoading,
			inputRef,
		};
	},

	methods: {
		focusInput() {
			// console.log("focus");
			this.inputRef.focus();
		},

		submit(e) {
			e.preventDefault();
			if (!this.value) return; //CHECK
			const uid = this.$store.state.auth.currentUser.uid;
			const name = this.$store.state.auth.currentUser.displayName;

			this.isLoading = true;
			uploadComment(this.id, uid, name, this.value).then(async () => {
				this.isLoading = false;
				this.value = "";
				await this.upd();
				this.focusInput();
			});
		},
	},
	mounted() {
		this.focusInput();
	},
});
</script>

<style scoped>
.comment_form {
	display: flex;
	flex-direction: column;
	gap: 10px;
	width: 100%;
}
.comment_btn {
	align-self: flex-end;
}
</style>
