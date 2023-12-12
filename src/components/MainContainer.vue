<template>
  <van-sticky>
    <CommonHeader :title="provideHeaderTitle"/>
  </van-sticky>
  <router-view/>
  <van-back-top/>
</template>

<script setup>
import CommonHeader from "@/components/CommonHeader.vue";
import {provideHeaderTitle} from "@/utils/store";

</script>

<style scoped>

</style>