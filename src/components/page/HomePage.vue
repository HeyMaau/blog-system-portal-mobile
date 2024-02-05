<template>
  <SkeletonView :number="5" :row="2" v-if="loading"/>
  <ArticleList :articleList="articleList" v-else/>
</template>

<script setup>
import ArticleList from "@/components/ArticleList.vue";
import {useGetArticles, useInfiniteScroll, useSkeletonAndEmpty} from "@/hooks/article";
import {shallowReactive, onBeforeMount} from "vue";
import {INFINITE_SCROLL_THRESHOLD} from "@/utils/constants";
import SkeletonView from "@/components/SkeletonView.vue";
import {useCommitVisitRecord} from "@/hooks/statistics-api";
import {RecordPage, RecordEvent} from "@/utils/StatisticsConstants";

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

useCommitVisitRecord(RecordPage.PAGE_NAME_MAIN_PAGE, null, RecordEvent.EVENT_NAME_VISIT)

</script>

<style scoped>

</style>