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
  font-size: 14px;
}

.my-cascader__input {
  position: relative;
  display: flex;
  align-items: center;
  min-height: 32px;
  padding: 4px 30px 4px 11px;
  font-size: 14px;
  line-height: 1.5715;
  color: rgba(0, 0, 0, 0.88);
  background-color: #ffffff;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  box-sizing: border-box;
}

.my-cascader__input:hover {
  border-color: #4096ff;
}

.my-cascader__label {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: rgba(0, 0, 0, 0.88);
}

.my-cascader__placeholder {
  color: rgba(0, 0, 0, 0.25);
}

.my-cascader__arrow {
  position: absolute;
  right: 11px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 12px;
  color: rgba(0, 0, 0, 0.25);
  transition: transform 0.3s;
  pointer-events: none;
}

.my-cascader__clear {
  position: absolute;
  right: 30px;
  top: 50%;
  transform: translateY(-50%);
  width: 12px;
  height: 12px;
  font-size: 12px;
  line-height: 12px;
  text-align: center;
  cursor: pointer;
  color: rgba(0, 0, 0, 0.25);
  background-color: rgba(0, 0, 0, 0.06);
  border-radius: 50%;
  transition: all 0.2s;
  z-index: 1;
}

.my-cascader__clear:hover {
  color: rgba(0, 0, 0, 0.45);
  background-color: rgba(0, 0, 0, 0.12);
}

.my-cascader__dropdown {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.08),
              0 3px 6px -4px rgba(0, 0, 0, 0.12),
              0 9px 28px 8px rgba(0, 0, 0, 0.05);
  z-index: 2000;
  overflow: hidden;
}

.my-cascader__menus {
  display: flex;
}

.my-cascader__menu {
  min-width: 160px;
  max-height: 256px;
  overflow-y: auto;
  border-right: 1px solid rgba(5, 5, 5, 0.06);
  padding: 4px 0;
}

.my-cascader__menu:last-child {
  border-right: none;
}

.my-cascader__menu::-webkit-scrollbar {
  width: 8px;
}

.my-cascader__menu::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.12);
  border-radius: 4px;
}

.my-cascader__menu::-webkit-scrollbar-thumb:hover {
  background-color: rgba(0, 0, 0, 0.2);
}

.my-cascader__option {
  position: relative;
  display: flex;
  align-items: center;
  padding: 5px 32px 5px 12px;
  min-height: 32px;
  font-size: 14px;
  line-height: 22px;
  color: rgba(0, 0, 0, 0.88);
  cursor: pointer;
  transition: background-color 0.2s;
  white-space: nowrap;
}

.my-cascader__option:hover {
  background-color: rgba(0, 0, 0, 0.04);
}

.my-cascader__option.is-active {
  color: #1677ff;
  font-weight: 600;
  background-color: #e6f4ff;
}

.my-cascader__option.is-disabled {
  color: rgba(0, 0, 0, 0.25);
  cursor: not-allowed;
  background-color: transparent;
}

.my-cascader__option.is-disabled:hover {
  background-color: transparent;
}

.my-cascader__expand {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 10px;
  color: rgba(0, 0, 0, 0.45);
}
</style>
