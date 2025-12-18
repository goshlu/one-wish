import type { Component, VNode } from 'vue'

export interface CardProps {
  /**
   * 标题
   */
  title?: string
  /**
   * 副标题
   */
  subtitle?: string
  /**
   * 卡片阴影显示时机
   */
  shadow?: 'always' | 'hover' | 'never'
  /**
   * 自定义 body 样式
   */
  bodyStyle?: Record<string, any>
  /**
   * 自定义 header 样式
   */
  headerStyle?: Record<string, any>
  /**
   * 自定义 footer 样式
   */
  footerStyle?: Record<string, any>
  /**
   * 是否显示边框
   */
  bordered?: boolean
  /**
   * 是否显示 header 边界线
   */
  headerBordered?: boolean
  /**
   * 卡片内边距
   */
  padding?: string | number
  /**
   * header 内边距
   */
  headerPadding?: string | number
  /**
   * body 内边距
   */
  bodyPadding?: string | number
  /**
   * footer 内边距
   */
  footerPadding?: string | number
  /**
   * 卡片圆角
   */
  borderRadius?: string | number
  /**
   * 卡片宽度
   */
  width?: string | number
  /**
   * 卡片高度
   */
  height?: string | number
  /**
   * 是否可悬浮
   */
  hoverable?: boolean
  /**
   * 加载状态
   */
  loading?: boolean
  /**
   * 卡片尺寸
   */
  size?: 'small' | 'default' | 'large'
  /**
   * 是否禁用
   */
  disabled?: boolean
}

export interface CardEmits {
  /**
   * 点击卡片时触发
   */
  click: [event: MouseEvent]
  /**
   * 双击卡片时触发
   */
  dblclick: [event: MouseEvent]
  /**
   * 鼠标进入卡片时触发
   */
  mouseenter: [event: MouseEvent]
  /**
   * 鼠标离开卡片时触发
   */
  mouseleave: [event: MouseEvent]
}

export interface CardSlots {
  /**
   * 卡片标题
   */
  title?: () => VNode[]
  /**
   * 卡片副标题
   */
  subtitle?: () => VNode[]
  /**
   * 卡片额外操作区域
   */
  extra?: () => VNode[]
  /**
   * 卡片封面
   */
  cover?: () => VNode[]
  /**
   * 卡片内容
   */
  default?: () => VNode[]
  /**
   * 自定义加载内容
   */
  loading?: () => VNode[]
  /**
   * 卡片底部操作区域
   */
  actions?: () => VNode[]
  /**
   * 卡片页脚
   */
  footer?: () => VNode[]
}
