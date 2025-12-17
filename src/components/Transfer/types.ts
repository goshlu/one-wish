export type TransferSize = 'large' | 'default' | 'small'

export interface TransferOption {
  key: string | number
  label: string
  disabled?: boolean
}

export interface TransferProps {
  modelValue?: Array<string | number>
  data?: TransferOption[]
  titles?: string[]
  buttonTexts?: string[]
  placeholder?: string[]
  filterable?: boolean
  filterPlaceholder?: string
  disabled?: boolean
  size?: TransferSize
  targetOrder?: 'original' | 'push'
}

export interface TransferEmits {
  (e: 'update:modelValue', value: Array<string | number>): void
  (e: 'change', value: Array<string | number>, direction: 'left' | 'right', movedKeys: Array<string | number>): void
  (e: 'left-check-change', checkedKeys: Array<string | number>): void
  (e: 'right-check-change', checkedKeys: Array<string | number>): void
}
