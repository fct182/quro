import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/Home/HomePage.vue";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/home",
    // redirect: { name: 'Home' }
  },
  {
    path: "/home",
    name: "Home",
    component: HomeView,
    meta: {
      text: "首页", // 菜单名
      icon: "Discount", // 菜单图标
    },
  },
  {
    // 动态磨砂背景
    path: "/frostedBackground",
    name: "FrostedBackground",
    component: () => import("../views/FrostedBackground/FrostedBackground.vue"),
    meta: {
      text: "动态磨砂背景", // 菜单名
      icon: "Platform", // 菜单图标
    },
  },
  {
    // 动态磨砂背景---2
    path: "/frostedBackground2",
    name: "FrostedBackground2",
    component: () =>
      import("../views/FrostedBackground/FrostedBackground2.vue"),
    meta: {
      text: "动态磨砂背景2", // 菜单名
      icon: "Platform", // 菜单图标
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
