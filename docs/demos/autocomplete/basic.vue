<template>
  <div>
    <my-autocomplete
      v-model="value"
      :options="options"
      placeholder="请输入内容"
      clearable
    />
    <p>输入值: {{ value }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
const options = [
  { value: 'Vue' },
  { value: 'React' },
  { value: 'Angular' },
  { value: 'Svelte' },
  { value: 'Solid' },
]
</script>
