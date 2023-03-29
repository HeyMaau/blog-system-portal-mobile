<template>
  <div class="publish-comment-container" ref="publishCommentRef">
    <textarea class="comment-input-area" ref="inputContentRef" rows="1" placeholder="请输入评论内容"
              v-model="comment.content"></textarea>
    <div v-show="showFull">
      <div class="border-top-padding">
        <input placeholder="请输入昵称（用于显示评论）" class="nickname-email-input border-top-padding"
               v-model="comment.userName">
      </div>
      <div class="border-top-padding">
        <input placeholder="请输入邮箱（仅用于生成头像，不对外公开）"
               class="nickname-email-input border-top-padding" v-model="comment.userEmail">
      </div>
      <div class="publish-panel-container border-top-padding">
        <div class="emoji-container">
          <svg t="1679914914094" class="icon emoji-icon" viewBox="0 0 1024 1024" version="1.1"
               xmlns="http://www.w3.org/2000/svg"
               p-id="7718" width="24" height="24" @click="showEmoji = !showEmoji">
            <path d="M872.802928 755.99406 872.864326 755.99406 872.864326 755.624646Z" fill="#8590A6"
                  p-id="7719"></path>
            <path
                d="M807.273469 216.727043c-162.808016-162.836669-427.736874-162.836669-590.544891 0-162.836669 162.806993-162.836669 427.736874 0 590.543867 162.808016 162.837692 427.737898 162.837692 590.544891 0C970.110137 644.462894 970.110137 379.534036 807.273469 216.727043M764.893242 764.92036c-139.444912 139.443889-366.370225 139.414213-505.798764 0-139.459239-139.473565-139.459239-366.354875 0-505.827417 139.428539-139.429563 366.354875-139.460262 505.798764 0C904.336108 398.521482 904.336108 625.476471 764.893242 764.92036"
                fill="#8590A6" p-id="7720"></path>
            <path
                d="M381.724423 468.02137c24.783453 0 44.953841-20.169365 44.953841-44.967144 0-24.828478-20.170388-45.027519-44.953841-45.027519-24.842805 0-45.013193 20.199041-45.013193 45.027519C336.71123 447.852004 356.881618 468.02137 381.724423 468.02137"
                fill="#8590A6" p-id="7721"></path>
            <path
                d="M640.680243 468.095048c24.812105 0 45.010123-20.213367 45.010123-45.01217 0-24.827455-20.198018-44.99682-45.010123-44.99682-24.785499 0-44.953841 20.169365-44.953841 44.99682C595.726401 447.88168 615.894743 468.095048 640.680243 468.095048"
                fill="#8590A6" p-id="7722"></path>
            <path
                d="M642.245901 619.058294l-2.453888 0.798179c-40.310078 18.248619-83.548858 27.5341-128.411625 27.5341-46.343491 0-90.173742-9.375531-130.305765-27.799136l-2.425236-0.741897c-1.508353-0.413416-3.548826-1.003863-6.092765-1.003863-14.757099 0-26.734898 11.977799-26.734898 26.675546 0 6.978948 3.282766 13.988596 8.695033 19.253506l-0.325411 1.62501 6.831592 3.076058c47.911196 21.679765 100.021018 33.095769 150.681838 33.095769 51.608402 0 102.180194-11.120268 150.978597-33.361829 8.575306-4.703115 13.928221-13.721513 13.928221-23.511483C676.611593 627.458615 661.027663 613.290941 642.245901 619.058294"
                fill="#8590A6" p-id="7723"></path>
          </svg>
          <EmojiPanel @onClick="emojiClick" v-show="showEmoji" class="emoji-panel"/>
        </div>
        <van-button class="button-publish" type="primary" size="mini" :disabled="buttonDisabled"
                    @click="publishComment">发表
        </van-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import {CODE_SUCCESS} from "@/utils/constants";
import EmojiPanel from "./EmojiPanel";
import {shallowReactive, defineProps, shallowRef, watchEffect, ref, onMounted, onBeforeUnmount, defineEmits} from "vue";
import {showSuccessToast, showFailToast} from "vant";
import {publishCommentApi} from "@/hooks/comment";
import {useRoute} from "vue-router";

//调整评论内容文本框高度
const inputContentRef = ref(null)

function adjustTextareaHeight(event) {
  inputContentRef.value.style.height = 'inherit'
  inputContentRef.value.style.height = event.target.scrollHeight + 'px'
}

//控制完整评论输入框与emoji面板显示
const showFull = shallowRef(false)
const showEmoji = shallowRef(false)

function showPublishComment(event) {
  event.stopPropagation()
  showFull.value = true
}

function hidePublishComment() {
  showFull.value = false
  showEmoji.value = false
}

//发表评论相关
const props = defineProps({
  parentInfo: Object
});

const route = useRoute()

const comment = shallowReactive({
  content: '',
  articleId: route.params.id,
  parentCommentId: null,
  replyCommentId: null,
  replyUserName: null,
  userAvatar: '',
  userEmail: '',
  userName: ''
})

const emit = defineEmits(['publishSuccess'])

async function publishComment() {
  comment.parentCommentId = props.parentInfo.parentCommentId
  comment.replyCommentId = props.parentInfo.replyCommentId
  comment.replyUserName = props.parentInfo.replyUserName
  const {data: response} = await publishCommentApi(comment)
  if (response.code === CODE_SUCCESS) {
    showSuccessToast('发表评论成功！')
    resetComment()
    hidePublishComment()
    emit('publishSuccess')
  } else {
    showFailToast(response.message)
  }
}

function resetComment() {
  comment.content = ''
  comment.parentCommentId = ''
  comment.replyCommentId = ''
  comment.userName = ''
  comment.userEmail = ''
  comment.userAvatar = ''
  comment.replyUserName = ''
}

function emojiClick(value) {
  comment.content += value
}

const buttonDisabled = shallowRef(true)
watchEffect(() => {
  buttonDisabled.value = comment.content.trim().length === 0
      || comment.userName.trim().length === 0
      || comment.userEmail.trim().length === 0;
})

const publishCommentRef = ref(null)

onMounted(() => {
  inputContentRef.value.addEventListener('input', adjustTextareaHeight)
  document.addEventListener('click', hidePublishComment)
  publishCommentRef.value.addEventListener('click', showPublishComment)
})

onBeforeUnmount(() => {
  inputContentRef.value.removeEventListener('input', adjustTextareaHeight)
  document.removeEventListener('click', hidePublishComment)
  publishCommentRef.value.removeEventListener('click', showPublishComment)
})

</script>

<style scoped>

.publish-comment-container {
  padding: 10px 24px 0;
  background: #F6F6F6;
  border-radius: 36px;
}

:deep(.comment-input-area) {
  width: 100%;
  outline: none;
  resize: none;
  border: none;
  line-height: 1.6;
  background: transparent;
  padding: 0;
  font-size: 24px;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}

.border-top-padding {
  padding: 8px 0;
  border-top: 1px solid rgb(235, 235, 235);
}

.nickname-email-input {
  width: 100%;
  padding: 0;
  border: none;
  background: transparent;
  outline: none;
  font-size: 24px;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}

.publish-panel-container {
  display: flex;
  justify-content: space-between;
}

.emoji-container {
  display: flex;
  align-items: center;
  position: relative;
}

.emoji-icon {
  cursor: pointer;
}

.emoji-panel {
  position: absolute;
  left: 12px;
  top: 135px;
  transform: translate(-50%, -50%);
}

.button-publish {
  width: 100px;
}

</style>
