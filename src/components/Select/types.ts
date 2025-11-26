export type SelectSize = 'large' | 'default' | 'small'

export interface SelectOption {
  label?: string
  value: string | number
  disabled?: boolean
}

export interface SelectProps {
  modelValue?: string | number | Array<string | number> | null
  options?: SelectOption[]
  placeholder?: string
  disabled?: boolean
  clearable?: boolean
  filterable?: boolean
  multiple?: boolean
  size?: SelectSize
}

export interface SelectEmits {
  (e: 'update:modelValue', value: SelectProps['modelValue']): void
  (e: 'change', value: SelectProps['modelValue']): void
  (e: 'clear'): void
  (e: 'visibleChange', visible: boolean): void
}
