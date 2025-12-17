<template>
  <my-transfer
    v-model="value"
    :data="data"
    :button-texts="['添加到右侧', '添加到左侧']"
    :titles="['自定义按钮', '自定义按钮']"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref([])
const data = ref([
  { key: 1, label: '文档1' },
  { key: 2, label: '文档2' },
  { key: 3, label: '文档3' },
  { key: 4, label: '文档4' },
])
</script>
