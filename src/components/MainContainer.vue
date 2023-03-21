<template>
  <van-sticky>
    <CommonHeader :showAvatar="showAvatar" :title="provideHeaderTitle"/>
  </van-sticky>
  <router-view/>
  <van-back-top/>
</template>

<script setup>
import CommonHeader from "@/components/CommonHeader";
import {ref} from "vue";
import {onBeforeRouteUpdate, useRoute} from "vue-router/dist/vue-router";
import {provideHeaderTitle} from "@/utils/store";

//控制头像的显示
const showAvatar = ref(true)
const route = useRoute()
isShowAvatar(route.path)
onBeforeRouteUpdate((to) => {
  isShowAvatar(to.path)
})

function isShowAvatar(path) {
  showAvatar.value = path === '/';
}


</script>

<style scoped>

</style>