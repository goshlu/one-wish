<template>
  <div :class="inputWrapperClass">
    <input
      ref="inputRef"
      :class="inputClass"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="finalDisabled"
      :readonly="readonly"
      :maxlength="maxlength"
      @input="handleInput"
      @change="handleChange"
      @focus="handleFocus"
      @blur="handleBlur"
    />
    <span
      v-if="clearable && modelValue && !finalDisabled && !readonly"
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
import { computed, inject, ref } from 'vue'
import type { InputProps, InputEmits } from './types'
import type { FormItemContext } from '../Form/types'
import { formItemContextKey } from '../Form/types'

defineOptions({
  name: 'MyInput',
})

const props = withDefaults(defineProps<InputProps>(), {
  modelValue: '',
  type: 'text',
  placeholder: '',
  disabled: false,
  clearable: false,
  readonly: false,
  showWordLimit: false,
})

const emit = defineEmits<InputEmits>()

const inputRef = ref<HTMLInputElement>()
const formItem = inject<FormItemContext | null>(formItemContextKey, null)

const finalSize = computed(() => props.size ?? formItem?.size.value ?? 'default')
const finalDisabled = computed(() => props.disabled || formItem?.disabled.value || false)

const inputWrapperClass = computed(() => {
  return [
    'my-input-wrapper',
    `my-input-wrapper--${finalSize.value}`,
    {
      'is-disabled': finalDisabled.value,
    },
  ]
})

const inputClass = computed(() => {
  return ['my-input', `my-input--${finalSize.value}`]
})

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  const value = target.value
  emit('update:modelValue', value)
  emit('input', value)
  formItem?.onFieldChange()
}

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('change', target.value)
  formItem?.onFieldChange()
}

const handleFocus = (event: FocusEvent) => {
  emit('focus', event)
}

const handleBlur = (event: FocusEvent) => {
  emit('blur', event)
  formItem?.onFieldBlur()
}

const handleClear = () => {
  emit('update:modelValue', '')
  emit('clear')
  inputRef.value?.focus()
  formItem?.onFieldChange()
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
  background-color: var(--form-control-bg, var(--bg-color));
  border: 1px solid var(--form-control-border, var(--border-color-base));
  border-width: var(--form-control-border-width, 1px);
  border-radius: var(--form-control-radius, var(--border-radius-base));
  outline: none;
  transition: var(--transition-base);
}

.my-input::placeholder {
  color: var(--text-placeholder);
}

.my-input:hover:not(:disabled) {
  border-color: var(--form-control-hover-border, var(--border-color-light));
}

.my-input:focus {
  border-color: var(--form-control-focus-border, var(--primary-color));
  box-shadow: var(--form-control-focus-shadow, none);
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
