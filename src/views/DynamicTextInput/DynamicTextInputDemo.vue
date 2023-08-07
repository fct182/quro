<template>
  <div class="demo-view">
    <h3>动态文字输入效果-1(使用默认图片)</h3>
    <DynamicTextInput :text="text" color="#ff6b81"></DynamicTextInput>
    <h3>动态文字输入效果-2(使用网络图片)</h3>
    <DynamicTextInput
      :text="text1"
      color="#67E0E3"
      bg-url="https://i.loli.net/2021/09/13/xw78Jb9WpEtcumU.jpg"
    ></DynamicTextInput>
    <h3>动态文字输入效果-3(使用本地图片)</h3>
    <DynamicTextInput
      :text="text2"
      color="#fff"
      :bg-url="bg"
    ></DynamicTextInput>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import bg from "@/assets/bg.jpeg";
import DynamicTextInput from "../../components/DynamicTextInput/DynamicTextInput.vue";

const text = ref("也想问春风, 春风无言语。");
const text1 = ref("青山相待，白云相爱，梦不到紫罗袍共黄金带。");
const text2 = ref("恨人神之道殊兮，怨盛年之莫当。");
</script>

<style scoped></style>
