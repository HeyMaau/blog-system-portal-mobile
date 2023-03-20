<template>
  <van-sticky>
    <CommonHeader :showAvatar="showAvatar" :title="title"/>
  </van-sticky>
  <router-view/>
  <van-back-top/>
</template>

<script setup>
import CommonHeader from "@/components/CommonHeader";
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