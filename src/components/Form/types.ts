import type { ComputedRef, InjectionKey, Ref } from 'vue'

export type FormLabelPosition = 'left' | 'right' | 'top'
export type FormSize = 'large' | 'default' | 'small'
export type FormLayout = 'horizontal' | 'vertical' | 'inline'
export type FormVariant = 'outlined' | 'filled' | 'borderless' | 'underlined'
export type FormTrigger = 'change' | 'blur'
export type FormValidateState = '' | 'validating' | 'success' | 'error'

export type FormModel = Record<string, any>

export interface FormRule {
  required?: boolean
  message?: string
  trigger?: FormTrigger | FormTrigger[]
  min?: number
  max?: number
  pattern?: RegExp
  validator?: (
    value: any,
    model?: Record<string, any>,
  ) => boolean | string | Promise<boolean | string>
}

export interface FormRules {
  [key: string]: FormRule[]
}

export interface FormProps {
  model: FormModel
  rules?: FormRules
  labelPosition?: FormLabelPosition
  labelWidth?: string
  inline?: boolean
  size?: FormSize
  showMessage?: boolean
  disabled?: boolean
  layout?: FormLayout
  variant?: FormVariant
}

export interface FormEmits {
  (e: 'submit', event: Event): void
}

export interface FormItemProps {
  label?: string
  prop?: string
  required?: boolean
  showMessage?: boolean
  labelWidth?: string
  labelPosition?: FormLabelPosition
  size?: FormSize
  rules?: FormRule[]
  layout?: FormLayout
  variant?: FormVariant
}

export interface FormContext {
  model: FormModel
  rules?: FormRules
  labelPosition: ComputedRef<FormLabelPosition>
  labelWidth: ComputedRef<string>
  inline: ComputedRef<boolean>
  size: ComputedRef<FormSize>
  showMessage: ComputedRef<boolean>
  disabled: ComputedRef<boolean>
  layout: ComputedRef<FormLayout>
  variant: ComputedRef<FormVariant>
  addField: (field: FormFieldContext) => void
  removeField: (field: FormFieldContext) => void
  validateField: (prop?: string | string[], trigger?: FormTrigger) => Promise<boolean>
  resetFields: (props?: string | string[]) => void
  clearValidate: (props?: string | string[]) => void
}

export interface FormFieldContext {
  prop?: string
  validate: (trigger?: FormTrigger) => Promise<boolean>
  resetField: () => void
  onFieldBlur: () => void
  onFieldChange: () => void
  clearValidate: () => void
}

export interface FormItemContext extends FormFieldContext {
  size: ComputedRef<FormSize>
  disabled: ComputedRef<boolean>
  variant: ComputedRef<FormVariant>
  layout: ComputedRef<FormLayout>
  labelPosition: ComputedRef<FormLabelPosition>
}

export const formContextKey: InjectionKey<FormContext> = Symbol('formContext')
export const formItemContextKey: InjectionKey<FormItemContext> = Symbol('formItemContext')

export interface FormInstance {
  validate: (prop?: string | string[]) => Promise<boolean>
  resetFields: (prop?: string | string[]) => void
  clearValidate: (prop?: string | string[]) => void
}

export interface UseFormActions {
  validate: (prop?: string | string[]) => Promise<boolean>
  resetFields: (prop?: string | string[]) => void
  clearValidate: (prop?: string | string[]) => void
}

export type UseFormReturn = [Ref<FormInstance | undefined>, UseFormActions]
