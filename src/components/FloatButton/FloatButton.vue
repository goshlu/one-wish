<template>
  <component
    :is="href ? 'a' : 'button'"
    :class="floatButtonClass"
    :style="floatButtonStyle"
    :href="href"
    :target="target"
    :disabled="disabled"
    :title="tooltip"
    @click="handleClick"
  >
    <span v-if="badge" class="my-float-button__badge">{{ badge }}</span>
    <span v-if="icon" class="my-float-button__icon">{{ icon }}</span>
    <span v-if="description" class="my-float-button__description">
      {{ description }}
    </span>
    <slot v-if="!icon && !description"></slot>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { FloatButtonProps, FloatButtonEmits } from './types'

defineOptions({
  name: 'MyFloatButton',
})

const props = withDefaults(defineProps<FloatButtonProps>(), {
  type: 'default',
  shape: 'circle',
  position: 'right-bottom',
  disabled: false,
  mode: 'fixed',
})

const emit = defineEmits<FloatButtonEmits>()

const floatButtonClass = computed(() => {
  return [
    'my-float-button',
    `my-float-button--${props.type}`,
    `my-float-button--${props.shape}`,
    `my-float-button--${props.position}`,
    {
      'is-disabled': props.disabled,
      'has-description': props.description,
    },
  ]
})

const floatButtonStyle = computed(() => {
  return {
    position: props.mode,
  }
})

const handleClick = (event: MouseEvent) => {
  if (!props.disabled) {
    emit('click', event)
  }
}
</script>

<style scoped>
.my-float-button {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  font-size: 20px;
  border: none;
  background-color: var(--bg-color);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  transition: var(--transition-base);
  outline: none;
  text-decoration: none;
  color: var(--text-regular);
  z-index: 1000;
}

.my-float-button:hover:not(.is-disabled) {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
  transform: translateY(-2px);
}

.my-float-button:active:not(.is-disabled) {
  transform: translateY(0);
}

/* 形状 */
.my-float-button--circle {
  border-radius: 50%;
}

.my-float-button--square {
  border-radius: var(--border-radius-base);
}

/* 类型 */
.my-float-button--primary {
  background-color: var(--primary-color);
  color: #fff;
}

.my-float-button--primary:hover:not(.is-disabled) {
  background-color: var(--primary-hover);
}

.my-float-button--primary:active:not(.is-disabled) {
  background-color: var(--primary-active);
}

/* 位置 */
.my-float-button--right-bottom {
  right: 24px;
  bottom: 24px;
}

.my-float-button--right-top {
  right: 24px;
  top: 24px;
}

.my-float-button--left-bottom {
  left: 24px;
  bottom: 24px;
}

.my-float-button--left-top {
  left: 24px;
  top: 24px;
}

/* 图标 */
.my-float-button__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  line-height: 1;
}

/* 描述文字 */
.my-float-button__description {
  font-size: 12px;
  line-height: 1.2;
  margin-top: 4px;
  text-align: center;
}

.my-float-button.has-description {
  width: 56px;
  height: 56px;
}

.my-float-button.has-description .my-float-button__icon {
  font-size: 18px;
}

/* 徽标 */
.my-float-button__badge {
  position: absolute;
  top: 0;
  right: 0;
  min-width: 18px;
  height: 18px;
  padding: 0 4px;
  font-size: 12px;
  line-height: 18px;
  text-align: center;
  background-color: var(--danger-color);
  color: #fff;
  border-radius: 9px;
  transform: translate(25%, -25%);
  z-index: 1;
}

/* 禁用状态 */
.my-float-button.is-disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.my-float-button.is-disabled:hover {
  transform: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}
</style>
