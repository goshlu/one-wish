export type ButtonType =
  | 'primary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'default'
export type ButtonSize = 'large' | 'default' | 'small'

export interface ButtonProps {
  type?: ButtonType
  size?: ButtonSize
  disabled?: boolean
  loading?: boolean
  round?: boolean
  plain?: boolean
}

export interface ButtonEmits {
  (e: 'click', event: MouseEvent): void
}
