<!--
 * 两球交替加载动画
 * @Date: 2023/10/13 15:20:33
-->
<template>
  <div class="quro-square-loading-content">
    <div class="quro-square-loading"></div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss">
.quro-square-loading-content {
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  display: flex;
  .quro-square-loading {
    position: relative;
    width: 0;
    height: 0;
    margin: 0 auto;
    perspective: 200px;
    &::before,
    &::after {
      position: absolute;
      width: 20px;
      height: 20px;
      content: "";
      background: rgba(0, 0, 0, 0);
      animation: square-loading 0.5s infinite alternate;
    }
    &::before {
      left: 0;
    }
    &::after {
      right: 0;
      animation-delay: 0.15s;
    }
  }
  @keyframes square-loading {
    0% {
      box-shadow: 0 0 0 rgba(0, 0, 0, 0);
      transform: scale(1) translateY(0) rotateX(0deg);
    }
    100% {
      background: #1890ff;
      box-shadow: 0 25px 40px rgba(24, 144, 255, 0.5);
      transform: scale(1.2) translateY(-25px) rotateX(45deg);
    }
  }
}
</style>
