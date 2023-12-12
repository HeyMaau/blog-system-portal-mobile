<template>
  <div class="thinking-list-container">
    <div class="thinking-list-item-container" v-for="item in thinkingList" :key="item.id">
      <div class="author-info-container">
        <img :src="`${baseImageUrl}/${item.user.avatar}`" class="author-avatar"/>
        <div class="author-name-sign-container">
          <span class="author-name">{{ item.user.userName }}</span>
          <span class="author-sign">{{ item.user.sign }}</span>
        </div>
      </div>
      <ThinkingPictureList :id="`thinking-picture-list-${item.id}`" :pictureList="item.images"
                           class="thinking-picture-list"
                           v-if="item.images !== null && item.images.length !== 0"
                           @click.capture="initPicViewer(item.id)"/>
      <div class="thinking-content-container">
        <div class="thinking-title">{{ item.title }}</div>
        <div class="thinking-content">{{ item.content }}</div>
      </div>
      <div class="thinking-update-time">发布于 {{ item.updateTime }}</div>
      <div class="thinking-operating-area">
        <div class="thinking-add-comment-button" @click="commentListState[item.id] = !commentListState[item.id]">
          <van-icon name="chat-o"/>
          <span class="thinking-operating-text">{{
              commentTotalList[item.id] === 0 ? '评论' : commentTotalList[item.id]
            }}</span>
        </div>
      </div>
      <ThinkingComment :id="item.id" v-show="commentListState[item.id]" @onCommentUpdate="handleCommentUpdate"/>
    </div>
  </div>
</template>

<script setup>
import {defineProps, nextTick, shallowReactive, watch} from 'vue'
import ThinkingPictureList from "@/components/ThinkingPictureList.vue";
import {API_PORTAL_IMAGE_PATH} from "@/utils/constants";
import ThinkingComment from "@/components/comment/ThinkingComment.vue";
import Viewer from "viewerjs";

const props = defineProps({
  thinkingList: Array
})

const baseImageUrl = API_PORTAL_IMAGE_PATH

const commentListState = shallowReactive({})

function initCommentListState() {
  props.thinkingList.forEach(value => {
    commentListState[value.id] = false
  })
}

watch(props, newValue => {
  if (newValue.thinkingList.length !== 0) {
    initCommentListState()
  }
})

let commentTotalList = shallowReactive({})

function handleCommentUpdate(id, total) {
  commentTotalList[id] = total
}

//初始化viewerjs
let picViewer = null
let lastInitPicViewerID

function initPicViewer(id) {
  if (id === lastInitPicViewerID) {
    return
  }
  if (picViewer !== null) {
    picViewer.destroy()
  }
  nextTick(() => {
    picViewer = new Viewer(document.getElementById(`thinking-picture-list-${id}`), {
      inline: false,
      button: false,
      navbar: false,
      title: false,
      toolbar: {
        zoomIn: false,
        zoomOut: false,
        reset: false,
        prev: {
          show: true,
          size: "large"
        },
        next: {
          show: true,
          size: "large"
        },
        play: false,
        rotateLeft: false,
        rotateRight: false,
        flipHorizontal: false,
        flipVertical: false
      },
      tooltip: false,
      transition: true,
      keyboard: false,
      loop: false
    });
    lastInitPicViewerID = id
  })
}

</script>

<style scoped>

.thinking-list-container {
  position: relative;
}

.thinking-list-item-container {
  padding: 15px 31px;
}

.thinking-list-item-container:not(:last-child)::after {
  content: "";
  border-bottom: 3px solid #F6F6F6;
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 32px;
}

.author-info-container {
  display: flex;
  align-items: center;
  margin-bottom: 18px;
}

.author-avatar {
  width: 73px;
  height: 73px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 27px;
}

.author-name-sign-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.author-name {
  color: #444;
  font-weight: 500;
  font-synthesis: style;
}

.author-sign {
  color: #646464;
  font-size: 27px;
}

.thinking-picture-list {
  margin-bottom: 20px;
}

.thinking-content-container {
  line-height: 1.6;
  font-size: 33px;
}

.thinking-title {
  font-weight: bold;
  color: #056de8;
}

.thinking-content {
  white-space: pre-wrap;
}

.thinking-update-time {
  font-size: 27px;
  color: #8590a6;
  margin-top: 20px;
}

.thinking-operating-area {
  display: flex;
  padding: 15px 0;
}

.thinking-add-comment-button {
  display: flex;
  align-items: center;
  padding: 10px 0;
  gap: 0 5px;
  color: #8590a6;
}

.thinking-operating-text {
  font-size: 27px;
}

</style>