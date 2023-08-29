<template>
  <ThinkingList :thinkingList="thinkingList" class="thinking-list"/>
  <van-pagination v-model="currentPage" :total-items="total" :show-page-size="3" :items-per-page="currentSize"
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

</script>

<style scoped>

.thinking-list {
  background-color: white;
}

</style>