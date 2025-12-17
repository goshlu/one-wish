<template>
  <div class="demo-row">
    <my-time-picker v-model="largeTime" size="large" placeholder="大尺寸" />
    <my-time-picker v-model="defaultTime" size="default" placeholder="默认尺寸" />
    <my-time-picker v-model="smallTime" size="small" placeholder="小尺寸" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const largeTime = ref('')
const defaultTime = ref('')
const smallTime = ref('')
</script>

<style scoped>
.demo-row {
  display: flex;
  gap: 16px;
  align-items: center;
  flex-wrap: wrap;
}

.demo-row > * {
  flex: 1;
  min-width: 200px;
}
</style>
