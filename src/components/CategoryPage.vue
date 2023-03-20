<template>
  <ArticleList :articleList="articleList"/>
</template>

<script setup>
import ArticleList from "@/components/ArticleList";
import {useGetArticles, useInfiniteScroll} from "@/hooks/article";
import {useRoute, onBeforeRouteUpdate} from 'vue-router'
import {shallowReactive} from "vue";
import {INFINITE_SCROLL_THRESHOLD} from "@/utils/constants";

//获取文章数据
const route = useRoute()
let page = 1;
let size = 5;
const articleList = shallowReactive([])
let noMore

noMore = useGetArticles(page, size, route.params.id, articleList)

onBeforeRouteUpdate((to) => {
  //先清空数组
  articleList.length = 0
  useGetArticles(page, size, to.params.id, articleList)
})

//无限滚动
useInfiniteScroll(INFINITE_SCROLL_THRESHOLD, () => {
  if (!noMore.value) {
    noMore = useGetArticles(++page, size, route.params.id, articleList)
  }
})

</script>

<style scoped>

</style>