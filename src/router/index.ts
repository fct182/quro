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
    // 文字悬浮动态下划线效果
    path: "/textUnderline",
    name: "TextUnderline",
    component: () => import("../views/TextUnderlineView/TextUnderlineView.vue"),
    meta: {
      text: "文字悬浮动态下划线", // 菜单名
      icon: "Edit", // 菜单图标
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
      icon: "Pouring", // 菜单图标
    },
  },
  {
    path: "/waterfallFlow1",
    name: "waterfallFlow1",
    component: () => import("../views/WaterfallFlow/WaterfallFlowView1.vue"),
    meta: {
      text: "瀑布流-flex", // 菜单名
      icon: "Pouring", // 菜单图标
    },
  },
  {
    path: "/avatarHover",
    name: "AvatarHoverView",
    component: () => import("../views/AvatarHoverView/AvatarHoverView.vue"),
    meta: {
      text: "头像hover效果", // 菜单名
      icon: "Avatar", // 菜单图标
    },
  },
  {
    path: "/fullScroll",
    name: "FullScroll",
    component: () => import("../views/FullScrollView/FullScrollView.vue"),
    meta: {
      openWindow: true, // 新窗口打开
      text: "整页滚动效果", // 菜单名
      icon: "Guide", // 菜单图标
    },
  },
  {
    path: "/treeNode",
    name: "TreeNode",
    component: () => import("../views/RuleTreeView/RuleTreeView.vue"),
    meta: {
      text: "树形结构规则关系", // 菜单名
      icon: "Connection", // 菜单图标
    },
  },
  {
    path: "/clock",
    name: "Clock",
    component: () => import("../views/ClockView/ClockView.vue"),
    meta: {
      text: "简单时钟", // 菜单名
      icon: "Clock", // 菜单图标
    },
  },
  {
    path: "/imageViewer",
    name: "ImageViewer",
    component: () => import("../views/ImageViewerDemo/ImageViewerDemo.vue"),
    meta: {
      text: "图片预览组件", // 菜单名
      icon: "Picture", // 菜单图标
    },
  },
  {
    path: "/WatermarkView",
    name: "WatermarkView",
    component: () => import("../views/WatermarkView/WatermarkView.vue"),
    meta: {
      text: "水印", // 菜单名
      icon: "Brush", // 菜单图标
    },
  },
  {
    path: "/loading",
    name: "LoadingView",
    component: () => import("../views/LoadingView/LoadingView.vue"),
    meta: {
      text: "Loading加载", // 菜单名
      icon: "Loading", // 菜单图标
    },
  },
  {
    path: "/card",
    name: "CardView",
    component: () => import("../views/CardView/CardView.vue"),
    meta: {
      text: "卡片", // 菜单名
      icon: "Postcard", // 菜单图标
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
