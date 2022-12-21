import { createRouter, createWebHistory } from "vue-router";
import useUserStore from "@/stores/user";

const HomeView = () => import("@/views/HomeView.vue");
const AboutView = () => import("@/views/AboutView.vue");
const Manage = () => import("@/views/Manage.vue");
const Song = () => import("@/views/Song.vue");

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkExactActiveClass: "text-yellow-500",
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      component: AboutView,
    },
    {
      path: "/manage",
      name: "manage",
      component: Manage,
      beforeEnter: (to, from, next) => {
        next();
      },
      meta: { requiresAuth: true },
    },
    {
      path: "/:catchAll(.*)*",
      redirect: { name: "home" },
    },
    {
      name: "song",
      path: "/song/:id",
      component: Song,
    },
  ],
});

router.beforeEach((to, from, next) => {
  // console.log(to.meta);
  if (!to.meta.requiresAuth) {
    next();
    return;
  }

  const store = useUserStore();

  if (store.userLoggedIn) {
    next();
  } else {
    next({ name: "home" });
  }
});

export default router;
