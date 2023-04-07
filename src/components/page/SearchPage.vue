<template>
  <SearchList :searchList="searchList"/>
</template>

<script setup>
import {doSearchApi} from "@/hooks/search";
import {CODE_SUCCESS} from "@/utils/constants";
import {ref} from "vue";
import {useRoute} from "vue-router";
import {showFailToast} from "vant";
import SearchList from "@/components/SearchList";

const searchList = ref([])
const route = useRoute()

doSearchApi(route.query.keyword, 1, 5).then(({data: response}) => {
  if (response.code === CODE_SUCCESS) {
    searchList.value = response.data.data
  } else {
    showFailToast(response.message)
  }
})

</script>

<style scoped>

</style>