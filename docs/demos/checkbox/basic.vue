<template>
  <div>
    <my-checkbox v-model="checked">选项</my-checkbox>
    <p>选中状态: {{ checked }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const checked = ref(false)
</script>
