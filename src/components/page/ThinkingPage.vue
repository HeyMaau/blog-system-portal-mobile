<template>
  <SkeletonView4Thinking class="thinking-skeleton-view" :number="4" v-if="loading"/>
  <EmptyView class="empty-view" v-if="empty" message="在写了在写了！！！"/>
  <ThinkingList :thinkingList="thinkingList" class="thinking-list" v-if="!loading && !empty"/>
  <van-pagination v-model="currentPage" :total-items="total" :show-page-size="3" :items-per-page="currentSize"
                  v-if="!loading && !empty"
                  force-ellipses @change="handlePageChange">
    <template #prev-text>
      <van-icon name="arrow-left"/>
    </template>
    <template #next-text>
      <van-icon name="arrow"/>
    </template>
  </van-pagination>
</template>

<script setup>
import {provideHeaderTitle} from "@/utils/store";
import {onBeforeMount, shallowRef} from "vue";
import ThinkingList from "@/components/ThinkingList";
import {getThinkingListApi, splitImageStr} from "@/hooks/thinking";
import {CODE_SUCCESS} from "@/utils/constants";
import SkeletonView4Thinking from "@/components/SkeletonView4Thinking";
import {useSkeletonAndEmpty2} from "@/hooks/article";

provideHeaderTitle.value = '想法'

//设置网页title
// eslint-disable-next-line
onBeforeMount(() => {
  document.title = '想法 - 卧卷'
})

//获取想法数据
let currentPage = shallowRef(1)
let currentSize = shallowRef(5)
let total = shallowRef(0)
const thinkingList = shallowRef([])

getThinkingList()

function getThinkingList() {
  getThinkingListApi(currentPage.value, currentSize.value).then(({data: response}) => {
    if (response.code === CODE_SUCCESS) {
      response.data.data.forEach(item => {
        if (item.images !== null && item.images.length !== 0) {
          item.images = splitImageStr(item.images)
        }
      })
      thinkingList.value = response.data.data
      total = response.data.total
    }
  })
}

function handlePageChange(page) {
  currentPage.value = page
  getThinkingList()
  window.scrollTo(0, 0)
}

const {loading, empty} = useSkeletonAndEmpty2(thinkingList)

</script>

<style scoped>

.thinking-list {
  background-color: white;
}

.thinking-skeleton-view {
  width: 100%;
}

</style>