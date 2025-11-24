export interface MenuItem {
  key: string
  label: string
  disabled?: boolean
  children?: MenuItem[]
}

export interface MenuProps {
  items: MenuItem[]
  defaultOpenKeys?: string[]
  modelValue?: string
}

export interface MenuEmits {
  (e: 'update:modelValue', key: string): void
  (e: 'select', key: string): void
  (e: 'open-change', keys: string[]): void
}
