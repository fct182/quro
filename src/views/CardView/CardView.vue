<template>
  <div class="card-view">
    <h2>资料卡片</h2>
    <div class="box">
      <Card></Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import Card from "@/components/SimpleComp/Card.vue";
</script>

<style lang="scss" scoped>
.card-view {
  .box {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 700px;
    background: linear-gradient(45deg, #fbda61, #ff5acd);
  }
}
</style>
