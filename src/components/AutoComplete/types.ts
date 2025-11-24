export interface AutoCompleteOption {
  value: string
  label?: string
}

export interface AutoCompleteProps {
  modelValue?: string
  options?: AutoCompleteOption[]
  placeholder?: string
  disabled?: boolean
  clearable?: boolean
}

export interface AutoCompleteEmits {
  (e: 'update:modelValue', value: string): void
  (e: 'select', option: AutoCompleteOption): void
  (e: 'search', value: string): void
}
