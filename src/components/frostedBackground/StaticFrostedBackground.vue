<!--
 * 磨砂背景--静态
 * @Date: 2023/08/02 17:43:51
-->
<template>
  <div
    class="static-frosted-background"
    :style="{ '--blurVal': filterBlurComp }"
  >
    <div
      class="static-polygon"
      v-for="(item, index) in props.polygonConfig"
      :key="index"
      :style="{ ...item }"
    ></div>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
interface Polygon {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  width: string;
  height: string;
  transform?: string; // 位移
  background: string; // 背景块颜色
  clipPath: string; // 背景块裁剪配置
}

interface Props {
  blurValue?: number | string; // 背景模糊值
  polygonConfig?: Polygon[];
}

const props = withDefaults(defineProps<Props>(), {
  blurValue: "150px",
  polygonConfig: () => [
    {
      bottom: "100px",
      left: "50%",
      width: "714px",
      height: "450px",
      background: "linear-gradient(#ffee55, #fdee99)",
      clipPath: "polygon(0 10%, 30% 0, 100% 40%, 70% 100%, 20% 90%)",
    },
    {
      bottom: "0px",
      left: "30%",
      width: "1000px",
      height: "450px",
      background: "linear-gradient(-36deg, #e950d1, #f980d9)",
      clipPath: "polygon(10% 0, 100% 70%, 100% 100%, 20% 90%)",
    },
    {
      bottom: "0px",
      left: "70%",
      width: "1000px",
      height: "450px",
      background: "rgba(87, 80, 233)",
      clipPath: "polygon(80% 0, 100% 70%, 100% 100%, 20% 90%)",
    },
  ],
});

// 高斯模糊度
const filterBlurComp = computed(() => {
  if (typeof props.blurValue === "number") {
    return `${props.blurValue}px`;
  } else {
    return props.blurValue;
  }
});
</script>

<style lang="scss" scoped>
.static-frosted-background {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;

  & > .static-polygon {
    position: absolute;
    opacity: 0.5;
    transform: translate(-50%, 0);
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    backdrop-filter: blur(var(--blurVal));
    z-index: 1;
  }
  .content {
    position: absolute;
    z-index: 1;
  }
}
</style>
