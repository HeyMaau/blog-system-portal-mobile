<template>
  <div class="container">
    <van-image height="30px" width="30px" src="/favicon.ico" class="logo"/>
    <van-search v-model="value" placeholder="请输入搜索关键词" class="search-bar"/>
    <van-image height="30px" width="30px" src="/favicon.ico" class="avatar" round/>
    <van-icon name="bars" size="25" class="menu-icon"/>
  </div>
</template>

<script>
import {ref} from "vue";

export default {
  name: "HomePageHeader",
  setup() {
    const value1 = ref(0);
    const option1 = [
      {text: '全部商品', value: 0},
      {text: '新款商品', value: 1},
      {text: '活动商品', value: 2},
    ];
    const value = ref('');

    return {
      value1,
      option1,
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