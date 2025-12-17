<template>
  <div>
    <my-upload
      action="https://httpbin.org/post"
      multiple
      :limit="5"
      :file-size="2 * 1024 * 1024"
      :on-success="handleSuccess"
      :on-error="handleError"
      :on-exceed="handleExceed"
      :on-change="handleChange"
    />
    <p style="margin-top: 16px; color: var(--text-placeholder); font-size: 14px;">
      支持多文件上传，最多5个文件，每个文件不超过2MB
    </p>
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

const handleExceed = (files: File[], fileList: UploadFile[]) => {
  console.warn('文件数量超限:', files, fileList)
}

const handleChange = (file: UploadFile, fileList: UploadFile[]) => {
  console.log('文件变化:', file, fileList)
}
</script>
