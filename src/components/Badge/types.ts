import type { Component, VNode } from 'vue'

export interface BadgeProps {
  /**
   * 显示的数值
   */
  value?: string | number
  /**
   * 最大值，超过最大值会显示 '{max}+'
   */
  max?: number
  /**
   * 是否显示小圆点
   */
  isDot?: boolean
  /**
   * 是否隐藏 badge
   */
  hidden?: boolean
  /**
   * 徽标类型
   */
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'info'
  /**
   * 自定义颜色
   */
  color?: string
}

export interface BadgeEmits {
  /**
   * 点击 badge 时触发
   */
  click: [event: MouseEvent]
}

export interface BadgeSlots {
  /**
   * 默认插槽，用于包裹元素
   */
  default: () => VNode[]
}
