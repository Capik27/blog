import { createApp } from "vue";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
//////////////////////////////////////
import router from "@/router/router";
import App from "./App";

createApp(App)
	//
	.use(router)
	.use(Antd)
	.mount("#app");
