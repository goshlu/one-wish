<template>
  <component
    :is="tag"
    class="my-layout-footer"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import type { LayoutFooterProps } from './types'

defineOptions({
  name: 'MyLayoutFooter',
})

const props = withDefaults(defineProps<LayoutFooterProps>(), {
  tag: 'footer',
})
</script>

<style scoped>
.my-layout-footer {
  flex-shrink: 0;
  background-color: var(--bg-color);
  border-top: 1px solid var(--border-color);
}
</style>
