<template>
  <div class="rule-tree-view">
    <RuleTree ref="ruleTreeRef" />
    <el-button class="btn" type="primary" @click="getData">
      获取树数据
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import RuleTree from "@/components/RuleTree/RuleTree.vue";

const ruleTreeRef = ref<null | InstanceType<typeof RuleTree>>(null);

function getData() {
  console.log(
    JSON.parse(JSON.stringify(ruleTreeRef.value?.getNodeRuleTreedata()))
  );
}
</script>

<style scoped lang="scss">
.rule-tree-view {
  .btn {
    position: absolute;
    bottom: 20px;
    left: 20px;
  }
}
</style>
