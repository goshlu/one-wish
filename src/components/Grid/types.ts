export interface GridProps {
  columns?: number | string
  rows?: number | string
  gap?: string | number
  columnGap?: string | number
  rowGap?: string | number
  autoFlow?: 'row' | 'column' | 'dense' | 'row dense' | 'column dense'
  tag?: string
}
