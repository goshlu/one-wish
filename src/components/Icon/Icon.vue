<template>
  <svg
    :class="iconClass"
    :width="size"
    :height="size"
    :viewBox="viewBox"
    :fill="fill"
    :stroke="stroke"
    :stroke-width="strokeWidth"
    :stroke-linecap="strokeLinecap"
    :stroke-linejoin="strokeLinejoin"
  >
    <use :xlink:href="`#icon-${name}`" />
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { IconProps } from './types'

defineOptions({
  name: 'MyIcon',
})

const props = withDefaults(defineProps<IconProps>(), {
  size: 24,
  fill: 'currentColor',
  stroke: 'none',
  strokeWidth: 2,
  strokeLinecap: 'round',
  viewBox: '0 0 24 24',
  color: 'inherit',
})

const iconClass = computed(() => {
  return [
    'my-icon',
    `my-icon--${props.size}`,
    {
      'is-spin': props.spin,
    },
  ]
})
</script>

<style scoped>
.my-icon {
  display: inline-block;
  vertical-align: -0.125em;
  fill: currentColor;
  overflow: hidden;
}

.my-icon--spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
