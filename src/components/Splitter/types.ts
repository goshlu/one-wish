export type SplitterDirection = 'horizontal' | 'vertical'

export interface SplitterProps {
  direction?: SplitterDirection
  tag?: string
}

export interface SplitterPaneProps {
  size?: string | number
  minSize?: string | number
  maxSize?: string | number
  resizable?: boolean
  tag?: string
}
