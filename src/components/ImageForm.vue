<template>
	<div class="form_image" @click.stop="openInput">
		<img id="preview" :src="src" alt="preview" v-show="src" />
		<a-empty v-if="!src" :description="null" />
		<a-input
			id="input"
			hidden
			@change="changeInput"
			type="file"
			accept=".png, .jpg, .jpeg"
		/>
		<CloseCircleFilled
			@click.stop="reset"
			class="form_image-reset"
			v-if="src"
		/>
	</div>
</template>

<script>
import { CloseCircleFilled } from "@ant-design/icons-vue";
import { defineComponent } from "vue";

export default defineComponent({
	components: { CloseCircleFilled },
	props: {
		source: {
			type: String,
		},
		returnImageFile: {
			type: Function,
			required: true,
		},
	},
	data() {
		return {
			src: this.source || "",
		};
	},
	methods: {
		reset() {
			this.src = "";
			this.returnImageFile(this.src);
		},

		openInput() {
			const input = document.querySelector("#input");
			input.click();
		},

		changeInput(e) {
			if (!e.target.files.length) return;
			const file = Array.from(e.target.files)[0];
			this.returnImageFile(file);
			const reader = new FileReader();
			reader.onload = (e) => {
				this.src = e.target.result;
			};
			reader.readAsDataURL(file);
		},
	},
	watch: {
		source() {
			this.src = this.source;
		},
	},
});
</script>

<style lang="scss" scoped>
.form_image {
	cursor: pointer;
	border: 1px solid #d9d9d9;
	background-color: #fffbfb;
	border-radius: 2px;
	width: 262px;
	height: 262px;
	min-height: 256px;
	display: flex;
	justify-content: center;
	align-items: center;
	transition: all 0.33s;
	overflow: hidden;
	position: relative;

	.ant-empty {
		transition: all 0.33s;
	}

	&:hover {
		border-color: #1890ff;

		img {
			filter: brightness(0.25);
		}
		.form_image-reset {
			opacity: 1;
		}

		.ant-empty {
			filter: brightness(0.85);
		}
	}

	&-reset {
		font-size: 13px;
		position: absolute;
		top: 7px;
		right: 7px;
		opacity: 0;
		transition: all 0.33s;
		color: #7c7c7c;

		&:hover {
			color: #d9d9d94b;
		}
	}
}
.form_image img {
	width: 100%;
	height: 100%;
	object-fit: cover;
	animation: a_img 0.15s;
	transition: all 0.33s;
}
</style>
