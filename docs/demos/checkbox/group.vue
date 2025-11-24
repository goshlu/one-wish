<template>
  <div>
    <my-checkbox-group v-model="checkedList">
      <my-checkbox label="选项1">选项1</my-checkbox>
      <my-checkbox label="选项2">选项2</my-checkbox>
      <my-checkbox label="选项3">选项3</my-checkbox>
    </my-checkbox-group>
    <p>已选: {{ checkedList }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const checkedList = ref(['选项1'])
</script>
