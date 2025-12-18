<template>
  <div
    class="my-card"
    :class="cardClass"
    :style="cardStyle"
    @click="handleClick"
    @dblclick="handleDblclick"
    @mouseenter="handleMouseenter"
    @mouseleave="handleMouseleave"
  >
    <!-- 封面 -->
    <div v-if="slots.cover" class="my-card__cover">
      <slot name="cover" />
    </div>

    <!-- 头部 -->
    <div v-if="hasHeader" class="my-card__header" :style="headerStyle">
      <div class="my-card__header-content">
        <!-- 标题 -->
        <div v-if="hasTitle" class="my-card__title">
          <slot name="title">{{ title }}</slot>
        </div>
        <!-- 副标题 -->
        <div v-if="hasSubtitle" class="my-card__subtitle">
          <slot name="subtitle">{{ subtitle }}</slot>
        </div>
      </div>
      <!-- 额外操作 -->
      <div v-if="slots.extra" class="my-card__extra">
        <slot name="extra" />
      </div>
    </div>

    <!-- 内容区域 -->
    <div v-if="loading" class="my-card__body" :style="bodyStyle">
      <slot name="loading">
        <div class="my-card__loading">
          <div class="my-card__loading-item" v-for="i in 3" :key="i"></div>
        </div>
      </slot>
    </div>
    <div v-else class="my-card__body" :style="bodyStyle">
      <slot />
    </div>

    <!-- 底部操作 -->
    <div v-if="slots.actions" class="my-card__actions">
      <slot name="actions" />
    </div>

    <!-- 页脚 -->
    <div v-if="slots.footer" class="my-card__footer" :style="footerStyle">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue'
import type { CardProps, CardEmits } from './types'

defineOptions({
  name: 'MyCard',
})

const props = withDefaults(defineProps<CardProps>(), {
  shadow: 'always',
  bordered: true,
  padding: '20px',
  size: 'default',
  loading: false,
  hoverable: false,
  headerBordered: true,
  disabled: false,
})

const emit = defineEmits<CardEmits>()
const slots = useSlots()

const cardClass = computed(() => ({
  'my-card--bordered': props.bordered,
  'my-card--shadow-always': props.shadow === 'always',
  'my-card--shadow-hover': props.shadow === 'hover',
  'my-card--shadow-never': props.shadow === 'never',
  'my-card--hoverable': props.hoverable && !props.disabled,
  [`my-card--${props.size}`]: props.size !== 'default',
  'my-card--loading': props.loading,
  'my-card--disabled': props.disabled,
}))

const cardStyle = computed(() => {
  const style: Record<string, any> = {}

  if (props.width) {
    style.width =
      typeof props.width === 'number' ? `${props.width}px` : props.width
  }

  if (props.height) {
    style.height =
      typeof props.height === 'number' ? `${props.height}px` : props.height
  }

  if (props.borderRadius) {
    style.borderRadius =
      typeof props.borderRadius === 'number'
        ? `${props.borderRadius}px`
        : props.borderRadius
  }

  return style
})

const bodyStyle = computed(() => {
  const style: Record<string, any> = { ...props.bodyStyle }

  if (props.bodyPadding !== undefined) {
    style.padding =
      typeof props.bodyPadding === 'number'
        ? `${props.bodyPadding}px`
        : props.bodyPadding
  } else if (props.padding) {
    style.padding =
      typeof props.padding === 'number' ? `${props.padding}px` : props.padding

    if (hasHeader.value) {
      style.paddingTop = 0
    }
  }

  return style
})

const headerStyle = computed(() => {
  const style: Record<string, any> = { ...props.headerStyle }

  if (props.headerPadding !== undefined) {
    style.padding =
      typeof props.headerPadding === 'number'
        ? `${props.headerPadding}px`
        : props.headerPadding
  } else if (props.padding) {
    style.padding =
      typeof props.padding === 'number' ? `${props.padding}px` : props.padding
    style.paddingBottom = 0
  }

  if (!props.headerBordered) {
    style.borderBottom = 'none'
  }

  return style
})

const footerStyle = computed(() => {
  const style: Record<string, any> = { ...props.footerStyle }

  if (props.footerPadding !== undefined) {
    style.padding =
      typeof props.footerPadding === 'number'
        ? `${props.footerPadding}px`
        : props.footerPadding
  } else if (props.padding) {
    style.padding =
      typeof props.padding === 'number' ? `${props.padding}px` : props.padding
  }

  return style
})

