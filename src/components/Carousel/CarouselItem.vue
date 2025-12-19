<template>
  <div
    class="my-carousel-item"
    :style="itemStyle"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { inject, computed, onMounted, ref, type ComputedRef, type Ref } from 'vue'
import type { CarouselItemProps } from './types'

defineOptions({
  name: 'MyCarouselItem',
})

defineProps<CarouselItemProps>()

const carousel = inject<{
  activeIndex: Ref<number>
  isVertical: ComputedRef<boolean>
  duration: ComputedRef<number>
  effect: ComputedRef<'scrollx' | 'fade'>
  addItem: () => number
}>('carousel')

const index = ref(-1)

const isActive = computed(() => {
  return carousel ? index.value === carousel.activeIndex.value : false
})

const itemStyle = computed(() => {
  if (!carousel || index.value === -1) return {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    opacity: 0,
  }

  const active = isActive.value
  const style: Record<string, any> = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    transition: `transform ${carousel.duration.value}ms ease, opacity ${carousel.duration.value}ms ease`,
  }

  if (carousel.effect.value === 'fade') {
    style.transform = 'translate(0, 0)'
    style.opacity = active ? 1 : 0
    style.zIndex = active ? 1 : 0
  } else {
    if (!carousel.isVertical.value) {
      if (active) {
        style.transform = 'translateX(0)'
        style.opacity = 1
        style.zIndex = 1
      } else {
        const offset = index.value < carousel.activeIndex.value ? '-100%' : '100%'
        style.transform = `translateX(${offset})`
        style.opacity = 0
        style.zIndex = 0
      }
    } else {
      if (active) {
        style.transform = 'translateY(0)'
        style.opacity = 1
        style.zIndex = 1
      } else {
        const offset = index.value < carousel.activeIndex.value ? '-100%' : '100%'
        style.transform = `translateY(${offset})`
        style.opacity = 0
        style.zIndex = 0
      }
    }
  }

  return style
})

onMounted(() => {
  if (carousel) {
    index.value = carousel.addItem()
  }
})
</script>

<style scoped>
.my-carousel-item {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
