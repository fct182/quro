<!--
 * 图片预览组件--(测试版)
 * @Date: 2023/09/22 17:13:58
-->
<template>
  <Transition appear name="viewer-fade">
    <div
      tabindex="-1"
      ref="wrapperRef"
      class="quro-image-viewer__wrapper"
      :style="{ 'z-index': viewerZIndex }"
    >
      <!-- 遮罩 -->
      <div class="quro-image-viewer__mask" @click.self="handleMaskClick"></div>
      <!-- 关闭按钮 -->
      <span
        class="quro-image-viewer__btn quro-image-viewer__close"
        @click="hide"
      >
        <el-icon><CloseBold /></el-icon>
      </span>
      <template v-if="!isSingle">
        <!-- 上一张图片 -->
        <span
          class="quro-image-viewer__btn quro-image-viewer__prev"
          :class="{ 'is-disabled': !props.infinite && isFirst }"
          @click="prev"
        >
          <el-icon><ArrowLeftBold /></el-icon>
        </span>
        <!-- 下一张图片 -->
        <span
          class="quro-image-viewer__btn quro-image-viewer__next"
          :class="{ 'is-disabled': !props.infinite && isLast }"
          @click="next"
        >
          <el-icon><ArrowRightBold /></el-icon>
        </span>
      </template>
      <!-- (ACTIONS)图片缩放、mode状态、旋转操作 -->
      <div class="quro-image-viewer__btn quro-image-viewer__actions">
        <div class="quro-image-viewer__actions__inner">
          <el-icon @click="handleActions('zoomOut')"><ZoomOut /></el-icon>
          <el-icon @click="handleActions('zoomIn')"><ZoomIn /></el-icon>
          <el-icon @click="toggleMode">
            <component :is="imgState.mode"></component>
          </el-icon>
          <el-icon @click="handleActions('anticlocelise')">
            <RefreshLeft />
          </el-icon>
          <el-icon @click="handleActions('clocelise')">
            <RefreshRight />
          </el-icon>
        </div>
      </div>
      <!-- CANVAS -->
      <div class="quro-image-viewer__canvas">
        <template v-for="(url, i) in props.urlList">
          <img
            v-if="i === imgState.index"
            ref="imgRef"
            class="quro-image-viewer__img"
            :key="url"
            :src="currentImg"
            :style="imgStyle"
            @load="handleImgLoad"
            @error="handleImgError"
            @mousedown="handleMouseDown"
          />
        </template>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import {
  computed,
  onMounted,
  reactive,
  getCurrentInstance,
  ref,
  onUnmounted,
  watch,
  nextTick,
  watchEffect,
} from "vue";

import { rafThrottle, isFirefox, off, on } from "@/utils/utils";
import { ModeEnum, ImgState } from "./types";
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

/* body的overflow属性 */
let prevOverflow = "";
/* 鼠标滚轮事件名 */
const mousewheelEventName = isFirefox() ? "DOMMouseScroll" : "mousewheel";

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
}>();

const props = withDefaults(defineProps<Props>(), {
  zIndex: 2000,
  initialIndex: 0,
  appendToBody: true,
  maskClosable: true,
  onSwitch: () => {},
  onClose: () => {},
  infinite: true,
});

// 预览图片的键盘按键、鼠标滚轮事件
const state = reactive<{
  _keyDownHandler: null | ((e: KeyboardEvent) => void);
  _mouseWheelHandler: null | ((e: WheelEvent) => void);
  _dragHandler: null | ((e: WheelEvent) => void);
}>({
  _keyDownHandler: null,
  _mouseWheelHandler: null,
  _dragHandler: null,
});

// 预览图片的状态
const imgState: ImgState = reactive({
  index: props.initialIndex,
  loading: false,
  mode: ModeEnum.CONTAIN,
  transform: {
    scale: 1,
    deg: 0,
    offsetX: 0,
    offsetY: 0,
    enableTransition: false,
  },
});

/* 预览图片容器Ref */
const wrapperRef = ref<HTMLDivElement | null>(null);
/* 图片Ref */
const imgRef = ref<HTMLImageElement[] | null>(null);

/* 计算属性 */
const viewerZIndex = computed(() => {
  return props.zIndex;
});

/**
 * 是否为单一图片预览
 * @Date: 2023/09/22 14:20:17
 */
const isSingle = computed(() => {
  return props.urlList.length <= 1;
});
/**
 * 当前预览图片是否为第一张
 * @Date: 2023/09/22 14:20:30
 */
const isFirst = computed(() => {
  return imgState.index === 0;
});
/**
 * 当前预览图片是否为最后第一张
 * @Date: 2023/09/22 14:20:30
 */
