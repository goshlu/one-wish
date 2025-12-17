<template>
  <div class="my-upload">
    <div
      v-if="drag"
      :class="dragClass"
      @drop="handleDrop"
      @dragover="handleDragover"
      @dragleave="handleDragleave"
    >
      <input
        ref="inputRef"
        type="file"
        :name="name"
        :multiple="multiple"
        :accept="accept"
        :disabled="disabled"
        @change="handleChange"
      />
      <slot>
        <div class="my-upload__drag-content">
          <svg
            t="1765942267698"
            class="icon"
            viewBox="0 0 1280 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="4648"
            width="32"
            height="32"
          >
            <path
              d="M520.021333 661.333333l77.653334-78.677333V989.866667l84.736-0.512V582.144l77.653333 78.677333 59.136-58.709333L640 422.4 460.8 602.112l59.221333 59.221333z"
              p-id="4649"
            ></path>
            <path
              d="M640 117.76c-164.266667 0-300.544 119.04-337.237333 263.68l-5.376 21.333333-20.565334 7.68C187.904 443.477333 126.293333 525.909333 126.293333 620.8 126.293333 744.106667 230.4 846.506667 362.24 846.506667H490.666667v83.626666H362.24C187.306667 930.133333 42.666667 793.088 42.666667 620.8c0-124.928 76.373333-231.594667 184.832-280.490667C281.088 168.106667 446.293333 34.133333 640 34.133333c193.792 0 358.912 133.973333 412.501333 306.176 108.458667 48.896 184.832 155.562667 184.832 280.490667 0 172.373333-144.554667 309.333333-319.573333 309.333333H789.333333v-83.626666h128.426667c131.84 0 235.946667-102.485333 235.946667-225.706667 0-94.890667-61.610667-177.322667-150.528-210.346667l-20.48-7.68-5.461334-21.333333c-36.693333-144.64-172.970667-263.68-337.237333-263.68z"
              p-id="4650"
            ></path>
          </svg>
          <div class="my-upload__drag-text">
            <p>将文件拖到此处，或<em>点击上传</em></p>
            <p class="my-upload__drag-hint">
              {{ accept || "支持所有文件类型" }}
            </p>
          </div>
        </div>
      </slot>
    </div>

    <div v-else class="my-upload__select">
      <slot>
        <my-button :disabled="disabled" :loading="uploading">
          <svg
            t="1765942267698"
            class="icon"
            viewBox="0 0 1280 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="4648"
            width="32"
            height="32"
          >
            <path
              d="M520.021333 661.333333l77.653334-78.677333V989.866667l84.736-0.512V582.144l77.653333 78.677333 59.136-58.709333L640 422.4 460.8 602.112l59.221333 59.221333z"
              p-id="4649"
            ></path>
            <path
              d="M640 117.76c-164.266667 0-300.544 119.04-337.237333 263.68l-5.376 21.333333-20.565334 7.68C187.904 443.477333 126.293333 525.909333 126.293333 620.8 126.293333 744.106667 230.4 846.506667 362.24 846.506667H490.666667v83.626666H362.24C187.306667 930.133333 42.666667 793.088 42.666667 620.8c0-124.928 76.373333-231.594667 184.832-280.490667C281.088 168.106667 446.293333 34.133333 640 34.133333c193.792 0 358.912 133.973333 412.501333 306.176 108.458667 48.896 184.832 155.562667 184.832 280.490667 0 172.373333-144.554667 309.333333-319.573333 309.333333H789.333333v-83.626666h128.426667c131.84 0 235.946667-102.485333 235.946667-225.706667 0-94.890667-61.610667-177.322667-150.528-210.346667l-20.48-7.68-5.461334-21.333333c-36.693333-144.64-172.970667-263.68-337.237333-263.68z"
              p-id="4650"
            ></path>
          </svg>
          点击上传
        </my-button>
      </slot>
      <input
        ref="inputRef"
        type="file"
        :name="name"
        :multiple="multiple"
        :accept="accept"
        :disabled="disabled"
        @change="handleChange"
      />
    </div>

    <div v-if="showFileList && fileList.length" class="my-upload__file-list">
      <div
        v-for="file in fileList"
        :key="file.uid"
        class="my-upload__file-item"
        :class="{ 'is-error': file.status === 'error' }"
      >
        <div class="my-upload__file-info">
          <svg class="my-upload__file-icon" viewBox="0 0 1024 1024">
            <path
              fill="currentColor"
              d="M832 64H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V96c0-17.7-14.3-32-32-32zm-600 72h560v208H232V136zm560 480H232V408h560v208zm0 272H232V680h560v208zM304 240a40 40 0 1 0 80 0 40 40 0 0 0-80 0zm0 272a40 40 0 1 0 80 0 40 40 0 0 0-80 0zm0 272a40 40 0 1 0 80 0 40 40 0 0 0-80 0z"
            />
          </svg>
          <span class="my-upload__file-name" :title="file.name">{{
            file.name
          }}</span>
          <span v-if="file.size" class="my-upload__file-size">{{
            formatFileSize(file.size)
          }}</span>
        </div>

        <div class="my-upload__file-status">
          <div v-if="file.status === 'uploading'" class="my-upload__progress">
            <div class="my-upload__progress-bar">
              <div
                class="my-upload__progress-inner"
                :style="{ width: `${file.percentage || 0}%` }"
              ></div>
            </div>
            <span class="my-upload__progress-text"
              >{{ file.percentage || 0 }}%</span
            >
          </div>

          <svg
            v-else-if="file.status === 'success'"
            class="my-upload__status-icon my-upload__status-success"
            viewBox="0 0 1024 1024"
          >
            <path
              fill="currentColor"
              d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 0 1-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z"
            />
          </svg>

          <svg
            v-else-if="file.status === 'error'"
            class="my-upload__status-icon my-upload__status-error"
            viewBox="0 0 1024 1024"
          >
            <path
              fill="currentColor"
              d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"
            />
            <path
              fill="currentColor"
              d="M464 336a48 48 0 1 0 96 0 48 48 0 0 0-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"
            />
          </svg>
        </div>

        <div class="my-upload__file-actions">
          <button
            v-if="file.status === 'success' && file.url"
            class="my-upload__action-btn"
            @click="handlePreview(file)"
          >
            预览
          </button>
          <button
            class="my-upload__action-btn my-upload__action-remove"
            @click="handleRemove(file)"
          >
            删除
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import type {
  UploadProps,
  UploadEmits,
  UploadFile,
  UploadRequestOptions,
} from "./types";

