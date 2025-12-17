<template>
  <div class="demo-column">
    <my-transfer
      v-model="largeValue"
      :data="sizeData"
      size="large"
      :titles="['大尺寸', '大尺寸']"
    />
    <my-transfer
      v-model="defaultSizeValue"
      :data="sizeData"
      size="default"
      :titles="['默认尺寸', '默认尺寸']"
    />
    <my-transfer
      v-model="smallValue"
      :data="sizeData"
      size="small"
      :titles="['小尺寸', '小尺寸']"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const largeValue = ref([])
const defaultSizeValue = ref([])
const smallValue = ref([])
const sizeData = ref([
  { key: 1, label: '尺寸选项1' },
  { key: 2, label: '尺寸选项2' },
  { key: 3, label: '尺寸选项3' },
])
</script>

<style scoped>
.demo-column {
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: center;
}

.demo-column > * {
  width: 100%;
  max-width: 500px;
}
</style>
