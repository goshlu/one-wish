<template>
  <div :class="inputWrapperClass">
    <input
      ref="inputRef"
      :class="inputClass"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :maxlength="maxlength"
      @input="handleInput"
      @change="handleChange"
      @focus="handleFocus"
      @blur="handleBlur"
    />
    <span
      v-if="clearable && modelValue && !disabled && !readonly"
      class="my-input__clear"
      @click="handleClear"
    >
      ✕
    </span>
    <span v-if="showWordLimit && maxlength" class="my-input__count">
      {{ String(modelValue).length }}/{{ maxlength }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { InputProps, InputEmits } from './types'

defineOptions({
  name: 'MyInput',
})

const props = withDefaults(defineProps<InputProps>(), {
  modelValue: '',
  type: 'text',
  size: 'default',
  placeholder: '',
  disabled: false,
  clearable: false,
  readonly: false,
  showWordLimit: false,
})

const emit = defineEmits<InputEmits>()

const inputRef = ref<HTMLInputElement>()

const inputWrapperClass = computed(() => {
  return [
    'my-input-wrapper',
    `my-input-wrapper--${props.size}`,
    {
      'is-disabled': props.disabled,
    },
  ]
})

const inputClass = computed(() => {
  return ['my-input', `my-input--${props.size}`]
})

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  const value = target.value
  emit('update:modelValue', value)
  emit('input', value)
}

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('change', target.value)
}

const handleFocus = (event: FocusEvent) => {
  emit('focus', event)
}

const handleBlur = (event: FocusEvent) => {
  emit('blur', event)
}

const handleClear = () => {
  emit('update:modelValue', '')
  emit('clear')
  inputRef.value?.focus()
}
</script>

<style scoped>
.my-input-wrapper {
  position: relative;
  display: inline-flex;
  align-items: center;
  width: 100%;
}

.my-input {
  width: 100%;
  padding: 8px 12px;
  font-size: var(--font-size-base);
  color: var(--text-regular);
  background-color: var(--bg-color);
  border: 1px solid var(--border-color-base);
  border-radius: var(--border-radius-base);
  outline: none;
  transition: var(--transition-base);
}

.my-input::placeholder {
  color: var(--text-placeholder);
}

.my-input:hover:not(:disabled) {
  border-color: var(--border-color-light);
}

.my-input:focus {
  border-color: var(--primary-color);
}

.my-input:disabled {
  background-color: var(--bg-color-light);
  cursor: not-allowed;
  opacity: 0.6;
}

/* 尺寸 */
.my-input--large {
  padding: 12px 16px;
  font-size: var(--font-size-large);
}

.my-input--small {
  padding: 6px 10px;
  font-size: var(--font-size-small);
}

/* 清除按钮 */
.my-input__clear {
  position: absolute;
  right: 10px;
  cursor: pointer;
  color: var(--text-placeholder);
  transition: var(--transition-base);
  user-select: none;
}

.my-input__clear:hover {
  color: var(--text-regular);
}

/* 字数统计 */
.my-input__count {
  position: absolute;
  right: 10px;
  font-size: 12px;
  color: var(--text-placeholder);
  pointer-events: none;
}

.my-input-wrapper.is-disabled {
  cursor: not-allowed;
}
</style>
