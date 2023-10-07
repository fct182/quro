<template>
  <div
    ref="containerRef"
    class="watermark"
    :class="[$props.rootClassName]"
    :style="{ position: 'relative' }"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { getPixelRatio, getStyleStr } from "@/utils/utils";
import { reRendering, rotateWatermark } from "./utils";
import { computed, onMounted, onUnmounted, shallowRef, watch } from "vue";
import type { CSSProperties } from "vue";
import { useMutationObserver } from "@vueuse/core";

const BaseSize = 2;
const FontGap = 3;

interface Props {
  zIndex?: number /* 追加的水印元素的 z-index */;
  rotate?: number /* 水印绘制时，旋转的角度，单位 ° */;
  width?: number /* 水印的宽度，content 的默认值为自身的宽度 */;
  height?: number /* 水印的高度，content 的默认值为自身的高度 */;
  image?: string /* 图片源，优先级高 */;
  content: string | string[] /* 水印文字内容 */;
  font?: WatermarkFontType /* 文字样式 */;
  rootClassName?: string;
  gap?: [number, number] /* 水印之间的间距 */;
  offset?: [number, number] /* 水印距离容器左上角的偏移量，默认为 gap/2 */;
}
interface WatermarkFontType {
  color?: string;
  fontSize?: number | string;
  fontWeight?: "normal" | "light" | "weight" | number;
  fontStyle?: "none" | "normal" | "italic" | "oblique";
  fontFamily?: string;
}

const props = withDefaults(defineProps<Props>(), {
  zIndex: 9,
  rotate: -22,
  font: () => ({}),
  gap: () => [100, 100],
});
/**
 * 水印组件容器Ref
 */
const containerRef = shallowRef<HTMLDivElement>();
/**
 * 水印承载的div元素Ref
 */
const watermarkRef = shallowRef<HTMLDivElement>();
/* 停止观察 */
const stopObservation = shallowRef(false);
/* 水印之间的间距 */
const gapX = computed(() => props.gap?.[0] ?? 100);
const gapY = computed(() => props.gap?.[1] ?? 100);
/* 水印中心点 */
const gapXCenter = computed(() => gapX.value / 2);
const gapYCenter = computed(() => gapY.value / 2);
/* 距离容器左上角(偏移量) */
const offsetLeft = computed(() => props.offset?.[0] ?? gapXCenter.value);
const offsetTop = computed(() => props.offset?.[1] ?? gapYCenter.value);
/* 字体样式 */
const fontSize = computed(() => props.font?.fontSize ?? 16);
const fontWeight = computed(() => props.font?.fontWeight ?? "normal");
const fontStyle = computed(() => props.font?.fontStyle ?? "normal");
const fontFamily = computed(() => props.font?.fontFamily ?? "sans-serif");
const color = computed(() => props.font?.color ?? "rgba(0, 0, 0, 0.15)");
/* 遮罩样式 */
const markStyle = computed(() => {
  const markStyle: CSSProperties = {
    zIndex: props.zIndex ?? 9,
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    pointerEvents: "none",
    backgroundRepeat: "repeat",
  };

  /** 计算水印背景图片的background-position(left、top) */
  let positionLeft = offsetLeft.value - gapXCenter.value; // 默认0
  let positionTop = offsetTop.value - gapYCenter.value; // 默认0
  /* 图片position位置大于0,则水印容器整体偏移 */
  if (positionLeft > 0) {
    markStyle.left = `${positionLeft}px`;
    markStyle.width = `calc(100% - ${positionLeft}px)`;
    positionLeft = 0;
  }
  if (positionTop > 0) {
    markStyle.top = `${positionTop}px`;
    markStyle.height = `calc(100% - ${positionTop}px)`;
    positionTop = 0;
  }
  markStyle.backgroundPosition = `${positionLeft}px ${positionTop}px`;

  return markStyle;
});

/**
 * 销毁水印
 * @Date: 2023/09/27 17:37:06
 */
function destroyWatermark() {
  if (watermarkRef.value) {
    // 从文档中删除元素
    watermarkRef.value.remove();
    watermarkRef.value = undefined;
  }
}

/**
 * 添加水印
 * @Date: 2023/09/27 17:37:44
 * @param base64Url base64图片路径
 * @param markWidth 水印宽度
 */
function appendWatermark(base64Url: string, markWidth: number) {
  if (containerRef.value && watermarkRef.value) {
    stopObservation.value = true;
    watermarkRef.value.setAttribute(
      "style",
      getStyleStr({
        ...markStyle.value,
        backgroundImage: `url('${base64Url}')`,
        backgroundSize: `${(gapX.value + markWidth) * BaseSize}px`,
      })
    );
    containerRef.value?.append(watermarkRef.value);
    // 延迟执行
    setTimeout(() => {
      stopObservation.value = false;
    });
  }
}

/**
 * 获取水印大小
 * @Date: 2023/09/27 17:51:42
 * @param ctx canvas绘制对象
 */
