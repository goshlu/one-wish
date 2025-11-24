<template>
  <component
    :is="tag"
    class="my-layout-header"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import type { LayoutHeaderProps } from './types'

defineOptions({
  name: 'MyLayoutHeader',
})

const props = withDefaults(defineProps<LayoutHeaderProps>(), {
  tag: 'header',
})
</script>

<style scoped>
.my-layout-header {
  flex-shrink: 0;
  background-color: var(--bg-color);
  border-bottom: 1px solid var(--border-color);
}
</style>
