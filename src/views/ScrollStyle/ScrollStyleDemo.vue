<template>
  <div class="scroll-style-box">
    <h3>自定义滚动条样式--x,y轴滚动</h3>
    <div class="small-box">
      <li v-for="n in 10" :key="n">第{{ n }}个</li>
    </div>
    <h3>垂直滚动</h3>
    <ul>
      <li v-for="n in 40" :key="n">{{ n }}</li>
    </ul>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
/* 滚动条整体部分 */
::-webkit-scrollbar {
  width: 0.6em;
  height: 0.6em;
}
/* 滑块样式 */
::-webkit-scrollbar-thumb {
  background-color: rgba(15, 19, 88, 0.2);
  -webkit-transition: background-color 0.3s;
  transition: background-color 0.3s;
  border-radius: 0.5em;
  border: 0.02em dashed transparent;
  background-clip: padding-box;
}
/* 鼠标移入滑块 */
::-webkit-scrollbar-thumb:hover {
  background: rgba(15, 19, 88, 0.3);
}
/* 垂直滚动条和水平滚动条交界处 */
::-webkit-scrollbar-corner {
  background-color: transparent;
}
.scroll-style-box {
  .small-box {
    background-color: antiquewhite;
    overflow: auto;
    width: 300px;
    height: 300px;
    li {
      width: 400px;
      height: 50px;
    }
  }
  ul {
    background-color: palegreen;
    overflow: auto;
    height: 300px;
  }
}
</style>
