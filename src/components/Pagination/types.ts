export interface PaginationProps {
  total: number
  pageSize?: number
  currentPage?: number
  pageSizeOptions?: number[]
  showSizeChanger?: boolean
  showJumper?: boolean
  pagerCount?: number
}

export interface PaginationEmits {
  (e: 'update:currentPage', page: number): void
  (e: 'change', page: number, pageSize: number): void
  (e: 'page-size-change', pageSize: number): void
}
