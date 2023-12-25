<template>
  <SkeletonView :number="5" :row="2" v-if="loading"/>
  <SearchList :searchList="searchList" v-if="!loading && !empty"/>
  <EmptyView class="empty-view" v-if="empty" message="暂无搜索结果"/>
</template>

<script setup>
import SkeletonView from "@/components/SkeletonView.vue"
import EmptyView from "@/components/EmptyView.vue"
import {doSearchApi} from "@/hooks/search";
import {CODE_SUCCESS} from "@/utils/constants";
import {onBeforeMount, shallowRef} from "vue";
import {useRoute, onBeforeRouteUpdate} from "vue-router";
import {showFailToast} from "vant";
import SearchList from "@/components/SearchList.vue";
import {useSkeletonAndEmpty2} from "@/hooks/article";
import {provideNoMore} from "@/utils/store";
import {useCommitVisitRecord} from "@/hooks/statistics-api";
import {RecordEvent, RecordPage} from "@/utils/StatisticsConstants";

const searchList = shallowRef([])
const route = useRoute()

let page = 1
let size = 5

doSearch(route.query.keyword, page, size)

function doSearch(keyword, page, size) {
  provideNoMore.value = false
  doSearchApi(keyword, page, size).then(({data: response}) => {
    if (response.code === CODE_SUCCESS) {
      searchList.value = response.data.data
      provideNoMore.value = response.data.noMore
    } else {
      showFailToast(response.message)
    }
  })
}

onBeforeRouteUpdate(to => {
  page = 1
  size = 5
  doSearch(to.query.keyword, page, size)
})

//更新网页title
onBeforeMount(() => {
  document.title = `${route.query.keyword} | 搜索结果 - 卧卷`
})

//使用骨架屏
const {loading, empty} = useSkeletonAndEmpty2(searchList)

useCommitVisitRecord(RecordPage.PAGE_NAME_SEARCH_PAGE, RecordEvent.EVENT_NAME_VISIT)

</script>

<style scoped>

</style>