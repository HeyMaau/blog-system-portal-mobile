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
import {defineProps, onMounted} from 'vue'
import {API_PORTAL_IMAGE_PATH} from "@/utils/constants";
import Viewer from "viewerjs";

const baseImageUrl = API_PORTAL_IMAGE_PATH

defineProps({
  pictureList: Array
})

onMounted(() => {
  initPicViewer('thinking-pictures-container')
})

function initPicViewer(domID) {
  // eslint-disable-next-line no-unused-vars
  const picViewer = new Viewer(document.getElementById(domID), {
    inline: false,
    button: false,
    navbar: false,
    title: false,
    toolbar: {
      zoomIn: false,
      zoomOut: false,
      reset: false,
      prev: {
        show: true,
        size: "large"
      },
      next: {
        show: true,
        size: "large"
      },
      play: false,
      rotateLeft: false,
      rotateRight: false,
      flipHorizontal: false,
      flipVertical: false
    },
    tooltip: false,
    transition: true,
    keyboard: false,
    loop: false
  });
}

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