<template>
  <div class="container">
    <van-image width="100%" height="100%" fit="cover" :src="coverUrl"/>
    <div class="article-content-container">
      <div class="article-title">{{ article.title }}</div>
      <div class="article-update-time">编辑于 {{ updateTime }}</div>
      <AuthorInfoBanner :avatarSrc="avatarUrl" :name="authorName"
                        :signature="authorSign" class="author-info-banner"/>
      <div class="full-article-content" v-html="article.content" id="articleContent"></div>
    </div>
  </div>
  <ArticleComment class="article-comment"/>
</template>

<script setup>
import {getFullArticleApi, useConvertSize} from "@/hooks/article";
import {useRoute} from "vue-router";
import {shallowRef, computed, nextTick} from "vue";
import {API_PORTAL_IMAGE_PATH} from "@/utils/constants";
import AuthorInfoBanner from "@/components/AuthorInfoBanner.vue";
import {provideHeaderTitle} from "@/utils/store";
import ArticleComment from "@/components/comment/ArticleComment.vue";
import Viewer from 'viewerjs'
import hljs from 'highlight.js'

//获取文章数据
const route = useRoute()
const coverUrl = shallowRef('')
const article = shallowRef({})
const avatarUrl = shallowRef('')
const authorName = shallowRef('')
const authorSign = shallowRef('')
getFullArticleApi(route.params.id).then(({data: response}) => {
  coverUrl.value = `${API_PORTAL_IMAGE_PATH}/${response.data.cover}`
  article.value = response.data
  provideHeaderTitle.value = response.data.title
  avatarUrl.value = `${API_PORTAL_IMAGE_PATH}/${response.data.user.avatar}`
  authorName.value = response.data.user.userName
  authorSign.value = response.data.user.sign
  nextTick(() => {
    document.title = `${article.value.title} - 卧卷`
    useConvertSize(document.getElementById('articleContent'))
    initPicViewer()
    hljs.highlightAll()
  })
})
const updateTime = computed(() => {
  if (article.value.updateTime !== undefined) {
    let index = article.value.updateTime.lastIndexOf(':');
    return article.value.updateTime.slice(0, index)
  }
  return ''
})

function initPicViewer() {
  // eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
  const picViewer = new Viewer(document.getElementById('articleContent'), {
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
}

.article-content-container {
  padding: 0 32px 32px;
}

.article-title {
  color: #121212;
  font-size: 45px;
  font-weight: 700;
  margin: 32px 0;
}

.article-update-time {
  color: #8590a6;
  font-size: 30px;
  font-weight: 700;
}

.author-info-banner {
  margin-top: 40px;
  padding: 32px 0 16px;
  border-top-width: 1px;
  border-top-style: solid;
  border-top-color: rgba(211, 211, 211, 0.5);
}

.article-comment {
  padding: 30px 32px 150px;
  margin-top: 20px;
  background: white;
}

</style>