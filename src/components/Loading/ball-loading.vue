<!--
 * 动态方块加载动画
 * @Date: 2023/10/13 15:20:33
-->
<template>
  <div class="quro-ball-loading">
    <div class="ball left-ball"></div>
    <div class="ball right-ball"></div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss">
.quro-ball-loading {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .ball {
    width: 22px;
    height: 22px;
    border-radius: 50%;
  }
  .left-ball {
    background-color: #e94359;
    animation: moveLoading 1.3s linear infinite;
    z-index: 0;
  }
  .right-ball {
    background-color: #74f0ed;
    animation: moveReverseLoading 1.3s linear infinite;
    z-index: 1;
  }
  @keyframes moveLoading {
    0% {
      transform: translateX(0px);
      z-index: 0;
    }
    50% {
      transform: translateX(20px);
    }
    100% {
      transform: translateX(0px);
      z-index: 1;
    }
  }
  @keyframes moveReverseLoading {
    0% {
      transform: translateX(0px);
      z-index: 1;
    }
    50% {
      transform: translateX(-20px);
    }
    100% {
      transform: translateX(0px);
      z-index: 0;
    }
  }
}
</style>
