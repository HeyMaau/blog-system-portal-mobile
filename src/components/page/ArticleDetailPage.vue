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
import {computed, nextTick, shallowRef} from "vue";
import AuthorInfoBanner from "@/components/AuthorInfoBanner.vue";
import {provideHeaderTitle} from "@/utils/store";
import ArticleComment from "@/components/comment/ArticleComment.vue";
import hljs from 'highlight.js'
import {useCommitVisitRecord} from "@/hooks/statistics-api";
import {RecordEvent, RecordPage} from "@/utils/StatisticsConstants";
import {showImagePreview} from "vant";

//获取文章数据
const route = useRoute()
const coverUrl = shallowRef('')
const article = shallowRef({})
const avatarUrl = shallowRef('')
const authorName = shallowRef('')
const authorSign = shallowRef('')
getFullArticleApi(route.params.id).then(({data: response}) => {
  coverUrl.value = response.data.cover
  article.value = response.data
  provideHeaderTitle.value = response.data.title
  avatarUrl.value = response.data.user.avatar
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
  let imgElements = document.getElementById('articleContent').getElementsByTagName("img");
  for (let i = 0; i < imgElements.length; i++) {
    imgElements[i].addEventListener('click', function () {
      showImagePreview({
        images: [imgElements[i].src],
        showIndex: false,
        closeable: true
      })
    })
  }
}

useCommitVisitRecord(RecordPage.PAGE_NAME_ARTICLE_PAGE + route.params.id, null, RecordEvent.EVENT_NAME_VISIT)

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

:deep(table tr:not(:last-child)) {
  border-bottom: 1px solid silver;
}

:deep(table tr:first-child td) {
  font-weight: 600;
}

:deep(td) {
  padding: 0.6em;
}

</style>