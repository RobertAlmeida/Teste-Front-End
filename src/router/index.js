import Vue from "vue";
import VueRouter from "vue-router";
import Category from "../views/Category.vue";
import Products from "../views/Products.vue";

Vue.use(VueRouter);

const routes = [
{
	path: "/",
	name: "Products",
	component: Products
},
{
	path: "/category",
	name: "Category",	
	component: Category
}
];

const router = new VueRouter({
	mode: "history",
	routes
});

export default router;