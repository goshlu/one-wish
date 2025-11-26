<template>
  <label :class="wrapperClass">
    <span class="my-radio__input">
      <input
        type="radio"
        :checked="isChecked"
        :disabled="finalDisabled"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
      />
      <span class="my-radio__inner"></span>
    </span>
    <span v-if="hasLabel" class="my-radio__label">
      <slot>{{ displayLabel }}</slot>
    </span>
  </label>
</template>

<script setup lang="ts">
import { computed, inject, useSlots } from 'vue'
import type { RadioProps, RadioEmits } from './types'
import { radioGroupKey } from './types'
import type { FormItemContext } from '../Form/types'
import { formItemContextKey } from '../Form/types'

defineOptions({
  name: 'MyRadio',
})

const props = withDefaults(defineProps<RadioProps>(), {
  modelValue: false,
  disabled: false,
})

const emit = defineEmits<RadioEmits>()
const slots = useSlots()

const radioGroup = inject(radioGroupKey, null)
const formItem = inject<FormItemContext | null>(formItemContextKey, null)

const finalSize = computed(
  () => radioGroup?.size.value ?? props.size ?? formItem?.size.value ?? 'default'
)
const finalOptionType = computed(
  () => radioGroup?.optionType.value ?? props.optionType ?? 'default'
)
const finalButtonStyle = computed(
  () => radioGroup?.buttonStyle.value ?? props.buttonStyle ?? 'outline'
)
const finalDisabled = computed(
  () => props.disabled || radioGroup?.disabled.value || formItem?.disabled.value || false
)

const value = computed(() => props.value ?? props.label ?? true)

const isChecked = computed(() => {
  if (radioGroup) {
    return radioGroup.modelValue.value === value.value
  }
  return props.modelValue === true
})

const wrapperClass = computed(() => [
  'my-radio',
  `my-radio--${finalSize.value}`,
  `my-radio--${finalOptionType.value}`,
  {
    'is-checked': isChecked.value,
    'is-disabled': finalDisabled.value,
    'is-solid': finalOptionType.value === 'button' && finalButtonStyle.value === 'solid',
  },
])

const displayLabel = computed(() => props.label ?? props.value)
const hasLabel = computed(
  () => !!(slots.default || props.label !== undefined || props.value !== undefined)
)

const handleChange = () => {
  if (finalDisabled.value) return
  if (radioGroup) {
    radioGroup.changeEvent(value.value)
  } else {
    emit('update:modelValue', true)
    emit('change', true)
    formItem?.onFieldChange()
  }
}

const handleFocus = (event: FocusEvent) => {
  event.stopPropagation()
}

const handleBlur = () => {
  formItem?.onFieldBlur()
}
</script>

<style scoped>
.my-radio {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  font-size: 14px;
  color: var(--text-regular, rgba(0, 0, 0, 0.88));
  line-height: 1;
  transition: color 0.2s;
  gap: 8px;
}

.my-radio.is-disabled {
  cursor: not-allowed;
  color: var(--text-placeholder, rgba(0, 0, 0, 0.25));
}

.my-radio__input {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}

.my-radio__input input {
  opacity: 0;
  position: absolute;
  width: 18px;
  height: 18px;
  margin: 0;
  cursor: pointer;
}

.my-radio.is-disabled .my-radio__input input {
  cursor: not-allowed;
}

.my-radio__inner {
  width: 16px;
  height: 16px;
  border: 1px solid #d9d9d9;
  border-radius: 50%;
  box-sizing: border-box;
  transition: all 0.2s;
  background-color: #fff;
  position: relative;
}

.my-radio__inner::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #1677ff;
  transform: translate(-50%, -50%) scale(0);
  transition: transform 0.2s ease;
}

.my-radio:hover:not(.is-disabled) .my-radio__inner {
  border-color: #1677ff;
}

.my-radio.is-checked .my-radio__inner {
  border-color: #1677ff;
}

.my-radio.is-checked .my-radio__inner::after {
  transform: translate(-50%, -50%) scale(1);
}

.my-radio--button {
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  padding: 6px 16px;
  gap: 0;
  background: #fff;
  transition: all 0.2s;
}

.my-radio--button .my-radio__input {
  display: none;
}

.my-radio--button .my-radio__label {
  margin: 0;
  font-size: 14px;
}

.my-radio--button.is-checked {
  border-color: #1677ff;
  color: #1677ff;
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.02);
}

.my-radio--button.is-solid.is-checked {
  background-color: #1677ff;
  color: #fff;
}

.my-radio--button.is-disabled {
  border-color: #d9d9d9;
  color: rgba(0, 0, 0, 0.25);
  background-color: rgba(0, 0, 0, 0.02);
}

.my-radio--large {
  font-size: 16px;
}

.my-radio--large .my-radio--button .my-radio__label {
  font-size: 16px;
}

.my-radio__label {
  font-size: inherit;
  line-height: 1;
}
</style>
