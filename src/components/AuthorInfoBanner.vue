<template>
  <div class="banner-container">
    <img :src="avatarSrc" class="banner-avatar" width="34" height="34" alt="''"/>
    <div class="banner-author-info-container">
      <div class="banner-author-info-name">{{ name }}</div>
      <div class="banner-author-info-signature">{{ signature }}</div>
    </div>
  </div>
</template>

<script setup>
import {defineProps} from 'vue'

defineProps(['avatarSrc', 'name', 'signature'])

</script>

<style scoped>

.banner-container {
  display: flex;
  align-items: center;
}

.banner-avatar {
  border-radius: 50%;
}

.banner-author-info-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 14px;
}

.banner-author-info-name {
  color: #444;
  font-weight: 600;
  line-height: 1.1;
  font-size: 30px;
  font-synthesis: style;
}

.banner-author-info-signature {
  color: #646464;
  overflow: hidden;
  white-space: nowrap;
  font-size: 28px;
  text-overflow: ellipsis;
  word-break: break-word;
  line-height: 1.6;
  margin-top: 2px;
}

</style>
