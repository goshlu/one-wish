export type FlexDirection = 'row' | 'column' | 'row-reverse' | 'column-reverse'
export type FlexJustify = 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly'
export type FlexAlign = 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline'
export type FlexWrap = 'nowrap' | 'wrap' | 'wrap-reverse'

export interface FlexProps {
  direction?: FlexDirection
  justify?: FlexJustify
  align?: FlexAlign
  wrap?: FlexWrap
  gap?: string | number
  tag?: string
}
