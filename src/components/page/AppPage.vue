<script setup lang="ts">

import {provideHeaderTitle} from "@/utils/store.js";
import {getAppDownloadUrlApi} from "@/hooks/app.ts";
import {CODE_SUCCESS} from "@/utils/constants.js";
import {ref} from "vue";
import {showToast} from "vant";

provideHeaderTitle.value = 'APP'

getAppDownloadUrl()

const versionName = ref<string>("")
let downloadUrl = null

function getAppDownloadUrl() {
  getAppDownloadUrlApi().then(({data: response}) => {
    if (response.code === CODE_SUCCESS) {
      versionName.value = response.data.versionName
      downloadUrl = response.data.downloadUrl
    } else {
      showToast({
        message: '获取APP信息错误',
        position: 'bottom'
      })
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  }).catch(reason => {
    showToast({
      message: '获取APP信息错误',
      position: 'bottom'
    })
  })
}

function openDownloadUrl() {
  if (downloadUrl !== null) {
    location.href = downloadUrl
  }
}

</script>

<template>
  <div class="container">
    <div class="icon-info">
      <svg t="1724920185562" class="icon" viewBox="0 0 1152 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
           p-id="10390" width="256" height="256">
        <path
            d="M841.1 603.86a48 48 0 1 1 48-48 48 48 0 0 1-48 48m-530.2 0a48 48 0 1 1 48-48 48 48 0 0 1-48 48m547.4-288.96l95.88-166a20 20 0 1 0-34.54-20l-97.08 168.14a602.5 602.5 0 0 0-493.12 0l-97.08-168.14a20 20 0 1 0-34.54 20l95.88 166C129.06 404.44 16.48 571.1 0 768h1152c-16.48-196.9-129.08-363.56-293.7-453.1"
            p-id="10391" fill="#4faf53"></path>
      </svg>
      <div class="info">
        <div class="title">
          卧卷Android APP已发布
        </div>
        <div class="version">
          当前最新版本：
          <span class="version-name">
            {{ versionName }}
          </span>
        </div>
      </div>
      <van-button type="primary" class="download-button" @click="openDownloadUrl">点击下载</van-button>
    </div>
  </div>
</template>

<style scoped>

.container {
  background: white;
  height: 100vh;
  padding-top: 100px;
  width: 100vw;
}

.icon-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.icon {
  width: 300px;
  height: 300px;
}

.info {
  display: flex;
  flex-direction: column;
  align-items: start;
}

.title, .version {
  font-size: 40px;
  line-height: 2.0;
}

.version-name {
  color: dodgerblue;
}

.download-button {
  margin-top: 50px;
  width: 500px;
}

</style>