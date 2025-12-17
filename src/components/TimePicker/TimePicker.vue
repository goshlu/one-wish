<template>
  <div :class="wrapperClass">
    <span class="my-time-picker__icon" aria-hidden="true" @click="handleIconClick">
      <svg viewBox="0 0 24 24" focusable="false">
        <path
          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"
        />
      </svg>
    </span>
    <input
      ref="inputRef"
      class="my-time-picker__input"
      type="time"
      :value="innerValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :min="min"
      :max="max"
      :step="step"
      @click="handleInputClick"
      @input="handleInput"
      @change="handleChange"
      @focus="handleFocus"
      @blur="handleBlur"
    />
    <span
      v-if="clearable && innerValue && !disabled"
      class="my-time-picker__clear"
      @click="handleClear"
    >
      ✕
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, ref, watch } from 'vue'
import type { TimePickerProps, TimePickerEmits } from './types'
import { formItemContextKey } from '../Form/types'

defineOptions({
  name: 'MyTimePicker',
})

type NativeTimeInputElement = HTMLInputElement & {
  showPicker?: () => void
}

const props = withDefaults(defineProps<TimePickerProps>(), {
  modelValue: '',
  placeholder: '',
  disabled: false,
  clearable: false,
  size: 'default',
  step: 60,
})

const emit = defineEmits<TimePickerEmits>()
const formItem = inject(formItemContextKey, null)
const inputRef = ref<NativeTimeInputElement>()
const isFocused = ref(false)

const innerValue = ref(props.modelValue ?? '')

watch(
  () => props.modelValue,
  value => {
    innerValue.value = value ?? ''
  },
)

const wrapperClass = computed(() => [
  'my-time-picker',
  `my-time-picker--${props.size}`,
  {
    'is-disabled': props.disabled,
    'is-focused': isFocused.value,
  },
])

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
.my-time-picker {
  position: relative;
  display: inline-flex;
  align-items: center;
  width: 100%;
}

.my-time-picker__input {
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

.my-time-picker__icon {
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

.my-time-picker__icon svg {
  width: 18px;
  height: 18px;
  fill: currentColor;
}

.my-time-picker__input:hover:not(:disabled) {
  border-color: var(--border-color-light);
}

.my-time-picker.is-focused .my-time-picker__input {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.15);
}

.my-time-picker.is-focused .my-time-picker__icon {
  color: var(--primary-color);
}

.my-time-picker__input:disabled {
  background-color: var(--bg-color-light);
  cursor: not-allowed;
  opacity: 0.6;
}

.my-time-picker--large .my-time-picker__input {
  padding: 12px 48px 12px 48px;
  font-size: var(--font-size-large);
}

.my-time-picker--small .my-time-picker__input {
  padding: 6px 36px 6px 36px;
  font-size: var(--font-size-small);
}

.my-time-picker__clear {
  position: absolute;
  right: 12px;
  cursor: pointer;
  color: var(--text-placeholder);
  transition: var(--transition-base);
  user-select: none;
}

.my-time-picker__clear:hover {
  color: var(--text-regular);
}

.my-time-picker.is-disabled {
  cursor: not-allowed;
}

.my-time-picker.is-disabled .my-time-picker__icon {
  cursor: not-allowed;
  color: var(--text-secondary);
}
</style>
