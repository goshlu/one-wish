<template>
  <button
    :class="switchClass"
    role="switch"
    type="button"
    :aria-checked="checked"
    :disabled="finalDisabled"
    @click="handleToggle"
    @keydown.space.prevent="handleToggle"
    @keydown.enter.prevent="handleToggle"
  >
    <span class="my-switch__inner">
      <span v-if="checked && checkedChildren" class="my-switch__label">{{ checkedChildren }}</span>
      <span v-else-if="!checked && unCheckedChildren" class="my-switch__label">
        {{ unCheckedChildren }}
      </span>
    </span>
    <span class="my-switch__handle">
      <span v-if="loading" class="my-switch__spinner"></span>
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
import type { SwitchProps, SwitchEmits } from './types'
import type { FormItemContext } from '../Form/types'
import { formItemContextKey } from '../Form/types'

defineOptions({
  name: 'MySwitch',
})

const props = withDefaults(defineProps<SwitchProps>(), {
  modelValue: false,
  disabled: false,
  loading: false,
  checkedChildren: '',
  unCheckedChildren: '',
  size: 'default',
})

const emit = defineEmits<SwitchEmits>()
const formItem = inject<FormItemContext | null>(formItemContextKey, null)

const checked = computed(() => !!props.modelValue)
const finalDisabled = computed(
  () => props.disabled || props.loading || formItem?.disabled.value || false
)

const switchClass = computed(() => [
  'my-switch',
  `my-switch--${props.size}`,
  {
    'is-checked': checked.value,
    'is-disabled': finalDisabled.value,
    'is-loading': props.loading,
  },
])

const handleToggle = () => {
  if (finalDisabled.value) return
  const next = !checked.value
  emit('update:modelValue', next)
  emit('change', next)
  formItem?.onFieldChange()
}
</script>

<style scoped>
.my-switch {
  position: relative;
  display: inline-flex;
  align-items: center;
  padding: 2px;
  border-radius: 999px;
  border: none;
  background-color: var(--border-color-light, #d9d9d9);
  cursor: pointer;
  transition: background-color 0.2s ease;
  min-width: 44px;
  height: 24px;
}

.my-switch--small {
  min-width: 36px;
  height: 20px;
}

.my-switch.is-checked {
  background-color: var(--primary-color, #1677ff);
}

.my-switch.is-disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.my-switch__inner {
  flex: 1;
  display: flex;
  align-items: center;
  padding: 0 26px 0 8px;
  color: #fff;
  font-size: 12px;
  pointer-events: none;
}

.my-switch--small .my-switch__inner {
  padding: 0 22px 0 6px;
}

.my-switch:not(.is-checked) .my-switch__inner {
  justify-content: flex-end;
  padding: 0 8px 0 26px;
  color: rgba(0, 0, 0, 0.45);
}

.my-switch__label {
  line-height: 1;
}

.my-switch__handle {
  position: absolute;
  top: 2px;
  right: 2px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.my-switch.is-checked .my-switch__handle {
  transform: translateX(-20px);
}

.my-switch--small .my-switch__handle {
  width: 16px;
  height: 16px;
  top: 2px;
  right: 2px;
}

.my-switch--small.is-checked .my-switch__handle {
  transform: translateX(-16px);
}

.my-switch__spinner {
  width: 12px;
  height: 12px;
  border: 2px solid rgba(0, 0, 0, 0.2);
  border-top-color: var(--primary-color, #1677ff);
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
