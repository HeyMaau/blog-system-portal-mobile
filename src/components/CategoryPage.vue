<template>
  <ArticleList :articleList="articleList"/>
</template>

<script setup>
import ArticleList from "@/components/ArticleList";
import {getArticlesApi} from "@/hooks/article";
import {useRoute, onBeforeRouteUpdate} from 'vue-router'
import {ARTICLE_SUMMARY_LENGTH, CODE_SUCCESS} from "@/utils/constants";
import {shallowRef} from "vue";

//获取文章数据
const route = useRoute()
let articleList = shallowRef([])
getArticleList(route.params.id)

function getArticleList(categoryID) {
  console.log(categoryID)
  getArticlesApi(1, 10, categoryID).then(({data: response}) => {
    if (response.code === CODE_SUCCESS) {
      articleList.value = response.data.data
      trimArticleSummary(articleList.value)
    }
  })
}

function trimArticleSummary(list) {
  if (list !== undefined) {
    list.forEach(item => {
      if (item.content.length > ARTICLE_SUMMARY_LENGTH) {
        item.content = item.content.slice(0, ARTICLE_SUMMARY_LENGTH) + '...'
      }
    })
  }
}

onBeforeRouteUpdate((to) => {
  getArticleList(to.params.id)
})

</script>

<style scoped>

</style>