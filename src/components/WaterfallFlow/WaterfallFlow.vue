<!--
 * 瀑布流---flex盒子
 * @Author:付常涛
 * @Date: 2023/08/11 17:45:02
-->
<template>
  <div
    class="waterfall-flow"
    ref="waterfallFlowRef"
    :style="{ '--vertical-spacing': `${props.verticalSpacing}px` }"
  >
    <div
      class="waterfall-flow-content"
      @scroll="scrollHandler"
      ref="waterfallFlowContentRef"
    >
      <div class="row-content">
        <div
          :style="{ width: `${props.colWidth}px` }"
          v-for="(item, index) in state.waterfallFlowList"
          :key="index"
          class="column-content"
        >
          <div v-for="(img, imgIndex) in item" :key="imgIndex" class="img-item">
            <img :src="img.src" :alt="img.title" loading="lazy" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import axios from "axios";

const reachBottomDistance = 50; // 判断触底的变量

interface Props {
  list: ImgItem[]; // 瀑布流数组
  colWidth?: number; // 每列宽
  cols?: number; // 列数
  verticalSpacing?: number; // 垂直间距
}
interface ImgItem {
  src: string; // 图片路径
  label?: string; // 底部描述文字
  title?: string; // 头部标题文字
}
const props = withDefaults(defineProps<Props>(), {
  colWidth: 260,
  cols: 3,
  verticalSpacing: 16,
});
// 瀑布流容器的Ref引用
const waterfallFlowRef = ref<HTMLDivElement | null>(null);
// 滚动容器
const waterfallFlowContentRef = ref<HTMLDivElement | null>(null);

interface State {
  waterfallFlowList: ImgItem[][];
  currentCols: number;
  isLoading: boolean;
}
// 瀑布流State状态
const state = reactive<State>({
  waterfallFlowList: [],
  currentCols: 3,
  isLoading: false,
});

onMounted(() => {
  const waterfallFlowWidth = waterfallFlowRef.value?.offsetWidth;
  let cols = props.cols;
  if (waterfallFlowWidth) {
    while (cols * props.colWidth >= waterfallFlowWidth) {
      cols--;
    }
  }
  console.log("cols---", cols);
  state.currentCols = cols;
  // 获取瀑布流数据
  state.waterfallFlowList = dealImgList();
});

/**
 * 处理原始数据
 * @Date: 2023/08/28 16:14:49
 */
function dealImgList() {
  console.log("props.list", props.list);
  const res: ImgItem[][] = [];
  for (let index = 0; index < props.list.length; index++) {
    let item = res[index % state.currentCols];
    if (item) {
      item.push(props.list[index]);
    } else {
      res[index % state.currentCols] = [props.list[index]];
    }
  }
  console.log("res", res);

  return res;
}

/**
 * 滚动事件
 * @Author:付常涛
 * @Date: 2023/08/28 17:52:36
 */
function scrollHandler(e: any) {
  const { scrollTop, clientHeight, scrollHeight } = e.target;
  console.log(scrollTop, clientHeight, scrollHeight);
  if (
    scrollTop + clientHeight >= scrollHeight - reachBottomDistance &&
    !state.isLoading
  ) {
    state.isLoading = true;
    console.log("加载新图片");
    loadData();
  }
}
async function loadData() {
  // const res = await axios.get("https://api.adicw.cn/index/elses/imgs");
  const res = await new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          src: "https://cn.bing.com/th?id=OHR.TunisiaAmphitheatre_ZH-CN4431856872_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp",
        },
        { src: "https://api.adicw.cn/images/StudyImg/62cfbba60fbb8.png" },
      ]);
    }, 1200);
  });
  state.isLoading = false;
  console.log(res);
}
</script>

<style lang="scss" scoped>
.waterfall-flow {
  width: 100%;
  height: 100%;
  .waterfall-flow-content {
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
    .row-content {
      display: flex;
      justify-content: space-around;
      .column-content {
        display: flex;
        flex-direction: column;
        .img-item {
          width: 100%;
          & + .img-item {
            margin-top: var(--vertical-spacing);
          }
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
      }
    }
  }
}
</style>
