<template>
  <div class="container">
    <van-image :src="`${publicPath}logo.png`" class="logo" height="70%" @click="jump2HomePage"/>
    <van-search v-model="value" placeholder="搜索" :class="showMenu? 'search-bar': 'search-bar-long'"
                @search="doSearch"/>
    <van-image height="30" width="30" :src="avatarUrl" class="avatar" round v-show="showAvatar" @click="jump2AboutMe"/>
    <span v-show="!showAvatar && showMenu" class="title van-ellipsis">{{ title }}</span>
    <van-icon name="bars" size="25" class="menu-icon" @click="showPopup" v-show="showMenu"/>
    <button v-show="!showMenu" class="cancel-button" @click="goBack">取消</button>
    <van-popup
        v-model:show="show"
        position="right"
        :style="{ width: '60%', height: '100%' }">
      <van-cell title="首页" is-link to="/" @click="closePopup"/>
      <van-collapse v-model="activeNames">
        <van-collapse-item title="文章" name="1">
          <van-cell v-for="item in categoryList" :key="item.id" :title="item.name" :to="`/category/${item.id}`"
                    is-link @click="closePopup"/>
        </van-collapse-item>
      </van-collapse>
      <van-cell title="想法" is-link to="/thinking" @click="closePopup"/>
      <van-cell title="联系我" is-link to="/feedback" @click="closePopup"/>
      <van-cell title="关于我" is-link to="/about" @click="closePopup"/>
    </van-popup>
  </div>
</template>

<script setup>
import {ref, defineProps, shallowRef, watch} from "vue";
import {useRouter} from 'vue-router'
import {getCategoriesApi} from "@/hooks/article";
import {API_PORTAL_IMAGE_PATH, CODE_SUCCESS, KEY_CATEGORY_LIST} from "@/utils/constants";
import {showAvatar, showMenu} from "@/hooks/header";
import {useGetAuthorInfo} from "@/hooks/author";
import {provideAuthorInfo} from "@/utils/store";

const publicPath = process.env.BASE_URL

//作者头像
const avatarUrl = shallowRef(`${API_PORTAL_IMAGE_PATH}/${provideAuthorInfo.value.avatar}`)
watch(provideAuthorInfo, (newValue) => {
  console.log(newValue)
  avatarUrl.value = `${API_PORTAL_IMAGE_PATH}/${provideAuthorInfo.value.avatar}`
})

//接收props
defineProps({
  title: String
})
//获取文章分类信息
let categoryList = shallowRef([])
getCategoriesApi().then(({data: response}) => {
  if (response.code === CODE_SUCCESS) {
    categoryList.value = response.data
    sessionStorage.setItem(KEY_CATEGORY_LIST, JSON.stringify(response.data))
  }
})
//右上角菜单按钮
const show = ref(false);
const showPopup = () => {
  show.value = true;
};
//搜索栏
const value = ref('');
//弹出层
const activeNames = ref(['1']);

//关闭弹出层
function closePopup() {
  show.value = false
}

const router = useRouter()

//搜索
function doSearch(keyword) {
  router.push({path: '/search', query: {keyword}})
}

//返回上一页
function goBack() {
  router.go(-1)
}

//获取作者信息
useGetAuthorInfo()

//点击头像事件
function jump2AboutMe() {
  router.push('/about')
}

//点击LOGO事件
function jump2HomePage() {
  router.push('/')
}

</script>

<style scoped>

.logo {
  flex-shrink: 0;
  margin-left: 20px;
}

.menu-icon {
  position: absolute;
  padding: 20px;
  left: 660px;
  flex-shrink: 0;
}

.avatar {
  margin-left: 50px;
  flex-shrink: 0;
}

.container {
  position: relative;
  display: flex;
  align-items: center;
  height: 105px;
  background: white;
  border-bottom: 1px solid hsla(0, 0%, 7%, .06);
}

:deep(.van-dropdown-menu__bar) {
  height: 100%;
  background: none;
  box-shadow: none;
}

.search-bar {
  width: 280px;
  padding: 0;
  margin-left: 10px;
}

.search-bar-long {
  width: 380px;
  padding: 0;
  margin-left: 10px;
  margin-right: 10px;
  flex-shrink: 0;
}

:deep(.van-search__content) {
  border-radius: 16px;
}

.title {
  color: dodgerblue;
  font-size: 30px;
  width: 200px;
  font-weight: bold;
  text-align: center;
  flex-shrink: 0;
  margin-right: 80px;
  margin-left: 25px;
}

.cancel-button {
  background: none;
  border: none;
  color: #056de8;
  height: 100%;
  padding: 0 20px;
  display: inline;
}

</style>