<template>
  <component
    :is="tag"
    :class="spaceClass"
    :style="spaceStyle"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { SpaceProps } from './types'

defineOptions({
  name: 'MySpace',
})

const props = withDefaults(defineProps<SpaceProps>(), {
  direction: 'horizontal',
  align: 'center',
  size: 8,
  wrap: false,
  tag: 'div',
})

const spaceClass = computed(() => {
  return [
    'my-space',
    `my-space--${props.direction}`,
    `my-space--align-${props.align}`,
  ]
})

const spaceStyle = computed(() => {
  const style: Record<string, any> = {
    display: 'flex',
    flexDirection: props.direction === 'vertical' ? 'column' : 'row',
    alignItems: props.align,
  }

  if (props.wrap) {
    style.flexWrap = 'wrap'
  }

  if (Array.isArray(props.size)) {
    const [horizontal, vertical] = props.size
    const hValue = typeof horizontal === 'number' ? `${horizontal}px` : horizontal
    const vValue = typeof vertical === 'number' ? `${vertical}px` : vertical
    style.gap = `${vValue} ${hValue}`
  } else {
    const gapValue = typeof props.size === 'number' ? `${props.size}px` : props.size
    style.gap = gapValue
  }

  return style
})
</script>

<style scoped>
.my-space {
  box-sizing: border-box;
}

.my-space * {
  box-sizing: border-box;
}
</style>
