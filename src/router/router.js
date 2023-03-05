import { createRouter, createWebHistory } from "vue-router";
import NotFoundPage from "@/pages/NotFoundPage";
import PostListPage from "@/pages/PostListPage";
import RegisterPage from "@/pages/RegisterPage";
import SigninPage from "@/pages/SigninPage";
import PostPage from "@/pages/PostPage";
import CreatePostPage from "@/pages/CreatePostPage";

const routes = [
	{
		path: "/",
		name: "main",
		component: PostListPage,
	},
	{
		path: "/posts/:id",
		name: "posts",
		component: PostPage,
	},
	{
		path: "/signin",
		name: "signin",
		component: SigninPage,
	},
	{
		path: "/register",
		name: "register",
		component: RegisterPage,
	},
	{
		path: "/createpost",
		name: "createpost",
		component: CreatePostPage,
	},
	{
		path: "/editpost/:id",
		name: "editpost",
		component: CreatePostPage,
	},
	// {
	// 	path: "/notfound",
	// 	name: "notfound",
	// 	component: NotFoundPage,
	// },
	{
		path: "/:catchAll(.*)",
		name: "notfound",
		component: NotFoundPage,
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

import store from "@/store";

router.beforeEach((to, from, next) => {
	if (
		!store.state.auth.currentUser &&
		to.name !== "signin" &&
		to.name !== "register"
	) {
		next({ name: "signin" });
	} else next();
});

export default router;
