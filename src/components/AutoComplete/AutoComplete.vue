<template>
  <div class="my-autocomplete" ref="autocompleteRef">
    <input
      v-model="inputValue"
      :placeholder="placeholder"
      :disabled="disabled"
      class="my-autocomplete__input"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
      @keydown="handleKeydown"
    />
    <span v-if="clearable && inputValue" class="my-autocomplete__clear" @mousedown.prevent="handleClear">×</span>
    <div v-if="showDropdown && filteredOptions.length" class="my-autocomplete__dropdown">
      <div
        v-for="(option, index) in filteredOptions"
        :key="option.value"
        :class="['my-autocomplete__option', { 'is-active': index === activeIndex }]"
        @mousedown.prevent="handleSelect(option)"
        @mouseenter="activeIndex = index"
      >
        {{ option.label || option.value }}
      </div>
    </div>
    <div v-if="showDropdown && !filteredOptions.length && inputValue" class="my-autocomplete__dropdown">
      <div class="my-autocomplete__empty">无匹配数据</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { AutoCompleteProps, AutoCompleteEmits, AutoCompleteOption } from './types'

defineOptions({
  name: 'MyAutoComplete',
})

const props = withDefaults(defineProps<AutoCompleteProps>(), {
  modelValue: '',
  options: () => [],
  placeholder: '请输入',
  disabled: false,
  clearable: false,
})

const emit = defineEmits<AutoCompleteEmits>()

const inputValue = ref(props.modelValue)
const showDropdown = ref(false)
const autocompleteRef = ref<HTMLElement>()
const activeIndex = ref(-1)

const filteredOptions = computed(() => {
  if (!inputValue.value) return props.options
  return props.options.filter(option => 
    (option.label || option.value).toLowerCase().includes(inputValue.value.toLowerCase())
  )
})

watch(() => props.modelValue, (val) => {
  inputValue.value = val
})

watch(showDropdown, (val) => {
  if (!val) {
    activeIndex.value = -1
  }
})

const handleInput = () => {
  emit('update:modelValue', inputValue.value)
  emit('search', inputValue.value)
  showDropdown.value = true
  activeIndex.value = -1
}

const handleFocus = () => {
  if (inputValue.value || props.options.length) {
    showDropdown.value = true
  }
}

const handleBlur = () => {
  setTimeout(() => {
    showDropdown.value = false
  }, 200)
}

const handleKeydown = (e: KeyboardEvent) => {
  if (!showDropdown.value || !filteredOptions.value.length) return

  switch (e.key) {
    case 'ArrowDown':
      e.preventDefault()
      activeIndex.value = Math.min(activeIndex.value + 1, filteredOptions.value.length - 1)
      break
    case 'ArrowUp':
      e.preventDefault()
      activeIndex.value = Math.max(activeIndex.value - 1, 0)
      break
    case 'Enter':
      e.preventDefault()
      if (activeIndex.value >= 0 && activeIndex.value < filteredOptions.value.length) {
        handleSelect(filteredOptions.value[activeIndex.value])
      }
      break
    case 'Escape':
      showDropdown.value = false
      break
  }
}

const handleSelect = (option: AutoCompleteOption) => {
  inputValue.value = option.value
  emit('update:modelValue', option.value)
  emit('select', option)
  showDropdown.value = false
}

const handleClear = () => {
  inputValue.value = ''
  emit('update:modelValue', '')
  showDropdown.value = false
}
</script>

<style scoped>
.my-autocomplete {
  position: relative;
  display: inline-block;
  width: 100%;
  font-size: 14px;
}

.my-autocomplete__input {
  width: 100%;
  padding: 4px 30px 4px 11px;
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

.my-autocomplete__input::placeholder {
  color: rgba(0, 0, 0, 0.25);
}

.my-autocomplete__input:hover {
  border-color: #4096ff;
}

.my-autocomplete__input:focus {
  border-color: #4096ff;
  box-shadow: 0 0 0 2px rgba(5, 145, 255, 0.1);
}

.my-autocomplete__input:disabled {
  background-color: rgba(0, 0, 0, 0.04);
  border-color: #d9d9d9;
  color: rgba(0, 0, 0, 0.25);
  cursor: not-allowed;
}

.my-autocomplete__clear {
  position: absolute;
  right: 11px;
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
}

.my-autocomplete__clear:hover {
  color: rgba(0, 0, 0, 0.45);
  background-color: rgba(0, 0, 0, 0.12);
}

.my-autocomplete__dropdown {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  max-height: 256px;
  overflow-y: auto;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.08),
              0 3px 6px -4px rgba(0, 0, 0, 0.12),
              0 9px 28px 8px rgba(0, 0, 0, 0.05);
  z-index: 2000;
  margin: 0;
  padding: 4px 0;
}

.my-autocomplete__dropdown::-webkit-scrollbar {
  width: 8px;
}

.my-autocomplete__dropdown::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.12);
  border-radius: 4px;
}

.my-autocomplete__dropdown::-webkit-scrollbar-thumb:hover {
  background-color: rgba(0, 0, 0, 0.2);
}

.my-autocomplete__option {
  padding: 5px 12px;
  min-height: 32px;
  line-height: 22px;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.88);
  cursor: pointer;
  transition: background-color 0.2s;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.my-autocomplete__option:hover,
.my-autocomplete__option.is-active {
  background-color: rgba(0, 0, 0, 0.04);
}

.my-autocomplete__empty {
  padding: 5px 12px;
  min-height: 32px;
  line-height: 22px;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.25);
  text-align: center;
}
</style>
