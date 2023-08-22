<!--
 * 瀑布流初尝试
 * @Author:付常涛
 * @Date: 2023/08/16 17:20:38
-->
<template>
  <div class="waterfall-flow" ref="waterfallFlowRef">
    <div
      class="waterfall-flow-container"
      :style="{
        '--vertical-gap': `${props.verticalGap}px`,
        '--desc-rows': props.descRows,
      }"
    >
      <template v-if="state.imgLoadFlag">
        <div
          class="waterfall-flow-item"
          ref="waterfallFlowItemRef"
          v-for="(item, index) in state.imagesList"
          :style="{
            width: `${props.itemWidth}px`,
            top: `${item.top}px`,
            left: `${item.left}px`,
          }"
          :key="index"
        >
          <!-- 顶部标题文字 -->
          <slot name="header" :data="item">
            <div class="top-content">{{ item.title }}</div>
          </slot>

          <div class="img-content">
            <img
              :style="{
                width: `${props.itemWidth}px`,
                height: `${item.height}px`,
              }"
              :src="item.src"
            />
          </div>
          <slot name="bottom" :data="item">
            <!-- 底部描述文字(默认两行溢出省略...) -->
            <div class="bottom-content">
              {{ item.label }}
            </div>
          </slot>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, reactive, ref } from "vue";
import { deepCopy } from "@/utils/utils";

interface Props {
  maxCols?: number; // 最大列数
  verticalGap?: number; // 瀑布流块的上下间距
  list: ImgItem[]; // 图片数组
  onlyImg?: boolean; // 仅为图片瀑布流
  itemWidth?: number; // 图片块的宽度(指定宽度则自动计算列数)
  descRows?: number; // 图片块底部描述文字限制行数
}
interface ImgItem {
  src: string; // 图片路径
  label?: string; // 底部描述文字
  title?: string; // 头部标题文字
}

interface ImageItem extends ImgItem {
  height: number; // 图片高度
  left: number; // 左偏移
  top: number; // 顶部偏移
  loadError?: boolean; // 是否加载失败
}

const props = withDefaults(defineProps<Props>(), {
  maxCols: 5,
  verticalGap: 16, // 上下间距
  onlyImg: false,
  itemWidth: 240, // 图片块宽度
  descRows: 2, // 图片块底部描述文字限制行数
});
// 瀑布流容器Ref引用
const waterfallFlowRef = ref<HTMLDivElement | null>(null);
// 图片块Ref
const waterfallFlowItemRef = ref<HTMLDivElement[] | null>(null);

const state: {
  imagesList: ImageItem[];
  colsHeight: number[];
  imgGap: number;
  cols: number;
  imgLoadFlag: boolean;
} = reactive({
  imagesList: [],
  colsHeight: [],
  imgGap: 0,
  cols: 0,
  imgLoadFlag: false, // 图片预加载完成
});

// 深度复制list
state.imagesList = deepCopy(props.list as ImageItem[]);

onMounted(() => {
  init();
  countLayout();
});
/**
 * 初始化瀑布流布局
 * @Date: 2023/08/17 11:16:28
 */
function init() {
  const containerWidth = waterfallFlowRef.value!.offsetWidth;
  // 计算一行几列
  const cols = Math.floor(containerWidth / props.itemWidth);
  state.cols = cols;
  // 填充每列的高度数组
  state.colsHeight = new Array(cols).fill(0);
  // 计算每列的间距
  state.imgGap = (containerWidth - cols * props.itemWidth) / (cols - 1);
}

/**
 * 计算瀑布流布局
 * @Date: 2023/08/17 16:12:53
 */
function countLayout() {
  const promiseList: Promise<any>[] = [];
  for (let index = 0; index < props.list.length; index++) {
    const element = props.list[index];
    const img = new Image();
    img.src = element.src;
    promiseList.push(
      new Promise((reslove) => {
        img.onload = img.onerror = (e: Event | string) => {
          if (typeof e !== "string") {
            // 加载成功
            if (e.type === "load") {
              state.imagesList[index].height = Math.round(
                props.itemWidth * (img.height / img.width)
              );
              reslove({ src: element.src, status: "success" });
            }
            // 加载失败
            if (e.type === "error") {
              state.imagesList[index].height = props.itemWidth;
              state.imagesList[index].loadError = true;
              reslove({ src: element.src, status: "fail" });
            }
          }
        };
      })
    );
  }
  Promise.all(promiseList).then((values) => {
    console.log("图片加载", values);
    state.imgLoadFlag = true;
    nextTick(() => {
      state.imagesList.forEach((iterator, index) => {
        const minIndex = finMinHeightIndex();

        iterator.top = state.colsHeight[minIndex];
        iterator.left = minIndex * (props.itemWidth + state.imgGap);

        // 瀑布流-图片块总高度(顶部文字、图片、底部文字)
        const allHeight = waterfallFlowItemRef.value![index].offsetHeight;

        // 更改列高度
        state.colsHeight[minIndex] += allHeight + props.verticalGap;
      });
    });
  });
}

/**
 * 找到数组项最小的下标
 * @Date: 2023/08/17 17:36:53
 */
function finMinHeightIndex() {
  return state.colsHeight.indexOf(Math.min.apply(null, state.colsHeight));
}
</script>

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
.waterfall-flow {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  position: relative;
  .waterfall-flow-container {
    position: relative;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    overflow-x: hidden;
    overflow-y: auto;
    .waterfall-flow-item {
      font-family: "PingFang SC", "Microsoft Yahei", "Segoe UI", Roboto,
        "Helvetica Neue", Arial, sans-serif;
      position: absolute;
      overflow: hidden;
      box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
        rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
      border-radius: 6px;
      padding: 8px 0;
      background-color: #fff;
      .top-content {
        padding: 0px 6px 6px;
        text-align: center;
        font-weight: 600;
        overflow: hidden; /* 超出隐藏 */
        white-space: nowrap; /* 文本不换行 */
        text-overflow: ellipsis; /* 文本超出呈现方式：省略号 */
      }
      .img-content {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .bottom-content {
        font-size: small;
        padding: 6px 6px 0;
        overflow: hidden; /* 超出隐藏 */
        text-overflow: ellipsis; /* 文本超出呈现方式：省略号 */
        display: -webkit-box; /* 盒模型 */
        -webkit-line-clamp: var(--desc-rows); /* 限制文本行数 */
        -webkit-box-orient: vertical; /* 盒内子元素布局方向 */
      }
    }
  }
}
</style>
