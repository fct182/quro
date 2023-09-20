<!--
 * 时钟组件
 * @Date: 2023/09/19 17:23:33
-->
<template>
  <div
    class="quro-clock"
    :style="{
      width: widthComp,
      height: heightComp,
      borderRadius: props.card ? cardBorderComp : 0,
    }"
    @dblclick="copyCurrentTime"
    title="双击获取当前时间到粘贴板"
  >
    <div class="quro-clock-cover">
      <img :src="props.bgUrl" class="quro-clock-bg" />
    </div>
    <div class="quro-clock-info hours-animation">
      <p>{{ state.hours }}</p>
      <span>hours</span>
    </div>
    <b>:</b>
    <div class="quro-clock-info minutes-animation">
      <p>{{ state.minutes }}</p>
      <span>minutes</span>
    </div>
    <b>:</b>
    <div class="quro-clock-info seconds-animation">
      <p>{{ state.seconds }}</p>
      <span>seconds</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { copyToClip } from "@/utils/clipboard";
import { computed, onUnmounted, reactive } from "vue";

interface State {
  hours: string;
  minutes: string;
  seconds: string;
  year: string;
  month: string;
  date: string;
  timeStr: string; // 时间字符串 yyyy-mm-dd HH:mm:ss
}

interface Props {
  bgUrl: string; // 背景图片
  width?: string | number; // 时钟宽度
  height?: string | number; // 时钟高度
  card?: boolean; // 是否卡片形式
  cardBorder?: string | number; // 卡片圆角
}

const props = withDefaults(defineProps<Props>(), {
  width: "250px",
  height: "130px",
  card: true,
  cardBorder: "8px",
});
// 时钟宽度的计算属性
const widthComp = computed(() => {
  return typeof props.width === "string" ? props.width : `${props.width}px`;
});
// 时钟高度的计算属性
const heightComp = computed(() => {
  return typeof props.height === "string" ? props.height : `${props.height}px`;
});
// 时钟圆角度数的计算属性
const cardBorderComp = computed(() => {
  return typeof props.cardBorder === "string"
    ? props.cardBorder
    : `${props.cardBorder}px`;
});

const state = reactive<State>({
  hours: "00",
  minutes: "00",
  seconds: "00",
  year: "00",
  month: "00",
  date: "00",
  timeStr: "",
});

const interval = setInterval(getTime, 1000);
getTime();

/**
 * 获取时分秒
 * @Date: 2023/09/19 17:56:41
 */
function getTime() {
  const date = new Date();
  state.hours = String(date.getHours()).padStart(2, "0");
  state.minutes = String(date.getMinutes()).padStart(2, "0");
  state.seconds = String(date.getSeconds()).padStart(2, "0");
  state.year = date.getFullYear().toString();
  state.month = String(date.getMonth() + 1).padStart(2, "0");
  state.date = String(date.getDate()).padStart(2, "0");
  state.timeStr = `${state.year}-${state.month}-${state.date} ${state.hours}:${state.minutes}:${state.seconds}`;
}

onUnmounted(() => {
  clearInterval(interval);
});

/**
 * 复制时间到剪贴板
 * @Date: 2023/09/19 19:10:42
 */
function copyCurrentTime() {
  copyToClip(state.timeStr);
}
</script>

<style lang="scss">
.quro-clock {
  position: relative;
  box-sizing: border-box;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 0 10px;
  user-select: none;
  overflow: hidden;
  background: #ecf5ff;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    height: 100%;
    z-index: 2;
    opacity: 0;
    background: rgba(0, 0, 0, 0.3);
    transition: all 0.3s ease;
  }
  &:hover {
    &::before {
      opacity: 1;
    }
    .quro-clock-cover {
      .quro-clock-bg {
        filter: blur(3px);
      }
    }
  }
  .quro-clock-cover {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    .quro-clock-bg {
      display: block;
      font-size: 0;
      transition: all 0.5s ease;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .quro-clock-info {
    position: relative;
    top: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 60px;
    height: 80px;
    z-index: 2;
    color: #fff;
    p {
      font-size: 40px;
      text-shadow: 0.8px 0 5px #333;
    }
    span {
      font-size: 12px;
    }
  }
  & > b {
    font-size: 32px;
    color: #fff;
    width: 16px;
    height: 70px;
    text-shadow: 0.8px 0 5px #333;
    z-index: 2;
    text-align: center;
  }
  .hours-animation {
    animation: 1s clockanm ease forwards;
  }
  .minutes-animation {
    animation: 1s clockanm 0.4s ease forwards;
  }
  .seconds-animation {
    animation: 1s clockanm 0.8s ease forwards;
  }
  .quro-clock-date {
    position: absolute;
    bottom: 10px;
    z-index: 2;
    color: #fff;
    font-size: 22px;
  }
  @keyframes clockanm {
    0% {
      transform: translateY(-100%);
    }
    100% {
      transform: translateY(0);
    }
  }
}
</style>
