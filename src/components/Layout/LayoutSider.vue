<template>
  <component
    :is="tag"
    :class="siderClass"
    :style="siderStyle"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { LayoutSiderProps } from './types'

defineOptions({
  name: 'MyLayoutSider',
})

const props = withDefaults(defineProps<LayoutSiderProps>(), {
  width: '200px',
  collapsible: false,
  collapsed: false,
  tag: 'aside',
})

const siderClass = computed(() => {
  return [
    'my-layout-sider',
    {
      'is-collapsed': props.collapsed,
    },
  ]
})

const siderStyle = computed(() => {
  return {
    width: props.collapsed ? '0' : (typeof props.width === 'number' ? `${props.width}px` : props.width),
    overflow: 'hidden',
    transition: 'width 0.3s ease',
  }
})
</script>

<style scoped>
.my-layout-sider {
  flex-shrink: 0;
  background-color: var(--bg-color);
  border-right: 1px solid var(--border-color);
  overflow-y: auto;
}

.my-layout-sider.is-collapsed {
  border-right: none;
}
</style>
