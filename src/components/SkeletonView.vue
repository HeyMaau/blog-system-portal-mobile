<template>
  <div class="skeleton-container" v-for="i in number" :key="i">
    <van-skeleton>
      <template #template>
        <div class="skeleton-content-container">
          <van-skeleton-paragraph row-width="60%"/>
          <van-skeleton-image :style="{ width: '100%', marginTop: '12px' }"/>
          <van-skeleton-paragraph v-for="i in row" :key="i"/>
        </div>
      </template>
    </van-skeleton>
  </div>
</template>

<script setup>
import {defineProps} from "vue";

defineProps({
  number: Number,
  row: Number
})

</script>

<style scoped>

.skeleton-container {
  background: white;
  margin-bottom: 20px;
  padding: 20px 0;
}

.skeleton-content-container {
  display: flex;
  flex-direction: column;
  width: 100%;
}

</style>