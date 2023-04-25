<template>
  <van-sticky>
    <CommonHeader :title="provideHeaderTitle"/>
  </van-sticky>
  <router-view/>
  <van-back-top/>
</template>

<script setup>
import CommonHeader from "@/components/CommonHeader";
import {provideHeaderTitle} from "@/utils/store";
import VConsole from 'vconsole'

// eslint-disable-next-line no-unused-vars
const vConsole = new VConsole()

</script>

<style scoped>

</style>