function getMarkSize(ctx: CanvasRenderingContext2D) {
  let defaultWidth = 120; // 默认宽度
  let defaultHeight = 64; // 默认高度
  const content = props.content;
  const image = props.image;
  const width = props.width;
  const height = props.height;
  if (!image && ctx.measureText) {
    // 若无图像并且 canvas返回一个关于被测量文本TextMetrics 对象包含的信息方法存在
    ctx.font = `${Number(fontSize.value)}px ${fontFamily.value}`;
    const contents = Array.isArray(content) ? content : [content];
    const widths = contents.map((item) => ctx.measureText(item!).width);
    // 多行文本时获取最大宽度
    defaultWidth = Math.ceil(Math.max(...widths));
    // 计算多行文本的高度(字体大小*行数 + 字体行间距 * (行数-1))
    defaultHeight =
      Number(fontSize.value) * contents.length +
      (contents.length - 1) * FontGap;
  }
  return [width ?? defaultWidth, height ?? defaultHeight] as const;
}

/**
 * 填充文本
 * @Date: 2023/09/27 17:52:36
 * @param ctx canvas绘制对象
 * @param drawX 绘制x坐标
 * @param drawY 绘制y坐标
 * @param drawWidth 绘制宽度
 * @param drawHeight 绘制高度
 */
function fillTexts(
  ctx: CanvasRenderingContext2D,
  drawX: number,
  drawY: number,
  drawWidth: number,
  drawHeight: number
) {
  const ratio = getPixelRatio();
  const content = props.content;
  const mergedFontSize = Number(fontSize.value) * ratio;
  ctx.font = `${fontStyle.value} normal ${fontWeight.value} ${mergedFontSize}px/${drawHeight}px ${fontFamily.value}`;
  ctx.fillStyle = color.value;
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  ctx.translate(drawWidth / 2, 0);
  const contents = Array.isArray(content) ? content : [content];
  contents?.forEach((item, index) => {
    ctx.fillText(
      item ?? "",
      drawX,
      drawY + index * (mergedFontSize + FontGap * ratio)
    );
  });
}

/**
 * 渲染水印
 * @Date: 2023/09/27 17:56:48
 */
function renderWatermark() {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const image = props.image;
  const rotate = props.rotate ?? -22;

  if (ctx) {
    if (!watermarkRef.value) {
      watermarkRef.value = document.createElement("div");
    }

    const ratio = getPixelRatio();
    const [markWidth, markHeight] = getMarkSize(ctx);
    const canvasWidth = (gapX.value + markWidth) * ratio;
    const canvasHeight = (gapY.value + markHeight) * ratio;
    canvas.setAttribute("width", `${canvasWidth * BaseSize}px`);
    canvas.setAttribute("height", `${canvasHeight * BaseSize}px`);

    const drawX = (gapX.value * ratio) / 2;
    const drawY = (gapY.value * ratio) / 2;
    const drawWidth = markWidth * ratio;
    const drawHeight = markHeight * ratio;
    const rotateX = (drawWidth + gapX.value * ratio) / 2;
    const rotateY = (drawHeight + gapY.value * ratio) / 2;
    /** 备选绘图参数 */
    const alternateDrawX = drawX + canvasWidth;
    const alternateDrawY = drawY + canvasHeight;
    const alternateRotateX = rotateX + canvasWidth;
    const alternateRotateY = rotateY + canvasHeight;

    ctx.save();
    rotateWatermark(ctx, rotateX, rotateY, rotate);

    if (image) {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
        /** 旋转后绘制交错图 */
        ctx.restore();
        rotateWatermark(ctx, alternateRotateX, alternateRotateY, rotate);
        ctx.drawImage(
          img,
          alternateDrawX,
          alternateDrawY,
          drawWidth,
          drawHeight
        );
        appendWatermark(canvas.toDataURL(), markWidth);
      };
      img.crossOrigin = "anonymous";
      img.referrerPolicy = "no-referrer";
      img.src = image;
    } else {
      fillTexts(ctx, drawX, drawY, drawWidth, drawHeight);
      /** 旋转后填充交错的文本 */
      ctx.restore();
      rotateWatermark(ctx, alternateRotateX, alternateRotateY, rotate);
      fillTexts(ctx, alternateDrawX, alternateDrawY, drawWidth, drawHeight);
      appendWatermark(canvas.toDataURL(), markWidth);
    }
  }
}

onMounted(() => {
  renderWatermark();
});

watch(
  () => props,
  () => {
    renderWatermark();
  },
  {
    deep: true,
    flush: "post",
  }
);

onUnmounted(() => {
  destroyWatermark();
});

const onMutate = (mutations: MutationRecord[]) => {
  if (stopObservation.value) {
    return;
  }
  mutations.forEach((mutation) => {
    if (reRendering(mutation, watermarkRef.value)) {
      destroyWatermark();
      renderWatermark();
    }
  });
};
/* 监听DOM树修改 */
useMutationObserver(containerRef, onMutate, {
  attributes: true,
});
</script>

<style scoped></style>
