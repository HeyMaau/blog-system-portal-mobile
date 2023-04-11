<template>
  <van-sticky>
    <CommonHeader :showAvatar="showAvatar" :title="provideHeaderTitle" :showMenu="showMenu"/>
  </van-sticky>
  <router-view/>
  <van-back-top/>
</template>

<script setup>
import CommonHeader from "@/components/CommonHeader";
import {ref} from "vue";
import {onBeforeRouteUpdate, useRoute} from "vue-router/dist/vue-router";
import {provideHeaderTitle} from "@/utils/store";
import VConsole from 'vconsole'

// eslint-disable-next-line no-unused-vars
const vConsole = new VConsole()

//控制头像的显示
const showAvatar = ref(true)
const route = useRoute()
isShowAvatar(route.path)
onBeforeRouteUpdate((to) => {
  isShowAvatar(to.path)
  isShowMenu(to.path)
})

function isShowAvatar(path) {
  showAvatar.value = path === '/';
}

//控制右上角菜单按钮是否显示
const showMenu = ref(true)

function isShowMenu(path) {
  showMenu.value = !path.startsWith('/search');
}

</script>

<style scoped>

</style>