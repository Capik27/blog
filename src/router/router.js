import { createRouter, createWebHistory } from "vue-router";
import PostListPage from "@/pages/PostListPage";
import RegisterPage from "@/pages/RegisterPage";
import SigninPage from "@/pages/SigninPage";
import PostPage from "@/pages/PostPage";

const routes = [
	{
		path: "/",
		component: PostListPage,
	},
	{
		path: "/posts/:id",
		component: PostPage,
	},
	{
		path: "/signin",
		component: SigninPage,
	},
	{
		path: "/register",
		component: RegisterPage,
	},
	// {
	// 	path: "/store",
	// 	component: PostPageWithStore,
	// },
	// {
	// 	path: "/composition",
	// 	component: PostPageCompositionApi,
	// },
];

const router = createRouter({
	routes,
	history: createWebHistory(process.env.BASE_URL),
});

export default router;
