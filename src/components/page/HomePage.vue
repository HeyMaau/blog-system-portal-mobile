<template>
  <SkeletonView :number="5" :row="2" v-if="loading"/>
  <ArticleList :articleList="articleList" v-else/>
</template>

<script setup>
import ArticleList from "@/components/ArticleList";
import {useGetArticles, useInfiniteScroll, useSkeletonAndEmpty} from "@/hooks/article";
import {shallowReactive, onBeforeMount} from "vue";
import {INFINITE_SCROLL_THRESHOLD} from "@/utils/constants";
import SkeletonView from "@/components/SkeletonView";

//获取文章数据
let page = 1;
let size = 5;
const articleList = shallowReactive([])
let noMore

noMore = useGetArticles(page, size, null, articleList)

//使用骨架屏
const {loading} = useSkeletonAndEmpty(articleList)

//无限滚动
useInfiniteScroll(INFINITE_SCROLL_THRESHOLD, () => {
  if (!noMore.value) {
    noMore = useGetArticles(++page, size, null, articleList)
  }
})

//设置网页title
onBeforeMount(() => {
  document.title = '首页 - 卧卷'
})

</script>

<style scoped>

</style>