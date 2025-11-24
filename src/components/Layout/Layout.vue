<template>
  <component
    :is="tag"
    class="my-layout"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import type { LayoutProps } from './types'

defineOptions({
  name: 'MyLayout',
})

const props = withDefaults(defineProps<LayoutProps>(), {
  tag: 'div',
})
</script>

<style scoped>
.my-layout {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
</style>
