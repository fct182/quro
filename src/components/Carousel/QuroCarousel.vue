<!--
 * 走马灯/轮播图---初试
 * @Author:付常涛
 * @Date: 2023/08/11 17:45:17
-->
<template>
  <div class="quro-carousel quro-carousel--horizontal">
    <div ref="carouselContainer" class="quro-carousel__container">
      <button
        type="button"
        class="quro-carousel__arrow quro-carousel__arrow--left"
      >
        <el-icon><ArrowLeftBold /></el-icon>
      </button>
      <button
        type="button"
        class="quro-carousel__arrow quro-carousel__arrow--right"
      >
        <el-icon><ArrowRightBold /></el-icon>
      </button>
      <div
        class="quro-carousel__item"
        :class="{
          'is-active': n - 1 === currentItemIndex,
          'is-animating': n - 1 === prevItemIndex || n - 1 === currentItemIndex,
        }"
        ref="carouselItem"
        v-for="n in nums"
        :key="n"
        :style="styles[n - 1]"
      >
        <h3>{{ n }}</h3>
      </div>
    </div>
    <!-- <ul class="quro-carousel__indicators quro-carousel__indicators--horizontal">
        <li class="quro-carousel__indicator quro-carousel__indicator--horizontal">
          <button class="quro-carousel__button"></button>
        </li>
        <li class="quro-carousel__indicator quro-carousel__indicator--horizontal">
          <button class="quro-carousel__button"></button>
        </li>
        <li class="quro-carousel__indicator quro-carousel__indicator--horizontal">
          <button class="quro-carousel__button"></button>
        </li>
        <li
          class="quro-carousel__indicator quro-carousel__indicator--horizontal is-active"
        >
          <button class="quro-carousel__button"></button>
        </li>
      </ul> -->
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
const carouselItem = ref<HTMLDivElement[]>([]);
const carouselContainer = ref<HTMLDivElement | null>(null);
const nums = ref(4);
const styles = ref<{ transform: string }[]>([]);
const currentItemIndex = ref(0);
const prevItemIndex = ref(nums.value - 1);

const timeout = ref<number>();

onMounted(() => {
  // console.log(carouselItem.value);
  action();
});

function action() {
  const width = carouselContainer.value?.clientWidth as number;
  styles.value = [];
  for (let i = 0; i < nums.value; i++) {
    if (i < currentItemIndex.value) {
      styles.value.push({
        transform: `translateX(${-nums.value * width}px) scale(1)`,
      });
    } else if (i > currentItemIndex.value) {
      styles.value.push({
        transform: `translateX(${nums.value * width}px) scale(1)`,
      });
    } else {
      styles.value.push({ transform: `translateX(0px) scale(1)` });
    }
  }
  const prevIndex =
    currentItemIndex.value - 1 < 0
      ? nums.value - 1
      : currentItemIndex.value - 1;
  const nextIndex = (currentItemIndex.value + 1) % nums.value;
  prevItemIndex.value = prevIndex;
  styles.value[currentItemIndex.value] = {
    transform: `translateX(0px) scale(1)`,
  };
  styles.value[prevIndex] = { transform: `translateX(${-width}px) scale(1)` };
  styles.value[nextIndex] = { transform: `translateX(${width}px) scale(1)` };

  // 轮播图滚动
  timeout.value = setTimeout(() => {
    currentItemIndex.value = (currentItemIndex.value + 1) % nums.value;
    action();
  }, 3000);
}
</script>

<style lang="scss" scoped>
.quro-carousel--horizontal {
  overflow-x: hidden;
}
.quro-carousel {
  position: relative;
}
.quro-carousel__container {
  text-align: center;
  position: relative;
  height: 300px;
  .quro-carousel__arrow {
    border: none;
    outline: none;
    padding: 0;
    margin: 0;
    height: 36px;
    width: 36px;
    cursor: pointer;
    transition: 0.3s;
    border-radius: 50%;
    background-color: rgba(31, 45, 61, 0.11);
    color: #fff;
    position: absolute;
    top: 50%;
    z-index: 10;
    transform: translateY(-50%);
    text-align: center;
    font-size: 12px;
  }
  .quro-carousel__arrow--left {
    left: 16px;
  }
  .quro-carousel__arrow--right {
    right: 16px;
  }
  .quro-carousel__item {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: inline-block;
    overflow: hidden;
    z-index: 0;
    &:nth-of-type(1) {
      background-color: #37a2da;
    }
    &:nth-of-type(2) {
      background-color: #9fe6b8;
    }
    &:nth-of-type(3) {
      background-color: #fb7293;
    }
    &:nth-of-type(4) {
      background-color: #8378ea;
    }
    &.is-animating {
      transition: transform 0.4s ease-in-out;
    }
    &.is-active {
      z-index: 2;
    }
  }
}
</style>
