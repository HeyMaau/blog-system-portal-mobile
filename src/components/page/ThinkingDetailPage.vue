<script setup lang="ts">
import SkeletonView4Thinking from "../../components/SkeletonView4Thinking.vue";
import {ref, shallowRef} from "vue";
import ThinkingList from "../../components/ThinkingList.vue";
import {getThinkingApi, splitImageStr} from "../../hooks/thinking.js";
import {useRoute} from "vue-router";
import EmptyView from "../../components/EmptyView.vue";
import {CODE_SUCCESS} from "../../utils/constants.js";


const loading = ref(true)
const loadingTimeout = ref(false)
const empty = ref(false)
const finish = ref(false)
const thinkingList = shallowRef([])
const route = useRoute();

getThinking()
setLoadingTimeout()

function getThinking() {
  getThinkingApi(route.params.id).then(({data: response}) => {
    if (response.code === CODE_SUCCESS) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-expect-error
      thinkingList.value.push(response.data)
      thinkingList.value.forEach(item => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-expect-error
        if (item.images !== null && item.images.length !== 0) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-expect-error
          item.images = splitImageStr(item.images)
        }
      })
    } else {
      if (loadingTimeout.value) {
        empty.value = true
      }
    }
    if (loadingTimeout.value) {
      loading.value = false
    }
    finish.value = true
  }).catch(() => {
    finish.value = true
    if (loadingTimeout.value) {
      loading.value = false
      empty.value = true
    }
  })
}

function setLoadingTimeout() {
  setTimeout(() => {
    loadingTimeout.value = true
    if (thinkingList.value.length > 0) {
      loading.value = false
    } else {
      if (finish.value) {
        loading.value = false
        empty.value = true
      }
    }
  }, 500)
}

</script>

<template>
  <div class="thinking-detail-page-container">
    <SkeletonView4Thinking :number="1" v-if="loading"/>
    <ThinkingList :thinkingList="thinkingList" v-if="!loading && !empty" :alwaysShowComment="true"
                  :hideCommentButton="true"/>
    <EmptyView v-if="empty" message="想法不存在噢"/>
  </div>
</template>

<style scoped>

.thinking-detail-page-container {
  background: white;
  height: 100vh;
}

</style>
