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
    />
    <span v-if="clearable && inputValue" class="my-autocomplete__clear" @click="handleClear">×</span>
    <div v-if="showDropdown && filteredOptions.length" class="my-autocomplete__dropdown">
      <div
        v-for="option in filteredOptions"
        :key="option.value"
        class="my-autocomplete__option"
        @mousedown.prevent="handleSelect(option)"
      >
        {{ option.label || option.value }}
      </div>
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

const filteredOptions = computed(() => {
  if (!inputValue.value) return props.options
  return props.options.filter(option => 
    (option.label || option.value).toLowerCase().includes(inputValue.value.toLowerCase())
  )
})

watch(() => props.modelValue, (val) => {
  inputValue.value = val
})

const handleInput = () => {
  emit('update:modelValue', inputValue.value)
  emit('search', inputValue.value)
  showDropdown.value = true
}

const handleFocus = () => {
  showDropdown.value = true
}

const handleBlur = () => {
  setTimeout(() => {
    showDropdown.value = false
  }, 200)
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
}

.my-autocomplete__input {
  width: 100%;
  padding: 8px 12px;
  font-size: var(--font-size-base);
  border: 1px solid var(--border-color-base);
  border-radius: var(--border-radius-base);
  outline: none;
  transition: var(--transition-base);
}

.my-autocomplete__input:focus {
  border-color: var(--primary-color);
}

.my-autocomplete__input:disabled {
  background-color: var(--bg-color-disabled);
  cursor: not-allowed;
}

.my-autocomplete__clear {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: var(--text-placeholder);
  font-size: 18px;
}

.my-autocomplete__dropdown {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  max-height: 200px;
  overflow-y: auto;
  background: #fff;
  border: 1px solid var(--border-color-base);
  border-radius: var(--border-radius-base);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.my-autocomplete__option {
  padding: 8px 12px;
  cursor: pointer;
  transition: var(--transition-base);
}

.my-autocomplete__option:hover {
  background-color: var(--bg-color-light);
}
</style>
