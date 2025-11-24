<template>
  <div class="my-tabs">
    <div class="my-tabs__nav">
      <div
        v-for="tab in tabs"
        :key="tab.key"
        ref="setItemRef"
        :class="['my-tabs__item', { 'is-active': tab.key === innerValue, 'is-disabled': tab.disabled }]"
        @click="() => handleSelect(tab)"
      >
        {{ tab.label }}
      </div>
      <div
        v-if="activeIndex >= 0"
        class="my-tabs__bar"
        :style="{ width: barWidth, transform: `translateX(${barOffset}px)` }"
      ></div>
    </div>
    <div class="my-tabs__content">
      <slot :active="innerValue"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUpdate, onMounted, ref, watch } from 'vue'
import type { TabsProps, TabsEmits, TabItem } from './types'

defineOptions({
  name: 'MyTabs',
})

const props = withDefaults(defineProps<TabsProps>(), {
  tabs: () => [],
})

const emit = defineEmits<TabsEmits>()

const innerValue = ref(props.modelValue || props.tabs[0]?.key || '')
const itemRefs = ref<HTMLElement[]>([])

const setItemRef = (el: HTMLElement | null) => {
  if (el) {
    itemRefs.value.push(el)
  }
}

onBeforeUpdate(() => {
  itemRefs.value = []
})

watch(
  () => props.modelValue,
  value => {
    if (value !== undefined) {
      innerValue.value = value
    }
  }
)

watch(
  () => props.tabs,
  tabs => {
    if (!tabs.find(tab => tab.key === innerValue.value) && tabs.length) {
      innerValue.value = tabs[0].key
      emit('update:modelValue', innerValue.value)
    }
    nextTick(updateBar)
  },
  { deep: true }
)

const activeIndex = computed(() => props.tabs.findIndex(tab => tab.key === innerValue.value))

const barWidth = computed(() => {
  const el = itemRefs.value[activeIndex.value]
  return el ? `${el.offsetWidth}px` : '0px'
})

const barOffset = ref(0)

const updateBar = () => {
  const el = itemRefs.value[activeIndex.value]
  if (el) {
    const parent = el.offsetParent as HTMLElement
    barOffset.value = el.offsetLeft - (parent?.offsetLeft || 0)
  }
}

const handleSelect = (tab: TabItem) => {
  if (tab.disabled) return
  innerValue.value = tab.key
  emit('update:modelValue', tab.key)
  emit('change', tab.key)
  nextTick(updateBar)
}

onMounted(() => {
  nextTick(updateBar)
})
</script>

<style scoped>
.my-tabs {
  width: 100%;
}

.my-tabs__nav {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border-bottom: 1px solid var(--border-color-base);
}

.my-tabs__item {
  padding: 10px 14px;
  cursor: pointer;
  color: var(--text-secondary);
  transition: var(--transition-base);
  border-radius: var(--border-radius-base);
}

.my-tabs__item:hover:not(.is-disabled) {
  color: var(--primary-color);
  background-color: var(--bg-color-light);
}

.my-tabs__item.is-active {
  color: var(--primary-color);
}

.my-tabs__item.is-disabled {
  color: var(--text-placeholder);
  cursor: not-allowed;
}

.my-tabs__bar {
  position: absolute;
  height: 2px;
  background-color: var(--primary-color);
  bottom: -1px;
  left: 0;
  transition: transform 0.2s ease, width 0.2s ease;
}

.my-tabs__content {
  margin-top: 12px;
}
</style>
