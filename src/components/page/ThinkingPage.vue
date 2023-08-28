<template>
  <ThinkingList :thinkingList="thinkingList" class="thinking-list"/>
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
let currentPage = 1
let currentSize = 5
// eslint-disable-next-line no-unused-vars
let total = 0
const thinkingList = shallowRef([])

getThinkingList()

function getThinkingList() {
  getThinkingListApi(currentPage, currentSize).then(({data: response}) => {
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

</script>

<style scoped>

.thinking-list {
  background-color: white;
}

</style>