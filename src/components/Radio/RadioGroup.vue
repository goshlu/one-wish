<template>
  <div :class="groupClass" role="radiogroup">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, provide, toRef, inject } from 'vue'
import type {
  RadioGroupProps,
  RadioGroupEmits,
  RadioGroupContext,
  RadioLabel,
} from './types'
import { radioGroupKey } from './types'
import type { FormItemContext } from '../Form/types'
import { formItemContextKey } from '../Form/types'

defineOptions({
  name: 'MyRadioGroup',
})

const props = withDefaults(defineProps<RadioGroupProps>(), {
  modelValue: undefined,
  disabled: false,
})

const emit = defineEmits<RadioGroupEmits>()

const formItem = inject<FormItemContext | null>(formItemContextKey, null)

const finalSize = computed(() => props.size ?? formItem?.size.value ?? 'default')
const finalDisabled = computed(() => props.disabled || formItem?.disabled.value || false)
const finalOptionType = computed(() => props.optionType ?? 'default')
const finalButtonStyle = computed(() => props.buttonStyle ?? 'outline')

const changeEvent = (value: RadioLabel) => {
  emit('update:modelValue', value)
  emit('change', value)
  formItem?.onFieldChange()
}

const context: RadioGroupContext = {
  modelValue: toRef(props, 'modelValue'),
  disabled: finalDisabled,
  size: finalSize,
  optionType: finalOptionType,
  buttonStyle: finalButtonStyle,
  changeEvent,
}

provide(radioGroupKey, context)

const groupClass = computed(() => [
  'my-radio-group',
  `my-radio-group--${finalSize.value}`,
  `my-radio-group--${finalOptionType.value}`,
  {
    'is-disabled': finalDisabled.value,
    [`is-${finalButtonStyle.value}`]: finalOptionType.value === 'button',
  },
])
</script>

<style scoped>
.my-radio-group {
  display: inline-flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
}

.my-radio-group--button {
  gap: 0;
  border-radius: 6px;
  overflow: hidden;
}

.my-radio-group--button:is(.is-solid) {
  background-color: rgba(0, 0, 0, 0.02);
  padding: 2px;
}
</style>
