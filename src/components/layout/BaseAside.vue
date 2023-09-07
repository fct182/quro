<template>
  <el-menu
    router
    class="base-aside-menu"
    :default-active="route.fullPath"
    :collapse="isCollapse"
  >
    <el-menu-item
      @click="menuClickHandler(item.path, item.openWindow)"
      v-for="item in menuList"
      :index="item.path"
      :key="item.path"
    >
      <el-icon>
        <component :is="item.icon"></component>
      </el-icon>
      <template #title>{{ item.text }}</template>
    </el-menu-item>
  </el-menu>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { routes } from "@/router";
import { RouteRecordRaw, useRoute, useRouter } from "vue-router";

type menuItem = {
  path: string;
  text: string;
  icon: string;
  openWindow: boolean;
};

const isCollapse = ref(false);
const menuList = ref([] as menuItem[]);
const route = useRoute();
const router = useRouter();

getMenuAside(routes);

/**
 * 处理菜单项
 * @Date: 2023/09/05 20:28:16
 * @param data 路由Route数组
 */
function getMenuAside(data: Array<RouteRecordRaw>) {
  for (const item of data) {
    if (item.path !== "/") {
      menuList.value.push({
        text: item.meta?.text as string,
        path: item.path,
        icon: item.meta?.icon as string,
        openWindow: item.meta?.openWindow as boolean,
      });
    }
  }
}
/**
 * 菜单项点击事件
 * @Author:付常涛
 * @Date: 2023/09/05 20:51:54
 * @param path  路由路径
 * @param openWindow  是否打开新窗口加载
 */
function menuClickHandler(path: string, openWindow: boolean) {
  // 是否打开新窗口加载
  if (openWindow) {
    const routeObj = router.resolve({
      path,
    });
    // 打开新窗口
    const newWindow = window.open(routeObj.href, "_blank");
    newWindow!.onload = () => router.back();
  }
}
</script>

<style lang="scss" scoped>
.base-aside-menu {
  // border-right: none;
  height: 100%;
}
</style>
