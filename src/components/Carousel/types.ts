import type { VNode } from 'vue'

export interface CarouselItem {
  /**
   * 轮播项标识
   */
  key?: string | number
  /**
   * 轮播项内容
   */
  content?: string
}

export interface CarouselProps {
  /**
   * 当前激活项的索引
   */
  modelValue?: number
  /**
   * 走马灯高度
   */
  height?: string | number
  /**
   * 指示器的位置
   */
  indicatorPosition?: 'inside' | 'outside' | 'none'
  /**
   * 是否显示箭头
   */
  arrows?: boolean
  /**
   * 切换箭头的显示时机
   */
  arrow?: 'always' | 'hover' | 'never'
  /**
   * 走马灯的类型
   */
  type?: 'default' | 'card'
  /**
   * 是否自动切换
   */
  autoplay?: boolean
  /**
   * 自动切换的时间间隔，单位为毫秒
   */
  interval?: number
  /**
   * 是否循环显示
   */
  loop?: boolean
  /**
   * 指示器的触发方式
   */
  trigger?: 'click' | 'hover'
  /**
   * 切换动画持续时间，单位为毫秒
   */
  duration?: number
  /**
   * 是否暂停自动播放
   */
  pauseOnHover?: boolean
  /**
   * 指示器样式
   */
  indicatorStyle?: 'dot' | 'line'
  /**
   * 切换动效
   */
  effect?: 'scrollx' | 'fade'
  /**
   * 切换动效时间（毫秒）
   */
  speed?: number
  /**
   * 动画缓动函数
   */
  easing?: string
  /**
   * 自动切换的时间间隔（毫秒）
   */
  autoplaySpeed?: number
  /**
   * 是否可拖拽切换
   */
  draggable?: boolean
  /**
   * 指示点位置（Ant Design Vue 风格）
   */
  dotPosition?: 'top' | 'bottom' | 'left' | 'right'
  /**
   * 指示点位置
   */
  dotPlacement?: 'top' | 'bottom' | 'start' | 'end'
  /**
   * 是否显示指示点
   */
  dots?: boolean | { className?: string }
  /**
   * 走马灯方向
   */
  direction?: 'horizontal' | 'vertical'
}

export interface CarouselEmits {
  /**
   * 当前激活项索引变化时触发
   */
  'update:modelValue': [value: number]
  /**
   * 切换时触发
   */
  change: [current: number, prev: number]
}

export interface CarouselSlots {
  /**
   * 默认插槽，放置 CarouselItem
   */
  default?: () => VNode[]
  /**
   * 自定义指示器内容
   */
  indicator?: (props: { index: number; active: boolean }) => VNode[]
}

export interface CarouselItemProps {
  /**
   * 轮播项的名称，与走马灯的 modelValue 对应
   */
  name?: string | number
  /**
   * 轮播项的标签，可用于指示器
   */
  label?: string
}

export interface CarouselItemSlots {
  /**
   * 默认插槽，轮播项内容
   */
  default?: () => VNode[]
}
