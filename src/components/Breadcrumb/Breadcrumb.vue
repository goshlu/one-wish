<template>
  <nav class="my-breadcrumb" aria-label="Breadcrumb">
    <ol class="my-breadcrumb__list">
      <li v-for="(item, index) in items" :key="item.label" class="my-breadcrumb__item">
        <component
          :is="item.href ? 'a' : 'span'"
          :href="item.href"
          class="my-breadcrumb__link"
        >
          {{ item.label }}
        </component>
        <span v-if="index < items.length - 1" class="my-breadcrumb__separator">
          {{ separator }}
        </span>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
import type { BreadcrumbProps } from './types'

defineOptions({
  name: 'MyBreadcrumb',
})

withDefaults(defineProps<BreadcrumbProps>(), {
  items: () => [],
  separator: '/',
})
</script>

<style scoped>
.my-breadcrumb {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: var(--text-secondary);
}

.my-breadcrumb__list {
  list-style: none;
  display: inline-flex;
  align-items: center;
  padding: 0;
  margin: 0;
  gap: 6px;
}

.my-breadcrumb__item {
  display: inline-flex;
  align-items: center;
}

.my-breadcrumb__link {
  color: inherit;
  text-decoration: none;
  transition: var(--transition-base);
}

.my-breadcrumb__link:hover {
  color: var(--primary-color);
}

.my-breadcrumb__separator {
  margin: 0 4px;
  color: var(--text-placeholder);
  user-select: none;
}
</style>
