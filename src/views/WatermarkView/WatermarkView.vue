<template>
  <div class="watermark-view">
    <h2>1. 简单使用</h2>
    <Watermark class="watermark-box" :gap="[30, 30]" content="测试水印">
      <div class="content">
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laudantium
          ab ad officiis praesentium reprehenderit delectus rem quaerat iusto
          voluptate vel tenetur, consequuntur, sapiente natus velit iste
          repellendus nihil corporis doloribus.
        </p>
      </div>
    </Watermark>
    <h2>2. 多行水印</h2>
    <Watermark class="watermark-box" :content="['剑来', '一剑破万法']">
      <div class="content"></div>
    </Watermark>
    <h2>3. 图片水印</h2>
    <Watermark
      class="watermark-box"
      :width="30"
      :height="30"
      content="图片水印加载失败"
      image="https://s1-imfile.feishucdn.com/static-resource/v1/v2_96ee2e92-b936-496f-9379-b789497757cg~?image_size=noop&cut_type=&quality=&format=image&sticker_format=.webp"
    >
      <div class="content"></div>
    </Watermark>
    <h2>3. 自定义配置(通过自定义参数配置预览水印效果。)</h2>
    <div class="edit-box">
      <Watermark v-bind="model">
        <div class="article">
          <p>
            The light-speed iteration of the digital world makes products more
            complex. However, human consciousness and attention resources are
            limited. Facing this design contradiction, the pursuit of natural
            interaction will be the consistent direction of Ant Design.
          </p>
          <p>
            Natural user cognition: According to cognitive psychology, about 80%
            of external information is obtained through visual channels. The
            most important visual elements in the interface design, including
            layout, colors, illustrations, icons, etc., should fully absorb the
            laws of nature, thereby reducing the user&apos;s cognitive cost and
            bringing authentic and smooth feelings. In some scenarios,
            opportunely adding other sensory channels such as hearing, touch can
            create a richer and more natural product experience.
          </p>
          <p>
            Natural user behavior: In the interaction with the system, the
            designer should fully understand the relationship between users,
            system roles, and task objectives, and also contextually organize
            system functions and services. At the same time, a series of methods
            such as behavior analysis, artificial intelligence and sensors could
            be applied to assist users to make effective decisions and reduce
            extra operations of users, to save users&apos; mental and physical
            resources and make human-computer interaction more natural.
          </p>
        </div>
        <img
          style="width: 100%; max-width: 800px; position: relative"
          src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*zx7LTI_ECSAAAAAAAAAAAABkARQnAQ"
          alt="示例图片"
        />
      </Watermark>
      <el-form class="edit-form" label-position="top" :model="model">
        <el-form-item name="content" label="Content">
          <el-input v-model="model.content" />
        </el-form-item>
        <el-form-item name="font.fontSize" label="FontSize">
          <el-slider
            v-model="model.font.fontSize"
            :step="1"
            :min="0"
            :max="100"
          />
        </el-form-item>
        <el-form-item name="zIndex" label="zIndex">
          <el-slider v-model="model.zIndex" :step="1" :min="0" :max="100" />
        </el-form-item>
        <el-form-item name="rotate" label="Rotate">
          <el-slider v-model="model.rotate" :step="1" :min="-180" :max="180" />
        </el-form-item>
        <el-form-item label="水印的宽高">
          <el-space>
            <el-form-item name="width">
              <el-input-number
                size="small"
                controls-position="right"
                v-model="model.width"
                placeholder="width"
              />
            </el-form-item>
            <el-form-item name="height">
              <el-input-number
                size="small"
                controls-position="right"
                v-model="model.height"
                placeholder="height"
              />
            </el-form-item>
          </el-space>
        </el-form-item>
        <el-form-item label="Gap">
          <el-space>
            <el-form-item :name="['gap', 0]">
              <el-input-number
                size="small"
                controls-position="right"
                v-model="model.gap[0]"
                placeholder="gapX"
              />
            </el-form-item>
            <el-form-item :name="['gap', 1]">
              <el-input-number
                size="small"
                controls-position="right"
                v-model="model.gap[1]"
                placeholder="gapY"
              />
            </el-form-item>
          </el-space>
        </el-form-item>
        <el-form-item label="Offset">
          <el-space>
            <el-form-item :name="['offset', 0]">
              <el-input-number
                size="small"
                controls-position="right"
                v-model="model.offset[0]"
                placeholder="offsetLeft"
              />
            </el-form-item>
            <el-form-item :name="['offset', 1]">
              <el-input-number
                size="small"
                controls-position="right"
                v-model="model.offset[1]"
                placeholder="offsetTop"
              />
            </el-form-item>
          </el-space>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import Watermark from "@/components/Watermark/Watermark.vue";
import { reactive } from "vue";
const model = reactive({
  width: 120,
  height: 64,
  content: "这是测试水印示例",
  font: {
    fontSize: 16,
  },
  zIndex: 11,
  rotate: -22,
  gap: [100, 100] as [number, number],
  offset: [] as unknown as [number, number],
});
</script>

<style lang="scss" scoped>
.watermark-view {
  .edit-box {
    display: flex;
    padding: 10px;
    .edit-form {
      width: 300px;
      flex-shrink: 0;
      border-left: 1px solid #eee;
      padding-left: 20px;
      margin-left: 20px;
    }
  }
  h2 {
    margin: 16px 0;
  }
  .watermark-box {
    background-color: #eee;
    // width: 600px;
    height: 300px;
  }
  .content {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    p {
      text-indent: 2em;
    }
  }
  .article {
    color: rgba(0, 0, 0, 0.88);
    word-break: break-word;
    line-height: 1.5;
    p {
      margin-bottom: 1em;
    }
  }
}
</style>
