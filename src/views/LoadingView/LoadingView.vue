<template>
  <div class="loading-view">
    <h2>loading加载状态</h2>
    <h3>1. BallLoading两球交替加载动画</h3>
    <div class="box">
      <BallLoading></BallLoading>
    </div>
    <h3>2. SquareLoading(跳动方块加载)</h3>
    <div class="box">
      <SquareLoading></SquareLoading>
    </div>
    <h3>3. LiquidLoading(液体旋转加载)</h3>
    <div class="box">
      <LiquidLoading></LiquidLoading>
    </div>
  </div>
</template>

<script setup lang="ts">
import BallLoading from "@/components/Loading/ball-loading.vue";
import SquareLoading from "@/components/Loading/square-loading.vue";
import LiquidLoading from "@/components/Loading/liquid-loading.vue";
</script>

<style lang="scss" scoped>
.loading-view {
  h2 {
    margin: 12px 0;
    text-align: center;
  }
  h3 {
    margin: 10px 0;
  }
  .box {
    box-sizing: border-box;
    height: 300px;
    border: 1px solid;
  }
}
</style>