defineOptions({
  name: "MyUpload",
});

const props = withDefaults(defineProps<UploadProps>(), {
  name: "file",
  multiple: false,
  showFileList: true,
  drag: false,
  disabled: false,
  autoUpload: true,
  withCredentials: false,
});

const emit = defineEmits<UploadEmits>();

const inputRef = ref<HTMLInputElement>();
const isDragOver = ref(false);
const uploading = ref(false);

const fileList = ref<UploadFile[]>(props.fileList || []);

const dragClass = computed(() => [
  "my-upload__drag",
  {
    "is-dragover": isDragOver.value,
    "is-disabled": props.disabled,
  },
]);

const formatFileSize = (size: number): string => {
  if (size < 1024) {
    return size + " B";
  } else if (size < 1024 * 1024) {
    return (size / 1024).toFixed(2) + " KB";
  } else {
    return (size / (1024 * 1024)).toFixed(2) + " MB";
  }
};

const generateUid = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

const createUploadFile = (file: File): UploadFile => {
  return {
    uid: generateUid(),
    name: file.name,
    size: file.size,
    status: "ready",
    percentage: 0,
    raw: file,
  };
};

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const files = Array.from(target.files || []);

  if (files.length === 0) return;

  handleFiles(files);

  // 清空input值，允许重复选择同一文件
  target.value = "";
};

const handleDrop = (event: DragEvent) => {
  event.preventDefault();
  isDragOver.value = false;

  if (props.disabled) return;

  const files = Array.from(event.dataTransfer?.files || []);
  if (files.length === 0) return;

  handleFiles(files);
};

const handleDragover = (event: DragEvent) => {
  event.preventDefault();
  if (!props.disabled) {
    isDragOver.value = true;
  }
};

