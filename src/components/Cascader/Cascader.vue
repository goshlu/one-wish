<template>
  <div class="my-cascader" ref="cascaderRef">
    <div class="my-cascader__input" @click="toggleDropdown">
      <span v-if="displayLabel" class="my-cascader__label">{{ displayLabel }}</span>
      <span v-else class="my-cascader__placeholder">{{ placeholder }}</span>
      <span v-if="clearable && selectedValues.length" class="my-cascader__clear" @click.stop="handleClear">×</span>
      <span class="my-cascader__arrow">▼</span>
    </div>
    <div v-if="showDropdown" class="my-cascader__dropdown">
      <div class="my-cascader__menus">
        <div v-for="(menu, index) in menus" :key="index" class="my-cascader__menu">
          <div
            v-for="option in menu"
            :key="option.value"
            :class="['my-cascader__option', { 'is-active': isSelected(option, index), 'is-disabled': option.disabled }]"
            @click="handleSelect(option, index)"
          >
            {{ option.label }}
            <span v-if="option.children" class="my-cascader__expand">›</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { CascaderProps, CascaderEmits, CascaderOption } from './types'

defineOptions({
  name: 'MyCascader',
})

const props = withDefaults(defineProps<CascaderProps>(), {
  modelValue: () => [],
  options: () => [],
  placeholder: '请选择',
  disabled: false,
  clearable: false,
})

const emit = defineEmits<CascaderEmits>()

const showDropdown = ref(false)
const selectedValues = ref<(string | number)[]>([...props.modelValue])
const menus = ref<CascaderOption[][]>([props.options])

const displayLabel = computed(() => {
  if (!selectedValues.value.length) return ''
  const labels: string[] = []
  let currentOptions = props.options
  
  for (const value of selectedValues.value) {
    const option = currentOptions.find(opt => opt.value === value)
    if (option) {
      labels.push(option.label)
      currentOptions = option.children || []
    }
  }
  
  return labels.join(' / ')
})

watch(() => props.modelValue, (val) => {
  selectedValues.value = [...val]
})

const toggleDropdown = () => {
  if (props.disabled) return
  showDropdown.value = !showDropdown.value
}

const isSelected = (option: CascaderOption, level: number) => {
  return selectedValues.value[level] === option.value
}

const handleSelect = (option: CascaderOption, level: number) => {
  if (option.disabled) return
  
  selectedValues.value = selectedValues.value.slice(0, level)
  selectedValues.value.push(option.value)
  
  menus.value = menus.value.slice(0, level + 1)
  
  if (option.children && option.children.length) {
    menus.value.push(option.children)
  } else {
    emit('update:modelValue', selectedValues.value)
    emit('change', selectedValues.value)
    showDropdown.value = false
  }
}

const handleClear = () => {
  selectedValues.value = []
  menus.value = [props.options]
  emit('update:modelValue', [])
  emit('change', [])
}
</script>

<style scoped>
.my-cascader {
  position: relative;
  display: inline-block;
  width: 100%;
}

.my-cascader__input {
  position: relative;
  padding: 8px 30px 8px 12px;
  border: 1px solid var(--border-color-base);
  border-radius: var(--border-radius-base);
  cursor: pointer;
  transition: var(--transition-base);
}

.my-cascader__input:hover {
  border-color: var(--primary-color);
}

.my-cascader__placeholder {
  color: var(--text-placeholder);
}

.my-cascader__arrow {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 12px;
  color: var(--text-placeholder);
}

.my-cascader__clear {
  position: absolute;
  right: 30px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: var(--text-placeholder);
  font-size: 18px;
}

.my-cascader__dropdown {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  background: #fff;
  border: 1px solid var(--border-color-base);
  border-radius: var(--border-radius-base);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.my-cascader__menus {
  display: flex;
}

.my-cascader__menu {
  min-width: 150px;
  max-height: 200px;
  overflow-y: auto;
  border-right: 1px solid var(--border-color-base);
}

.my-cascader__menu:last-child {
  border-right: none;
}

.my-cascader__option {
  position: relative;
  padding: 8px 24px 8px 12px;
  cursor: pointer;
  transition: var(--transition-base);
}

.my-cascader__option:hover {
  background-color: var(--bg-color-light);
}

.my-cascader__option.is-active {
  color: var(--primary-color);
  font-weight: 600;
}

.my-cascader__option.is-disabled {
  color: var(--text-disabled);
  cursor: not-allowed;
}

.my-cascader__expand {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
}
</style>
