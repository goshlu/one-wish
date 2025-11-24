<template>
  <component
    :is="tag"
    :class="splitterClass"
    :style="splitterStyle"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { SplitterProps } from './types'

defineOptions({
  name: 'MySplitter',
})

const props = withDefaults(defineProps<SplitterProps>(), {
  direction: 'horizontal',
  tag: 'div',
})

const splitterClass = computed(() => {
  return [
    'my-splitter',
    `my-splitter--${props.direction}`,
  ]
})

const splitterStyle = computed(() => {
  return {
    display: 'flex',
    flexDirection: props.direction === 'vertical' ? 'column' : 'row',
    width: '100%',
    height: '100%',
  }
})
</script>

<style scoped>
.my-splitter {
  box-sizing: border-box;
  overflow: hidden;
}

.my-splitter * {
  box-sizing: border-box;
}
</style>
