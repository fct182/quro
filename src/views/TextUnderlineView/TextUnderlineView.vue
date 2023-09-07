<template>
  <div class="text-underline-view">
    <div class="row">
      <h3>默认效果</h3>
      <TextUnderline :text="state.demo1.text"></TextUnderline>
    </div>
    <div class="row">
      <h3>更改下划线颜色</h3>
      <TextUnderline
        :text="state.demo2.text"
        :linear-gradient-color="'#ec695c, #61c454'"
      ></TextUnderline>
    </div>
    <div class="row">
      <h3>更改下划线高度</h3>
      <TextUnderline v-bind="state.demo3"></TextUnderline>
    </div>
    <div class="row">
      <h3>使用默认插槽</h3>
      <TextUnderline v-bind="state.demo4">
        <template v-slot="{ text }">
          <div class="more-hidden">
            <el-icon style="margin-right: 6px"><ChatDotRound /></el-icon>
            <span>{{ text }}</span>
          </div>
        </template>
      </TextUnderline>
    </div>
  </div>
</template>

<script setup lang="ts">
import TextUnderline from "@/components/TextUnderline/TextUnderline.vue";
import { reactive } from "vue";

const state = reactive({
  demo1: { text: "何须浅碧深红色，自是花中第一流。" },
  demo2: {
    text: "渔舟唱晚，响穷彭蠡之滨；雁阵惊寒，声断衡阳之浦。—— 滕王阁序",
    linearGradientColor: "#ec695c, #61c454",
  },
  demo3: {
    text: "青山相待，白云相爱，梦不到紫罗袍共黄金带。",
    linearGradientColor: [
      "#409EFF",
      "#67C23A",
      "#E6A23C",
      "#F56C6C",
      "#909399",
    ],
    underlineHeight: 5,
  },
  demo4: {
    text: "我有一剑，可搬山、倒海、开山！",
    linearGradientColor: ["#F56C6C", "#67C23A", "#409EFF"],
    underlineHeight: "3px",
  },
});
</script>

<style lang="scss" scoped>
.text-underline-view {
  width: 100%;
  height: 100%;
  padding: 16px;
  box-sizing: border-box;
  .row {
    margin-bottom: 12px;
    background-color: rgb(225, 243, 216);
    padding: 10px;
    h3 {
      margin-bottom: 12px;
    }
  }
  .more-hidden {
    width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