const handleDragleave = (event: DragEvent) => {
  event.preventDefault();
  isDragOver.value = false;
};

const handleFiles = async (files: File[]) => {
  // 检查文件数量限制
  if (props.limit && fileList.value.length + files.length > props.limit) {
    emit("exceed", files, fileList.value);
    return;
  }

  // 检查文件大小限制
  if (props.fileSize) {
    const oversizedFiles = files.filter((file) => file.size > props.fileSize!);
    if (oversizedFiles.length > 0) {
      console.error(`文件大小不能超过 ${formatFileSize(props.fileSize)}`);
      return;
    }
  }

  // 处理每个文件
  for (const file of files) {
    // beforeUpload 钩子
    if (props.beforeUpload) {
      const result = await props.beforeUpload(file);
      if (!result) continue;
    }

    const uploadFile = createUploadFile(file);
    fileList.value.push(uploadFile);

    if (props.autoUpload) {
      upload(uploadFile);
    }
  }

  emit("update:fileList", fileList.value);
};

const upload = async (uploadFile: UploadFile) => {
  if (!props.action) {
    console.error("请设置上传地址 action");
    return;
  }

  uploadFile.status = "uploading";
  uploading.value = true;

  const options: UploadRequestOptions = {
    action: props.action,
    method: "POST",
    headers: props.headers || {},
    data:
      typeof props.data === "function"
        ? props.data(uploadFile)
        : props.data || {},
    file: uploadFile.raw!,
    filename: props.name,
    withCredentials: props.withCredentials,
    onProgress: (event: ProgressEvent) => {
      uploadFile.percentage = Math.round((event.loaded / event.total) * 100);
      emit("progress", event, uploadFile);
      props.onProgress?.(event, uploadFile);
    },
    onSuccess: (response: any) => {
      uploadFile.status = "success";
      uploadFile.response = response;
      uploading.value = false;
      emit("success", response, uploadFile);
      props.onSuccess?.(response, uploadFile);
      emit("change", uploadFile, fileList.value);
      props.onChange?.(uploadFile, fileList.value);
    },
    onError: (error: Error) => {
      uploadFile.status = "error";
      uploadFile.error = error;
      uploading.value = false;
      emit("error", error, uploadFile);
      props.onError?.(error, uploadFile);
      emit("change", uploadFile, fileList.value);
      props.onChange?.(uploadFile, fileList.value);
    },
  };

  try {
    if (props.httpRequest) {
      await props.httpRequest(options);
    } else {
      await defaultHttpRequest(options);
    }
  } catch (error) {
    options.onError(error as Error);
  }
};

const defaultHttpRequest = (options: UploadRequestOptions): Promise<any> => {
  return new Promise((resolve, reject) => {
    const formData = new FormData();

    // 添加文件
    formData.append(options.filename, options.file);

    // 添加额外数据
    Object.keys(options.data).forEach((key) => {
      formData.append(key, options.data[key]);
    });

    const xhr = new XMLHttpRequest();

    // 进度监听
    xhr.upload.addEventListener("progress", options.onProgress);

    // 完成监听
    xhr.addEventListener("load", () => {
      if (xhr.status < 200 || xhr.status >= 300) {
        reject(new Error(`上传失败: ${xhr.statusText}`));
        return;
      }

      let response;
      try {
        response = JSON.parse(xhr.responseText);
      } catch {
        response = xhr.responseText;
      }

      options.onSuccess(response);
      resolve(response);
    });

    // 错误监听
    xhr.addEventListener("error", () => {
      reject(new Error("网络错误"));
    });

    // 设置请求头
    Object.keys(options.headers).forEach((key) => {
      xhr.setRequestHeader(key, options.headers[key]);
    });

    // 发送请求
    xhr.open(options.method, options.action);
    xhr.withCredentials = options.withCredentials;
    xhr.send(formData);
  });
};

const handlePreview = (file: UploadFile) => {
  emit("preview", file);
  props.onPreview?.(file);
};

const handleRemove = (file: UploadFile) => {
  const index = fileList.value.findIndex((item) => item.uid === file.uid);
  if (index > -1) {
    fileList.value.splice(index, 1);
    emit("remove", file, fileList.value);
    props.onRemove?.(file, fileList.value);
    emit("update:fileList", fileList.value);
  }
};

