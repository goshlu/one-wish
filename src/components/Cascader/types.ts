export interface CascaderOption {
  value: string | number
  label: string
  children?: CascaderOption[]
  disabled?: boolean
}

export interface CascaderProps {
  modelValue?: (string | number)[]
  options?: CascaderOption[]
  placeholder?: string
  disabled?: boolean
  clearable?: boolean
}

export interface CascaderEmits {
  (e: 'update:modelValue', value: (string | number)[]): void
  (e: 'change', value: (string | number)[]): void
}
