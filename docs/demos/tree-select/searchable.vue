<template>
  <div>
    <my-tree-select
      v-model="value"
      :options="treeData"
      placeholder="可搜索的树选择器"
      filterable
      clearable
    />
    <p>选中值: {{ value }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')

const treeData = [
  {
    label: '前端开发',
    value: 'frontend',
    children: [
      {
        label: 'Vue.js',
        value: 'vue',
        children: [
          {
            label: 'Vue 2',
            value: 'vue2',
          },
          {
            label: 'Vue 3',
            value: 'vue3',
          },
        ],
      },
      {
        label: 'React',
        value: 'react',
        children: [
          {
            label: 'React Hooks',
            value: 'react-hooks',
          },
          {
            label: 'Redux',
            value: 'redux',
          },
        ],
      },
      {
        label: 'Angular',
        value: 'angular',
      },
    ],
  },
  {
    label: '后端开发',
    value: 'backend',
    children: [
      {
        label: 'Node.js',
        value: 'nodejs',
      },
      {
        label: 'Python',
        value: 'python',
        children: [
          {
            label: 'Django',
            value: 'django',
          },
          {
            label: 'Flask',
            value: 'flask',
          },
        ],
      },
      {
        label: 'Java',
        value: 'java',
      },
    ],
  },
  {
    label: '数据库',
    value: 'database',
    children: [
      {
        label: 'MySQL',
        value: 'mysql',
      },
      {
        label: 'PostgreSQL',
        value: 'postgresql',
      },
      {
        label: 'MongoDB',
        value: 'mongodb',
      },
    ],
  },
]
</script>
