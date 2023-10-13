<!--
 * 液体加载动画
 * @Date: 2023/10/13 15:20:33
-->
<template>
  <div class="quro-liquid-loading">
    <div class="quro-liquid-loading-content">
      <span style="--i: 1"></span>
      <span style="--i: 2"></span>
      <span style="--i: 3"></span>
      <span style="--i: 4"></span>
      <span style="--i: 5"></span>
      <span style="--i: 6"></span>
      <span style="--i: 7"></span>
    </div>

    <svg>
      <!-- filter元素id属性为一个滤镜的唯一名称，
            feGaussianBlur 定义模糊效果，
            in="SourceGraphic"这个部分定义了由整个图像创建效果，
            stdDeviation属性定义模糊量
        -->
      <filter id="gooey">
        <feGaussianBlur in="SourceGraphic" stdDeviation="5" />
        <!-- feColorMatrix 用于彩色滤光片转换 -->
        <feColorMatrix
          values="
            1 0 0 0 0 
            0 1 0 0 0
            0 0 1 0 0 
            0 0 0 20 -10
            "
        />
      </filter>
    </svg>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.quro-liquid-loading {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  .quro-liquid-loading-content {
    width: 100px;
    height: 100px;
    position: relative;
    filter: url(#gooey);
    span {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: block;
      animation: liquid-loading 4s ease-in-out infinite;
      /* var函数用来插入css变量的值，css变量名称以--开头 */
      animation-delay: calc(0.2s * var(--i));
      &::before {
        content: "";
        position: absolute;
        top: 0;
        left: calc(50% - 10px);
        width: 20px;
        height: 20px;
        background: linear-gradient(#fce4ec, #03a9f4);
        border-radius: 50%;
        box-shadow: 0 0 15px #03a9f4;
      }
    }
  }
  svg {
    width: 0;
    height: 0;
  }
  @keyframes liquid-loading {
    0% {
      transform: rotate(0deg);
    }

    50%,
    100% {
      transform: rotate(360deg);
    }
  }
}
</style>
