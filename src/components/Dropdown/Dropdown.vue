<template>
  <div
    ref="wrapperRef"
    class="my-dropdown"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <div class="my-dropdown__trigger" @click="handleTriggerClick">
      <slot>下拉菜单</slot>
    </div>
    <transition name="fade">
      <ul v-if="visible" class="my-dropdown__menu" :class="menuPlacementClass">
        <li
          v-for="option in options"
          :key="option.value"
          :class="['my-dropdown__item', { 'is-disabled': option.disabled }]"
          @click="() => handleSelect(option)"
        >
          {{ option.label }}
        </li>
      </ul>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import type { DropdownProps, DropdownEmits, DropdownOption } from './types'

defineOptions({
  name: 'MyDropdown',
})

const props = withDefaults(defineProps<DropdownProps>(), {
  options: () => [],
  trigger: 'click',
  placement: 'bottom-start',
})

const emit = defineEmits<DropdownEmits>()

const visible = ref(false)
const wrapperRef = ref<HTMLElement>()

const menuPlacementClass = computed(() => {
  return {
    'is-bottom-start': props.placement === 'bottom-start',
    'is-bottom-end': props.placement === 'bottom-end',
  }
})

const open = () => {
  visible.value = true
  emit('visible-change', true)
}

const close = () => {
  visible.value = false
  emit('visible-change', false)
}

const toggle = () => {
  visible.value ? close() : open()
}

const handleTriggerClick = () => {
  if (props.trigger === 'click') {
    toggle()
  }
}

const handleMouseEnter = () => {
  if (props.trigger === 'hover') {
    open()
  }
}

const handleMouseLeave = () => {
  if (props.trigger === 'hover') {
    close()
  }
}

const handleSelect = (option: DropdownOption) => {
  if (option.disabled) return
  emit('select', option)
  close()
}

const handleClickOutside = (event: MouseEvent) => {
  if (wrapperRef.value && !wrapperRef.value.contains(event.target as Node)) {
    close()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.my-dropdown {
  position: relative;
  display: inline-block;
}

.my-dropdown__trigger {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 12px;
  border: 1px solid var(--border-color-base);
  border-radius: var(--border-radius-base);
  cursor: pointer;
  background-color: var(--bg-color);
  transition: var(--transition-base);
  color: var(--text-regular);
}

.my-dropdown__trigger:hover {
  border-color: var(--primary-hover);
  color: var(--primary-color);
}

.my-dropdown__menu {
  position: absolute;
  min-width: 140px;
  margin: 6px 0 0;
  padding: 6px 0;
  list-style: none;
  background-color: var(--bg-color);
  border: 1px solid var(--border-color-light);
  border-radius: var(--border-radius-base);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
  z-index: 10;
}

.my-dropdown__menu.is-bottom-end {
  right: 0;
}

.my-dropdown__item {
  padding: 8px 12px;
  cursor: pointer;
  transition: var(--transition-base);
  color: var(--text-regular);
}

.my-dropdown__item:hover {
  background-color: var(--bg-color-light);
  color: var(--primary-color);
}

.my-dropdown__item.is-disabled {
  color: var(--text-placeholder);
  cursor: not-allowed;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
