export type TimePickerSize = 'large' | 'default' | 'small'

export interface TimePickerProps {
  modelValue?: string
  placeholder?: string
  disabled?: boolean
  clearable?: boolean
  size?: TimePickerSize
  min?: string
  max?: string
  step?: number
}

export interface TimePickerEmits {
  (e: 'update:modelValue', value: string | ''): void
  (e: 'change', value: string | ''): void
  (e: 'focus', event: FocusEvent): void
  (e: 'blur', event: FocusEvent): void
  (e: 'clear'): void
}
