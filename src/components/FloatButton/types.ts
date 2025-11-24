export type FloatButtonType = 'primary' | 'default'
export type FloatButtonShape = 'circle' | 'square'
export type FloatButtonPosition =
  | 'right-bottom'
  | 'right-top'
  | 'left-bottom'
  | 'left-top'

export interface FloatButtonProps {
  type?: FloatButtonType
  shape?: FloatButtonShape
  position?: FloatButtonPosition
  icon?: string
  description?: string
  tooltip?: string
  href?: string
  target?: '_blank' | '_self' | '_parent' | '_top'
  badge?: number | string
  disabled?: boolean
  mode?: 'fixed' | 'absolute'
}

export interface FloatButtonEmits {
  (e: 'click', event: MouseEvent): void
}

export interface FloatButtonGroupProps {
  type?: FloatButtonType
  shape?: FloatButtonShape
  position?: FloatButtonPosition
  trigger?: 'click' | 'hover'
}
