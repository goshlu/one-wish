<template>
  <component
    :is="tag"
    :class="gridClass"
    :style="gridStyle"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { GridProps } from './types'

defineOptions({
  name: 'MyGrid',
})

const props = withDefaults(defineProps<GridProps>(), {
  columns: 12,
  tag: 'div',
})

const gridClass = computed(() => {
  return ['my-grid']
})

const gridStyle = computed(() => {
  const style: Record<string, any> = {
    display: 'grid',
  }

  if (props.columns) {
    style.gridTemplateColumns = typeof props.columns === 'number' 
      ? `repeat(${props.columns}, 1fr)` 
      : props.columns
  }

  if (props.rows) {
    style.gridTemplateRows = typeof props.rows === 'number'
      ? `repeat(${props.rows}, 1fr)`
      : props.rows
  }

  if (props.autoFlow) {
    style.gridAutoFlow = props.autoFlow
  }

  const gapValue = props.gap ? (typeof props.gap === 'number' ? `${props.gap}px` : props.gap) : undefined
  const columnGapValue = props.columnGap ? (typeof props.columnGap === 'number' ? `${props.columnGap}px` : props.columnGap) : gapValue
  const rowGapValue = props.rowGap ? (typeof props.rowGap === 'number' ? `${props.rowGap}px` : props.rowGap) : gapValue

  if (columnGapValue) style.columnGap = columnGapValue
  if (rowGapValue) style.rowGap = rowGapValue

  return style
})
</script>

<style scoped>
.my-grid {
  box-sizing: border-box;
}

.my-grid * {
  box-sizing: border-box;
}
</style>
