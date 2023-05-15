<template>
  <div class="icon-container">
    <svg t="1678785639385" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
         p-id="4177" width="128" height="128">
      <path
          d="M852.992 519.168V351.744l-317.952 318.464c-6.656 6.656-15.36 11.776-25.088 13.824l-125.44 28.16c-2.048 0.512-4.608 1.024-6.656 1.024-8.192 0-15.872-3.072-21.504-9.216-7.68-7.68-10.752-17.92-8.192-28.672l28.16-125.44c2.048-9.216 6.656-17.92 13.824-25.088l291.84-291.84H228.864c-16.896 0-30.72 13.824-30.72 30.72v592.896c0 16.896 13.824 30.72 30.72 30.72h90.112l268.288 41.472h161.792l87.552-17.408c10.752-9.728 15.872-17.92 25.6-35.84l22.016-35.328-30.72-218.112v-102.912z"
          fill="#38CEB1" p-id="4178"></path>
      <path d="M684.032 907.776m-20.48 0a20.48 20.48 0 1 0 40.96 0 20.48 20.48 0 1 0-40.96 0Z" fill="#231815"
            p-id="4179"></path>
      <path
          d="M610.816 927.744H167.424c-39.424 0-71.68-32.256-71.68-71.68V201.216c0-39.424 32.256-71.68 71.68-71.68h378.88c11.264 0 20.48 9.216 20.48 20.48s-9.216 20.48-20.48 20.48h-378.88c-16.896 0-30.72 13.824-30.72 30.72v654.848c0 16.896 13.824 30.72 30.72 30.72h442.88c11.264 0 20.48 9.216 20.48 20.48s-8.704 20.48-19.968 20.48zM822.784 927.744h-66.048c-11.264 0-20.48-9.216-20.48-20.48s9.216-20.48 20.48-20.48h66.048c16.896 0 30.72-13.824 30.72-30.72v-378.88c0-11.264 9.216-20.48 20.48-20.48s20.48 9.216 20.48 20.48v378.88c0 39.936-32.256 71.68-71.68 71.68z"
          fill="#231815" p-id="4180"></path>
      <path
          d="M378.368 712.704c-8.192 0-15.872-3.072-21.504-9.216-7.68-7.68-10.752-17.92-8.192-28.672l28.16-125.44c2.048-9.216 6.656-17.92 13.824-25.088L792.064 122.88c9.728-9.728 22.528-14.848 36.352-14.848 13.824 0 26.624 5.12 36.352 14.848L936.96 195.072c19.968 19.968 19.968 52.224 0 72.192l-401.92 402.432c-6.656 6.656-15.36 11.776-25.088 13.824L384.512 711.68c-1.536 1.024-4.096 1.024-6.144 1.024zM828.416 148.48c-1.536 0-4.608 0.512-7.168 3.072l-401.92 402.432c-1.536 1.536-2.56 3.072-2.56 5.12l-24.576 109.568 109.568-24.576c2.048-0.512 3.584-1.536 5.12-2.56l401.92-402.432c4.096-4.096 4.096-10.24 0-14.336l-72.192-72.192c-3.584-3.584-6.656-4.096-8.192-4.096z"
          fill="#231815" p-id="4181"></path>
    </svg>
  </div>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="feedback.title"
          name="标题"
          label="标题"
          placeholder="请输入标题（可选）"
      />
      <van-field
          v-model="feedback.content"
          rows="1"
          autosize
          required
          :rules="[{ required: true, message: '反馈内容为空' }]"
          label="反馈意见"
          type="textarea"
          placeholder="请输入反馈意见"
      />
      <van-field
          v-model="feedback.email"
          name="电子邮件"
          label="Email"
          placeholder="请输入邮箱地址（可选）"
      />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
</template>

<script setup>
import {onBeforeMount, reactive} from "vue";
import {useSendFeedback} from "@/hooks/feedback";
import {CODE_SUCCESS} from "@/utils/constants";
import {showSuccessToast, showFailToast} from 'vant';
import {useRouter} from 'vue-router'
import {provideHeaderTitle} from "@/utils/store";

provideHeaderTitle.value = '联系我'

const feedback = reactive({
  title: '',
  content: '',
  email: ''
})

const router = useRouter()

async function onSubmit() {
  const {data: response} = await useSendFeedback(feedback)
  if (response.code === CODE_SUCCESS) {
    showSuccessToast({
      duration: 3000,
      message: '提交成功\n3秒后跳转'
    })
    setTimeout(() => {
      router.push('/')
    }, 3000)
  } else {
    showFailToast('提交失败，请稍后重试')
  }
}

//设置网页title
onBeforeMount(() => {
  document.title = '联系我 - 卧卷'
})

</script>

<style scoped>

.icon-container {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 100px;
  margin-bottom: 20px;
}

</style>