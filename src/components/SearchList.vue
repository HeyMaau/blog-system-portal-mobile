<template>
  <div class="container" v-for="item in searchList" :key="item.id">
    <router-link :to="`/article/${item.id}`" class="article-title" v-html="item.title"/>
    <div class="rich-content-container">
      <div class="short-article-container">
        <van-image :src="`${API_PORTAL_IMAGE_PATH}/${item.cover}`" width="100%" height="150px" fit="cover"/>
        <span v-html="item.content" class="van-multi-ellipsis--l3"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import {defineProps} from "vue";
import {API_PORTAL_IMAGE_PATH} from "@/utils/constants";

defineProps({
  searchList: Array
})

</script>

<style scoped>

.container {
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  margin-bottom: 20px;
}

.article-title {
  color: #121212;
  font-size: 45px;
  text-align: left;
  font-weight: 700;
  line-height: 1.4;
  width: 100%;
}

.short-article-container {
  width: 100%;
}

.rich-content-container {
  width: 100%;
  margin-top: 20px;
  font-size: 35px;
  line-height: 1.6;
  word-break: break-word;
  color: #333333;
}

:deep(.full-article-container h1) {
  font-size: 43px;
  font-weight: 600;
}

:deep(.full-article-container h2) {
  font-size: 41px;
  font-weight: 600;
}

:deep(.full-article-container h3) {
  font-size: 39px;
  font-weight: 600;
}

:deep(.full-article-container img) {
  max-width: 100%;
}

:deep(em) {
  color: #f1403c;
  font-style: normal;
}

</style>