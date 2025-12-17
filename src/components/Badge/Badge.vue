<template>
  <div class="my-badge" :class="badgeClass">
    <slot />
    <transition name="my-badge-zoom">
      <sup
        v-if="!hidden && (content || isDot)"
        class="my-badge__content"
        :class="[
          `my-badge__content--${type}`,
          { 'is-dot': isDot }
        ]"
        :style="badgeStyle"
        @click="handleClick"
      >
        {{ content }}
      </sup>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { BadgeProps, BadgeEmits } from './types'

defineOptions({
  name: 'MyBadge'
})

const props = withDefaults(defineProps<BadgeProps>(), {
  value: '',
  max: 99,
  isDot: false,
  hidden: false,
  type: 'danger'
})

const emit = defineEmits<BadgeEmits>()

const badgeClass = computed(() => ({
  'my-badge--fixed': !!props.value || props.isDot
}))

const content = computed(() => {
  if (props.isDot) return ''
  
  const value = props.value
  const max = props.max

  if (typeof value === 'number' && typeof max === 'number') {
    return max > 0 && max < value ? `${max}+` : value
  }
  
  return value
})

const badgeStyle = computed(() => {
  const style: Record<string, string> = {}
  if (props.color) {
    style.backgroundColor = props.color
  }
  return style
})

const handleClick = (event: MouseEvent) => {
  emit('click', event)
}
</script>

<style scoped>
.my-badge {
  position: relative;
  display: inline-block;
  vertical-align: middle;
  line-height: 1;
}

.my-badge--fixed {
  position: relative;
}

.my-badge__content {
  position: absolute;
  top: 0;
  right: 0;
  transform: translateX(50%) translateY(-50%);
  transform-origin: 100% 0;
  z-index: 10;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 20px;
  padding: 0 6px;
  font-size: 12px;
  line-height: 1;
  white-space: nowrap;
  border-radius: 10px;
  background-color: var(--badge-bg, var(--danger-color, #f56c6c));
  color: var(--badge-color, #fff);
  border: 1px solid var(--badge-border-color, var(--bg-color, #fff));
  box-shadow: 0 0 0 1px var(--badge-shadow-color, rgba(0, 0, 0, 0.1));
  transition: transform 0.2s ease-in-out;
}

.my-badge__content.is-dot {
  width: 8px;
  height: 8px;
  padding: 0;
  border-radius: 50%;
  background-color: var(--badge-bg, var(--danger-color, #f56c6c));
  border: none;
}

.my-badge__content--primary {
  background-color: var(--badge-bg, var(--primary-color, #409eff));
}

.my-badge__content--success {
  background-color: var(--badge-bg, var(--success-color, #67c23a));
}

.my-badge__content--warning {
  background-color: var(--badge-bg, var(--warning-color, #e6a23c));
}

.my-badge__content--danger {
  background-color: var(--badge-bg, var(--danger-color, #f56c6c));
}

.my-badge__content--info {
  background-color: var(--badge-bg, var(--info-color, #909399));
}

.my-badge__content:hover {
  transform: translateX(50%) translateY(-50%) scale(1.1);
}

.my-badge__content.is-dot:hover {
  transform: translateX(50%) translateY(-50%) scale(1.2);
}

/* 动画 */
.my-badge-zoom-enter-active,
.my-badge-zoom-leave-active {
  transition: all 0.2s cubic-bezier(0.18, 0.89, 0.32, 1.28);
}

.my-badge-zoom-enter-from,
.my-badge-zoom-leave-to {
  transform: translateX(50%) translateY(-50%) scale(0);
  opacity: 0;
}

.my-badge-zoom-leave-active {
  transform: translateX(50%) translateY(-50%) scale(0);
}
</style>