// 暴露方法
const submit = () => {
  const readyFiles = fileList.value.filter((file) => file.status === "ready");
  readyFiles.forEach((file) => upload(file));
};

const clearFiles = () => {
  fileList.value = [];
  emit("update:fileList", fileList.value);
};

defineExpose({
  submit,
  clearFiles,
});
</script>

<style scoped>
.my-upload {
  display: inline-block;
}

.my-upload__drag {
  position: relative;
  width: 360px;
  height: 180px;
  border: 2px dashed var(--border-color-light);
  border-radius: var(--border-radius-base);
  background-color: var(--bg-color-light);
  cursor: pointer;
  transition: border-color 0.2s;
}

.my-upload__drag:hover,
.my-upload__drag.is-dragover {
  border-color: var(--primary-color);
}

.my-upload__drag.is-disabled {
  cursor: not-allowed;
  background-color: var(--bg-color-light);
  border-color: var(--border-color-light);
}

.my-upload__drag input[type="file"] {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}

.my-upload__drag-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 20px;
}

.my-upload__drag-icon {
  width: 48px;
  height: 48px;
  color: var(--text-placeholder);
  margin-bottom: 16px;
}

.my-upload__drag-text {
  text-align: center;
  color: var(--text-regular);
}

.my-upload__drag-text p {
  margin: 0;
  line-height: 1.5;
}

.my-upload__drag-text em {
  color: var(--primary-color);
  font-style: normal;
}

.my-upload__drag-hint {
  font-size: 12px;
  color: var(--text-placeholder);
  margin-top: 8px;
}

.my-upload__select {
  position: relative;
  display: inline-block;
}

.my-upload__select input[type="file"] {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}

.my-upload__icon {
  width: 16px;
  height: 16px;
  margin-right: 8px;
  vertical-align: -0.15em;
}

.my-upload__file-list {
  margin-top: 16px;
}

.my-upload__file-item {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  border: 1px solid var(--border-color-light);
  border-radius: var(--border-radius-base);
  background-color: var(--bg-color);
  margin-bottom: 8px;
  transition: border-color 0.2s;
}

.my-upload__file-item:hover {
  border-color: var(--border-color-base);
}

.my-upload__file-item.is-error {
  border-color: var(--danger-color);
  background-color: rgba(245, 108, 108, 0.05);
}

.my-upload__file-info {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
}

.my-upload__file-icon {
  width: 16px;
  height: 16px;
  color: var(--text-placeholder);
  flex-shrink: 0;
}

.my-upload__file-name {
  flex: 1;
  color: var(--text-regular);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.my-upload__file-size {
  color: var(--text-placeholder);
  font-size: 12px;
  flex-shrink: 0;
}

.my-upload__file-status {
  display: flex;
  align-items: center;
  margin-right: 12px;
}

.my-upload__progress {
  display: flex;
  align-items: center;
  gap: 8px;
}

.my-upload__progress-bar {
  width: 80px;
  height: 4px;
  background-color: var(--bg-color-light);
  border-radius: 2px;
  overflow: hidden;
}

.my-upload__progress-inner {
  height: 100%;
  background-color: var(--primary-color);
  transition: width 0.2s;
}

.my-upload__progress-text {
  font-size: 12px;
  color: var(--text-regular);
  min-width: 40px;
}

.my-upload__status-icon {
  width: 16px;
  height: 16px;
}

.my-upload__status-success {
  color: var(--success-color);
}

.my-upload__status-error {
  color: var(--danger-color);
}

.my-upload__file-actions {
  display: flex;
  gap: 8px;
}

.my-upload__action-btn {
  padding: 4px 8px;
  font-size: 12px;
  border: 1px solid var(--border-color-light);
  border-radius: 4px;
  background-color: var(--bg-color);
  color: var(--text-regular);
  cursor: pointer;
  transition: all 0.2s;
}

.my-upload__action-btn:hover {
  border-color: var(--primary-color);
  color: var(--primary-color);
}

.my-upload__action-remove:hover {
  border-color: var(--danger-color);
  color: var(--danger-color);
}
</style>
