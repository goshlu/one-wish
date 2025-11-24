<template>
  <component
    :is="tag"
    :class="masonryClass"
    :style="masonryStyle"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { MasonryProps } from './types'

defineOptions({
  name: 'MyMasonry',
})

const props = withDefaults(defineProps<MasonryProps>(), {
  columns: 3,
  gap: 16,
  tag: 'div',
})

const masonryClass = computed(() => {
  return ['my-masonry']
})

const masonryStyle = computed(() => {
  const gapValue = typeof props.gap === 'number' ? `${props.gap}px` : props.gap
  
  return {
    display: 'grid',
    gridTemplateColumns: `repeat(${props.columns}, 1fr)`,
    gap: gapValue,
    gridAutoRows: 'masonry',
  }
})
</script>

<style scoped>
.my-masonry {
  box-sizing: border-box;
}

.my-masonry * {
  box-sizing: border-box;
}
</style>
