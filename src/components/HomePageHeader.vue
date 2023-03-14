<template>
  <div class="container">
    <van-image height="30" width="30" src="/favicon.ico" class="logo"/>
    <van-search v-model="value" placeholder="请输入搜索关键词" class="search-bar"/>
    <van-image height="30" width="30" src="/favicon.ico" class="avatar" round v-show="showAvatar"/>
    <span v-show="!showAvatar" class="title van-ellipsis">想法想法想法想法想法想法想法想法想法想法想法想法想法</span>
    <van-icon name="bars" size="25" class="menu-icon" @click="showPopup"/>
    <van-popup
        v-model:show="show"
        position="right"
        :style="{ width: '60%', height: '100%' }">
      <van-cell title="首页" is-link to="/"/>
      <van-collapse v-model="activeNames">
        <van-collapse-item title="文章" name="1">
          <van-cell title="Android" is-link/>
          <van-cell title="Web" is-link/>
        </van-collapse-item>
      </van-collapse>
      <van-cell title="想法" is-link to="/thinking"/>
      <van-cell title="联系我" is-link to="/feedback"/>
    </van-popup>
  </div>
</template>

<script setup>
import {ref} from "vue";
import {useRoute, onBeforeRouteUpdate} from 'vue-router'

//右上角菜单按钮
const show = ref(false);
const showPopup = () => {
  show.value = true;
};
//搜索栏
const value = ref('');
//弹出层
const activeNames = ref(['1']);
//控制头像的显示与隐藏
const showAvatar = ref(true)
const route = useRoute()
isShowAvatar(route.path)
onBeforeRouteUpdate((to) => {
  isShowAvatar(to.path)
  show.value = false
})

function isShowAvatar(path) {
  showAvatar.value = path === '/';
}


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
  height: 100px;
  background: white;
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
}

</style>