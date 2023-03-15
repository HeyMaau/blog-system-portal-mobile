<template>
  <ArticleList :articleList="articleList"/>
</template>

<script setup>
import ArticleList from "@/components/ArticleList";
import {getArticles} from "@/hooks/article";
import {useRoute} from 'vue-router'
import {CODE_SUCCESS} from "@/utils/constants";
import {reactive} from "vue";

//获取文章数据
const route = useRoute()
let articleList = reactive([])
getArticles(1, 10, route.params.id).then(({data: response}) => {
  if (response.code === CODE_SUCCESS) {
    articleList = reactive(response.data.data)
  }
})

</script>

<style scoped>

</style>