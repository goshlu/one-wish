<template>
  <div class="my-color-picker">
    <div 
      :class="['my-color-picker__trigger', { 'is-disabled': disabled }]"
      @click="togglePicker"
    >
      <div class="my-color-picker__color" :style="{ backgroundColor: currentColor }"></div>
    </div>
    <div v-if="showPicker" class="my-color-picker__panel">
      <input
        type="color"
        :value="currentColor"
        @input="handleColorChange"
        class="my-color-picker__input"
      />
      <div v-if="predefineColors?.length" class="my-color-picker__predefine">
        <div
          v-for="color in predefineColors"
          :key="color"
          class="my-color-picker__predefine-item"
          :style="{ backgroundColor: color }"
          @click="selectColor(color)"
        ></div>
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

watch(() => props.modelValue, (val) => {
  currentColor.value = val
})

const togglePicker = () => {
  if (props.disabled) return
  showPicker.value = !showPicker.value
}

const handleColorChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  currentColor.value = target.value
  emit('update:modelValue', target.value)
  emit('change', target.value)
}

const selectColor = (color: string) => {
  currentColor.value = color
  emit('update:modelValue', color)
  emit('change', color)
  showPicker.value = false
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
  border: 1px solid var(--border-color-base);
  border-radius: var(--border-radius-base);
  cursor: pointer;
  transition: var(--transition-base);
}

.my-color-picker__trigger:hover {
  border-color: var(--primary-color);
}

.my-color-picker__trigger.is-disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.my-color-picker__color {
  width: 100%;
  height: 100%;
  border-radius: 2px;
}

.my-color-picker__panel {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  padding: 12px;
  background: #fff;
  border: 1px solid var(--border-color-base);
  border-radius: var(--border-radius-base);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.my-color-picker__input {
  width: 200px;
  height: 150px;
  border: none;
  cursor: pointer;
}

.my-color-picker__predefine {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
}

.my-color-picker__predefine-item {
  width: 24px;
  height: 24px;
  border-radius: 2px;
  cursor: pointer;
  border: 1px solid var(--border-color-base);
}

.my-color-picker__predefine-item:hover {
  transform: scale(1.1);
}
</style>
