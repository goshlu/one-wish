# Upload 上传

文件上传组件，支持拖拽上传、多文件上传、上传进度显示等功能。

## 基础用法

适用于基础文件上传。

<DemoBlock>
  <my-upload
    action="https://httpbin.org/post"
    :on-success="handleSuccess"
    :on-error="handleError"
    :on-progress="handleProgress"
    :on-change="handleChange"
  />

  <template #code>

```vue
<template>
  <div>
    <my-upload
      action="https://httpbin.org/post"
      :on-success="handleSuccess"
      :on-error="handleError"
      :on-progress="handleProgress"
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

const handleProgress = (event: ProgressEvent, file: UploadFile) => {
  console.log('上传进度:', event, file)
}

const handleChange = (file: UploadFile, fileList: UploadFile[]) => {
  console.log('文件变化:', file, fileList)
}
</script>
```

  </template>
</DemoBlock>

## 拖拽上传

支持拖拽文件到指定区域进行上传。

<DemoBlock>
  <my-upload
    action="https://httpbin.org/post"
    drag
    :on-success="handleSuccess"
    :on-error="handleError"
    :on-change="handleChange"
  />

  <template #code>

```vue
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
```

  </template>
</DemoBlock>

## 多文件上传

支持多文件上传，可设置文件数量和大小限制。

<DemoBlock>
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

  <template #code>

```vue
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
```

  </template>
</DemoBlock>

## 手动上传

可以通过组件方法手动控制上传过程。

<DemoBlock>
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

  <template #code>

```vue
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
```

  </template>
</DemoBlock>

## API

### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| action | 必选参数，上传的地址 | string | — | — |
| headers | 设置上传的请求头部 | object | — | — |
| data | 上传时附带的额外参数 | object \| function | — | — |
| name | 上传的文件字段名 | string | — | file |
| with-credentials | 支持发送 cookie 凭证信息 | boolean | — | false |
| multiple | 是否支持多选文件 | boolean | — | false |
| accept | 接受上传的文件类型 | string | — | — |
| drag | 是否启用拖拽上传 | boolean | — | false |
| disabled | 是否禁用 | boolean | — | false |
| show-file-list | 是否显示文件列表 | boolean | — | true |
| limit | 最大允许上传个数 | number | — | — |
| file-size | 文件大小限制，单位字节 | number | — | — |
| auto-upload | 是否自动上传文件 | boolean | — | true |
| file-list | 上传的文件列表 | array | — | — |
| http-request | 覆盖默认的上传行为 | function | — | — |
| before-upload | 上传文件之前的钩子 | function | — | — |

### Events

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| change | 文件状态改变时的钩子 | (file: UploadFile, fileList: UploadFile[]) |
| remove | 文件列表移除文件时的钩子 | (file: UploadFile, fileList: UploadFile[]) |
| preview | 点击文件列表中已上传的文件时的钩子 | (file: UploadFile) |
| exceed | 文件超出个数限制时的钩子 | (files: File[], fileList: UploadFile[]) |
| progress | 文件上传时的钩子 | (event: ProgressEvent, file: UploadFile) |
| success | 文件上传成功时的钩子 | (response: any, file: UploadFile) |
| error | 文件上传失败时的钩子 | (error: Error, file: UploadFile) |

### Methods

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| submit | 手动上传文件列表 | — |
| clearFiles | 清空已上传的文件列表 | — |

### Type Definitions

```typescript
export interface UploadFile {
  uid: string
  name: string
  size?: number
  status: 'ready' | 'uploading' | 'success' | 'error'
  percentage?: number
  url?: string
  response?: any
  error?: Error
  raw?: File
}

export interface UploadRequestOptions {
  action: string
  method: string
  headers: Record<string, string>
  data: Record<string, any>
  file: File
  filename: string
  withCredentials: boolean
  onProgress: (event: ProgressEvent) => void
  onSuccess: (response: any) => void
  onError: (error: Error) => void
}
