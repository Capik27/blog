import { createStore } from "vuex";
import { auth, firestore, storage } from "@/firebase/init_firebase";

export default createStore({
	state: {
		auth,
		firestore,
		storage,
	},
	getters: {},
	mutations: {
		// setUserAuth(state, payload) {
		// 	state.auth.currentUser = payload.value;
		// },
	},
	actions: {},
});
