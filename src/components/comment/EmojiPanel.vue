<template>
  <div class="container">
    <div class="emoji-container">
      <ul>
        <li v-for="(item, index) in emojiList[currentPage]" :key="index" @click="onEmojiClick(item)">{{ item }}</li>
      </ul>
      <div class="pagination-container">
        <div
            :class="[item === currentPage? 'pagination-dot-active': 'pagination-dot-inactive', 'pagination-dot-active-hover']"
            v-for="(item, index) in indexList"
            :key="index"
            @click="currentPage = item"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {emoji} from "@/utils/emoji";
import {EMOJI_NUM_PER_PAGE} from "@/utils/constants";
import {shallowRef, defineEmits, ref} from "vue";

const currentPage = shallowRef(0)

const emit = defineEmits(['onClick']);

function onEmojiClick(value) {
  emit('onClick', value)
}

const indexList = ref([])

function initIndex() {
  let pageNum = Math.ceil(emoji.length / EMOJI_NUM_PER_PAGE);
  for (let i = 0; i < pageNum; i++) {
    indexList.value.push(i)
  }
}

const emojiList = ref([])

function sliceEmojis() {
  for (let i = 0; i < indexList.value.length; i++) {
    emojiList.value.push(emoji.slice(i * EMOJI_NUM_PER_PAGE, (i + 1) * EMOJI_NUM_PER_PAGE))
  }
}

initIndex()
sliceEmojis()
</script>

<style scoped>

.container {

}

ul {
  margin: 0;
  padding: 5px 5px 20px;
  list-style-type: none;
  height: 260px;
  box-sizing: border-box;
}

li {
  display: inline-flex;
  padding: 5px;
  font-size: 34px;
  cursor: pointer;
}

.emoji-container {

}

.pagination-container {
  display: flex;
  justify-content: center;
  padding-bottom: 10px;
}

.pagination-dot-active {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #808080;
  margin: 0 10px;
  cursor: pointer;
}

.pagination-dot-active-hover:hover {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #808080;
  margin: 0 10px;
  cursor: pointer;
}

.pagination-dot-inactive {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #D3D3D3;
  margin: 0 10px;
  cursor: pointer;
}

</style>
