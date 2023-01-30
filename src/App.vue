<template>
	<a-input v-model:value="inputValue" placeholder="enter" />
	<a-button @click="add">btn: {{ count }}</a-button>
	<SignIn style="width: 300px" />
	<posts-list :posts="arr" />
</template>

<script>
import PostsList from "@/components/PostsList.vue";
import SignIn from "@/components/sign/SignIn.vue";

export default {
	components: { PostsList, SignIn },
	data() {
		return {
			inputValue: "",
			count: 0,
			arr: [
				{ value: 1, name: "name1" },
				{ value: 2, name: "name2" },
				{ value: 3, name: "name3" },
				{ value: 4, name: "name4" },
				{ value: 5, name: "name5" },
			],
		};
	},
	methods: {
		add() {
			this.count++;
		},
	},
};
</script>

<style>
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}
#app {
	padding: 20px;
}
</style>

<!-- <template>
    <a-input v-model:value="value" placeholder="Basic usage" />
  </template>
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  export default defineComponent({
    setup() {
      const value = ref<string>('');
      return {
        value,
      };
    },
  });
  </script>
   -->
