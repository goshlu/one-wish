export interface AnchorItem {
  href: string
  title: string
}

export interface AnchorProps {
  items: AnchorItem[]
  offset?: number
}

export interface AnchorEmits {
  (e: 'select', href: string): void
}
