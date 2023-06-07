<template>
  <div class="container" v-for="item in articleList" :key="item.id">
    <router-link :to="`/article/${item.id}`" class="article-title">
      {{ item.title }}
    </router-link>
    <div class="rich-content-container">
      <div class="short-article-container" v-if="collapseState[item.id]">
        <van-image :src="`${API_PORTAL_IMAGE_PATH}/${item.cover}`" width="100%" height="150px" fit="cover"/>
        <div class="article-content-summary-container">
          <span>{{ item.content }}</span>
          <button class="button-full-article" @click="showFullArticle(item.id)">阅读全文
            <van-icon name="arrow-down"/>
          </button>
        </div>
      </div>
      <div v-else>
        <van-image :src="`${API_PORTAL_IMAGE_PATH}/${item.cover}`" width="100%" fit="cover"/>
        <div class="full-article-content" v-html="fullArticle.content"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {defineProps, ref, shallowRef, watch} from "vue";
import {API_PORTAL_IMAGE_PATH} from "@/utils/constants";
import {getFullArticleApi, initCollapseState} from "@/hooks/article";

const props = defineProps({
  articleList: Array
})

//监听数组的变化，创建文章折叠状态管理器
const collapseState = ref({})
watch(() => props.articleList, () => {
  initCollapseState(props.articleList, collapseState.value)
}, {deep: true, immediate: true})

//展示全文
const fullArticle = shallowRef({})

function showFullArticle(articleID) {
  getFullArticleApi(articleID).then(({data: response}) => {
    fullArticle.value = response.data
    collapseState.value[articleID] = false
  })
}

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

:deep(.full-article-content h1) {
  font-size: 43px;
  font-weight: 600;
}

:deep(.full-article-content h2) {
  font-size: 41px;
  font-weight: 600;
}

:deep(.full-article-content h3) {
  font-size: 39px;
  font-weight: 600;
}

.button-full-article {
  margin-left: 10px;
  border: none;
  background: white;
  color: #175199;
}

:deep(.full-article-content img) {
  max-width: 100%;
}

</style>