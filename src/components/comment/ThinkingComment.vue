<template>
  <div>
    <PublishComment :parentInfo="parentInfo" @publishSuccess="getComments(page, size)" :thinkingID="id" type="1"/>
    <div class="comment-list-container" v-if="commentList.length > 0">
      <div class="total-comment">{{ commentList.length }}条评论</div>
      <div class="comment-item-list-container">
        <CommentItem v-for="item in commentList" :key="item.id" :comment="item"
                     type="1"
                     :thinkingID="id"
                     @replySuccess="getComments(page, size)"
                     :parentInfo="{parentCommentId: item.id, replyCommentId: null, replyUserName: null}"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import {CODE_SUCCESS, COMMENT_TYPE_THINKING} from "@/utils/constants";
import PublishComment from "./PublishComment";
import CommentItem from "./CommentItem";
import {shallowRef, shallowReactive, defineProps, defineEmits} from "vue";
import {showFailToast} from "vant";
import {getArticleCommentsApi} from "@/hooks/comment";

const props = defineProps({
  id: String
})

const page = 1
const size = 10
const commentList = shallowRef([])
const noMore = shallowRef(true)
const parentInfo = shallowReactive({
  parentCommentId: null,
  replyCommentId: null,
  replyUserName: null
})

// eslint-disable-next-line
const emits = defineEmits(['onCommentUpdate'])

async function getComments(page, size) {
  const {data: response} = await getArticleCommentsApi(props.id, COMMENT_TYPE_THINKING, page, size)
  if (response.code === CODE_SUCCESS) {
    commentList.value = response.data.data
    noMore.value = response.data.noMore
    emits('onCommentUpdate', props.id, response.data.total)
  } else {
    showFailToast(response.message)
  }
}


getComments(page, size)


</script>

<style scoped>

.comment-list-container {
  margin-top: 25px;
}

.total-comment {
  height: 50px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  color: #444444;
  font-weight: 600;
  font-size: 30px;
}

.comment-item-list-container {
  padding: 10px 0;
}

</style>
