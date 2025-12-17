<template>
  <div class="demo-row">
    <my-transfer
      v-model="originalOrderValue"
      :data="orderData"
      target-order="original"
      :titles="['原始顺序', '原始顺序']"
    />
    <my-transfer
      v-model="pushOrderValue"
      :data="orderData"
      target-order="push"
      :titles="['点击顺序', '点击顺序']"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const originalOrderValue = ref([])
const pushOrderValue = ref([])
const orderData = ref([
  { key: 1, label: '顺序选项1' },
  { key: 2, label: '顺序选项2' },
  { key: 3, label: '顺序选项3' },
  { key: 4, label: '顺序选项4' },
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
