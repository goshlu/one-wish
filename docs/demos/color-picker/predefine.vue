<template>
  <div>
    <my-color-picker v-model="color" :predefine-colors="predefineColors" />
    <p>当前颜色: {{ color }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const color = ref('#409eff')
const predefineColors = [
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
]
</script>
