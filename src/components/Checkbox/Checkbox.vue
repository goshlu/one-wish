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
}

.my-checkbox__input {
  position: relative;
  display: inline-block;
  width: 16px;
  height: 16px;
}

.my-checkbox__input input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.my-checkbox__inner {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 1px solid var(--border-color-base);
  border-radius: 2px;
  background-color: #fff;
  transition: var(--transition-base);
}

.my-checkbox__inner::after {
  content: '';
  position: absolute;
  left: 5px;
  top: 2px;
  width: 4px;
  height: 8px;
  border: 2px solid #fff;
  border-top: 0;
  border-left: 0;
  transform: rotate(45deg) scale(0);
  transition: var(--transition-base);
}

.my-checkbox.is-checked .my-checkbox__inner {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
}

.my-checkbox.is-checked .my-checkbox__inner::after {
  transform: rotate(45deg) scale(1);
}

.my-checkbox.is-indeterminate .my-checkbox__inner::after {
  content: '';
  left: 3px;
  top: 6px;
  width: 8px;
  height: 2px;
  border: none;
  background-color: #fff;
  transform: scale(1);
}

.my-checkbox.is-disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.my-checkbox__label {
  margin-left: 8px;
  font-size: var(--font-size-base);
}
</style>
