<template>
  <div class="image-viewer-demo">
    <h3>点击图片进入图片预览</h3>
    <div class="img-list">
      <img
        v-for="(item, index) in state.srcList"
        :key="index"
        :src="item"
        @click="imgClickHandler(index)"
      />
    </div>
    <ImageViewer
      v-model="flag"
      :infinite="false"
      :urlList="state.srcList"
      :initialIndex="state.initialIndex"
      :onSwitch="switchHandler"
      :onClose="closeHandler"
    ></ImageViewer>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import ImageViewer from "../../components/ImageViewer/ImageViewer.vue";

const flag = ref(false);

const state = reactive({
  srcList: [
    "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
    "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
    "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
  ],
  initialIndex: 0,
});

/**
 * 点击图片展开图片预览
 * @Date: 2023/09/21 19:17:27
 */
function imgClickHandler(index: number) {
  state.initialIndex = index;
  flag.value = true;
}
/**
 * 图片预览关闭
 * @Date: 2023/09/21 19:17:11
 */
function closeHandler() {
  console.log("预览图片关闭的回调");
}
/**
 * 图片预览切换图片
 * @Date: 2023/09/21 19:17:11
 */
function switchHandler() {
  console.log("图片预览切换图片");
}
</script>

<style lang="scss" scoped>
.image-viewer-demo {
  h3 {
    margin: 16px 0;
  }
  .img-list {
    img {
      width: calc(1920px / 5);
      height: calc(1080px / 5);
      object-fit: cover;
      margin: 16px;
      cursor: pointer;
    }
  }
}
</style>
