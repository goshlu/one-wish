<template>
  <my-time-picker
    v-model="limitedTime"
    :min="'09:00'"
    :max="'18:00'"
    placeholder="工作时间 (09:00-18:00)"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const limitedTime = ref('')
</script>