const hasHeader = computed(() => {
  return (
    hasTitle.value ||
    hasSubtitle.value ||
    !!props.title ||
    !!props.subtitle ||
    !!slots.extra
  )
})

const hasTitle = computed(() => {
  return !!slots.title || !!props.title
})

const hasSubtitle = computed(() => {
  return !!slots.subtitle || !!props.subtitle
})

const handleClick = (event: MouseEvent) => {
  if (props.disabled) return
  emit('click', event)
}

const handleDblclick = (event: MouseEvent) => {
  if (props.disabled) return
  emit('dblclick', event)
}

const handleMouseenter = (event: MouseEvent) => {
  if (props.disabled) return
  emit('mouseenter', event)
}

const handleMouseleave = (event: MouseEvent) => {
  if (props.disabled) return
  emit('mouseleave', event)
}
</script>

<style scoped>
.my-card {
  background: var(--card-bg, var(--bg-color, #fff));
  border-radius: var(--card-border-radius, 8px);
  color: var(--card-color, var(--text-regular, #333));
  font-size: var(--card-font-size, 14px);
  line-height: 1.5;
  transition: all 0.3s ease;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.my-card--bordered {
  border: 1px solid var(--card-border-color, var(--border-color-light, #e4e7ed));
}

.my-card--shadow-always {
  box-shadow: var(--card-shadow, 0 2px 12px 0 rgba(0, 0, 0, 0.1));
}

.my-card--shadow-hover {
  box-shadow: var(--card-shadow-hover, 0 2px 8px 0 rgba(0, 0, 0, 0.06));
}

.my-card--shadow-hover:hover {
  box-shadow: var(--card-shadow, 0 2px 12px 0 rgba(0, 0, 0, 0.1));
}

.my-card--shadow-never {
  box-shadow: none;
}

.my-card--hoverable {
  cursor: pointer;
}

.my-card--hoverable:hover {
  transform: translateY(-2px);
}

.my-card--small {
  font-size: 12px;
}

.my-card--large {
  font-size: 16px;
}

.my-card--loading {
  pointer-events: none;
}

.my-card__cover {
  width: 100%;
  overflow: hidden;
}

.my-card__cover :deep(img) {
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
}

.my-card__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: var(--card-header-padding, 20px 20px 0 20px);
  border-bottom: 1px solid
    var(--card-header-border-color, var(--border-color-lighter, #f2f6fc));
  margin-bottom: var(--card-header-margin-bottom, 20px);
}

.my-card__header-content {
  flex: 1;
}

.my-card__title {
  font-size: var(--card-title-font-size, 16px);
  font-weight: var(--card-title-font-weight, 500);
  color: var(--card-title-color, var(--text-primary, #303133));
  line-height: var(--card-title-line-height, 1.4);
  margin-bottom: var(--card-title-margin-bottom, 8px);
}

.my-card__subtitle {
  font-size: var(--card-subtitle-font-size, 14px);
  color: var(--card-subtitle-color, var(--text-regular, #606266));
  line-height: var(--card-subtitle-line-height, 1.4);
}

.my-card__extra {
  color: var(--card-extra-color, var(--text-regular, #606266));
  font-size: var(--card-extra-font-size, 14px);
}

.my-card__body {
  flex: 1;
  padding: var(--card-body-padding, 0 20px 20px 20px);
}

.my-card__loading {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.my-card__loading-item {
  height: 16px;
  background: linear-gradient(90deg, #f2f2f2 25%, #e6e6e6 50%, #f2f2f2 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  border-radius: 4px;
}

.my-card__loading-item:nth-child(1) {
  width: 60%;
}

.my-card__loading-item:nth-child(2) {
  width: 80%;
}

.my-card__loading-item:nth-child(3) {
  width: 40%;
}

.my-card--disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.my-card__actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: var(--card-actions-padding, 12px 20px);
  border-top: 1px solid
    var(--card-actions-border-color, var(--border-color-lighter, #f2f6fc));
  gap: var(--card-actions-gap, 8px);
}

.my-card__footer {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: var(--card-footer-padding, 12px 20px);
  border-top: 1px solid
    var(--card-footer-border-color, var(--border-color-lighter, #f2f6fc));
  gap: var(--card-footer-gap, 8px);
}

@keyframes loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

/* 响应式 */
@media (max-width: 768px) {
  .my-card__header {
    padding: 16px 16px 0 16px;
  }

  .my-card__body {
    padding: 0 16px 16px 16px;
  }

  .my-card__actions {
    padding: 12px 16px;
  }

  .my-card__footer {
    padding: 12px 16px;
  }
}
</style>
