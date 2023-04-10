<template>
  <SearchList :searchList="searchList"/>
</template>

<script setup>
import {doSearchApi} from "@/hooks/search";
import {CODE_SUCCESS} from "@/utils/constants";
import {ref} from "vue";
import {useRoute, onBeforeRouteUpdate} from "vue-router";
import {showFailToast} from "vant";
import SearchList from "@/components/SearchList";

const searchList = ref([])
const route = useRoute()

let page = 1
let size = 5

doSearch(route.query.keyword, page, size)

function doSearch(keyword, page, size) {
  doSearchApi(keyword, page, size).then(({data: response}) => {
    if (response.code === CODE_SUCCESS) {
      searchList.value = response.data.data
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

</script>

<style scoped>

</style>