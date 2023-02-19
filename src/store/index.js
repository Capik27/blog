import { createStore } from "vuex";
import { auth } from "@/firebase/init_firebase";

export default createStore({
	state: {
		theme: false,
		auth: auth,
	},
	getters: {},
	mutations: {},
	actions: {},
});
