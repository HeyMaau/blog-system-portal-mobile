<template>
  <div class="container">
    <van-image height="30" width="30" src="/favicon.ico" class="logo"/>
    <van-search v-model="value" placeholder="请输入搜索关键词" class="search-bar"/>
    <van-image height="30px" width="30px" src="/favicon.ico" class="avatar" round/>
    <van-icon name="bars" size="25" class="menu-icon" @click="showPopup"/>
    <van-popup
        v-model:show="show"
        position="right"
        :style="{ width: '70%', height: '100%' }">
      <van-cell title="首页" is-link/>
      <van-collapse v-model="activeNames">
        <van-collapse-item title="文章" name="1">
          <van-cell title="Android" is-link/>
          <van-cell title="Web" is-link/>
        </van-collapse-item>
      </van-collapse>
      <van-cell title="想法" is-link/>
      <van-cell title="联系我" is-link/>
    </van-popup>
  </div>
</template>

<script>
import {ref} from "vue";

export default {
  name: "HomePageHeader",
  setup() {
    //右上角菜单按钮
    const show = ref(false);
    const showPopup = () => {
      show.value = true;
    };
    //搜索栏
    const value = ref('');
    //弹出层
    const activeNames = ref(['1']);

    return {
      show,
      showPopup,
      activeNames,
      value
    };
  },
}
</script>

<style scoped>

.logo {
  padding-left: 30px;
}

.menu-icon {
  margin-left: 50px;
  padding: 10px;
}

.avatar {
  background-color: dodgerblue;
  margin-left: 100px;
}

.container {
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
  width: 370px;
}

:deep(.van-search__content) {
  border-radius: 16px;
}

</style>