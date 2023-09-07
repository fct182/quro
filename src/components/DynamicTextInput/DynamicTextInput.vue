<!--
 * 动态文字输入效果
 * @Date: 2023/08/07 17:58:37
-->
<template>
  <div
    class="quro-dynamic-text-input"
    :style="{
      'background-image': props.bgUrl ? `url(${props.bgUrl})` : '',
      '--content-height': `${props.height}px`,
    }"
  >
    <div
      class="quro-dynamic-text"
      :style="{
        '--text-color': props.color,
        '--text-width': textWidth,
        '--text-step': props.text.length,
        '--text-duration': `${props.duration}s`,
      }"
    >
      {{ props.text }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Prop {
  text: string; // 展示文字
  color?: string; // 文字颜色
  bgUrl?: string; // 背景图片
  duration?: number; // 加载时长
  height?: number; // 加载时长
}
const props = withDefaults(defineProps<Prop>(), {
  color: "#000",
  duration: 6,
  height: 240,
});

const textWidth = computed(() => {
  return `${props.text.length * 2}ch`;
});
</script>

<style lang="scss">
.quro-dynamic-text-input {
  display: flex;
  justify-content: center;
  align-items: center;
  height: var(--content-height);
  background-image: url("@/assets/default-dynamic-text-input-bg.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  .quro-dynamic-text {
    color: var(--text-color);
    font: 200% monospace;
    border-right: 0.1em solid;
    width: var(--text-width);
    white-space: nowrap;
    overflow: hidden;
    animation: typing var(--text-duration) steps(var(--text-step), end),
      cursor-blink 0.4s step-end infinite alternate;

    @keyframes typing {
      from {
        width: 0;
      }
    }

    @keyframes cursor-blink {
      50% {
        border-color: transparent;
      }
    }
  }
}
</style>
