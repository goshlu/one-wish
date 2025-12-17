<template>
  <div>
    <my-upload
      action="https://httpbin.org/post"
      drag
      :on-success="handleSuccess"
      :on-error="handleError"
      :on-change="handleChange"
    />
  </div>
</template>

<script setup lang="ts">
import type { UploadFile } from '../../../src/components/Upload/types'

const handleSuccess = (response: any, file: UploadFile) => {
  console.log('上传成功:', response, file)
}

const handleError = (error: Error, file: UploadFile) => {
  console.error('上传失败:', error, file)
}

const handleChange = (file: UploadFile, fileList: UploadFile[]) => {
  console.log('文件变化:', file, fileList)
}
</script>
