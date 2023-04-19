<template>
	<a-input-group compact class="search-group-box">
		<a-input
			allow-clear
			v-model:value="searchVal"
			:placeholder="`${selectType} search`"
		>
			<template #suffix>
				<a-tooltip placement="top" v-if="likedFilter">
					<template #title>
						<span>Like filter On</span>
					</template>
					<HeartFilled @click="toggleLike" class="search-group-box_liked" />
				</a-tooltip>
				<a-tooltip placement="top" v-else>
					<template #title>
						<span>Like filter Off</span>
					</template>
					<HeartOutlined
						@click="toggleLike"
						class="search-group-box_notliked"
					/>
				</a-tooltip>
			</template>
		</a-input>
		<a-select v-model:value="selectType" class="search-group-box_select">
			<a-select-option value="title">title</a-select-option>
			<a-select-option value="author">author</a-select-option>
		</a-select>

		<a-tooltip placement="top">
			<template #title>
				<span>Time filter</span>
			</template>
			<a-select v-model:value="timeFilter" class="search-group-box_select-time">
				<a-select-option value="all">all time</a-select-option>
				<a-select-option value="year">year</a-select-option>
				<a-select-option value="month">month</a-select-option>
				<a-select-option value="week">week</a-select-option>
				<a-select-option value="day">day</a-select-option>
				<a-select-option value="hour">hour</a-select-option>
			</a-select>
		</a-tooltip>
	</a-input-group>
</template>

<script>
import {
	// SearchOutlined,
	HeartFilled,
	HeartOutlined,
} from "@ant-design/icons-vue";
export default {
	components: {
		// SearchOutlined,
		HeartFilled,
		HeartOutlined,
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
			likedFilter: false,
		};
	},
	methods: {
		toggleLike() {
			this.likedFilter = !this.likedFilter;
		},
	},
	watch: {
		searchVal(value) {
			sessionStorage.searchVal = value;
			this.executor(value, this.selectType, this.timeFilter, this.likedFilter);
		},
		selectType(value) {
			sessionStorage.selectType = value;
			this.executor(this.searchVal, value, this.timeFilter, this.likedFilter);
		},
		timeFilter(value) {
			sessionStorage.timeFilter = value;
			this.executor(this.searchVal, this.selectType, value, this.likedFilter);
		},
		likedFilter(value) {
			value
				? (sessionStorage.likedFilter = value)
				: delete sessionStorage.likedFilter;
			this.executor(this.searchVal, this.selectType, this.timeFilter, value);
		},
	},
	created() {
		if (sessionStorage.searchVal) this.searchVal = sessionStorage.searchVal;
		if (sessionStorage.selectType) this.selectType = sessionStorage.selectType;
		if (sessionStorage.timeFilter) this.timeFilter = sessionStorage.timeFilter;
		if (sessionStorage.likedFilter) this.likedFilter = true;
	},
};
</script>

<style scoped lang="scss">
.search-group-box {
	display: flex;

	%color {
		color: rgba(0, 0, 0, 0.25);
		transition: all 0.33s;
	}

	&_liked {
		@extend %color;
		&:hover {
			color: rgba(255, 0, 0, 0.9);
		}
	}

	&_notliked {
		@extend %color;
		&:hover {
			transition: all 0.33s;
			color: #1890ff;
		}
	}
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
