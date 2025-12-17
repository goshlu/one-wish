<template>
  <div class="demo-row">
    <my-transfer
      v-model="disabledValue"
      :data="disabledData"
      disabled
      :titles="['禁用状态', '禁用状态']"
    />
    <my-transfer
      v-model="partialDisabledValue"
      :data="partialDisabledData"
      :titles="['部分禁用', '部分禁用']"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const disabledValue = ref([])
const disabledData = ref([
  { key: 1, label: '禁用选项1' },
  { key: 2, label: '禁用选项2' },
])

const partialDisabledValue = ref([])
const partialDisabledData = ref([
  { key: 1, label: '可用选项1' },
  { key: 2, label: '禁用选项2', disabled: true },
  { key: 3, label: '可用选项3' },
  { key: 4, label: '禁用选项4', disabled: true },
])
</script>

<style scoped>
.demo-row {
  display: flex;
  gap: 24px;
  align-items: flex-start;
  flex-wrap: wrap;
}

.demo-row > * {
  flex: 1;
  min-width: 300px;
}
</style>
