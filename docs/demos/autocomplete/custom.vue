<template>
  <div>
    <my-autocomplete
      v-model="value"
      :options="options"
      placeholder="搜索邮箱"
      @search="handleSearch"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
const options = ref([
  { value: 'admin@example.com', label: '管理员' },
  { value: 'user@example.com', label: '用户' },
])

const handleSearch = (query: string) => {
  if (query) {
    options.value = [
      { value: `${query}@gmail.com` },
      { value: `${query}@qq.com` },
      { value: `${query}@163.com` },
    ]
  }
}
</script>
