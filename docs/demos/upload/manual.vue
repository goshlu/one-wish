<template>
  <div>
    <my-upload
      ref="uploadRef"
      action="https://httpbin.org/post"
      :auto-upload="false"
      :on-success="handleSuccess"
      :on-error="handleError"
      :on-change="handleChange"
    />
    <div style="margin-top: 16px;">
      <my-button type="primary" @click="handleUpload">开始上传</my-button>
      <my-button @click="handleClear" style="margin-left: 8px;">清空文件</my-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { UploadFile } from '../../../src/components/Upload/types'

const uploadRef = ref()

const handleSuccess = (response: any, file: UploadFile) => {
  console.log('上传成功:', response, file)
}

const handleError = (error: Error, file: UploadFile) => {
  console.error('上传失败:', error, file)
}

const handleChange = (file: UploadFile, fileList: UploadFile[]) => {
  console.log('文件变化:', file, fileList)
}

const handleUpload = () => {
  uploadRef.value?.submit()
}

const handleClear = () => {
  uploadRef.value?.clearFiles()
}
</script>
