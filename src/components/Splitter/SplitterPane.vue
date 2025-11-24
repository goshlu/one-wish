<template>
  <component
    :is="tag"
    :class="paneClass"
    :style="paneStyle"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { SplitterPaneProps } from './types'

defineOptions({
  name: 'MySplitterPane',
})

const props = withDefaults(defineProps<SplitterPaneProps>(), {
  resizable: true,
  tag: 'div',
})

const paneClass = computed(() => {
  return [
    'my-splitter-pane',
    {
      'is-resizable': props.resizable,
    },
  ]
})

const paneStyle = computed(() => {
  const style: Record<string, any> = {
    flex: props.size ? `0 0 ${typeof props.size === 'number' ? `${props.size}px` : props.size}` : '1',
    overflow: 'auto',
  }

  if (props.minSize) {
    style.minWidth = typeof props.minSize === 'number' ? `${props.minSize}px` : props.minSize
  }

  if (props.maxSize) {
    style.maxWidth = typeof props.maxSize === 'number' ? `${props.maxSize}px` : props.maxSize
  }

  return style
})
</script>

<style scoped>
.my-splitter-pane {
  box-sizing: border-box;
  background-color: var(--bg-color);
}

.my-splitter-pane.is-resizable {
  user-select: none;
}
</style>
