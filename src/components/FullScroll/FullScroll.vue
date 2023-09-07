<template>
  <!-- 整页滚动可见视图容器(宽:视口宽, 高:视口高) -->
  <div class="quro-fullpage-visible-view" ref="fullPage">
    <!-- 滚动容器(宽:视口宽, 高:滚动容器中的元素个数 * 视口高) -->
    <div
      ref="scrollConcentRef"
      :class="{ 'quro-disable-transition': isCloseTranstion }"
      class="quro-scroll-concent"
      @mousewheel="mousewheel"
      @touchstart="handleTouchStart"
      @touchend="handleTouchEnd"
      @touchmove.prevent="handleTouchMove"
    >
      <!-- 滚动容器中的元素 -->
      <div
        v-for="(item, index) in props.list"
        :key="index"
        :style="{
          backgroundImage: `url(${item.backgroundImage})`,
          height: windowHeight + 'px',
        }"
        class="quro-scroll-concent-item"
      >
        <slot :item="item"></slot>
      </div>
    </div>
    <!-- 底部指示器 -->
    <div
      class="quro-mobile-bottom-guide"
      :class="{ 'quro-guide-hidden': $index === 0 }"
      v-if="isMobile()"
    >
      <ul class="quro-mobile-guide">
        <li
          class="quro-mobile-guide-item"
          :class="{ 'quro-mobile-guide-item-active': index === $index }"
          v-for="(item, index) in props.list"
          :key="index"
          @click="clickGuide(index)"
        >
          <div
            class="quro-mobile-guide-icon"
            :class="{ 'quro-mobile-guide-icon-active': index === $index }"
          ></div>
          <p>{{ item.guideTitle }}</p>
        </li>
      </ul>
    </div>
    <!-- 右侧指示器 -->
    <ul
      v-else
      class="quro-guide"
      :class="{ 'quro-guide-active': $index !== 0 }"
    >
      <div class="quro-guide-vertical-line"></div>
      <li
        class="quro-guide-item"
        :class="{ 'quro-guide-item-active': index === $index }"
        v-for="(item, index) in props.list"
        :key="index"
        @click="clickGuide(index)"
      >
        <p>{{ item.guideTitle }}</p>
        <div
          class="quro-guide-icon"
          :class="{ 'quro-guide-icon-active': index === $index }"
        ></div>
      </li>
    </ul>
  </div>
</template>
<script lang="ts" setup>
import { useWindowSize } from "@vueuse/core";
import { ref, computed, watchEffect, watch } from "vue";

interface Props {
  list: Item[];
}
interface Item {
  backgroundImage: string; // 背景图片URL
  guideTitle: string; // 右侧引导标题
  otherData?: any; // 其他信息
}
const props = defineProps<Props>();

//控制是否显示transition过渡效果
const isCloseTranstion = ref(false);
//滚动节流控制器
const canRun = ref(true);
// 当前正展示第几个滚动元素
const $index = ref(0); //索引控制第几个显示

// 内层滚动容器的Ref引用
const scrollConcentRef = ref<HTMLDivElement | null>(null);
watchEffect(() => {
  if (scrollConcentRef.value?.style) {
    scrollConcentRef.value.style.top = transformScroll.value;
  }
});

// height 可见视口高度
const { height } = useWindowSize();

const windowHeight = computed(() => {
  console.log("高度改变----computed");
  return height.value;
});

watch(height, () => {
  console.log("高度改变----watch");
  // 视口高度变化时需要关闭动画(高度变化会触发transition过渡效果)
  isCloseTranstion.value = true;
});

// 内部容器position的top值
const transformScroll = computed(() => {
  return `-${$index.value * windowHeight.value}px`;
});

/**
 * 鼠标滚动事件
 * @Date: 2023/09/05 10:38:30
 * @param e 滚动Event对象
 */
function mousewheel(e: WheelEvent) {
  isCloseTranstion.value = false;
  if (canRun.value) {
    canRun.value = false;
    goScroll(e);
    setTimeout(() => {
      canRun.value = true;
    }, 300);
  }
}
/**
 * 滚动外部容器
 * @Date: 2023/09/05 10:59:38
 * @param e 滚动Event对象
 */
