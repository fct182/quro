<template>
  <el-container v-if="isFullScree" class="app-layout">
    <el-header class="header-layout">
      <base-header></base-header>
    </el-header>
    <el-container class="content-layout">
      <el-aside width="200px">
        <el-scrollbar>
          <base-aside></base-aside>
        </el-scrollbar>
      </el-aside>
      <el-main>
        <div class="main-body">
          <router-view></router-view>
        </div>
      </el-main>
    </el-container>
  </el-container>
  <router-view v-else></router-view>
</template>

<script setup lang="ts">
import BaseHeader from "@/components/layout/BaseHeader.vue";
import BaseAside from "@/components/layout/BaseAside.vue";
import { useRoute } from "vue-router";
import { computed } from "vue";

const route = useRoute();

/**
 * 是否全屏查看组件示例
 * @Date: 2023/09/07 17:31:18
 */
const isFullScree = computed(() => {
  if (route.meta.openWindow) {
    return false;
  }
  return true;
});
</script>

<style lang="scss" scoped>
$header-layout: 56px;
.app-layout {
  .header-layout {
    display: flex;
    justify-content: center;
    align-items: center;
    height: $header-layout;
    border-bottom: 1px solid var(--el-border-color);
    background: linear-gradient(
      180deg,
      rgba(19, 194, 194, 0.4) 0%,
      rgba(19, 194, 194, 0) 100%
    );
  }
  .content-layout {
    height: calc(100vh - $header-layout);
    :deep(.el-scrollbar__view) {
      height: 100%;
    }
    .el-main {
      position: relative;
      padding: 0;
      background-color: #f0f2f7;
      display: flex;
      .main-body {
        margin: 12px;
        background-color: #fff;
        flex: 1;
        flex-basis: auto;
        overflow: auto;
        box-sizing: border-box;
      }
    }
  }
}
</style>
