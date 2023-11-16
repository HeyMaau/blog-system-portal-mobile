<template>
  <div class="container" v-for="item in articleList" :key="item.id">
    <div class="article-title-tag-container">
      <van-tag :color="item.category.tagColor" text-color="#ffffff" size="medium" class="article-tag">{{
          item.category.name
        }}
      </van-tag>
      <router-link :to="`/article/${item.id}`" class="article-title">
        {{ item.title }}
      </router-link>
    </div>
    <div class="rich-content-container">
      <div class="short-article-container" v-if="collapseState[item.id]">
        <van-image :src="`${API_PORTAL_IMAGE_PATH}/${item.cover}`" width="100%" height="150px" fit="cover"/>
        <div class="article-content-summary-container">
          <span class="van-multi-ellipsis--l2">{{ item.content }}</span>
          <button class="button-full-article" @click="showFullArticle(item.id)">阅读全文
            <van-icon name="arrow-down"/>
          </button>
        </div>
      </div>
      <div v-else>
        <van-image :src="`${API_PORTAL_IMAGE_PATH}/${item.cover}`" width="100%" fit="cover"/>
        <div class="full-article-content" v-html="fullArticleContent[item.id]" :id="`fullArticle_${item.id}`"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {defineProps, nextTick, ref, watch, shallowReactive} from "vue";
import {API_PORTAL_IMAGE_PATH} from "@/utils/constants";
import {getFullArticleApi, initCollapseState, useConvertSize} from "@/hooks/article";
import Viewer from "viewerjs";
import hljs from 'highlight.js'

const props = defineProps({
  articleList: Array
})

//监听数组的变化，创建文章折叠状态管理器
const collapseState = ref({})
watch(() => props.articleList, () => {
  initCollapseState(props.articleList, collapseState.value)
}, {deep: true, immediate: true})

//展示全文
const fullArticleContent = shallowReactive({})

function showFullArticle(articleID) {
  getFullArticleApi(articleID).then(({data: response}) => {
    Reflect.set(fullArticleContent, articleID, response.data.content)
    collapseState.value[articleID] = false
    nextTick(() => {
      useConvertSize(document.getElementById(`fullArticle_${articleID}`))
      initPicViewer(`fullArticle_${articleID}`)
      hljs.highlightAll()
    })
  })
}

function initPicViewer(domID) {
  // eslint-disable-next-line no-unused-vars
  const picViewer = new Viewer(document.getElementById(domID), {
    inline: false,
    button: false,
    navbar: false,
    title: false,
    toolbar: false,
    tooltip: false,
    transition: false,
    keyboard: false
  });
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

.button-full-article {
  padding-left: 30px;
  border: none;
  background: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 10%);
  color: #175199;
  position: absolute;
  bottom: 0;
  right: 0;
}

.full-article-content {
  font-size: 30px;
  line-height: 1.2;
}

:deep(.full-article-content img) {
  max-width: 100%;
}

:deep(blockquote) {
  border-left: 6px solid #D3D3D3;
  color: #646464;
  padding-left: 1em;
  margin: 1.4em 0;
}

:deep(.full-article-content p) {
  margin-top: 25px;
}

:deep(.full-article-content a) {
  border-bottom: 2px solid #808080;
}

.article-content-summary-container {
  position: relative;
}

:deep(.hljs) {
  background: #F6F6F6;
  padding: 20px;
}

.article-title-tag-container {
  width: 100%;
}

.article-tag {
  margin-right: 15px;
  transform: translate(0, -22%);
}

</style>