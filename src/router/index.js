import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { useUserStore } from "@/stores/user";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/cart",
      name: "cart",
      component: () => import("../views/CartView.vue"),
    },
    {
      path: "/product-details/:id",
      name: "product-details",
      component: () => import("../views/ProductDetailsView.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/user-profile/:id",
      name: "profile",
      component: () => import("../views/ProfileView.vue"),
      beforeEnter: (to, from, next) => {
        const userStore = useUserStore();

        // Check if user is logged in
        if (userStore.getUserToken === "") {
          next('/login'); // Redirect to login if not authenticated
        } else {
          next(); // Proceed to the route
        }
      },
    },
    {
      path: "/wishlist",
      name: "wishlist",
      component: () => import("../views/WishlistView.vue"), // Ensure you have this component
      beforeEnter: (to, from, next) => {
        const userStore = useUserStore();

        // Check if user is logged in
        if (userStore.getUserToken === "") {
          next('/login'); // Redirect to login if not authenticated
        } else {
          next(); // Proceed to the route
        }
      },
    },
  ],
});

export default router;
