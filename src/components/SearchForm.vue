<template>
	<a-input-group compact class="search-group-box">
		<a-input allow-clear v-model:value="search"
			><template #prefix> <SearchOutlined /> </template
		></a-input>
		<a-select v-model:value="select" class="search-group-box_select">
			<a-select-option value="title">title</a-select-option>
			<a-select-option value="author">author</a-select-option>
		</a-select>
	</a-input-group>
</template>

<script>
import { SearchOutlined } from "@ant-design/icons-vue";
export default {
	components: {
		SearchOutlined,
	},
	props: {
		executor: {
			type: Function,
			required: true,
		},
	},
	data() {
		return {
			search: "",
			select: "title",
		};
	},
	methods: {},
	watch: {
		search(value) {
			this.executor(value, this.select);
		},
		select(value) {
			this.executor(this.search, value);
		},
	},
	created() {
		if (sessionStorage.select) this.select = sessionStorage.select;
	},
};
</script>

<style scoped lang="scss">
.search-group-box {
	display: flex;
}
.search-group-box_select {
	min-width: 70px;
	width: 15%;
}
</style>
