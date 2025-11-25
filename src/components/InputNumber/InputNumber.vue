<template>
  <div :class="wrapperClass">
    <button
      v-if="controls"
      type="button"
      class="my-input-number__btn"
      :disabled="decreaseDisabled"
      @click="changeValue(-1)"
    >
      -
    </button>
    <input
      ref="inputRef"
      class="my-input-number__input"
      type="number"
      :value="displayValue"
      :step="step"
      :min="min"
      :max="max"
      :disabled="disabled"
      :placeholder="placeholder"
      @input="handleInput"
      @change="handleChange"
      @focus="handleFocus"
      @blur="handleBlur"
    />
    <button
      v-if="controls"
      type="button"
      class="my-input-number__btn"
      :disabled="increaseDisabled"
      @click="changeValue(1)"
    >
      +
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, ref, watch } from 'vue'
import type { InputNumberProps, InputNumberEmits } from './types'
import type { FormItemContext } from '../Form/types'
import { formItemContextKey } from '../Form/types'

defineOptions({
  name: 'MyInputNumber',
})

const props = withDefaults(defineProps<InputNumberProps>(), {
  modelValue: null,
  step: 1,
  precision: undefined,
  disabled: false,
  controls: true,
  size: 'default',
  placeholder: '',
})

const emit = defineEmits<InputNumberEmits>()
const inputRef = ref<HTMLInputElement>()
const formItem = inject<FormItemContext | null>(formItemContextKey, null)

const innerValue = ref<number | null>(props.modelValue ?? null)

watch(
  () => props.modelValue,
  value => {
    innerValue.value = value ?? null
  },
)

const wrapperClass = computed(() => [
  'my-input-number',
  `my-input-number--${props.size}`,
  {
    'is-disabled': props.disabled,
    'has-controls': props.controls,
  },
])

const displayValue = computed(() => (innerValue.value ?? '').toString())

const clamp = (value: number) => {
  let result = value
  if (props.min !== undefined && result < props.min) {
    result = props.min
  }
  if (props.max !== undefined && result > props.max) {
    result = props.max
  }
  return result
}

const formatPrecision = (value: number) => {
  if (props.precision === undefined) return value
  const factor = 10 ** props.precision
  return Math.round(value * factor) / factor
}

const setValue = (value: number | null, emitChange = true) => {
  if (value === null) {
    innerValue.value = null
    emit('update:modelValue', null)
    if (emitChange) emit('change', null)
    formItem?.onFieldChange()
    return
  }
  const formatted = formatPrecision(clamp(value))
  innerValue.value = formatted
  emit('update:modelValue', formatted)
  if (emitChange) emit('change', formatted)
  formItem?.onFieldChange()
}

const changeValue = (direction: 1 | -1) => {
  if (props.disabled) return
  const current = innerValue.value ?? 0
  const next = current + direction * props.step
  setValue(next)
}

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  const value = target.value
  if (value === '') {
    setValue(null)
    return
  }
  const numberValue = Number(value)
  if (Number.isNaN(numberValue)) return
  setValue(numberValue, false)
}

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const value = target.value
  if (value === '') {
    setValue(null)
    return
  }
  const numberValue = Number(value)
  if (Number.isNaN(numberValue)) {
    target.value = displayValue.value
    return
  }
  setValue(numberValue)
}

const handleFocus = (event: FocusEvent) => {
  emit('focus', event)
}

const handleBlur = (event: FocusEvent) => {
  emit('blur', event)
  formItem?.onFieldBlur()
}

const decreaseDisabled = computed(() => {
  if (props.disabled) return true
  if (props.min === undefined) return false
  return innerValue.value !== null && innerValue.value <= props.min
})

const increaseDisabled = computed(() => {
  if (props.disabled) return true
  if (props.max === undefined) return false
  return innerValue.value !== null && innerValue.value >= props.max
})
</script>

<style scoped>
.my-input-number {
  display: inline-flex;
  align-items: stretch;
  border: 1px solid var(--border-color-base);
  border-radius: var(--border-radius-base);
  overflow: hidden;
  background-color: var(--bg-color);
}

.my-input-number.has-controls .my-input-number__input {
  border-left: 1px solid var(--border-color-base);
  border-right: 1px solid var(--border-color-base);
}

.my-input-number__input {
  width: 100%;
  padding: 8px 12px;
  font-size: var(--font-size-base);
  color: var(--text-regular);
  border: none;
  outline: none;
  background-color: transparent;
}

.my-input-number__input:disabled {
  background-color: var(--bg-color-light);
  cursor: not-allowed;
}

.my-input-number__btn {
  width: 32px;
  border: none;
  background: transparent;
  cursor: pointer;
  color: var(--text-regular);
  transition: var(--transition-base);
}

.my-input-number__btn:hover:not(:disabled) {
  background-color: var(--bg-color-light);
}

.my-input-number__btn:disabled {
  cursor: not-allowed;
  color: var(--text-placeholder);
}

.my-input-number--large .my-input-number__input {
  padding: 12px 16px;
  font-size: var(--font-size-large);
}

.my-input-number--small .my-input-number__input {
  padding: 6px 10px;
  font-size: var(--font-size-small);
}
</style>
