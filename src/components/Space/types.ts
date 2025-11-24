export type SpaceDirection = 'horizontal' | 'vertical'
export type SpaceAlign = 'start' | 'end' | 'center' | 'baseline'
export type SpaceJustify = 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly'

export interface SpaceProps {
  direction?: SpaceDirection
  align?: SpaceAlign
  justify?: SpaceJustify
  size?: string | number | [string | number, string | number]
  wrap?: boolean
  tag?: string
}
