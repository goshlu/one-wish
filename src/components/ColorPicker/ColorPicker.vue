<template>
  <div class="my-color-picker" v-click-outside="closePicker">
    <div 
      :class="['my-color-picker__trigger', { 'is-disabled': disabled }]"
      @click="togglePicker"
    >
      <div class="my-color-picker__color" :style="{ backgroundColor: currentColor }">
        <div class="my-color-picker__color-alpha"></div>
      </div>
    </div>
    <div v-if="showPicker" class="my-color-picker__panel">
      <div class="my-color-picker__inner">
        <input
          type="text"
          :value="currentColor"
          @input="handleInputChange"
          @blur="handleInputBlur"
          class="my-color-picker__hex-input"
          placeholder="#409eff"
        />
        <input
          type="color"
          :value="currentColor"
          @input="handleColorChange"
          class="my-color-picker__native-input"
        />
      </div>
      <div v-if="predefineColors?.length" class="my-color-picker__predefine">
        <div class="my-color-picker__predefine-title">预设颜色</div>
        <div class="my-color-picker__predefine-colors">
          <div
            v-for="color in predefineColors"
            :key="color"
            :class="['my-color-picker__predefine-item', { 'is-active': currentColor.toLowerCase() === color.toLowerCase() }]"
            :style="{ backgroundColor: color }"
            @click="selectColor(color)"
          >
            <div class="my-color-picker__predefine-alpha"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { ColorPickerProps, ColorPickerEmits } from './types'

defineOptions({
  name: 'MyColorPicker',
})

const props = withDefaults(defineProps<ColorPickerProps>(), {
  modelValue: '#409eff',
  disabled: false,
  showAlpha: false,
  predefineColors: () => [],
})

const emit = defineEmits<ColorPickerEmits>()

const currentColor = ref(props.modelValue)
const showPicker = ref(false)
const inputValue = ref(props.modelValue)

watch(() => props.modelValue, (val) => {
  currentColor.value = val
  inputValue.value = val
})

const togglePicker = () => {
  if (props.disabled) return
  showPicker.value = !showPicker.value
}

const closePicker = () => {
  showPicker.value = false
}

const handleColorChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  currentColor.value = target.value
  inputValue.value = target.value
  emit('update:modelValue', target.value)
  emit('change', target.value)
}

const handleInputChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  inputValue.value = target.value
}

const handleInputBlur = () => {
  const value = inputValue.value.trim()
  if (/^#[0-9A-Fa-f]{6}$/.test(value)) {
    currentColor.value = value
    emit('update:modelValue', value)
    emit('change', value)
  } else {
    inputValue.value = currentColor.value
  }
}

const selectColor = (color: string) => {
  currentColor.value = color
  inputValue.value = color
  emit('update:modelValue', color)
  emit('change', color)
  showPicker.value = false
}

// 简单的 click-outside 指令
const vClickOutside = {
  mounted(el: HTMLElement, binding: any) {
    el._clickOutside = (event: MouseEvent) => {
      if (!(el === event.target || el.contains(event.target as Node))) {
        binding.value()
      }
    }
    document.addEventListener('click', el._clickOutside)
  },
  unmounted(el: HTMLElement) {
    document.removeEventListener('click', el._clickOutside)
  }
}
</script>

<style scoped>
.my-color-picker {
  position: relative;
  display: inline-block;
}

.my-color-picker__trigger {
  width: 40px;
  height: 40px;
  padding: 4px;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  box-sizing: border-box;
  background-color: #ffffff;
}

.my-color-picker__trigger:hover {
  border-color: #4096ff;
}

.my-color-picker__trigger.is-disabled {
  cursor: not-allowed;
  background-color: rgba(0, 0, 0, 0.04);
  border-color: #d9d9d9;
}

.my-color-picker__color {
  width: 100%;
  height: 100%;
  border-radius: 4px;
  position: relative;
  overflow: hidden;
}

.my-color-picker__color-alpha {
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(45deg, #ddd 25%, transparent 25%),
    linear-gradient(-45deg, #ddd 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, #ddd 75%),
    linear-gradient(-45deg, transparent 75%, #ddd 75%);
  background-size: 8px 8px;
  background-position: 0 0, 0 4px, 4px -4px, -4px 0;
  z-index: -1;
}

.my-color-picker__panel {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  padding: 16px;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.08),
              0 3px 6px -4px rgba(0, 0, 0, 0.12),
              0 9px 28px 8px rgba(0, 0, 0, 0.05);
  z-index: 2000;
  min-width: 240px;
}

.my-color-picker__inner {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}

.my-color-picker__hex-input {
  flex: 1;
  height: 32px;
  padding: 4px 11px;
  font-size: 14px;
  line-height: 1.5715;
  color: rgba(0, 0, 0, 0.88);
  background-color: #ffffff;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  outline: none;
  transition: all 0.2s;
  box-sizing: border-box;
}

.my-color-picker__hex-input:hover {
  border-color: #4096ff;
}

.my-color-picker__hex-input:focus {
  border-color: #4096ff;
  box-shadow: 0 0 0 2px rgba(5, 145, 255, 0.1);
}

.my-color-picker__native-input {
  width: 32px;
  height: 32px;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  padding: 0;
  background: none;
}

.my-color-picker__native-input::-webkit-color-swatch-wrapper {
  padding: 2px;
}

.my-color-picker__native-input::-webkit-color-swatch {
  border: none;
  border-radius: 4px;
}

.my-color-picker__predefine {
  border-top: 1px solid rgba(5, 5, 5, 0.06);
  padding-top: 12px;
}

.my-color-picker__predefine-title {
  font-size: 12px;
  color: rgba(0, 0, 0, 0.45);
  margin-bottom: 8px;
}

.my-color-picker__predefine-colors {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.my-color-picker__predefine-item {
  width: 24px;
  height: 24px;
  border-radius: 4px;
  cursor: pointer;
  border: 2px solid transparent;
  transition: all 0.2s;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
}

.my-color-picker__predefine-alpha {
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(45deg, #ddd 25%, transparent 25%),
    linear-gradient(-45deg, #ddd 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, #ddd 75%),
    linear-gradient(-45deg, transparent 75%, #ddd 75%);
  background-size: 6px 6px;
  background-position: 0 0, 0 3px, 3px -3px, -3px 0;
  z-index: -1;
}

.my-color-picker__predefine-item:hover {
  transform: scale(1.15);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.my-color-picker__predefine-item.is-active {
  border-color: #1677ff;
  box-shadow: 0 0 0 1px #1677ff;
}
</style>
