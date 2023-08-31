<template>
  <div class="waterfall-flow-view">
    <WaterfallFlow v-if="list.length" :list="list" :cols="5"></WaterfallFlow>
  </div>
</template>

<script setup lang="ts">
import WaterfallFlow from "@/components/WaterfallFlow/WaterfallFlow.vue";
import axios from "axios";
import { ref } from "vue";

const list = ref<{ src: string }[]>([]);
loadData();
async function loadData() {
  const res = await axios.get("https://api.adicw.cn/index/elses/imgs");
  for (const iterator of res.data) {
    list.value.push({
      src: `https://api.adicw.cn/images/${iterator.path}`,
    });
  }
  console.log(res.data);
}
</script>

<style lang="scss" scoped>
.waterfall-flow-view {
  width: 100%;
  height: 100%;
  padding: 16px;
  box-sizing: border-box;
  background-color: rgb(225, 243, 216);
}
</style>
