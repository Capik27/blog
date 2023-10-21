import { createStore } from "vuex";
import { auth, firestore, storage } from "@/firebase/init_firebase";

const pagination = { page: 1 };

export default createStore({
  state: {
    auth,
    firestore,
    storage,
    pagination,
  },
  getters: {},
  mutations: {
    // setUserAuth(state, payload) {
    // 	state.auth.currentUser = payload.value;
    // },
    setPage(state, payload) {
      state.pagination.page = payload;
    },
  },
  actions: {
    updatePageNumber({ commit }, newValue) {
      commit("setPage", newValue);
    },
  },
});
