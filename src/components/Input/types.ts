export type InputType = 'text' | 'password' | 'number' | 'email' | 'tel'
export type InputSize = 'large' | 'default' | 'small'

export interface InputProps {
  modelValue?: string | number
  type?: InputType
  size?: InputSize
  placeholder?: string
  disabled?: boolean
  clearable?: boolean
  maxlength?: number
  showWordLimit?: boolean
  readonly?: boolean
}

export interface InputEmits {
  (e: 'update:modelValue', value: string | number): void
  (e: 'input', value: string | number): void
  (e: 'change', value: string | number): void
  (e: 'focus', event: FocusEvent): void
  (e: 'blur', event: FocusEvent): void
  (e: 'clear'): void
}