function goScroll(e: WheelEvent) {
  //e.deltaY 用来判断上一个下一个
  // (<0 上一个) (>0下一个)
  if (e.deltaY > 0) {
    next();
  } else {
    last();
  }
}

/**
 * 滚动到下一个
 * @Date: 2023/09/05 11:59:00
 */
function next() {
  if ($index.value < props.list.length - 1) {
    $index.value++;
  }
}
/**
 * 滚动到上一个
 * @Date: 2023/09/05 11:59:00
 */
function last() {
  if ($index.value > 1 || $index.value === 1) {
    $index.value--;
  }
}

//#region 移动端---触摸事件
const startY = ref(0); //记录开始位置
const endY = ref(0); //记录结束位置
const moveDistance = ref(0); //滑动距离

/**
 * 触摸开始事件
 * @Date: 2023/09/05 11:00:58
 * @param e 触摸事件对象
 */
function handleTouchStart(e: TouchEvent) {
  startY.value = e.changedTouches[0].pageY || e.touches[0].pageY;
  console.log("触摸开始事件", e.touches[0].pageY, e.changedTouches[0].pageY);
}

/**
 * 触摸抬起
 * @Date: 2023/09/05 11:00:58
 * @param e 触摸事件对象
 */
function handleTouchEnd(e: TouchEvent) {
  console.log("触摸抬起事件", e.changedTouches[0].pageY);
  e.preventDefault();
  // 触摸结束抬起时开启top过渡动画
  isCloseTranstion.value = false;
  // 计算结束距离
  endY.value = e.changedTouches[0].pageY;
  // 计算移动距离，判断应该上一页还是下一页，直接更改index即可在原先基础上整页移动
  moveDistance.value = endY.value - startY.value;
  // 这里我做了一个最小值 大于60才翻页
  if (Math.abs(moveDistance.value) >= 60) {
    // 在[0, length-2] 左闭右闭-可向上滑动(下一张)
    if (
      $index.value >= 0 &&
      $index.value < props.list.length - 1 &&
      moveDistance.value < 0
    ) {
      // 向上滑动(下一张)
      $index.value++;
    }
    // 在(0, length-1] 左开右闭 可向下滑动(上一张)
    if (
      $index.value > 0 &&
      $index.value <= props.list.length - 1 &&
      moveDistance.value > 0
    ) {
      // 向下滑动(上一张)
      $index.value--;
    }
  } else {
    // 当临界值小于60意味着不需要翻页 就恢复原来的位置即可
    scrollConcentRef.value!.style.top = `-${
      $index.value * windowHeight.value
    }px`;
  }
}

/**
 * 触摸移动
 * @Date: 2023/09/05 11:00:58
 * @param e 触摸事件对象
 */
function handleTouchMove(e: TouchEvent) {
  isCloseTranstion.value = true; // 开始移动 关闭top过渡动画
  moveDistance.value =
    (e.changedTouches[0].pageY || e.touches[0].pageY) - startY.value; // 计算移动距离
  //判断临界点
  const isCriticalPoint =
    ($index.value === props.list.length - 1 && moveDistance.value < 0) ||
    ($index.value === 0 && moveDistance.value > 0);
  // 如果是临界点就直接返回
  if (isCriticalPoint) {
    return;
  }
  // 否则直接对内层容器应用 随之移动
  scrollConcentRef.value!.style.top = `-${
    $index.value * windowHeight.value + moveDistance.value * -1
  }px`;
}
//#endregion

/**
 * 点击切换滚动元素
 * @Date: 2023/09/05 11:04:44
 * @param index 点击的滚动元素下标
 */
function clickGuide(index: number) {
  // 点击切换时需要开启动画
  isCloseTranstion.value = false;
  $index.value = index;
}
/**
 * 检验是否为移动设备
 * @Author:付常涛
 * @Date: 2023/09/07 15:19:28
 */
