import type { ComputedRef, Ref } from 'vue'

export type RadioLabel = string | number | boolean
export type RadioSize = 'large' | 'default' | 'small'
export type RadioOptionType = 'default' | 'button'
export type RadioButtonStyle = 'outline' | 'solid'

export interface RadioProps {
  modelValue?: boolean
  value?: RadioLabel
  label?: string | number
  disabled?: boolean
  optionType?: RadioOptionType
  buttonStyle?: RadioButtonStyle
  size?: RadioSize
}

export interface RadioEmits {
  (e: 'update:modelValue', value: boolean): void
  (e: 'change', value: boolean): void
}

export interface RadioGroupProps {
  modelValue?: RadioLabel
  disabled?: boolean
  size?: RadioSize
  optionType?: RadioOptionType
  buttonStyle?: RadioButtonStyle
}

export interface RadioGroupEmits {
  (e: 'update:modelValue', value: RadioLabel): void
  (e: 'change', value: RadioLabel): void
}

export interface RadioGroupContext {
  modelValue: Ref<RadioLabel | undefined>
  disabled: Ref<boolean>
  size: ComputedRef<RadioSize>
  optionType: ComputedRef<RadioOptionType>
  buttonStyle: ComputedRef<RadioButtonStyle>
  changeEvent: (value: RadioLabel) => void
}

export const radioGroupKey = Symbol('radioGroup')
