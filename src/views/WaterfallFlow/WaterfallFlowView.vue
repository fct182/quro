<template>
  <div class="waterfall-flow-view">
    <DemoWaterfallFlow :list="list"></DemoWaterfallFlow>
  </div>
</template>

<script setup lang="ts">
import DemoWaterfallFlow from "@/components/WaterfallFlow/DemoWaterfallFlow.vue";

const list = [
  {
    src: "https://cn.bing.com/th?id=OHR.TunisiaAmphitheatre_ZH-CN4431856872_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp",
    label: "恨人神之道殊兮，怨盛年之莫当。",
    title: "动漫壁纸01",
  },
  {
    src: "https://api.adicw.cn/images/StudyImg/62cfbba60fbb8.png",
    label:
      "南朝四百八十寺，多少楼台烟雨中。渐行渐远渐无书，水阔鱼沉何处问。青山相待，白云相爱，梦不到紫罗袍共黄金带。人生若只如初见，何事秋风悲画扇。",
    title: "动漫壁纸02",
  },
  {
    src: "https://api.adicw.cn/images/StudyImg/20191112115214.jpg",
    title: "动漫壁纸03",
    label: "何须浅碧深红色，自是花中第一流。",
  },
  {
    src: "https://api.adicw.cn/images/StudyImg/20191021050854.jpg",
    label: "动漫壁纸04",
    title: "动漫壁纸04",
  },
  {
    src: "https://th.wallhaven.cc/small/85/859dk1.jpg",
    label: "动漫壁纸05",
    title: "动漫壁纸05",
  },
  {
    src: "https://api.adicw.cn/images/StudyImg/6045affc0887e.jpg",
    label: "动漫壁纸06",
    title: "动漫壁纸06",
  },
  {
    src: "https://api.adicw.cn/images/StudyImg/20200611114033.jpg",
    label: "动漫壁纸07",
    title: "动漫壁纸07",
  },
  {
    src: "https://api.adicw.cn/images/StudyImg/20190917010840.jpg",
    label: "动漫壁纸08",
    title: "动漫壁纸08",
  },
  {
    src: "https://api.adicw.cn/images/StudyImg/628df60371c78.jpg",
    label: "动漫壁纸09",
    title: "动漫壁纸09",
  },
  {
    src: "https://api.adicw.cn/images/StudyImg/20190804113325.jpg",
    label: "动漫壁纸10",
    title: "动漫壁纸10",
  },
  {
    src: "https://api.adicw.cn/images/StudyImg/20200204110603.jpg",
    label: "动漫壁纸11",
    title: "动漫壁纸11",
  },
  {
    src: "https://api.adicw.cn/images/StudyImg/6050c8f4e2c82.jpg",
    label: "动漫壁纸12",
    title: "动漫壁纸12",
  },
  {
    src: "https://api.adicw.cn/images/StudyImg/5feef2880891a.jpg",
    label: "动漫壁纸13",
    title: "动漫壁纸13",
  },
  {
    src: "https://th.wallhaven.cc/small/vq/vqdgpp.jpg",
    label: "动漫壁纸14",
    title: "动漫壁纸14",
  },
  {
    src: "https://th.wallhaven.cc/small/kx/kxlgj6.jpg",
    label: "动漫壁纸15",
    title: "动漫壁纸15",
  },
  {
    src: "https://th.wallhaven.cc/small/we/wedmq7.jpg",
    label: "动漫壁纸16",
    title: "动漫壁纸16",
  },
  {
    src: "https://th.wallhaven.cc/small/gp/gpmmmq.jpg",
    label: "动漫壁纸17",
    title: "动漫壁纸17",
  },
  {
    src: "https://th.wallhaven.cc/small/we/wedelq.jpg",
    label: "动漫壁纸18",
    title: "动漫壁纸18",
  },
  {
    src: "https://th.wallhaven.cc/small/ex/ex63rk.jpg",
    label: "动漫壁纸19",
    title: "动漫壁纸19",
  },
  {
    src: "https://th.wallhaven.cc/small/9d/9d9g38.jpg",
    label: "动漫壁纸20",
    title: "动漫壁纸20",
  },
  {
    src: "https://th.wallhaven.cc/small/rr/rrpdy7.jpg",
    label: "动漫壁纸21",
    title: "动漫壁纸21",
  },
  {
    src: "https://th.wallhaven.cc/small/x6/x6pxmd.jpg",
    label: "动漫壁纸22",
    title: "动漫壁纸22",
  },
  {
    src: "https://th.wallhaven.cc/small/gp/gpm88q.jpg",
    label: "动漫壁纸23",
    title: "动漫壁纸23",
  },
  {
    src: "https://api.adicw.cn/images/StudyImg/20200219114051.jpg",
    label: "动漫壁纸24",
    title: "动漫壁纸24",
  },
];
</script>

<style lang="scss" scoped>
.waterfall-flow-view {
  width: 100%;
  height: 100%;
  padding: 16px;
  box-sizing: border-box;
  background-color: rgb(225, 243, 216);
}
</style>
