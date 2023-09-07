<!--
 * 磨砂背景--动态
 * @Date: 2023/08/02 17:43:51
-->
<template>
  <div @click.stop="updateBg" class="quro-dynamic-frosted-background">
    <!-- 背景磨砂块 -->
    <div
      class="quro-background-content"
      :style="{ filter: `blur(${filterBlurComp})` }"
    >
      <!-- 背景多边形 -->
      <div class="quro-container">
        <div
          class="quro-cell-polygon"
          v-for="(item, index) in polygonConfig"
          :key="index"
        >
          <div :style="{ ...item }" class="quro-polygon"></div>
        </div>
      </div>
    </div>
    <!-- 用户自定义内容 -->
    <div class="quro-main-content">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
interface Polygon {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  width: string;
  height: string;
  transform: string; // 位移
  opacity: number | string; // 透明度
  animation: string; // 动画
  background: string; // 背景块颜色
  clipPath: string; // 背景块裁剪配置
  "margin-left": string; // 背景块裁剪配置
  "margin-top": string; // 背景块裁剪配置
}

interface Props {
  blurValue?: number | string; // 背景模糊值
  polygonNums?: number;
  colorList?: string[]; // 配色数组
}

// 多边形块的配置数组
const polygonConfig = ref<Polygon[]>([]);
const props = withDefaults(defineProps<Props>(), {
  blurValue: "150px",
  polygonNums: 9,
  colorList: () => [
    "#37A2DA",
    "#32C5E9",
    "#67E0E3",
    "#9FE6B8",
    "#FFDB5C",
    "#ff9f7f",
    "#fb7293",
    "#E062AE",
    "#E690D1",
    "#e7bcf3",
    "#9d96f5",
    "#8378EA",
    "#96BFFF",
  ],
});

// copy多边形的随机颜色
const randomColor: string[] = JSON.parse(JSON.stringify(props.colorList));

// 高斯模糊度
const filterBlurComp = computed(() => {
  if (typeof props.blurValue === "number") {
    return `${props.blurValue}px`;
  } else {
    return props.blurValue;
  }
});

// 初始化生成多边形块
randomPolygon();

/**
 * 点击更新背景颜色
 * @Date: 2023/08/03 20:36:53
 */
function updateBg() {
  // 置空多边形配置数组
  polygonConfig.value = [];
  // 置空颜色数组
  randomColor.splice(0, randomColor.length);
  randomColor.push(...props.colorList);
  randomPolygon();
}

/**
 * 随机生成多边形块
 * @Date: 2023/08/03 16:42:34
 */
function randomPolygon() {
  for (let index = 0; index < props.polygonNums; index++) {
    const width = randBetween(40, 60, "vmin");
    const height = randBetween(40, 60, "vmin");
    polygonConfig.value.push({
      top: `${randBetween(-30, 40, "%")}`,
      left: `${randBetween(-30, 40, "%")}`,
      width: `${width}`,
      height: `${height}`,
      transform: `translate(${randBetween(-30, 30, "%")}, ${randBetween(
        -30,
        30,
        "%"
      )}) scale(${randBetween(0.8, 2.8)}) skew(${randBetween(0, 45, "deg")})`,
      background: `${pick(randomColor)}`,
      clipPath: `polygon(
      ${randBetween(0, 30, "%")} ${randBetween(0, 50, "%")},
      ${randBetween(30, 60, "%")} ${randBetween(0, 30, "%")},
      ${randBetween(60, 100, "%")} ${randBetween(0, 50, "%")},
      ${randBetween(60, 100, "%")} ${randBetween(50, 100, "%")},
      ${randBetween(30, 60, "%")} ${randBetween(60, 100, "%")},
      ${randBetween(0, 30, "%")} ${randBetween(60, 100, "%")}
    )`,
      opacity: randBetween(0.5, 0.9),
      animation: `colorChange ${randBetween(
        6.1,
        26.1,
        "s"
      )} linear ${randBetween(-2.5, -0.5, "s")} infinite alternate`,
      "margin-left": `calc(${width} / -2) !important`,
      "margin-top": `calc(${height} / -2) !important`,
    });
  }
}

/**
 * 取得[start, end]间的随机数
 * @Date: 2023/08/03 16:14:36
 * @param start  起始数
 * @param end  终点
 * @param unit  单位
 */
function randBetween(start: number, end: number, unit?: string) {
  if (start > end) {
    [start, end] = [end, start];
  }
  let result = Math.random() * (end - start + 1) + start;
  while (result > end) {
    result = Math.random() * (end - start + 1) + start;
  }
  if (unit) {
    return `${result}${unit}`;
  }
  return result;
}

/**
 * 从给定列表中随机选择一个值。
 * @Date: 2023/08/03 16:59:19
 * @param data  列表
 */
function pick(data: string[]) {
  const index = Math.floor(Math.random() * data.length);
  return data.splice(index, 1)[0];
}
</script>

<style lang="scss">
.quro-dynamic-frosted-background {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  @keyframes colorChange {
    100% {
      left: 0;
      top: 0;
      filter: hue-rotate(360deg);
    }
  }
  .quro-background-content {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    .quro-container {
      position: relative;
      width: 100%;
      height: 100%;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      .quro-cell-polygon {
        position: relative;
        .quro-polygon {
          position: absolute;
          transform: translate(-50%, 0);
          opacity: 0.5;
        }
      }
    }
  }
  .quro-main-content {
    position: absolute;
  }
}
</style>
