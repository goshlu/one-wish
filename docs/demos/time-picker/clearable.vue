<template>
  <div class="demo-row">
    <my-time-picker
      v-model="clearableTime"
      clearable
      placeholder="可清空时间选择器"
    />
    <my-time-picker v-model="disabledTime" disabled placeholder="禁用状态" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const clearableTime = ref('14:30')
const disabledTime = ref('09:00')
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
