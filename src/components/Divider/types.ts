export interface DividerProps {
  /**
   * 分割线方向
   * @default 'horizontal'
   */
  direction?: 'horizontal' | 'vertical'

  /**
   * 分割线内容
   * @default ''
   */
  content?: string

  /**
   * 内容位置
   * @default 'center'
   */
  contentPosition?: 'left' | 'center' | 'right'

  /**
   * 分割线样式
   * @default 'solid'
   */
  borderStyle?: 'solid' | 'dashed' | 'dotted'

  /**
   * 分割线颜色
   * @default '#d9d9d9'
   */
  borderColor?: string

  /**
   * 分割线宽度
   * @default '1px'
   */
  borderWidth?: string

  /**
   * 间距（水平时为上下间距，竖直时为左右间距）
   * @default '16px'
   */
  margin?: string

  /**
   * 文字颜色
   * @default '#999'
   */
  textColor?: string

  /**
   * 文字大小
   * @default '14px'
   */
  fontSize?: string
}
