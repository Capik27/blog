import { createStore } from "vuex";
import { auth, firestore, storage } from "@/firebase/init_firebase";

export default createStore({
	state: {
		auth,
		firestore,
		storage,
	},
	getters: {},
	mutations: {},
	actions: {},
});
