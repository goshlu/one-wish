<template>
  <div
    class="my-carousel"
    :class="carouselClass"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <div
      class="my-carousel__container"
      :style="containerStyle"
      @pointerdown="onPointerDown"
      @pointermove="onPointerMove"
      @pointerup="onPointerUp"
      @pointercancel="onPointerCancel"
      @pointerleave="onPointerCancel"
    >
      <slot />
    </div>

    <!-- 左右切换箭头 -->
    <button
      v-if="(arrows || arrow !== 'never') && direction === 'horizontal'"
      v-show="arrows || arrow === 'always' || hovering"
      class="my-carousel__arrow my-carousel__arrow--left"
      @click="prev"
    >
      <svg
        viewBox="0 0 1024 1024"
        width="16"
        height="16"
        fill="currentColor"
      >
        <path d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8c-4.8 3.8-4.8 11.7 0 15.5l450.8 352.1c5.2 4.1 12.9 0.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z" />
      </svg>
    </button>
    <button
      v-if="(arrows || arrow !== 'never') && direction === 'horizontal'"
      v-show="arrows || arrow === 'always' || hovering"
      class="my-carousel__arrow my-carousel__arrow--right"
      @click="next"
    >
      <svg
        viewBox="0 0 1024 1024"
        width="16"
        height="16"
        fill="currentColor"
      >
        <path d="M300 218.3c0-4.9 2.3-9.6 6.1-12.6l360-281.1c3.8-3 8.9-3 12.6 0l360 281.1c3.8 3 6.1 7.7 6.1 12.6V141c0 6.7-7.7 10.4-12.9 6.3L581.1 502.4c-4.8-3.8-4.8-11.7 0-15.5l360-281.1c3.8-3 6.1-7.7 6.1-12.6v77.3c0 4.9-2.3 9.6-6.1 12.6l-360 281.1 360 281.1c3.8 3 6.1 7.7 6.1 12.6v77.3c0 6.7-7.7 10.4-12.9 6.3L581.1 502.4c-4.8-3.8-4.8-11.7 0-15.5l360 281.1c3.8 3 6.1 7.7 6.1 12.6v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281.1z" />
      </svg>
    </button>
    <!-- 垂直方向暂不显示上下箭头，保持与 AntD 一致，仅支持左右箭头 -->

    <!-- 指示器 -->
    <ul
      v-if="(dots !== false) && indicatorPosition !== 'none'"
      class="my-carousel__indicators"
      :class="indicatorClass"
    >
      <li
        v-for="index in itemCount"
        :key="index"
        class="my-carousel__indicator"
        :class="{ 'is-active': index - 1 === activeIndex }"
        @mouseenter="handleIndicatorHover(index - 1)"
        @click="handleIndicatorClick(index - 1)"
      >
        <button class="my-carousel__button" :style="buttonStyle(index - 1)">
          <span v-if="!$slots.indicator"></span>
          <slot v-else name="indicator" :index="index - 1" :active="index - 1 === activeIndex" />
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onBeforeUnmount, provide, watch } from 'vue'
import type { CarouselProps, CarouselEmits } from './types'

defineOptions({
  name: 'MyCarousel',
})

const props = withDefaults(defineProps<CarouselProps>(), {
  modelValue: 0,
  height: '300px',
  indicatorPosition: 'outside',
  arrows: false,
  arrow: 'hover',
  type: 'default',
  autoplay: true,
  interval: 3000,
  loop: true,
  trigger: 'click',
  duration: 300,
  pauseOnHover: true,
  indicatorStyle: 'dot',
  direction: 'horizontal',
  dotPlacement: 'bottom',
  dots: true,
  effect: 'scrollx',
  speed: 300,
  easing: 'ease',
  autoplaySpeed: 3000,
  draggable: false,
})

const emit = defineEmits<CarouselEmits>()

const activeIndex = ref(props.modelValue)
const hovering = ref(false)
const timer = ref<number | null>(null)
const itemCount = ref(0)

const isVertical = computed(() => {
  const placement = (props.dotPosition
    ? (props.dotPosition === 'left' ? 'start' : props.dotPosition === 'right' ? 'end' : props.dotPosition)
    : props.dotPlacement) ?? 'bottom'
  return props.direction === 'vertical' || placement === 'start' || placement === 'end'
})

const carouselClass = computed(() => ({
  [`my-carousel--${props.type}`]: props.type !== 'default',
  [`my-carousel--${isVertical.value ? 'vertical' : 'horizontal'}`]: true,
}))

const containerStyle = computed(() => ({
  height: typeof props.height === 'number' ? `${props.height}px` : props.height,
}))

const indicatorClass = computed(() => {
  const classes: Record<string, boolean> = {
    [`my-carousel__indicators--${props.indicatorStyle}`]: true,
  }
  const placementRaw = props.dotPosition
    ? (props.dotPosition === 'left' ? 'start' : props.dotPosition === 'right' ? 'end' : props.dotPosition)
    : props.dotPlacement
  const placement = placementRaw ?? 'bottom'
  classes[`my-carousel__indicators--${placement}`] = true
  return classes
})

const buttonStyle = (index: number) => {
  if (props.indicatorStyle === 'line') {
    return {
      width: index === activeIndex.value ? '24px' : '16px',
    }
  }
  return {}
}

const setActiveItem = (index: number) => {
  const oldIndex = activeIndex.value
  const len = itemCount.value

  if (len === 0) return

  if (index < 0) {
    activeIndex.value = props.loop ? len - 1 : 0
  } else if (index >= len) {
    activeIndex.value = props.loop ? 0 : len - 1
  } else {
    activeIndex.value = index
  }

  if (oldIndex !== activeIndex.value) {
    emit('update:modelValue', activeIndex.value)
    emit('change', activeIndex.value, oldIndex)
  }
}

