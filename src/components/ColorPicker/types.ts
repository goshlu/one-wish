export interface ColorPickerProps {
  modelValue?: string
  disabled?: boolean
  showAlpha?: boolean
  predefineColors?: string[]
}

export interface ColorPickerEmits {
  (e: 'update:modelValue', value: string): void
  (e: 'change', value: string): void
}
