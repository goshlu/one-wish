export type DatePickerType = 'date' | 'datetime-local'
export type DatePickerSize = 'large' | 'default' | 'small'

export interface DatePickerProps {
  modelValue?: string
  type?: DatePickerType
  placeholder?: string
  disabled?: boolean
  clearable?: boolean
  size?: DatePickerSize
  min?: string
  max?: string
}

export interface DatePickerEmits {
  (e: 'update:modelValue', value: string | ''): void
  (e: 'change', value: string | ''): void
  (e: 'focus', event: FocusEvent): void
  (e: 'blur', event: FocusEvent): void
  (e: 'clear'): void
}
