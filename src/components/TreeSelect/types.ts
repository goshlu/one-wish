export type TreeSelectSize = 'large' | 'default' | 'small'

export interface TreeSelectOption {
  label: string
  value: string | number
  children?: TreeSelectOption[]
  disabled?: boolean
  disableCheckbox?: boolean
  checkable?: boolean
  selectable?: boolean
  isLeaf?: boolean
}

export interface TreeSelectProps {
  modelValue?: string | number | Array<string | number> | null
  options?: TreeSelectOption[]
  placeholder?: string
  disabled?: boolean
  clearable?: boolean
  filterable?: boolean
  multiple?: boolean
  showCheckedStrategy?: 'SHOW_CHILD' | 'SHOW_PARENT' | 'ALL'
  checkable?: boolean
  size?: TreeSelectSize
  treeDefaultExpandAll?: boolean
  treeDefaultExpandedKeys?: Array<string | number>
  treeLine?: boolean
  virtual?: boolean
  listHeight?: number
}

export interface TreeSelectEmits {
  (e: 'update:modelValue', value: TreeSelectProps['modelValue']): void
  (e: 'change', value: TreeSelectProps['modelValue'], label: string | string[]): void
  (e: 'clear'): void
  (e: 'visibleChange', visible: boolean): void
  (e: 'search', value: string): void
  (e: 'select', value: string | number, selected: boolean, node: TreeSelectOption): void
  (e: 'check', value: string | number, checked: boolean, node: TreeSelectOption): void
}
