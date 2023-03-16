<template>
  <div class="container">
    <van-image height="30" width="30" src="/favicon.ico" class="logo"/>
    <van-search v-model="value" placeholder="请输入搜索关键词" class="search-bar"/>
    <van-image height="30" width="30" src="/favicon.ico" class="avatar" round v-show="showAvatar"/>
    <span v-show="!showAvatar" class="title van-ellipsis">{{ title }}</span>
    <van-icon name="bars" size="25" class="menu-icon" @click="showPopup"/>
    <van-popup
        v-model:show="show"
        position="right"
        :style="{ width: '60%', height: '100%' }">
      <van-cell title="首页" is-link to="/"/>
      <van-collapse v-model="activeNames">
        <van-collapse-item title="文章" name="1">
          <van-cell v-for="item in categoryList" :key="item.id" :title="item.name" :to="`/category/${item.id}`"
                    is-link/>
        </van-collapse-item>
      </van-collapse>
      <van-cell title="想法" is-link to="/thinking"/>
      <van-cell title="联系我" is-link to="/feedback"/>
    </van-popup>
  </div>
</template>

<script setup>
import {ref, defineProps, shallowRef} from "vue";
import {onBeforeRouteUpdate} from 'vue-router'
import {getCategoriesApi} from "@/hooks/article";
import {CODE_SUCCESS} from "@/utils/constants";

//接收props
defineProps({
  showAvatar: Boolean,
  title: String
})
//获取文章分类信息
let categoryList = shallowRef([])
getCategoriesApi().then(({data: response}) => {
  if (response.code === CODE_SUCCESS) {
    categoryList.value = response.data
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
//路由变化时关闭弹窗及更新标题
onBeforeRouteUpdate(() => {
  show.value = false
})

</script>

<style scoped>

.logo {
  padding-left: 30px;
}

.menu-icon {
  position: absolute;
  padding: 20px;
  left: 660px;
}

.avatar {
  background-color: dodgerblue;
  margin-left: 120px;
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
  width: 350px;
}

:deep(.van-search__content) {
  border-radius: 16px;
}

.title {
  font-size: 30px;
  width: 230px;
  font-weight: bold;
  text-align: center;
}

</style>