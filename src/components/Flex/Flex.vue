<template>
  <component
    :is="tag"
    :class="flexClass"
    :style="flexStyle"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { FlexProps } from './types'

defineOptions({
  name: 'MyFlex',
})

const props = withDefaults(defineProps<FlexProps>(), {
  direction: 'row',
  justify: 'flex-start',
  align: 'stretch',
  wrap: 'nowrap',
  tag: 'div',
})

const flexClass = computed(() => {
  return [
    'my-flex',
    `my-flex--${props.direction}`,
    `my-flex--justify-${props.justify}`,
    `my-flex--align-${props.align}`,
    `my-flex--wrap-${props.wrap}`,
  ]
})

const flexStyle = computed(() => {
  const style: Record<string, any> = {
    display: 'flex',
    flexDirection: props.direction,
    justifyContent: props.justify,
    alignItems: props.align,
    flexWrap: props.wrap,
  }

  if (props.gap) {
    style.gap = typeof props.gap === 'number' ? `${props.gap}px` : props.gap
  }

  return style
})
</script>

<style scoped>
.my-flex {
  box-sizing: border-box;
}

.my-flex * {
  box-sizing: border-box;
}
</style>
