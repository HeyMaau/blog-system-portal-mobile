<template>
  <HomePageHeader :showAvatar="showAvatar" :title="title"/>
  <router-view/>
</template>

<script setup>
import HomePageHeader from "@/components/HomePageHeader";
import {ref} from "vue";
import {onBeforeRouteUpdate, useRoute} from "vue-router/dist/vue-router";
import {useGetTitle} from "@/hooks/getTitle";

//控制头像的显示与隐藏及更新头部标题
const showAvatar = ref(true)
const route = useRoute()
isShowAvatar(route.path)
const title = ref(useGetTitle(route.path))
onBeforeRouteUpdate((to) => {
  isShowAvatar(to.path)
  title.value = useGetTitle(to.path)
})

function isShowAvatar(path) {
  showAvatar.value = path === '/';
}


</script>

<style scoped>

</style>