function isMobile() {
  if (/Android|iPhone/i.test(navigator.userAgent)) {
    return true;
  }
  return false;
}
</script>

<style lang="scss">
.quro-fullpage-visible-view {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;

  .quro-scroll-concent {
    position: absolute;
    width: 100%;
    transition: top ease-in-out 0.5s;
    .quro-scroll-concent-item {
      background-size: cover !important;
      background-position: center;
      background-repeat: no-repeat;
    }
  }
  .quro-disable-transition {
    /* 关闭动画 */
    transition: none;
  }
  ul,
  li {
    list-style: none;
  }

  .quro-guide {
    position: fixed;
    z-index: 2;
    top: 50%;
    right: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    transform: translate(240px, -50%) scale(0.8);
    transform-origin: 100% 50%;
    user-select: none;
    opacity: 0;
    transition: all 0.5s ease-out;
    &.quro-guide-active {
      transform: translate(0, -50%) scale(0.8);
      opacity: 1;
    }
    .quro-guide-vertical-line {
      position: absolute;
      top: -40px;
      right: 8px;
      height: calc(100% + 80px);
      width: 2px;
      background: rgba(255, 255, 255, 0.2);
      &::before,
      &::after {
        content: "";
        position: absolute;
        right: -2px;
        width: 6px;
        height: 12px;
        background: url("./img/guide.png") top center no-repeat;
        background-size: cover;
        transform-origin: 50%;
      }
      &::before {
        top: -12px;
      }
      &::after {
        bottom: -12px;
        transform: rotateX(180deg);
      }
    }
    .quro-guide-item {
      position: relative;
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      cursor: pointer;
      &.quro-guide-item-active {
        p {
          background: #fff;
          color: #283849;
        }
      }
      p {
        width: 123px;
        height: 32px;
        color: #fff;
        font-size: 18px;
        line-height: 32px;
        text-align: right;
        padding: 0 12px;
        margin-right: 10px;
      }
      .quro-guide-icon {
        width: 18px;
        height: 18px;
        background: #fff;
        transform: rotate(45deg) scale(0.3);
        transform-origin: 50%;
        transition: all 0.4s ease;
      }
      .quro-guide-icon-active {
        background: rgba(18, 51, 77, 0.4);
        border: #fff 1px solid;
        padding: 4px;
        transform: rotate(45deg) scale(1);
        transition: all 0.4s ease;
        &::before {
          display: block;
          content: "";
          width: 8px;
          height: 8px;
          background: #fff;
        }
      }
    }
  }
  .quro-mobile-bottom-guide {
    position: fixed;
    bottom: 25px;
    left: 0;
    width: 100%;
    height: 45px;
    &::before {
      position: absolute;
      left: 0;
      top: 7px;
      display: block;
      content: "";
      width: 100%;
      height: 1px;
      background: rgba(255, 255, 255, 0.2);
    }
    &.quro-guide-hidden {
      display: none;
    }
    .quro-mobile-guide {
      display: flex;
      justify-content: space-around;
      // align-items: center;
      user-select: none;
      height: 100%;
      .quro-mobile-guide-item {
        &.quro-mobile-guide-item-active {
          p {
            font-weight: bold;
          }
        }
        .quro-mobile-guide-icon {
          margin: 0 auto;
          width: 15px;
          height: 15px;
          background: #fff;
          transform: rotate(45deg) scale(0.3);
          transform-origin: 50%;
          transition: all 0.4s ease;
          &::before {
            display: block;
            content: "";
            width: 7px;
            height: 7px;
            background: #fff;
            opacity: 0;
            transition: opacity 0s 0.4s ease;
          }
          &.quro-mobile-guide-icon-active {
            background: rgba(18, 51, 77, 0.4);
            border: #fff 1px solid;
            padding: 3px;
            transform: rotate(45deg) scale(1);
            transition: all 0.4s ease;
            &::before {
              opacity: 1;
            }
          }
        }
        p {
          height: 20px;
          color: #fff;
          font-size: 1rem;
          line-height: 20px;
          text-align: center;
          margin-top: 10px;
        }
      }
    }
  }
}
</style>
