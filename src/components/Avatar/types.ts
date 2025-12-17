export type AvatarSize = 'large' | 'default' | 'small'
export type AvatarShape = 'circle' | 'square'

export interface AvatarProps {
  src?: string
  alt?: string
  size?: AvatarSize | number
  shape?: AvatarShape
  icon?: string
  fit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down'
  srcSet?: string
  onError?: (event: Event) => void
}

export interface AvatarEmits {
  (e: 'error', event: Event): void
}
