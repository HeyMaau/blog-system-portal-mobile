<template>
  <div class="thinking-pictures-container" id="thinking-pictures-container">
    <van-image
        v-for="item in pictureList"
        :key="item"
        radius="2vw"
        class="thinking-pictures-item"
        fit="cover"
        :src="`${baseImageUrl}/${item}`"
    />
  </div>
</template>

<script setup>
import {defineProps} from 'vue'
import {API_PORTAL_IMAGE_PATH} from "@/utils/constants";

const baseImageUrl = API_PORTAL_IMAGE_PATH

defineProps({
  pictureList: Array
})

</script>

<style scoped>

.thinking-pictures-container {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 15px 0;
}

.thinking-pictures-item {
  width: 220px;
  height: 220px;
}

</style>