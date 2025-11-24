<template>
  <ul class="my-menu">
    <MenuItemNode
      v-for="item in items"
      :key="item.key"
      :item="item"
      :active-key="innerValue"
      :open-keys="openKeys"
      @select="handleSelect"
      @toggle="handleToggle"
    />
  </ul>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { MenuProps, MenuEmits } from './types'
import MenuItemNode from './MenuItemNode'

defineOptions({
  name: 'MyMenu',
})

const props = withDefaults(defineProps<MenuProps>(), {
  items: () => [],
  defaultOpenKeys: () => [],
})

const emit = defineEmits<MenuEmits>()

const openKeys = ref<string[]>([...props.defaultOpenKeys])
const innerValue = ref(props.modelValue || props.items[0]?.key || '')

watch(
  () => props.modelValue,
  value => {
    if (value !== undefined) {
      innerValue.value = value
    }
  }
)

const handleSelect = (key: string) => {
  innerValue.value = key
  emit('update:modelValue', key)
  emit('select', key)
}

const handleToggle = (key: string) => {
  if (openKeys.value.includes(key)) {
    openKeys.value = openKeys.value.filter(k => k !== key)
  } else {
    openKeys.value = [...openKeys.value, key]
  }
  emit('open-change', openKeys.value)
}
</script>

<style>
.my-menu {
  list-style: none !important;
  padding: 4px;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
  background-color: #fff;
  border: 1px solid var(--border-color, #e5e7eb);
  border-radius: 8px;
  width: 100%;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  box-sizing: border-box;
}

.my-menu li {
  list-style: none !important;
  margin: 0;
  padding: 0;
}

.my-menu__item {
  color: var(--text-regular);
}

.my-menu__label {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  height: 40px;
  cursor: pointer;
  transition: all 0.2s ease;
  color: var(--text-regular, #606266);
  position: relative;
  border-radius: 6px;
  font-size: 14px;
  user-select: none;
}

.my-menu__label:hover {
  background-color: var(--bg-color-light, #f5f7fa);
  color: var(--text-primary, #303133);
}

.my-menu__item.is-active > .my-menu__label {
  color: var(--primary-color, #409eff);
  background-color: var(--primary-color-light, #ecf5ff);
  font-weight: 500;
}

.my-menu__item.is-disabled {
  color: var(--text-placeholder, #a8abb2);
  cursor: not-allowed;
}

.my-menu__item.is-disabled .my-menu__label {
  cursor: not-allowed;
  background-color: transparent;
}

.my-menu__item.is-disabled .my-menu__label:hover {
  background-color: transparent;
  color: var(--text-placeholder, #a8abb2);
}

.my-menu__children {
  list-style: none !important;
  padding: 2px 0;
  margin: 2px 0 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.my-menu__children .my-menu__label {
  padding-left: 32px;
  height: 36px;
}

.my-menu__children .my-menu__children .my-menu__label {
  padding-left: 48px;
}

.my-menu__arrow {
  transition: transform 0.3s;
  font-size: 12px;
  display: flex;
  align-items: center;
  color: var(--text-secondary, #909399);
  margin-left: 8px;
}

.my-menu__arrow.is-open {
  transform: rotate(90deg);
}
</style>