const isLast = computed(() => {
  return imgState.index === props.urlList.length - 1;
});
/**
 * 当前预览图片的URL
 * @Date: 2023/09/22 14:21:02
 */
const currentImg = computed(() => {
  return props.urlList[imgState.index];
});
/**
 * 当前预览图片的样式
 * @Date: 2023/09/22 14:21:24
 */
const imgStyle = computed(() => {
  const { scale, deg, offsetX, offsetY, enableTransition } = imgState.transform;
  const style = {
    transform: `scale(${scale}) rotate(${deg}deg)`,
    transition: enableTransition ? "transform .3s" : "",
    "margin-left": `${offsetX}px`,
    "margin-top": `${offsetY}px`,
    maxWidth: "",
    maxHeight: "",
  };
  if (imgState.mode === ModeEnum.CONTAIN) {
    style.maxWidth = style.maxHeight = "100%";
  }
  return style;
});

watchEffect(() => {
  imgState.index = props.initialIndex;
});

watch(
  () => imgState.index,
  (val) => {
    reset();
    props.onSwitch(val);
  }
);

watch(
  () => currentImg.value,
  () => {
    nextTick(() => {
      const $img = imgRef.value![0];
      if (!$img.complete) {
        imgState.loading = true;
      }
    });
  }
);

onMounted(() => {
  // prevent body scroll 禁止body滚动
  prevOverflow = document.body.style.overflow;
  document.body.style.overflow = "hidden";
  deviceSupportInstall();
  let instance = getCurrentInstance();

  if (props.appendToBody) {
    document.body.appendChild(instance!.vnode.el as Node);
  }
  // 添加tabindex，然后wrapper容器可以通过Javascript聚焦
  // 聚焦wrapper容器，使箭头键不能引起下面的内部滚动行为
  wrapperRef.value?.focus();
});

onUnmounted(() => {
  let instance = getCurrentInstance();
  const el = instance?.vnode.el as Node;
  const parentEl = document.body;

  // 如果appendToBody属性为true,则需要移除该元素在组件卸载时
  if (props.appendToBody && el && parentEl && parentEl.contains(el)) {
    parentEl.removeChild(el);
  }
});

/**
 * 图片load加载
 * @Date: 2023/09/21 20:09:13
 */
function handleImgLoad() {
  imgState.loading = false;
}

/**
 * 图片加载失败
 * @Date: 2023/09/21 20:13:56
 * @param e event
 */
function handleImgError(e: Event) {
  imgState.loading = false;
  (e.target as HTMLImageElement).alt = "加载失败";
}

/**
 * 鼠标移动图片
 * @Date: 2023/09/21 20:16:08
 * @param e event
 */
function handleMouseDown(e: MouseEvent) {
  if (imgState.loading || e.button !== 0) return;

  const { offsetX, offsetY } = imgState.transform;
  const startX = e.pageX;
  const startY = e.pageY;
  state._dragHandler = rafThrottle((ev: MouseEvent) => {
    imgState.transform.offsetX = offsetX + ev.pageX - startX;
    imgState.transform.offsetY = offsetY + ev.pageY - startY;
  });
  on(document, "mousemove", state._dragHandler);
  on(document, "mouseup", () => {
    off(document, "mousemove", state._dragHandler!);
  });

  e.preventDefault();
}

/**
 * 点击遮罩的方法
 * @Date: 2023/09/21 15:44:59
 */
function handleMaskClick() {
  if (props.maskClosable) {
    hide();
  }
}

/**
 * 预览图片的鼠标滚轮、按键事件注册
 * @Date: 2023/09/21 16:00:36
 */
function deviceSupportInstall() {
  state._keyDownHandler = (e) => {
    e.stopPropagation();
    const keyCode = e.keyCode;
    switch (keyCode) {
      // ESC
      case 27:
        hide();
        break;
      // SPACE
      case 32:
        toggleMode();
        break;
      // LEFT_ARROW
      case 37:
        prev();
        break;
      // UP_ARROW
      case 38:
        handleActions("zoomIn");
        break;
      // RIGHT_ARROW
      case 39:
        next();
        break;
      // DOWN_ARROW
      case 40:
        handleActions("zoomOut");
        break;
    }
  };
  state._mouseWheelHandler = rafThrottle((e: WheelEvent) => {
    const delta = e.deltaY ? e.deltaY : -e.detail;
    if (delta < 0) {
      handleActions("zoomIn", {
        zoomRate: 0.015,
        enableTransition: false,
      });
    } else {
      handleActions("zoomOut", {
        zoomRate: 0.015,
        enableTransition: false,
      });
    }
  });
  on(document, "keydown", state._keyDownHandler);
  on(document, mousewheelEventName, state._mouseWheelHandler!);
}

