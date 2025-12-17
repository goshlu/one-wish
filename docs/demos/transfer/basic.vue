<template>
  <my-transfer
    v-model="value"
    :data="data"
    :titles="['源列表', '目标列表']"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref([])
const data = ref([
  { key: 1, label: '选项1' },
  { key: 2, label: '选项2' },
  { key: 3, label: '选项3' },
  { key: 4, label: '选项4' },
  { key: 5, label: '选项5' },
])
</script>
