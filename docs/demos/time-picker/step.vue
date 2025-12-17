<template>
  <div class="demo-row">
    <my-time-picker
      v-model="hourlyTime"
      :step="3600"
      placeholder="整点时间"
    />
    <my-time-picker
      v-model="halfHourTime"
      :step="1800"
      placeholder="半小时间隔"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const hourlyTime = ref('')
const halfHourTime = ref('')
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
