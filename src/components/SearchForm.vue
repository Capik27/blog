<template>
	<a-input-group compact class="search-group-box">
		<a-input allow-clear v-model:value="searchVal"
			><template #prefix> <SearchOutlined /> </template
		></a-input>
		<a-select v-model:value="selectType" class="search-group-box_select">
			<a-select-option value="title">title</a-select-option>
			<a-select-option value="author">author</a-select-option>
		</a-select>
		<a-select v-model:value="timeFilter" class="search-group-box_select-time">
			<a-select-option value="all">all time</a-select-option>
			<a-select-option value="year">year</a-select-option>
			<a-select-option value="month">month</a-select-option>
			<a-select-option value="week">week</a-select-option>
			<a-select-option value="day">day</a-select-option>
			<a-select-option value="hour">hour</a-select-option>
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
			searchVal: "",
			selectType: "title",
			timeFilter: "all",
		};
	},
	methods: {},
	watch: {
		searchVal(value) {
			sessionStorage.searchVal = value;
			this.executor(value, this.selectType, this.timeFilter);
		},
		selectType(value) {
			sessionStorage.selectType = value;
			this.executor(this.searchVal, value, this.timeFilter);
		},
		timeFilter(value) {
			sessionStorage.timeFilter = value;
			this.executor(this.searchVal, this.selectType, value);
		},
	},
	created() {
		if (sessionStorage.searchVal) this.searchVal = sessionStorage.searchVal;
		if (sessionStorage.selectType) this.selectType = sessionStorage.selectType;
		if (sessionStorage.timeFilter) this.timeFilter = sessionStorage.timeFilter;
	},
};
</script>

<style scoped lang="scss">
.search-group-box {
	display: flex;
}
.search-group-box_select {
	min-width: 85px;
	max-width: 15%;
	width: 15%;

	&-time {
		min-width: 90px;
		max-width: 15%;
		width: 15%;
	}
}
</style>
