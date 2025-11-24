export interface DropdownOption {
  label: string
  value: string | number
  disabled?: boolean
}

export type DropdownTrigger = 'click' | 'hover'

export interface DropdownProps {
  options: DropdownOption[]
  trigger?: DropdownTrigger
  placement?: 'bottom-start' | 'bottom-end'
}

export interface DropdownEmits {
  (e: 'select', option: DropdownOption): void
  (e: 'visible-change', visible: boolean): void
}
