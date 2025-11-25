export type InputNumberSize = 'large' | 'default' | 'small'

export interface InputNumberProps {
  modelValue?: number | null
  min?: number
  max?: number
  step?: number
  precision?: number
  disabled?: boolean
  controls?: boolean
  size?: InputNumberSize
  placeholder?: string
}

export interface InputNumberEmits {
  (e: 'update:modelValue', value: number | null): void
  (e: 'change', value: number | null): void
  (e: 'focus', event: FocusEvent): void
  (e: 'blur', event: FocusEvent): void
}
