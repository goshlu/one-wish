<template>
  <div :class="wrapperClass">
    <span class="my-date-picker__icon" aria-hidden="true" @click="handleIconClick">
      <svg viewBox="0 0 24 24" focusable="false">
        <path
          d="M7 2a1 1 0 0 1 1 1v1h8V3a1 1 0 1 1 2 0v1h1.5A2.5 2.5 0 0 1 22 6.5v13A2.5 2.5 0 0 1 19.5 22h-15A2.5 2.5 0 0 1 2 19.5v-13A2.5 2.5 0 0 1 4.5 4H6V3a1 1 0 0 1 1-1Zm12.5 6h-15c-.276 0-.5.224-.5.5v10c0 .276.224.5.5.5h15c.276 0 .5-.224.5-.5v-10c0-.276-.224-.5-.5-.5ZM8 12h3v3H8v-3Z"
        />
      </svg>
    </span>
    <input
      ref="inputRef"
      class="my-date-picker__input"
      :type="inputType"
      :value="innerValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :min="min"
      :max="max"
      @click="handleInputClick"
      @input="handleInput"
      @change="handleChange"
      @focus="handleFocus"
      @blur="handleBlur"
    />
    <span
      v-if="clearable && innerValue && !disabled"
      class="my-date-picker__clear"
      @click="handleClear"
    >
      ✕
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, ref, watch } from 'vue'
import type { DatePickerProps, DatePickerEmits } from './types'
import { formItemContextKey } from '../Form/types'

defineOptions({
  name: 'MyDatePicker',
})

type NativeDateInputElement = HTMLInputElement & {
  showPicker?: () => void
}

const props = withDefaults(defineProps<DatePickerProps>(), {
  modelValue: '',
  type: 'date',
  placeholder: '',
  disabled: false,
  clearable: false,
  size: 'default',
})

const emit = defineEmits<DatePickerEmits>()
const formItem = inject(formItemContextKey, null)
const inputRef = ref<NativeDateInputElement>()
const isFocused = ref(false)

const innerValue = ref(props.modelValue ?? '')

watch(
  () => props.modelValue,
  value => {
    innerValue.value = value ?? ''
  },
)

const wrapperClass = computed(() => [
  'my-date-picker',
  `my-date-picker--${props.size}`,
  {
    'is-disabled': props.disabled,
    'is-focused': isFocused.value,
  },
])

const inputType = computed(() => (props.type === 'datetime-local' ? 'datetime-local' : 'date'))

const openNativePicker = () => {
  if (props.disabled) return
  const inputEl = inputRef.value
  if (!inputEl) return
  inputEl.focus()
  try {
    inputEl.showPicker?.()
  } catch {
    // 部分浏览器尚未实现 showPicker，忽略异常
  }
}

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  const value = target.value
  innerValue.value = value
  emit('update:modelValue', value)
}

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('change', target.value)
  formItem?.onFieldChange()
}

const handleInputClick = () => {
  openNativePicker()
}

const handleFocus = (event: FocusEvent) => {
  isFocused.value = true
  emit('focus', event)
}

const handleBlur = (event: FocusEvent) => {
  isFocused.value = false
  emit('blur', event)
  formItem?.onFieldBlur()
}

const handleIconClick = () => {
  openNativePicker()
}

const handleClear = () => {
  if (props.disabled) return
  innerValue.value = ''
  emit('update:modelValue', '')
  emit('change', '')
  emit('clear')
  formItem?.onFieldChange()
  inputRef.value?.focus()
}
</script>

<style scoped>
.my-date-picker {
  position: relative;
  display: inline-flex;
  align-items: center;
  width: 100%;
}

.my-date-picker__input {
  width: 100%;
  padding: 8px 42px 8px 42px;
  font-size: var(--font-size-base);
  color: var(--text-regular);
  background-color: var(--bg-color);
  border: 1px solid var(--border-color-base);
  border-radius: var(--border-radius-base);
  outline: none;
  transition: var(--transition-base);
}

.my-date-picker__icon {
  position: absolute;
  left: 14px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  color: var(--text-placeholder);
  cursor: pointer;
  transition: var(--transition-base);
}

.my-date-picker__icon svg {
  width: 18px;
  height: 18px;
  fill: currentColor;
}

.my-date-picker__input:hover:not(:disabled) {
  border-color: var(--border-color-light);
}

.my-date-picker.is-focused .my-date-picker__input {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.15);
}

.my-date-picker.is-focused .my-date-picker__icon {
  color: var(--primary-color);
}

.my-date-picker__input:disabled {
  background-color: var(--bg-color-light);
  cursor: not-allowed;
  opacity: 0.6;
}

.my-date-picker--large .my-date-picker__input {
  padding: 12px 48px 12px 48px;
  font-size: var(--font-size-large);
}

.my-date-picker--small .my-date-picker__input {
  padding: 6px 36px 6px 36px;
  font-size: var(--font-size-small);
}

.my-date-picker__clear {
  position: absolute;
  right: 12px;
  cursor: pointer;
  color: var(--text-placeholder);
  transition: var(--transition-base);
  user-select: none;
}

.my-date-picker__clear:hover {
  color: var(--text-regular);
}

.my-date-picker.is-disabled {
  cursor: not-allowed;
}

.my-date-picker.is-disabled .my-date-picker__icon {
  cursor: not-allowed;
  color: var(--text-secondary);
}
</style>
