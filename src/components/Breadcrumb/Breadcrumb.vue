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
  display: inline-block;
  font-size: 14px;
  line-height: 1.5715;
  color: rgba(0, 0, 0, 0.45);
}

.my-breadcrumb__list {
  list-style: none;
  display: inline;
  padding: 0;
  margin: 0;
}

.my-breadcrumb__item {
  display: inline;
}

.my-breadcrumb__link {
  color: rgba(0, 0, 0, 0.45);
  text-decoration: none;
  transition: color 0.2s;
}

a.my-breadcrumb__link:hover {
  color: rgba(0, 0, 0, 0.88);
}

.my-breadcrumb__item:last-child .my-breadcrumb__link {
  color: rgba(0, 0, 0, 0.88);
  cursor: text;
}

.my-breadcrumb__separator {
  margin: 0 8px;
  color: rgba(0, 0, 0, 0.45);
  user-select: none;
}
</style>
