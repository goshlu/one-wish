export interface TabItem {
  label: string
  key: string
  disabled?: boolean
}

export interface TabsProps {
  tabs: TabItem[]
  modelValue?: string
}

export interface TabsEmits {
  (e: 'update:modelValue', key: string): void
  (e: 'change', key: string): void
}
