<template>
  <div class="full-scroll-view">
    <FullScroll :list="list">
      <template #default="{ item }">
        <div class="custome-content">
          <h3 class="title-name">{{ item.otherData.title }}</h3>
          <div class="content-desc">
            <p>
              {{ item.otherData.desc1 }}<br />
              {{ item.otherData.desc2 }}
            </p>
          </div>
        </div>
      </template>
    </FullScroll>
  </div>
</template>

<script setup lang="ts">
import FullScroll from "@/components/FullScroll/FullScroll.vue";

const list = [
  {
    guideTitle: "首页",
    backgroundImage: "https://ys.mihoyo.com/main/_nuxt/img/5c125a1.png",
    otherData: {
      title: "提瓦特大陆",
      desc1: "这里是七种元素交汇的幻想世界「提瓦特」。",
      desc2:
        "在遥远的过去，人们藉由对神灵的信仰，获赐了驱动元素的力量，得以在荒野中筑起家园。",
    },
  },
  {
    guideTitle: "蒙德",
    backgroundImage:
      "https://uploadstatic.mihoyo.com/contentweb/20200319/2020031921550320292.jpg",
    otherData: {
      title: "蒙德",
      desc1: "位于提瓦特大陆东北部的自由城邦。",
      desc2:
        "群山和广袤的平原间，自由之风携着蒲公英的气息吹拂过果酒湖，为坐落于湖心岛上的蒙德城送去风神巴巴托斯的祝福与恩泽。",
    },
  },
  {
    guideTitle: "璃月",
    backgroundImage:
      "https://uploadstatic.mihoyo.com/contentweb/20200319/2020031921552395638.jpg",
    otherData: {
      title: "璃月",
      desc1: "位于提瓦特大陆东方的富饶港湾。",
      desc2:
        "傲然矗立的山麓与石林、广袤的平原与生机勃勃的河滩共同构成了璃月的丰富地貌，在四季分明的气候下焕发出多彩的风华。山石奇景间，又埋藏了多少岩之魔神的古老馈赠等待着人们发掘呢？",
    },
  },
  {
    guideTitle: "稻妻",
    backgroundImage:
      "https://uploadstatic.mihoyo.com/contentweb/20210719/2021071918001232800.jpg",
    otherData: {
      title: "稻妻",
      desc1: "位于提瓦特大陆远东的封闭群岛。",
      desc2:
        "越过无尽的雷暴，踏上红枫与绯樱眷顾的诸岛，在环绕的砂堤、高耸的断崖与幽秘的山林之中，见证御建鸣神主尊大御所大人所追寻的永恒。",
    },
  },
  {
    guideTitle: "须弥",
    backgroundImage:
      "https://webstatic.mihoyo.com/upload/contentweb/2022/08/15/8969f683b92839ac427c875d0d742be2_4825576482548821743.jpg",
    otherData: {
      title: "须弥",
      desc1: "位于提瓦特大陆中西部的学城之都。",
      desc2:
        "同时拥有葱郁雨林与荒芜沙土的奇异国度，无数智慧的果实在这里生长、埋葬。无论是穿越丛林踏上学城的台阶，还是深入沙漠挖掘赤土的遗迹，远道而来的旅者都可以在此获取宝贵的智识。",
    },
  },
  {
    guideTitle: "枫丹",
    backgroundImage:
      "https://act-webstatic.mihoyo.com/upload/contentweb/hk4e/721a74c43614d7aeb25b046cabfb57be_2012964858524199390.jpg",
    otherData: {
      title: "枫丹",
      desc1: "位于提瓦特中部的地上之海。",
      desc2:
        "循着水淳淳流来的方向而行，越过原野、深林与沙海，抵达的将是大陆水系的源流之地。",
    },
  },
];
</script>

<style lang="scss" scoped>
.full-scroll-view {
  .custome-content {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
    color: #fff;
    .title-name {
      font-weight: 500;
      font-size: 30px;
    }
    .content-desc {
      // width: 600px;
      text-align: center;
      font-size: 14px;
      margin-top: 20px;
      line-height: 1.8;
    }
  }
}
</style>
