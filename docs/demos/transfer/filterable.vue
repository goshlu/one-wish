<template>
  <my-transfer
    v-model="value"
    :data="data"
    filterable
    :filter-placeholder="'请输入搜索内容'"
    :titles="['可搜索源列表', '可搜索目标列表']"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref([])
const data = ref([
  { key: 1, label: '苹果' },
  { key: 2, label: '香蕉' },
  { key: 3, label: '橙子' },
  { key: 4, label: '葡萄' },
  { key: 5, label: '西瓜' },
  { key: 6, label: '草莓' },
  { key: 7, label: '芒果' },
  { key: 8, label: '柠檬' },
])
</script>
