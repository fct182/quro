<!--
 * 首页--欢迎页
 * @Date: 2023/08/02 17:12:23
-->
<template>
  <div class="home-welcome">
    <h3>首页</h3>
    <p>本项目介绍:</p>
    <span>Quro 收集有趣的组件。</span>
    <div class="box">
      <quro-carousel></quro-carousel>
    </div>
  </div>
</template>

<script setup lang="ts">
import QuroCarousel from "@/components/Carousel/QuroCarousel.vue";
</script>

<style lang="scss" scoped>
.home-welcome {
  padding: 10px;
  h3 {
    width: 70px;
    margin: 10px auto;
    text-align: center;
  }
  span {
    color: #4e596a;
    font-size: 13px;
  }
  .box {
    width: 1100px;
    margin: 10px auto;
  }
}
</style>
