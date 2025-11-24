<template>
  <nav class="my-anchor">
    <div class="my-anchor__title">导航</div>
    <ul class="my-anchor__list">
      <li
        v-for="item in items"
        :key="item.href"
        :class="['my-anchor__item', { 'is-active': activeHref === item.href }]"
      >
        <a :href="item.href" class="my-anchor__link" @click.prevent="handleClick(item.href)">
          {{ item.title }}
        </a>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { ref, watchEffect, onMounted, onUnmounted } from 'vue'
import type { AnchorProps, AnchorEmits } from './types'

defineOptions({
  name: 'MyAnchor',
})

const props = withDefaults(defineProps<AnchorProps>(), {
  items: () => [],
  offset: 80,
})

const emit = defineEmits<AnchorEmits>()

const activeHref = ref<string | null>(null)

const updateActive = () => {
  const scrollY = window.scrollY + props.offset
  let current: string | null = null

  for (const item of props.items) {
    const el = document.querySelector<HTMLElement>(item.href)
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY
      if (scrollY >= top) {
        current = item.href
      }
    }
  }

  activeHref.value = current || props.items[0]?.href || null
}

const handleClick = (href: string) => {
  const el = document.querySelector<HTMLElement>(href)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  activeHref.value = href
  emit('select', href)
}

const onScroll = () => {
  updateActive()
}

onMounted(() => {
  updateActive()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})

watchEffect(() => {
  if (!props.items.find(item => item.href === activeHref.value) && props.items.length) {
    activeHref.value = props.items[0].href
  }
})
</script>

<style scoped>
.my-anchor {
  width: 100%;
  padding: 8px 0;
  font-size: 14px;
  color: var(--text-regular);
}

.my-anchor__title {
  padding: 8px 12px;
  font-weight: 600;
  color: var(--text-secondary);
}

.my-anchor__list {
  list-style: none;
  margin: 0;
  padding: 4px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.my-anchor__item {
  border-radius: var(--border-radius-base);
}

.my-anchor__link {
  display: block;
  padding: 8px 12px;
  color: inherit;
  text-decoration: none;
  border-radius: var(--border-radius-base);
  transition: var(--transition-base);
}

.my-anchor__link:hover {
  background-color: var(--bg-color-light);
  color: var(--primary-color);
}

.my-anchor__item.is-active .my-anchor__link {
  color: var(--primary-color);
  background-color: rgba(64, 158, 255, 0.08);
}
</style>
