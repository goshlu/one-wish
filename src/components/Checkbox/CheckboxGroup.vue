<template>
  <div class="my-checkbox-group">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { provide, toRef } from 'vue'
import type { CheckboxGroupProps, CheckboxGroupEmits } from './types'

defineOptions({
  name: 'MyCheckboxGroup',
})

const props = withDefaults(defineProps<CheckboxGroupProps>(), {
  modelValue: () => [],
  disabled: false,
})

const emit = defineEmits<CheckboxGroupEmits>()

const changeEvent = (value: (string | number)[]) => {
  emit('update:modelValue', value)
  emit('change', value)
}

provide('checkboxGroup', {
  modelValue: toRef(props, 'modelValue'),
  disabled: toRef(props, 'disabled'),
  changeEvent,
})
</script>

<style scoped>
.my-checkbox-group {
  display: inline-flex;
  flex-wrap: wrap;
  gap: 12px;
}
</style>
