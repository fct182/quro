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
    // 静态磨砂背景
    path: "/frostedBackground2",
    name: "FrostedBackground2",
    component: () =>
      import("../views/FrostedBackground/FrostedBackground2.vue"),
    meta: {
      text: "静态磨砂背景", // 菜单名
      icon: "Platform", // 菜单图标
    },
  },
  {
    // 动态文字输入效果
    path: "/dynamicTextInput",
    name: "DynamicTextInput",
    component: () =>
      import("../views/DynamicTextInput/DynamicTextInputDemo.vue"),
    meta: {
      text: "动态文字输入效果", // 菜单名
      icon: "EditPen", // 菜单图标
    },
  },
  {
    path: "/scrollStyle",
    name: "scrollStyle",
    component: () => import("../views/ScrollStyle/ScrollStyleDemo.vue"),
    meta: {
      text: "自定义滚动条样式", // 菜单名
      icon: "DCaret", // 菜单图标
    },
  },
  {
    path: "/waterfallFlow",
    name: "waterfallFlow",
    component: () => import("../views/WaterfallFlow/WaterfallFlowView.vue"),
    meta: {
      text: "瀑布流-absolute", // 菜单名
      icon: "DCaret", // 菜单图标
    },
  },
  {
    path: "/waterfallFlow1",
    name: "waterfallFlow1",
    component: () => import("../views/WaterfallFlow/WaterfallFlowView1.vue"),
    meta: {
      text: "瀑布流-flex", // 菜单名
      icon: "DCaret", // 菜单图标
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
