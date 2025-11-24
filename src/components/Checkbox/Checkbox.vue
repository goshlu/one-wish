<template>
  <label :class="['my-checkbox', { 'is-checked': isChecked, 'is-disabled': disabled, 'is-indeterminate': indeterminate }]">
    <span class="my-checkbox__input">
      <input
        type="checkbox"
        :checked="isChecked"
        :disabled="disabled"
        @change="handleChange"
      />
      <span class="my-checkbox__inner"></span>
    </span>
    <span v-if="$slots.default || label" class="my-checkbox__label">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
import type { CheckboxProps, CheckboxEmits } from './types'

defineOptions({
  name: 'MyCheckbox',
})

const props = withDefaults(defineProps<CheckboxProps>(), {
  modelValue: false,
  disabled: false,
  indeterminate: false,
})

const emit = defineEmits<CheckboxEmits>()

const checkboxGroup = inject<any>('checkboxGroup', null)

const isChecked = computed(() => {
  if (checkboxGroup) {
    return checkboxGroup.modelValue.value.includes(props.label)
  }
  return props.modelValue === true
})

const handleChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  const checked = target.checked
  
  if (checkboxGroup) {
    const value = [...checkboxGroup.modelValue.value]
    if (checked) {
      value.push(props.label)
    } else {
      const index = value.indexOf(props.label)
      if (index > -1) value.splice(index, 1)
    }
    checkboxGroup.changeEvent(value)
  } else {
    emit('update:modelValue', checked)
    emit('change', checked)
  }
}
</script>

<style scoped>
.my-checkbox {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.88);
  font-weight: 400;
  line-height: 1;
}

.my-checkbox:hover .my-checkbox__inner {
  border-color: #1677ff;
}

.my-checkbox__input {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

.my-checkbox__input input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  margin: 0;
}

.my-checkbox__inner {
  display: inline-block;
  position: relative;
  width: 16px;
  height: 16px;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  background-color: #ffffff;
  transition: all 0.3s;
  box-sizing: border-box;
}

.my-checkbox__inner::after {
  content: '';
  position: absolute;
  left: 21.5%;
  top: 50%;
  width: 5.71428571px;
  height: 9.14285714px;
  border: 2px solid #fff;
  border-top: 0;
  border-left: 0;
  transform: rotate(45deg) scale(0) translate(-50%, -50%);
  transition: all 0.2s cubic-bezier(0.12, 0.4, 0.29, 1.46) 0.1s;
  opacity: 0;
}

.my-checkbox.is-checked .my-checkbox__inner {
  background-color: #1677ff;
  border-color: #1677ff;
}

.my-checkbox.is-checked .my-checkbox__inner::after {
  transform: rotate(45deg) scale(1) translate(-50%, -50%);
  opacity: 1;
}

.my-checkbox.is-indeterminate .my-checkbox__inner {
  background-color: #1677ff;
  border-color: #1677ff;
}

.my-checkbox.is-indeterminate .my-checkbox__inner::after {
  content: '';
  position: absolute;
  left: 50%;
  top: 50%;
  width: 8px;
  height: 8px;
  border: none;
  background-color: #fff;
  transform: translate(-50%, -50%) scale(1);
  opacity: 1;
  border-radius: 0;
}

.my-checkbox.is-disabled {
  cursor: not-allowed;
}

.my-checkbox.is-disabled .my-checkbox__inner {
  background-color: rgba(0, 0, 0, 0.04);
  border-color: #d9d9d9;
  cursor: not-allowed;
}

.my-checkbox.is-disabled.is-checked .my-checkbox__inner {
  background-color: rgba(0, 0, 0, 0.04);
  border-color: #d9d9d9;
}

.my-checkbox.is-disabled.is-checked .my-checkbox__inner::after {
  border-color: rgba(0, 0, 0, 0.25);
}

.my-checkbox.is-disabled .my-checkbox__label {
  color: rgba(0, 0, 0, 0.25);
  cursor: not-allowed;
}

.my-checkbox__label {
  margin-left: 8px;
  font-size: 14px;
  line-height: 1;
}
</style>
