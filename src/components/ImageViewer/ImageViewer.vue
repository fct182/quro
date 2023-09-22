<template>
  <Transition name="viewer-fade">
    <ImageWrapper
      v-if="props.modelValue"
      @closeImgWrapper="closeHandeler"
      v-bind="props"
    ></ImageWrapper>
  </Transition>
</template>

<script setup lang="ts">
import ImageWrapper from "./ImageWrapper.vue";
// import { Props } from "./types";
interface Props {
  /**
   * 预览图片URL数组
   */
  urlList: string[];
  /**
   * 预览组件的层级
   */
  zIndex?: number;
  /**
   * 预览图片切换触发的回调
   */
  onSwitch?: (val: number) => void;
  /**
   * 点击close图标触发的回调
   */
  onClose?: () => void;
  /**
   * 初始预览图片下标(urlList数组中的下标)
   */
  initialIndex?: number;
  /**
   * 是否是插入body元素中
   */
  appendToBody?: boolean;
  /**
   * 点击遮罩是否关闭预览
   */
  maskClosable?: boolean;
  /**
   * 控制当前预览组件是否展示
   */
  modelValue?: boolean;
  /**
   * 是否上一张、下一张无限循环
   */
  infinite?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  zIndex: 2000,
  initialIndex: 0,
  appendToBody: true,
  maskClosable: true,
  onSwitch: () => {},
  onClose: () => {},
  modelValue: false,
  infinite: true,
});

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
}>();

function closeHandeler() {
  emit("update:modelValue", false);
}
</script>

<style lang="scss">
.viewer-fade-enter-active {
  animation: viewer-fade-in 0.3s;
}

.viewer-fade-leave-active {
  animation: viewer-fade-out 0.3s;
}

@keyframes viewer-fade-in {
  0% {
    transform: translate3d(0, -20px, 0);
    opacity: 0;
  }
  100% {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}

@keyframes viewer-fade-out {
  0% {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
  100% {
    transform: translate3d(0, -20px, 0);
    opacity: 0;
  }
}
</style>
