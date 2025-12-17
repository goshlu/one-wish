<template>
  <button
    :class="buttonClass"
    :type="nativeType"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <span v-if="loading" class="my-button__loading">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
        <path
          fill="currentColor"
          d="M512 64a32 32 0 0 1 32 32v192a32 32 0 0 1-64 0V96a32 32 0 0 1 32-32m0 640a32 32 0 0 1 32 32v192a32 32 0 1 1-64 0V736a32 32 0 0 1 32-32m448-192a32 32 0 0 1-32 32H736a32 32 0 1 1 0-64h192a32 32 0 0 1 32 32m-640 0a32 32 0 0 1-32 32H96a32 32 0 0 1 0-64h192a32 32 0 0 1 32 32M195.2 195.2a32 32 0 0 1 45.248 0L376.32 331.008a32 32 0 0 1-45.248 45.248L195.2 240.448a32 32 0 0 1 0-45.248m452.544 452.544a32 32 0 0 1 45.248 0L828.8 783.552a32 32 0 0 1-45.248 45.248L647.744 692.992a32 32 0 0 1 0-45.248M828.8 195.264a32 32 0 0 1 0 45.184L692.992 376.32a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0m-452.544 452.48a32 32 0 0 1 0 45.248L240.448 828.8a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0"
        ></path>
      </svg>
    </span>
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { ButtonProps, ButtonEmits } from "./types";

defineOptions({
  name: "MyButton",
});

const props = withDefaults(defineProps<ButtonProps>(), {
  type: "default",
  size: "default",
  nativeType: "button",
  disabled: false,
  loading: false,
  round: false,
  plain: false,
});

const emit = defineEmits<ButtonEmits>();

const buttonClass = computed(() => {
  return [
    "my-button",
    `my-button--${props.type}`,
    `my-button--${props.size}`,
    {
      "is-disabled": props.disabled,
      "is-loading": props.loading,
      "is-round": props.round,
      "is-plain": props.plain,
    },
  ];
});

const handleClick = (event: MouseEvent) => {
  if (!props.disabled && !props.loading) {
    emit("click", event);
  }
};
</script>

<style scoped>
.my-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 8px 16px;
  font-size: var(--font-size-base);
  border-radius: var(--border-radius-base);
  border: 1px solid var(--border-color-base);
  background-color: var(--bg-color);
  color: var(--text-regular);
  cursor: pointer;
  transition: var(--transition-base);
  outline: none;
  user-select: none;
}

.my-button:hover:not(.is-disabled) {
  color: var(--primary-color);
  border-color: var(--primary-hover);
  background-color: var(--bg-color-light);
}

.my-button:active:not(.is-disabled) {
  color: var(--primary-active);
  border-color: var(--primary-active);
}

/* 尺寸 */
.my-button--large {
  padding: 12px 20px;
  font-size: var(--font-size-large);
}

.my-button--small {
  padding: 6px 12px;
  font-size: var(--font-size-small);
}

/* 类型 */
.my-button--primary {
  color: #fff;
  background-color: var(--primary-color);
  border-color: var(--primary-color);
}

.my-button--primary:hover:not(.is-disabled) {
  background-color: var(--primary-hover);
  border-color: var(--primary-hover);
  color: #fff;
}

.my-button--primary:active:not(.is-disabled) {
  background-color: var(--primary-active);
  border-color: var(--primary-active);
}

.my-button--success {
  color: #fff;
  background-color: var(--success-color);
  border-color: var(--success-color);
}

.my-button--success:hover:not(.is-disabled) {
  opacity: 0.8;
  color: #fff;
}

.my-button--warning {
  color: #fff;
  background-color: var(--warning-color);
  border-color: var(--warning-color);
}

.my-button--warning:hover:not(.is-disabled) {
  opacity: 0.8;
  color: #fff;
}

.my-button--danger {
  color: #fff;
  background-color: var(--danger-color);
  border-color: var(--danger-color);
}

.my-button--danger:hover:not(.is-disabled) {
  opacity: 0.8;
  color: #fff;
}

.my-button--info {
  color: #fff;
  background-color: var(--info-color);
  border-color: var(--info-color);
}

.my-button--info:hover:not(.is-disabled) {
  opacity: 0.8;
  color: #fff;
}

/* 朴素按钮 */
.my-button.is-plain {
  background-color: transparent;
}

.my-button--primary.is-plain {
  color: var(--primary-color);
  background-color: #ecf5ff;
  border-color: #b3d8ff;
}

.my-button--primary.is-plain:hover:not(.is-disabled) {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
  color: #fff;
}

/* 圆角 */
.my-button.is-round {
  border-radius: 20px;
}

/* 禁用状态 */
.my-button.is-disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

/* 加载状态 */
.my-button.is-loading {
  cursor: not-allowed;
}

.my-button__loading {
  display: inline-block;
  animation: rotate 1s linear infinite;
}

.my-button__loading svg {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
