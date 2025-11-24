<template>
  <div>
    <my-cascader v-model="value" :options="options" clearable />
    <p>选中值: {{ value }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(['zhejiang', 'hangzhou', 'xihu'])
const options = [
  {
    value: 'zhejiang',
    label: '浙江',
    children: [
      {
        value: 'hangzhou',
        label: '杭州',
        children: [
          { value: 'xihu', label: '西湖' },
          { value: 'binjiang', label: '滨江' },
        ],
      },
    ],
  },
]
</script>
