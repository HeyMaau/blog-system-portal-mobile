<template>
  <div>
    <div class="skeleton-view-thinking-container" v-for="i in number" :key="i">
      <van-skeleton>
        <template #template>
          <div class="skeleton-view-thinking-content-container">
            <div class="skeleton-view-author-info">
              <van-skeleton-avatar class="skeleton-view-author-avatar"/>
              <div class="skeleton-view-author-name-sign">
                <van-skeleton-paragraph row-width="40%"/>
                <van-skeleton-paragraph row-width="40%"/>
              </div>
            </div>
            <div class="skeleton-view-picture-list">
              <van-skeleton-image v-for="i in 3" :key="i" class="skeleton-view-picture"/>
            </div>
            <div class="skeleton-view-thinking-content">
              <van-skeleton-title/>
              <van-skeleton-paragraph v-for="i in 2" :key="i"/>
            </div>
          </div>
        </template>
      </van-skeleton>
    </div>
  </div>
</template>

<script setup>
import {defineProps} from "vue";

defineProps({
  number: Number
})

</script>

<style scoped>

.skeleton-view-thinking-container {
  background: white;
  padding: 15px 31px;
}

.van-skeleton {
  padding: 0;
}

.skeleton-view-thinking-content-container {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.skeleton-view-author-info {
  display: flex;
  margin-bottom: 18px;
}

.skeleton-view-author-avatar {
  width: 73px;
  height: 73px;
}

.skeleton-view-author-name-sign {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
}

.skeleton-view-author-name-sign .van-skeleton-paragraph:not(:first-child) {
  margin-top: 0;
}

.skeleton-view-picture-list {
  display: flex;
  gap: 0 10px;
  margin-bottom: 20px;
}

.skeleton-view-picture {
  width: 220px;
  height: 220px;
}

.skeleton-view-thinking-content .van-skeleton-paragraph:not(:first-child) {
  margin-top: 10px;
}

</style>