/**
 * 注销键盘按键、鼠标滚轮事件
 * @Date: 2023/09/21 16:29:57
 */
function deviceSupportUninstall() {
  off(document, "keydown", state._keyDownHandler!);
  off(document, mousewheelEventName, state._mouseWheelHandler!);
  state._keyDownHandler = null;
  state._mouseWheelHandler = null;
}

/**
 * 查看上一张图片
 * @Date: 2023/09/21 16:52:21
 */
function prev() {
  if (isFirst.value && !props.infinite) return;
  const len = props.urlList.length;
  imgState.index = (imgState.index - 1 + len) % len;
}
/**
 * 下一张图片
 * @Date: 2023/09/21 17:11:44
 */
function next() {
  if (isLast.value && !props.infinite) return;
  const len = props.urlList.length;
  imgState.index = (imgState.index + 1) % len;
}
/**
 * 关闭图片预览组件
 * @Date: 2023/09/21 15:45:40
 */
function hide() {
  deviceSupportUninstall();
  // 恢复document的overflow样式
  document.body.style.overflow = prevOverflow;
  emit("update:modelValue", false);
  props.onClose();
}
/**
 * 切换预览图片的模式
 * @Date: 2023/09/21 16:33:15
 */
function toggleMode() {
  if (imgState.loading) return;

  if (imgState.mode === ModeEnum.CONTAIN) {
    imgState.mode = ModeEnum.ORIGINAL;
  } else {
    imgState.mode = ModeEnum.CONTAIN;
  }

  reset();
}
/**
 * 预览图片工具操作栏
 * @Date: 2023/09/21 17:03:05
 * @param action 动作类型
 * @param options 配置对象
 */
function handleActions(
  action: string,
  options: {
    enableTransition?: boolean;
    rotateDeg?: number;
    zoomRate?: number;
  } = {}
) {
  if (imgState.loading) return;
  const { zoomRate, rotateDeg, enableTransition } = {
    zoomRate: 0.2,
    rotateDeg: 90,
    enableTransition: true,
    ...options,
  };
  const transform = imgState.transform;
  switch (action) {
    case "zoomOut":
      if (transform.scale > 0.2) {
        transform.scale = parseFloat((transform.scale - zoomRate).toFixed(3));
      }
      break;
    case "zoomIn":
      transform.scale = parseFloat((transform.scale + zoomRate).toFixed(3));
      break;
    case "clocelise":
      transform.deg += rotateDeg;
      break;
    case "anticlocelise":
      transform.deg -= rotateDeg;
      break;
  }
  transform.enableTransition = enableTransition;
}

/**
 * 重置预览图片的缩放、位移
 * @Date: 2023/09/21 16:45:27
 */
function reset() {
  imgState.transform = {
    scale: 1,
    deg: 0,
    offsetX: 0,
    offsetY: 0,
    enableTransition: false,
  };
}
</script>

<style scoped lang="scss">
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
.quro-image-viewer__wrapper {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  .quro-image-viewer__mask {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 0.5;
    background: #000;
  }
  .quro-image-viewer__btn {
    position: absolute;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    opacity: 0.8;
    cursor: pointer;
    box-sizing: border-box;
    user-select: none;
  }
  .quro-image-viewer__close {
    top: 40px;
    right: 40px;
    width: 40px;
    height: 40px;
    font-size: 24px;
    color: #fff;
    background-color: #606266;
  }
  .quro-image-viewer__prev {
    top: 50%;
    transform: translateY(-50%);
    width: 44px;
    height: 44px;
    font-size: 24px;
    color: #fff;
    background-color: #606266;
    border-color: #fff;
    left: 40px;
  }
  .quro-image-viewer__next {
    top: 50%;
    transform: translateY(-50%);
    width: 44px;
    height: 44px;
    font-size: 24px;
    color: #fff;
    background-color: #606266;
    border-color: #fff;
    right: 40px;
    text-indent: 2px;
  }
  .is-disabled {
    cursor: not-allowed;
  }
  .quro-image-viewer__actions {
    left: 50%;
    bottom: 30px;
    transform: translateX(-50%);
    width: 282px;
    height: 44px;
    padding: 0 23px;
    background-color: #606266;
    border-color: #fff;
    border-radius: 22px;

    .quro-image-viewer__actions__inner {
      width: 100%;
      height: 100%;
      text-align: justify;
      cursor: default;
      font-size: 23px;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: space-around;
      .el-icon {
        cursor: pointer;
      }
    }
  }
  .quro-image-viewer__canvas {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
