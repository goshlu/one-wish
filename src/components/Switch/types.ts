export type SwitchSize = 'default' | 'small'

export interface SwitchProps {
  modelValue?: boolean
  disabled?: boolean
  loading?: boolean
  checkedChildren?: string
  unCheckedChildren?: string
  size?: SwitchSize
}

export interface SwitchEmits {
  (e: 'update:modelValue', value: boolean): void
  (e: 'change', value: boolean): void
}
