<template>
  <SkeletonView :number="5" :row="2" v-if="loading"/>
  <ArticleList :articleList="articleList" v-if="!loading && !empty"/>
  <EmptyView class="empty-view" v-if="empty" message="在写了在写了！！！"/>
</template>

<script setup>
import ArticleList from "@/components/ArticleList.vue";
import {useGetArticles, useInfiniteScroll, useSkeletonAndEmpty} from "@/hooks/article";
import {onBeforeRouteUpdate, useRoute} from 'vue-router'
import {onBeforeMount, shallowReactive} from "vue";
import {INFINITE_SCROLL_THRESHOLD} from "@/utils/constants";
import {setCategoryName} from "@/hooks/header";
import EmptyView from "@/components/EmptyView.vue";
import {provideHeaderTitle} from "@/utils/store";
import SkeletonView from "@/components/SkeletonView.vue";
import {useCommitVisitRecord, useCommitVisitRecordOnBeforeRouteUpdate} from "@/hooks/statistics-api";
import {RecordEvent, RecordPage} from "@/utils/StatisticsConstants";

//获取文章数据
const route = useRoute()
let page = 1;
let size = 5;
const articleList = shallowReactive([])

let noMore = useGetArticles(page, size, route.params.id, articleList)

//使用骨架屏
const {loading, empty} = useSkeletonAndEmpty(articleList)

//获取分类名称并设置
setCategoryName(route.params.id);

onBeforeRouteUpdate((to) => {
  //先清空数组
  articleList.length = 0
  noMore = useGetArticles(page, size, to.params.id, articleList)
  setCategoryName(to.params.id)
})

//无限滚动
useInfiniteScroll(INFINITE_SCROLL_THRESHOLD, () => {
  if (!noMore.value) {
    noMore = useGetArticles(++page, size, route.params.id, articleList)
  }
})

//设置网页title
onBeforeMount(() => {
  document.title = `${provideHeaderTitle.value} | 分类 - 卧卷`
})

useCommitVisitRecord(RecordPage.PAGE_NAME_CATEGORY_PAGE + route.params.id, null, RecordEvent.EVENT_NAME_VISIT)
useCommitVisitRecordOnBeforeRouteUpdate(RecordPage.PAGE_NAME_CATEGORY_PAGE, null, RecordEvent.EVENT_NAME_VISIT)

</script>

<style scoped>
.empty-view {
  margin-top: 50px;
}

</style>