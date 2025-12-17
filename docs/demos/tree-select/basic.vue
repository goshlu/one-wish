<template>
  <div>
    <my-tree-select
      v-model="value"
      :options="treeData"
      placeholder="请选择节点"
    />
    <p>选中值: {{ value }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('node1')

const treeData = [
  {
    label: '节点1',
    value: 'node1',
    children: [
      {
        label: '子节点1-1',
        value: 'node1-1',
      },
      {
        label: '子节点1-2',
        value: 'node1-2',
        children: [
          {
            label: '子节点1-2-1',
            value: 'node1-2-1',
          },
          {
            label: '子节点1-2-2',
            value: 'node1-2-2',
          },
        ],
      },
    ],
  },
  {
    label: '节点2',
    value: 'node2',
    children: [
      {
        label: '子节点2-1',
        value: 'node2-1',
      },
      {
        label: '子节点2-2',
        value: 'node2-2',
      },
    ],
  },
  {
    label: '节点3',
    value: 'node3',
  },
]
</script>
