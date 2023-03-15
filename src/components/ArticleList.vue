<template>
  <div class="container" v-for="item in articleList" :key="item.id">
    <router-link :to="`/article/${item.id}`" class="article-title">
      {{item.title}}
    </router-link>
    <div class="rich-content-container">
      <van-image src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" width="100%" height="150px" fit="cover"/>
      <div class="article-content-summary-container">
        <span>{{item.content}}</span>
        <button class="button-full-article">阅读全文
          <van-icon name="arrow-down"/>
        </button>
      </div>
    </div>
  </div>
  <div class="container">
    <router-link to="/article/id" class="article-title">
      青春深圳发文称「有毒的二次元，正在『祸害』一代人」，为何会产生这一现象？二次元文化属于文化入侵吗？
    </router-link>
    <div class="rich-content-container">
      <van-image src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" width="100%" height="150px" fit="cover"/>
      <div class="article-content-summary-container">
        <span>阻断碳水后 我50天瘦了30斤。不胖到极致，真的难以体会50天甩肉30斤...</span>
        <button class="button-full-article">阅读全文
          <van-icon name="arrow-down"/>
        </button>
      </div>
    </div>
  </div>
  <div class="container">
    <router-link to="/article/id" class="article-title">
      青春深圳发文称「有毒的二次元，正在『祸害』一代人」，为何会产生这一现象？二次元文化属于文化入侵吗？
    </router-link>
    <div class="rich-content-container">
      <van-image src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" width="100%" height="150px" fit="cover"/>
      <div class="article-content-summary-container">
        <span>阻断碳水后 我50天瘦了30斤。不胖到极致，真的难以体会50天甩肉30斤...</span>
        <button class="button-full-article">阅读全文
          <van-icon name="arrow-down"/>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import {defineProps} from "vue";

defineProps({
  articleList: Array
})

</script>

<style scoped>

.container {
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  margin-bottom: 20px;
}

.article-title {
  color: #121212;
  font-size: 40px;
  text-align: left;
  font-weight: 500;
  line-height: 1.4;
  width: 100%;
}

.rich-content-container {
  width: 100%;
  margin-top: 20px;
}

.article-content-summary-container {
  width: 100%;
  font-size: 35px;
  line-height: 1.6;
  word-break: break-word;
}

.button-full-article {
  border: none;
  background: white;
  color: #175199;
}

</style>