<template>
  <my-time-picker v-model="time" placeholder="请选择时间" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const time = ref('')
</script>
