<template>
  <div
    :class="groupClass"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <div v-if="showMenu" class="my-float-button-group__menu">
      <slot></slot>
    </div>
    <button :class="triggerButtonClass" @click="handleTriggerClick">
      <span class="my-float-button-group__icon">
        {{ showMenu ? '✕' : '+' }}
      </span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { FloatButtonGroupProps } from './types'

defineOptions({
  name: 'MyFloatButtonGroup',
})

const props = withDefaults(defineProps<FloatButtonGroupProps>(), {
  type: 'default',
  shape: 'circle',
  position: 'right-bottom',
  trigger: 'click',
})

const showMenu = ref(false)

const groupClass = computed(() => {
  return ['my-float-button-group', `my-float-button-group--${props.position}`]
})

const triggerButtonClass = computed(() => {
  return [
    'my-float-button-group__trigger',
    `my-float-button-group__trigger--${props.type}`,
    `my-float-button-group__trigger--${props.shape}`,
    {
      'is-active': showMenu.value,
    },
  ]
})

const handleTriggerClick = () => {
  if (props.trigger === 'click') {
    showMenu.value = !showMenu.value
  }
}

const handleMouseEnter = () => {
  if (props.trigger === 'hover') {
    showMenu.value = true
  }
}

const handleMouseLeave = () => {
  if (props.trigger === 'hover') {
    showMenu.value = false
  }
}
</script>

<style scoped>
.my-float-button-group {
  position: fixed;
  z-index: 1000;
}

.my-float-button-group--right-bottom {
  right: 24px;
  bottom: 24px;
}

.my-float-button-group--right-top {
  right: 24px;
  top: 24px;
}

.my-float-button-group--left-bottom {
  left: 24px;
  bottom: 24px;
}

.my-float-button-group--left-top {
  left: 24px;
  top: 24px;
}

.my-float-button-group__menu {
  position: absolute;
  bottom: 60px;
  right: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
  animation: slideUp 0.2s ease;
}

.my-float-button-group--right-top .my-float-button-group__menu,
.my-float-button-group--left-top .my-float-button-group__menu {
  top: 60px;
  bottom: auto;
  animation: slideDown 0.2s ease;
}

.my-float-button-group__menu :deep(.my-float-button) {
  position: static !important;
  inset: auto !important;
  margin: 0;
}

.my-float-button-group__trigger {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  font-size: 24px;
  border: none;
  background-color: var(--bg-color);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  transition: var(--transition-base);
  outline: none;
  color: var(--text-regular);
}

.my-float-button-group__trigger:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
  transform: translateY(-2px);
}

.my-float-button-group__trigger.is-active {
  transform: rotate(45deg);
}

.my-float-button-group__trigger.is-active:hover {
  transform: rotate(45deg) translateY(-2px);
}

.my-float-button-group__trigger--circle {
  border-radius: 50%;
}

.my-float-button-group__trigger--square {
  border-radius: var(--border-radius-base);
}

.my-float-button-group__trigger--primary {
  background-color: var(--primary-color);
  color: #fff;
}

.my-float-button-group__trigger--primary:hover {
  background-color: var(--primary-hover);
}

.my-float-button-group__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  line-height: 1;
  transition: var(--transition-base);
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
