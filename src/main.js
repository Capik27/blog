import { createApp } from "vue";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
//////////////////////////////////////
import router from "@/router/router";
import App from "./App";
import store from "./store";

createApp(App)
	//
	.use(router)
	.use(store)
	.use(Antd)
	.mount("#app");
