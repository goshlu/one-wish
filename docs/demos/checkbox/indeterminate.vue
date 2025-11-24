<template>
  <div>
    <my-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAll">
      全选
    </my-checkbox>
    <my-checkbox-group v-model="checkedList" @change="handleCheckedChange">
      <my-checkbox label="选项1">选项1</my-checkbox>
      <my-checkbox label="选项2">选项2</my-checkbox>
      <my-checkbox label="选项3">选项3</my-checkbox>
    </my-checkbox-group>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const checkAll = ref(false)
const checkedList = ref<string[]>([])
const allOptions = ['选项1', '选项2', '选项3']

const isIndeterminate = computed(() => {
  const len = checkedList.value.length
  return len > 0 && len < allOptions.length
})

const handleCheckAll = (val: boolean) => {
  checkedList.value = val ? allOptions : []
}

const handleCheckedChange = (value: (string | number)[]) => {
  checkAll.value = value.length === allOptions.length
}
</script>
