<template>
  <div
    class="quro-text-underline-hover"
    :style="{
      '--linear-gradient-color': linearGradientColorComp,
      '--underline-height': underlineHeight,
    }"
  >
    <div class="quro-underline-content">
      <slot :text="props.text">{{ props.text }}</slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
interface Props {
  text: string;
  linearGradientColor?: string[] | string; // 线性渐变颜色组
  underlineHeight?: number | string;
}

const props = withDefaults(defineProps<Props>(), {
  linearGradientColor: "#222635, #222635",
  underlineHeight: "2px",
});

const linearGradientColorComp = computed(() => {
  if (Array.isArray(props.linearGradientColor)) {
    return props.linearGradientColor.join();
  }
  return props.linearGradientColor;
});

const underlineHeight = computed(() => {
  if (typeof props.underlineHeight === "number") {
    return props.underlineHeight + "px";
  }
  return props.underlineHeight;
});
</script>

<style lang="scss">
.quro-text-underline-hover {
  color: #303133;
  .quro-underline-content {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(to right, var(--linear-gradient-color))
      no-repeat right bottom;
    background-size: 0 var(--underline-height);
    transition: background-size 1300ms;
    padding-bottom: 5px;
    &:hover {
      background-position-x: left;
      background-size: 100% var(--underline-height);
    }
  }
}
</style>
