export interface CheckboxProps {
  modelValue?: boolean | string | number
  label?: string | number
  disabled?: boolean
  indeterminate?: boolean
}

export interface CheckboxEmits {
  (e: 'update:modelValue', value: boolean | string | number): void
  (e: 'change', value: boolean): void
}

export interface CheckboxGroupProps {
  modelValue?: (string | number)[]
  disabled?: boolean
}

export interface CheckboxGroupEmits {
  (e: 'update:modelValue', value: (string | number)[]): void
  (e: 'change', value: (string | number)[]): void
}
