<template>
  <div class="container" :id="`article_${item.id}`" v-for="item in articleList" :key="item.id">
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
        <van-image :src="item.cover" width="100%" height="150px" fit="cover" lazy-load/>
        <div class="article-content-summary-container">
          <span class="van-multi-ellipsis--l2">{{ item.content }}</span>
          <button class="button-full-article" @click="showFullArticle(item.id)">阅读全文
            <van-icon name="arrow-down"/>
          </button>
        </div>
      </div>
      <div v-else>
        <van-image :src="item.cover" width="100%" fit="cover" lazy-load/>
        <div class="full-article-content" v-html="fullArticleContent[item.id]" :id="`fullArticle_${item.id}`"></div>
        <div class="article-update-time">编辑于 {{ item.updateTime }}</div>
        <button class="button-hide-full-article" @click="hideFullArticle(item.id)">收起
          <van-icon name="arrow-up"/>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import {defineProps, nextTick, ref, watch, shallowReactive} from "vue";
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

function hideFullArticle(articleID) {
  collapseState.value[articleID] = true;
  document.getElementById(`article_${articleID}`).scrollIntoView({
    behavior: "instant",
    block: "start"
  })
}

function initPicViewer(domID) {
  // eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
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

<style src="@/assets/css/article.css" scoped/>
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

.article-content-summary-container {
  position: relative;
}

.article-title-tag-container {
  width: 100%;
}

.article-tag {
  margin-right: 15px;
  transform: translate(0, -22%);
}

.article-update-time {
  color: #8590a6;
  font-size: 28px;
  display: inline-block;
  margin-top: 30px;
}

.button-hide-full-article {
  display: inline;
  background: none rgb(248, 248, 250);
  border: unset;
  padding: 0 12px 0 24px;
  font-size: 28px;
  line-height: 64px;
  text-align: center;
  cursor: pointer;
  border-radius: 6px;
  height: 64px;
  color: rgb(132, 145, 165);
  font-weight: 500;
  position: sticky;
  bottom: 160px;
  float: right;
}

</style>