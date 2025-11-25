<template>
  <form :class="formClass" :style="formStyle" @submit.prevent="handleSubmit">
    <fieldset class="my-form__fieldset" :disabled="disabled">
      <slot />
    </fieldset>
  </form>
</template>

<script setup lang="ts">
import { computed, provide, reactive } from 'vue'
import type {
  FormProps,
  FormEmits,
  FormFieldContext,
  FormTrigger,
  FormInstance,
} from './types'
import { formContextKey } from './types'
import { getVariantCssVars } from './utils'

defineOptions({
  name: 'MyForm',
})

const props = withDefaults(defineProps<FormProps>(), {
  rules: () => ({}),
  labelWidth: '100px',
  inline: false,
  size: 'default',
  showMessage: true,
  disabled: false,
  layout: 'horizontal',
  variant: 'outlined',
})

const emit = defineEmits<FormEmits>()

const fields = reactive(new Set<FormFieldContext>())

const layout = computed(
  () => props.layout ?? (props.inline ? 'inline' : 'horizontal')
)
const labelPosition = computed(() => {
  if (props.labelPosition) return props.labelPosition
  if (layout.value === 'vertical') return 'top'
  return layout.value === 'inline' ? 'left' : 'right'
})
const labelWidth = computed(() => props.labelWidth)
const inline = computed(() => layout.value === 'inline')
const size = computed(() => props.size)
const showMessage = computed(() => props.showMessage)
const disabled = computed(() => props.disabled)
const variant = computed(() => props.variant)

const formClass = computed(() => [
  'my-form',
  `my-form--${size.value}`,
  `my-form--layout-${layout.value}`,
  `my-form--variant-${variant.value}`,
  {
    'is-disabled': disabled.value,
  },
])

const formStyle = computed(() => ({
  '--my-form-label-width': labelWidth.value,
  ...getVariantCssVars(variant.value),
}))

const addField = (field: FormFieldContext) => {
  fields.add(field)
}

const removeField = (field: FormFieldContext) => {
  fields.delete(field)
}

const getTargetFields = (props?: string | string[]) => {
  if (!props) {
    return Array.from(fields)
  }
  const targetProps = Array.isArray(props) ? props : [props]
  return Array.from(fields).filter(
    field => field.prop && targetProps.includes(field.prop)
  )
}

const validateField = async (
  prop?: string | string[],
  trigger?: FormTrigger
) => {
  const targetFields = getTargetFields(prop)
  if (!targetFields.length) return true
  const result = await Promise.all(
    targetFields.map(field => field.validate(trigger))
  )
  return result.every(Boolean)
}

const resetFields = (prop?: string | string[]) => {
  const targetFields = getTargetFields(prop)
  targetFields.forEach(field => field.resetField())
}

const clearValidate = (prop?: string | string[]) => {
  const targetFields = getTargetFields(prop)
  targetFields.forEach(field => field.clearValidate())
}

const formContext = {
  model: props.model,
  rules: props.rules,
  labelPosition,
  labelWidth,
  inline,
  layout,
  size,
  showMessage,
  disabled,
  variant,
  addField,
  removeField,
  validateField,
  resetFields,
  clearValidate,
}

provide(formContextKey, formContext)

defineExpose<FormInstance>({
  validate: validateField,
  resetFields,
  clearValidate,
})

const handleSubmit = (event: Event) => {
  emit('submit', event)
}
</script>

<style scoped>
.my-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  --form-control-bg: var(--bg-color);
  --form-control-border: var(--border-color-base);
  --form-control-hover-border: var(--border-color-light);
  --form-control-focus-border: var(--primary-color);
  --form-control-focus-shadow: none;
  --form-control-radius: var(--border-radius-base);
  --form-control-border-width: 1px;
}

.my-form__fieldset {
  border: none;
  padding: 0;
  margin: 0;
  min-width: 0;
}

.my-form--layout-inline {
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
}

.my-form.is-disabled {
  opacity: 0.7;
}

.my-form--large {
  font-size: var(--font-size-large);
}

.my-form--small {
  font-size: var(--font-size-small);
}

.my-form--variant-filled,
.my-form-item--variant-filled {
  --form-control-bg: var(--bg-color-light);
  --form-control-border: transparent;
  --form-control-hover-border: transparent;
  --form-control-focus-shadow: 0 0 0 2px rgba(64, 158, 255, 0.1);
}

.my-form--variant-borderless,
.my-form-item--variant-borderless {
  --form-control-bg: transparent;
  --form-control-border: transparent;
  --form-control-hover-border: transparent;
  --form-control-focus-border: transparent;
  --form-control-focus-shadow: none;
}

.my-form--variant-underlined,
.my-form-item--variant-underlined {
  --form-control-bg: transparent;
  --form-control-border: transparent;
  --form-control-hover-border: transparent;
  --form-control-focus-shadow: none;
  --form-control-border-width: 0 0 2px 0;
}
</style>