const prev = () => {
  setActiveItem(activeIndex.value - 1)
}

const next = () => {
  setActiveItem(activeIndex.value + 1)
}

const handleIndicatorClick = (index: number) => {
  if (props.trigger === 'click') {
    setActiveItem(index)
  }
}

const handleIndicatorHover = (index: number) => {
  if (props.trigger === 'hover') {
    setActiveItem(index)
  }
}

const handleMouseEnter = () => {
  hovering.value = true
  if (props.pauseOnHover) {
    pauseTimer()
  }
}

const handleMouseLeave = () => {
  hovering.value = false
  if (props.pauseOnHover) {
    startTimer()
  }
}

const startTimer = () => {
  const interval = typeof props.autoplaySpeed === 'number' ? props.autoplaySpeed : props.interval
  if (props.autoplay && (interval ?? 0) > 0 && itemCount.value > 1) {
    pauseTimer()
    timer.value = window.setInterval(() => {
      next()
    }, interval ?? 3000)
  }
}

const pauseTimer = () => {
  if (timer.value) {
    clearInterval(timer.value)
    timer.value = null
  }
}

const resetTimer = () => {
  pauseTimer()
  startTimer()
}

const addItem = () => {
  const index = itemCount.value
  itemCount.value++
  return index
}

// 拖拽交互
const dragStart = ref<{ x: number; y: number } | null>(null)
const dragging = ref(false)

const onPointerDown = (e: PointerEvent) => {
  if (!props.draggable) return
  dragStart.value = { x: e.clientX, y: e.clientY }
  dragging.value = true
}

const onPointerMove = (e: PointerEvent) => {
  if (!props.draggable || !dragging.value || !dragStart.value) return
  // 可在此加入位移反馈效果，目前仅在松开时判断方向
}

const onPointerUp = (e: PointerEvent) => {
  if (!props.draggable || !dragStart.value) return
  const dx = e.clientX - dragStart.value.x
  const dy = e.clientY - dragStart.value.y
  const threshold = 50
  if (!isVertical.value) {
    if (Math.abs(dx) > threshold) {
      dx < 0 ? next() : prev()
    }
  } else {
    if (Math.abs(dy) > threshold) {
      dy < 0 ? next() : prev()
    }
  }
  dragStart.value = null
  dragging.value = false
}

const onPointerCancel = () => {
  dragging.value = false
  dragStart.value = null
}

// 监听 itemCount 变化，自动启动定时器
watch(itemCount, (newCount) => {
  if (newCount > 0 && props.autoplay) {
    startTimer()
  }
})

watch(() => props.modelValue, (val) => {
  setActiveItem(val)
})

watch(() => props.autoplay, (val) => {
  val ? startTimer() : pauseTimer()
})

watch(() => props.interval, () => {
  resetTimer()
})
watch(() => props.autoplaySpeed, () => {
  resetTimer()
})

onBeforeUnmount(() => {
  pauseTimer()
})

defineExpose({
  prev,
  next,
  setActiveItem,
})

provide('carousel', {
  activeIndex,
  isVertical,
  duration: computed(() => props.speed ?? props.duration),
  effect: computed(() => props.effect ?? 'scrollx'),
  addItem,
})
</script>

<style scoped>
.my-carousel {
  position: relative;
  overflow: hidden;
}

.my-carousel__container {
  position: relative;
  width: 100%;
  height: 300px;
  overflow: hidden;
}

.my-carousel__arrow {
  position: absolute;
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 50%;
  background-color: rgba(31, 45, 61, 0.11);
  color: #fff;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.my-carousel__arrow:hover {
  background-color: rgba(31, 45, 61, 0.23);
}

.my-carousel__arrow--left {
  top: 50%;
  transform: translateY(-50%);
  left: 16px;
}

.my-carousel__arrow--right {
  top: 50%;
  transform: translateY(-50%);
  right: 16px;
}

.my-carousel__arrow--up,
.my-carousel__arrow--down {
  left: 50%;
  transform: translateX(-50%);
}

.my-carousel__arrow--up {
  top: 16px;
}

.my-carousel__arrow--down {
  bottom: 16px;
}

.my-carousel__indicators {
  position: absolute;
  list-style: none;
  margin: 0;
  padding: 0;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 8px;
}

.my-carousel__indicators--bottom {
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
}

.my-carousel__indicators--top {
  top: 12px;
  left: 50%;
  transform: translateX(-50%);
}

.my-carousel__indicators--start {
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  flex-direction: column;
}

.my-carousel__indicators--end {
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  flex-direction: column;
}

.my-carousel__indicator {
  cursor: pointer;
}

.my-carousel__button {
  display: block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.3);
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;
  outline: none;
}

.my-carousel__indicators--dot .my-carousel__button {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.my-carousel__indicators--line .my-carousel__button {
  width: 16px;
  height: 3px;
  border-radius: 2px;
}

.my-carousel__indicator.is-active .my-carousel__button {
  background-color: var(--primary-color, #409eff);
}

.my-carousel__indicator:hover .my-carousel__button {
  opacity: 0.8;
}

@media (max-width: 768px) {
  .my-carousel__arrow {
    width: 28px;
    height: 28px;
  }

  .my-carousel__arrow--left {
    left: 8px;
  }

  .my-carousel__arrow--right {
    right: 8px;
  }
}
</style>
