<template>
  <el-menu
    router
    class="base-aside-menu"
    :default-active="route.fullPath"
    :collapse="isCollapse"
  >
    <el-menu-item v-for="item in menuList" :index="item.path" :key="item.path">
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
import { RouteRecordRaw, useRoute } from "vue-router";

type menuItem = {
  path: string;
  text: string;
  icon: string;
};

const isCollapse = ref(false);
const menuList = ref([] as menuItem[]);
const route = useRoute();

getMenuAside(routes);

function getMenuAside(data: Array<RouteRecordRaw>) {
  for (const item of data) {
    if (item.path !== "/") {
      menuList.value.push({
        text: item.meta?.text as string,
        path: item.path,
        icon: item.meta?.icon as string,
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.base-aside-menu {
  // border-right: none;
  height: 100%;
}
</style>
