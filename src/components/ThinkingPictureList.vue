<template>
  <div class="thinking-pictures-container" id="thinking-pictures-container">
    <van-image
        v-for="item in pictureList"
        :key="item"
        radius="2vw"
        class="thinking-pictures-item"
        fit="cover"
        lazy-load
        :src="item"
        @click="onClickImage(item)"
    />
  </div>
</template>

<script setup>
import {defineProps} from 'vue'
import {showImagePreview} from "vant";

const props = defineProps({
  pictureList: Array
})

function onClickImage(item) {
  showImagePreview({
    images: props.pictureList,
    closeable: true,
    startPosition: props.pictureList.indexOf(item)
  })
}

</script>

<style scoped>

.thinking-pictures-container {
  display: flex;
  flex-wrap: wrap;
  gap: 15px 10px;
}

.thinking-pictures-item {
  width: 220px;
  height: 220px;
}

</style>