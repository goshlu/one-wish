<template>
  <div>
    <my-color-picker v-model="color" />
    <p>当前颜色: {{ color }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const color = ref('#409eff')
</script>
