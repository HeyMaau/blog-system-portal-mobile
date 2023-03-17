<template>
  <ArticleList :articleList="articleList"/>
</template>

<script setup>
import ArticleList from "@/components/ArticleList";
import {useGetArticles} from "@/hooks/article";
import {useRoute, onBeforeRouteUpdate} from 'vue-router'
import {shallowReactive} from "vue";

//获取文章数据
const route = useRoute()
let page = 1;
let size = 10;
const articleList = shallowReactive([])
useGetArticles(page, size, route.params.id, articleList)

onBeforeRouteUpdate((to) => {
  //先清空数组
  articleList.length = 0
  useGetArticles(page, size, to.params.id, articleList)
})

</script>

<style scoped>

</style>