<!--
 * 头像hover效果
 * @Date: 2023/08/31 19:53:23
-->
<template>
  <div
    class="quro-avatar-hover"
    :style="{
      '--img-width': imgWidthComp /* 图片img宽度 */,
      '--border-width': imgBorderWidthComp /* 图片边框宽度 */,
      '--inside-color': props.imgInsideColor /* 图片内颜色 */,
      '--border-color': props.imgBorderColor /* 图片外边框颜色 */,
      '--scale-hover': props.imgMagnification /* 图片hover时scale倍数 */,
    }"
  >
    <img class="quro-avatar-img" :src="props.url" :alt="props.alt" />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  imgWidth?: number | string; // 图片img宽度
  imgInsideColor?: string; // 图片边框内颜色
  imgBorderWidth?: number | string; // 图片圆边框宽度
  imgBorderColor?: string; // 图片边框颜色
  imgMagnification?: number; // 图片放大倍率
  url: string; // 图片路径
  alt?: string; // 图片的文本描述信息
}

const props = withDefaults(defineProps<Props>(), {
  imgWidth: "280px",
  imgInsideColor: "#ecd078",
  imgBorderWidth: "5px",
  imgBorderColor: "#ae3ec9",
  imgMagnification: 1.35,
  alt: "头像图片",
});

const imgWidthComp = computed(() => {
  if (typeof props.imgWidth === "string") {
    return props.imgWidth;
  }
  return props.imgWidth + "px";
});
const imgBorderWidthComp = computed(() => {
  if (typeof props.imgBorderWidth === "string") {
    return props.imgBorderWidth;
  }
  return props.imgBorderWidth + "px";
});
</script>

<style lang="scss">
.quro-avatar-hover {
  padding: 0 calc(var(--img-width) / 5) calc(var(--img-width) / 5);
  .quro-avatar-img {
    --magnification: 1; /* 放大倍率 */
    --outline-offset: calc(
      var(--img-width) * (1 / var(--magnification) - 1) / 2 -
        var(--border-width)
    ); /* 轮廓线偏移量 */
    --background-img-option: center/calc(100% / var(--magnification)) 100%
      no-repeat content-box; /* 图片img元素的背景图配置 */

    width: var(--img-width);
    aspect-ratio: 1;
    padding-top: calc(var(--img-width) / 5);
    transform: scale(var(--magnification));
    cursor: pointer;
    transition: 0.5s;
    border-radius: 0 0 999px 999px;
    outline: var(--border-width) solid var(--border-color);
    /* 偏移: (放大后的宽-缩小的宽)/2 即找到中心点，向里偏移outline的宽度 */
    outline-offset: var(--outline-offset);
    /* 背景图，同心圆 */
    background: radial-gradient(
        circle closest-side,
        var(--inside-color) calc(99% - var(--border-width)),
        var(--border-color) calc(100% - var(--border-width)) 99%,
        transparent
      )
      var(--background-img-option);
    /* 裁剪 */
    mask: linear-gradient(#000 0 0) no-repeat 50%
        calc(-1 * var(--outline-offset)) /
        calc(100% / var(--magnification) - 2 * var(--border-width)) 50%,
      radial-gradient(circle closest-side, #000 99%, transparent)
        var(--background-img-option);
    /* 裁剪 */
    -webkit-mask: linear-gradient(#000 0 0) no-repeat 50%
        calc(-1 * var(--outline-offset) + 1px) /
        calc(100% / var(--magnification) - 2 * var(--border-width) - 2px) 50%,
      radial-gradient(circle closest-side, #000 99%, transparent)
        var(--background-img-option);
  }
  .quro-avatar-img:hover {
    --magnification: var(--scale-hover);
  }
}
</style>
