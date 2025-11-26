export type MentionsSize = 'large' | 'default' | 'small'
export type MentionsPlacement = 'top' | 'bottom'
export type MentionsPrefix = string | string[]

export interface MentionOption {
  value: string
  label?: string
  disabled?: boolean
}

export interface MentionsProps {
  modelValue?: string
  options?: MentionOption[]
  placeholder?: string
  disabled?: boolean
  rows?: number
  size?: MentionsSize
  prefix?: MentionsPrefix
  placement?: MentionsPlacement
  filterOption?: (search: string, option: MentionOption) => boolean
}

export interface MentionsEmits {
  (e: 'update:modelValue', value: string): void
  (e: 'input', value: string): void
  (e: 'select', option: MentionOption): void
  (e: 'search', value: string, prefix: string): void
  (e: 'focus', event: FocusEvent): void
  (e: 'blur', event: FocusEvent): void
}
