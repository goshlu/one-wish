export interface IconProps {
  /**
   * 图标名称
   */
  name: string

  /**
   * 图标大小（像素）
   * @default 24
   */
  size?: number | string

  /**
   * 填充颜色
   * @default 'currentColor'
   */
  fill?: string

  /**
   * 描边颜色
   * @default 'none'
   */
  stroke?: string

  /**
   * 描边宽度
   * @default 2
   */
  strokeWidth?: number

  /**
   * 描边线帽
   * @default 'round'
   */
  strokeLinecap?: 'butt' | 'round' | 'square'

  /**
   * 描边连接
   * @default 'round'
   */
  strokeLinejoin?: 'bevel' | 'miter' | 'round'

  /**
   * 视图框
   * @default '0 0 24 24'
   */
  viewBox?: string

  /**
   * 图标颜色
   * @default 'inherit'
   */
  color?: string

  /**
   * 是否旋转
   * @default false
   */
  spin?: boolean
}
