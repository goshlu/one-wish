<template>
  <div
    :class="rateClass"
    @mouseleave="handleMouseLeave"
    role="slider"
    :aria-valuenow="currentValue"
    :aria-valuemin="0"
    :aria-valuemax="count"
  >
    <div
      v-for="(_, index) in countArray"
      :key="index"
      class="my-rate__star-wrapper"
      :title="tooltips?.[index]"
      @mousemove="event => handleMouseMove(index, event)"
      @click="event => handleClick(index, event)"
    >
      <span :class="getStarClass(index)">
        <span class="my-rate__star-bg">★</span>
        <span class="my-rate__star-overlay" :style="{ width: getOverlayWidth(index) }">★</span>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, ref, watch } from 'vue'
import type { RateProps, RateEmits } from './types'
import type { FormItemContext } from '../Form/types'
import { formItemContextKey } from '../Form/types'

defineOptions({
  name: 'MyRate',
})

const props = withDefaults(defineProps<RateProps>(), {
  modelValue: 0,
  count: 5,
  allowHalf: false,
  allowClear: true,
  disabled: false,
  readonly: false,
  tooltips: () => [],
})

const emit = defineEmits<RateEmits>()
const formItem = inject<FormItemContext | null>(formItemContextKey, null)

const innerValue = ref(props.modelValue ?? 0)
const hoverValue = ref(0)

watch(
  () => props.modelValue,
  value => {
    if (value !== undefined) {
      innerValue.value = value
    }
  }
)

const count = computed(() => Math.max(props.count, 0))
const countArray = computed(() => Array.from({ length: count.value }))
const currentValue = computed(() => innerValue.value)

const isInteractive = computed(() => !(props.disabled || props.readonly))
const displayValue = computed(() => (hoverValue.value ? hoverValue.value : innerValue.value))

const rateClass = computed(() => [
  'my-rate',
  {
    'is-disabled': props.disabled,
    'is-readonly': props.readonly,
  },
])

const getStarStatus = (index: number) => {
  const value = displayValue.value
  const fullValue = index + 1
  if (value >= fullValue) return 'full'
  if (props.allowHalf && value + 0.5 >= fullValue) return 'half'
  return 'zero'
}

const getStarClass = (index: number) => [
  'my-rate__star',
  `is-${getStarStatus(index)}`,
]

const getOverlayWidth = (index: number) => {
  const status = getStarStatus(index)
  if (status === 'full') return '100%'
  if (status === 'half') return '50%'
  return '0%'
}

const setValue = (value: number) => {
  if (!isInteractive.value) return
  let next = value
  if (props.allowClear && innerValue.value === value) {
    next = 0
  }
  innerValue.value = next
  emit('update:modelValue', next)
  emit('change', next)
  formItem?.onFieldChange()
}

const getStarValue = (index: number, event: MouseEvent) => {
  let value = index + 1
  if (props.allowHalf) {
    const target = event.currentTarget as HTMLElement
    const rect = target.getBoundingClientRect()
    const offsetX = event.clientX - rect.left
    if (offsetX <= rect.width / 2) {
      value -= 0.5
    }
  }
  return value
}

const handleMouseMove = (index: number, event: MouseEvent) => {
  if (!isInteractive.value) return
  const value = getStarValue(index, event)
  hoverValue.value = value
  emit('hoverChange', value)
}

const handleMouseLeave = () => {
  hoverValue.value = 0
}

const handleClick = (index: number, event: MouseEvent) => {
  if (!isInteractive.value) return
  const value = getStarValue(index, event)
  setValue(value)
}
</script>

<style scoped>
.my-rate {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
}

.my-rate.is-disabled,
.my-rate.is-readonly {
  cursor: not-allowed;
}

.my-rate__star-wrapper {
  position: relative;
  width: 24px;
  height: 24px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.my-rate__star {
  position: relative;
  font-size: 22px;
  color: var(--border-color-light, #e4e7ed);
  line-height: 1;
  display: inline-block;
}

.my-rate__star-bg {
  color: var(--border-color-light, #e4e7ed);
}

.my-rate__star-overlay {
  position: absolute;
  left: 0;
  top: 0;
  white-space: nowrap;
  color: var(--warning-color, #fa8c16);
  overflow: hidden;
  transition: width 0.15s ease;
}

.my-rate__star-overlay::selection,
.my-rate__star-bg::selection {
  background: transparent;
}

.my-rate.is-disabled .my-rate__star,
.my-rate.is-readonly .my-rate__star {
  color: rgba(0, 0, 0, 0.25);
}

.my-rate.is-disabled .my-rate__star-overlay,
.my-rate.is-readonly .my-rate__star-overlay {
  color: rgba(0, 0, 0, 0.25);
}
</style>
