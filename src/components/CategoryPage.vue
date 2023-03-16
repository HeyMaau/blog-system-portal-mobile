<template>
  <ArticleList :articleList="articleList"/>
</template>

<script setup>
import ArticleList from "@/components/ArticleList";
import {useGetArticles} from "@/hooks/article";
import {useRoute, onBeforeRouteUpdate} from 'vue-router'

//获取文章数据
const route = useRoute()
let articleList = useGetArticles(1, 10, route.params.id)


onBeforeRouteUpdate((to) => {
  articleList = useGetArticles(1, 10, to.params.id)
})

</script>

<style scoped>

</style>