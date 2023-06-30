<template>
  <div class="container">
    <div class="emoji-container">
      <div class="emoji-page-container" ref="emojiPageContainerRef">
        <div class="emoji-page" v-for="(page, index) in indexList" :key="index"
             :id="`emojiPage_${index}`">
          <ul>
            <li v-for="(item, index) in emojiList[page]" :key="index" @click="onEmojiClick(item)">{{ item }}</li>
          </ul>
        </div>
      </div>
      <div class="pagination-container">
        <div
            :class="item === currentPage? 'pagination-dot-active': 'pagination-dot-inactive'"
            v-for="(item, index) in indexList"
            :key="index"
            @click="moveEmojiPage(item)"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {emoji} from "@/utils/emoji";
import {EMOJI_NUM_PER_PAGE} from "@/utils/constants";
import {shallowRef, defineEmits, ref, defineExpose, nextTick} from "vue";
import {useEventListener} from "@vant/use";

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

initIndex()

const emojiList = ref([])

function sliceEmojis() {
  for (let i = 0; i < indexList.value.length; i++) {
    emojiList.value.push(emoji.slice(i * EMOJI_NUM_PER_PAGE, (i + 1) * EMOJI_NUM_PER_PAGE))
  }
}

sliceEmojis()

const emojiPageContainerRef = ref(null)

const currentPage = shallowRef(0)

function moveEmojiPage(page) {
  currentPage.value = page
  let emojiPageDom = document.getElementById("emojiPage_0");
  const width = emojiPageDom.offsetWidth
  let movingDistance = -width * currentPage.value
  emojiPageContainerRef.value.style.transition = 'transform 400ms ease'
  emojiPageContainerRef.value.style.transform = `translate3d(${movingDistance}px, 0, 0)`
}

const setEmojiPageContainerWidth = () => {
  nextTick(() => {
    let emojiPageDom = document.getElementById("emojiPage_0");
    emojiPageContainerRef.value.style.width = indexList.value.length * emojiPageDom.offsetWidth + 'px'
  })
}

defineExpose({
  setEmojiPageContainerWidth
})

let startX = 0
let isMoving = false
let startMovingTime = 0
let stopMovingTime = 0
let currentPosition = 0

useEventListener('touchstart', (event) => {
  if (event.touches.length === 1 || !isMoving) {
    startMovingTime = Date.now()
    emojiPageContainerRef.value.style.transition = null
    startX = event.touches[0].pageX
    isMoving = true
    let emojiPageDom = document.getElementById("emojiPage_0");
    currentPosition = -emojiPageDom.offsetWidth * currentPage.value
  }
}, {target: emojiPageContainerRef})

//滑动方向：0-左滑，1-右滑
let direction = 0

let dX = 0

useEventListener('touchmove', (event) => {
  event.preventDefault()
  if (!isMoving) return
  dX = event.touches[0].pageX - startX
  if (dX < 0) {
    direction = 0
  } else {
    direction = 1
  }
  let movingDX = currentPosition + dX
  emojiPageContainerRef.value.style.transform = `translate3d(${movingDX}px, 0, 0)`
}, {target: emojiPageContainerRef})

useEventListener('touchend', () => {
  isMoving = false
  stopMovingTime = Date.now()
  const interval = stopMovingTime - startMovingTime
  let emojiPageDom = document.getElementById("emojiPage_0");
  const emojiPageWidth = emojiPageDom.offsetWidth
  if (interval < 300 && Math.abs(dX / emojiPageWidth) > 0.05) {
    touchMoveEmojiPage(true)
  } else {
    if (Math.abs(dX / emojiPageWidth) < 0.4) {
      touchMoveEmojiPage(false)
    } else {
      touchMoveEmojiPage(true)
    }
  }
}, {target: emojiPageContainerRef})

function touchMoveEmojiPage(canMove) {
  if (canMove) {
    if (direction === 0) {
      if (currentPage.value !== indexList.value.length - 1) {
        currentPage.value++
      }
    } else {
      if (currentPage.value !== 0) {
        currentPage.value--
      }
    }
  }
  let emojiPageDom = document.getElementById("emojiPage_0");
  let emojiPageWidth = emojiPageDom.offsetWidth
  let movingDistance = -emojiPageWidth * currentPage.value
  emojiPageContainerRef.value.style.transition = 'transform 400ms ease'
  emojiPageContainerRef.value.style.transform = `translate3d(${movingDistance}px, 0, 0)`
}

</script>

<style scoped>

.emoji-page-container {
  display: flex;
  position: relative;
  width: 1280px;
}

.emoji-page {
  flex-shrink: 0;
  width: 640px;
}

ul {
  padding: 5px 5px 20px;
  list-style-type: none;
  height: 260px;
  box-sizing: border-box;
}

li {
  display: inline-flex;
  padding: 5px;
  font-size: 37px;
  cursor: pointer;
}

.emoji-container {
  overflow: hidden;
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

.pagination-dot-inactive {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #D3D3D3;
  margin: 0 10px;
  cursor: pointer;
}

</style>
