<!--
 * 头像悬浮效果示例
 * @Date: 2023/08/31 20:31:51
-->
<template>
  <div class="avatar-hover-view">
    <AvatarHover
      url="https://png.pngtree.com/png-clipart/20220404/original/pngtree-d-rendering-male-character-profile-or-avatar-happy-young-man-with-png-image_7512919.png"
    ></AvatarHover>
  </div>
</template>

<script setup lang="ts">
import AvatarHover from "../../components/AvatarHover/AvatarHover.vue";
</script>

<style lang="scss" scoped>
.avatar-hover-view {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background: #e0e4cc;
}
</style>
