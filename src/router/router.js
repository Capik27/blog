import {
	createRouter,
	//createWebHistory,
	createWebHashHistory,
} from "vue-router";
import NotFoundPage from "@/pages/NotFoundPage";
import PostListPage from "@/pages/PostListPage";
import RegisterPage from "@/pages/RegisterPage";
import SigninPage from "@/pages/SigninPage";
import PostPage from "@/pages/PostPage";
import CreatePostPage from "@/pages/CreatePostPage";
import EditPostPage from "@/pages/EditPostPage";

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
		component: EditPostPage,
	},

	{
		path: "/error",
		name: "error",
		component: NotFoundPage,
	},
	{
		path: "/:catchAll(.*)",
		name: "notfound",
		component: NotFoundPage,
	},
];

const router = createRouter({
	routes,
	history: createWebHashHistory(), //(process.env.BASE_URL),
});

import store from "@/store";

router.beforeEach((to, from, next) => {
	// console.log("route");
	// console.log("FROM", from.path);
	// console.log("TO", to.path);

	if (!store.state.auth.currentUser) {
		if (to.name != "signin" && to.name != "register") {
			next({ name: "signin" });
		} else next();
	}

	if (store.state.auth.currentUser) {
		sessionStorage.page = to.path;
		// if (
		// 	from.name === to.name &&
		// 	(to.name === "posts" || to.name == "editpost")
		// ) {
		// 	next({ name: to.name, params: { id: to.params.id } });
		// }

		if (to.name == "signin" || to.name == "register") {
			next({ name: "main" });
		} else next();
	}
});

export default router;
