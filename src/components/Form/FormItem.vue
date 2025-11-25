<template>
  <div :class="itemClass" :style="itemStyle">
    <label v-if="hasLabel" class="my-form-item__label" :style="labelStyle">
      <span v-if="isRequired" class="my-form-item__required">*</span>
      <slot name="label">{{ label }}</slot>
    </label>
    <div class="my-form-item__content">
      <slot />
      <transition name="form-fade">
        <div
          v-if="showMessage && validateState === 'error'"
          class="my-form-item__error"
        >
          {{ validateMessage }}
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  inject,
  onMounted,
  onUnmounted,
  provide,
  ref,
  useSlots,
} from 'vue'
import type {
  FormContext,
  FormItemContext,
  FormItemProps,
  FormRule,
  FormTrigger,
  FormValidateState,
} from './types'
import { formContextKey, formItemContextKey } from './types'
import { getVariantCssVars } from './utils'

defineOptions({
  name: 'MyFormItem',
})

const props = withDefaults(defineProps<FormItemProps>(), {
  required: false,
})

const slots = useSlots()
const formContext = inject<FormContext | null>(formContextKey, null)

const validateState = ref<FormValidateState>('')
const validateMessage = ref('')
const initialValue = ref<any>()

const rules = computed<FormRule[]>(() => {
  if (props.rules?.length) return props.rules
  if (props.prop && formContext?.rules) {
    return formContext.rules[props.prop] || []
  }
  return []
})

const currentLayout = computed(
  () => props.layout || formContext?.layout.value || 'horizontal'
)
const currentLabelPosition = computed(
  () =>
    props.labelPosition ||
    formContext?.labelPosition.value ||
    (currentLayout.value === 'vertical' ? 'top' : 'right')
)
const currentSize = computed(
  () => props.size || formContext?.size.value || 'default'
)
const currentShowMessage = computed(
  () => props.showMessage ?? formContext?.showMessage.value ?? true
)
const currentLabelWidth = computed(
  () => props.labelWidth || formContext?.labelWidth.value || 'auto'
)
const currentVariant = computed(
  () => props.variant || formContext?.variant.value || 'outlined'
)
const currentDisabled = computed(() => formContext?.disabled.value ?? false)

const showMessage = currentShowMessage
const label = computed(() => props.label)
const hasLabel = computed(() => !!(label.value || slots.label))
const isRequired = computed(
  () => props.required || rules.value.some(rule => rule.required)
)

const itemClass = computed(() => [
  'my-form-item',
  `my-form-item--${currentSize.value}`,
  `my-form-item--layout-${currentLayout.value}`,
  `my-form-item--variant-${currentVariant.value}`,
  `is-${currentLabelPosition.value}`,
  {
    'is-error': validateState.value === 'error',
    'is-success': validateState.value === 'success',
    'is-required': isRequired.value,
    'is-disabled': currentDisabled.value,
  },
])

const labelStyle = computed(() => {
  if (currentLabelPosition.value === 'top') {
    return {}
  }
  return {
    width: currentLabelWidth.value,
  }
})

const itemStyle = computed(() => getVariantCssVars(currentVariant.value))

const getValue = () => {
  if (!props.prop || !formContext) return undefined
  return formContext.model[props.prop]
}

const clearValidate = () => {
  validateState.value = ''
  validateMessage.value = ''
}

const resetField = () => {
  if (!props.prop || !formContext) {
    clearValidate()
    return
  }
  formContext.model[props.prop] = initialValue.value
  clearValidate()
}

const validateRule = async (rule: FormRule, value: any) => {
  if (rule.validator) {
    const result = await rule.validator(value, formContext?.model)
    if (result === true || result === undefined) return true
    return typeof result === 'string' ? result : rule.message || false
  }

  if (rule.required) {
    const empty = value === '' || value === null || value === undefined
    if (empty) return rule.message || '该字段为必填项'
  }

  if (typeof value === 'string' || typeof value === 'number') {
    const str = String(value)
    if (rule.min !== undefined && str.length < rule.min) {
      return rule.message || `至少输入 ${rule.min} 个字符`
    }
    if (rule.max !== undefined && str.length > rule.max) {
      return rule.message || `最多输入 ${rule.max} 个字符`
    }
    if (rule.pattern && !rule.pattern.test(str)) {
      return rule.message || '格式不正确'
    }
  }

  return true
}

const filterRules = (trigger?: FormTrigger) => {
  if (!trigger) return rules.value
  return rules.value.filter(rule => {
    if (!rule.trigger) return true
    const triggers = Array.isArray(rule.trigger) ? rule.trigger : [rule.trigger]
    return triggers.includes(trigger)
  })
}

const validate = async (trigger?: FormTrigger) => {
  if (!props.prop || !formContext) {
    clearValidate()
    return true
  }

  const targetRules = filterRules(trigger)
  if (!targetRules.length) {
    if (!trigger || rules.value.length === 0) {
      clearValidate()
    }
    return true
  }

  const value = getValue()
  validateState.value = 'validating'

  for (const rule of targetRules) {
    const result = await validateRule(rule, value)
    if (result !== true) {
      validateState.value = 'error'
      validateMessage.value =
        typeof result === 'string' ? result : rule.message || '校验失败'
      return false
    }
  }

  validateState.value = 'success'
  validateMessage.value = ''
  return true
}

const formItemContext: FormItemContext = {
  get prop() {
    return props.prop
  },
  validate,
  resetField,
  onFieldBlur: () => {
    validate('blur')
  },
  onFieldChange: () => {
    validate('change')
  },
  clearValidate,
  size: currentSize,
  disabled: currentDisabled,
  variant: currentVariant,
  layout: currentLayout,
  labelPosition: currentLabelPosition,
}

provide(formItemContextKey, formItemContext)

onMounted(() => {
  if (props.prop && formContext) {
    initialValue.value = getValue()
  }
  formContext?.addField(formItemContext)
})

onUnmounted(() => {
  formContext?.removeField(formItemContext)
})
</script>

<style scoped>
.my-form-item {
  display: flex;
  gap: 12px;
  width: 100%;
}

.my-form-item.is-top {
  flex-direction: column;
}

.my-form-item__label {
  flex: 0 0 auto;
  text-align: right;
  font-size: var(--font-size-base);
  color: var(--text-regular);
  padding: 8px 0 0;
  line-height: 1.4;
}

.my-form-item.is-left .my-form-item__label,
.my-form-item.is-top .my-form-item__label {
  text-align: left;
}

.my-form-item__content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.my-form-item__required {
  color: var(--danger-color, #f56c6c);
  margin-right: 4px;
}

.my-form-item__error {
  font-size: 12px;
  color: var(--danger-color, #f56c6c);
  line-height: 1.4;
}

.form-fade-enter-active,
.form-fade-leave-active {
  transition: opacity 0.15s ease;
}

.form-fade-enter-from,
.form-fade-leave-to {
  opacity: 0;
}
</style>
