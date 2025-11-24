<template>
  <component
    :is="tag"
    class="my-layout-content"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import type { LayoutContentProps } from './types'

defineOptions({
  name: 'MyLayoutContent',
})

const props = withDefaults(defineProps<LayoutContentProps>(), {
  tag: 'main',
})
</script>

<style scoped>
.my-layout-content {
  flex: 1;
  overflow-y: auto;
  background-color: var(--bg-soft);
}
</style>
