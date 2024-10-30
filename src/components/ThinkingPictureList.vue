<template>
  <div class="thinking-pictures-container" id="thinking-pictures-container">
    <van-image
        v-for="item in pictureList"
        :key="item"
        radius="2vw"
        class="thinking-pictures-item"
        fit="cover"
        :src="item"
    />
  </div>
</template>

<script setup>
import {defineProps} from 'vue'

defineProps({
  pictureList: Array
})

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