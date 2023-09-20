<template>
  <div class="clock-view">
    <h2>简易时钟组件:</h2>
    <SimpleClock
      bg-url="https://api.adicw.cn/uploads/StudyImg/20191025115953.jpg"
    ></SimpleClock>
    <h2>简易时钟组件----2(自定义属性):</h2>
    <SimpleClock
      width="300px"
      height="240px"
      bg-url="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
      card-border="16px"
    ></SimpleClock>
  </div>
</template>

<script setup lang="ts">
import SimpleClock from "@/components/SimpleComp/SimpleClock.vue";
</script>

<style lang="scss" scoped>
.clock-view {
  padding: 12px;
  h2 {
    margin: 20px 0;
  }
}
</style>
