<template>
  <div :class="mentionsClass" ref="mentionsRef">
    <textarea
      ref="textareaRef"
      class="my-mentions__textarea"
      :rows="rows"
      :value="textareaValue"
      :placeholder="placeholder"
      :disabled="finalDisabled"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
      @keydown="handleKeydown"
      @keyup="handleKeyup"
      @click="handleCaretUpdate"
    />
    <transition name="mentions-fade">
      <div
        v-if="dropdownVisible && filteredOptions.length"
        class="my-mentions__dropdown"
        :class="`is-${placement}`"
        @mousedown.prevent
      >
        <div
          v-for="(option, index) in filteredOptions"
          :key="option.value"
          :class="[
            'my-mentions__option',
            {
              'is-active': index === activeIndex,
              'is-disabled': option.disabled,
            },
          ]"
          @mousedown.prevent="handleSelect(option)"
        >
          {{ option.label || option.value }}
        </div>
      </div>
    </transition>
    <transition name="mentions-fade">
      <div
        v-if="dropdownVisible && !filteredOptions.length"
        class="my-mentions__dropdown my-mentions__empty"
        :class="`is-${placement}`"
        @mousedown.prevent
      >
        <span>无匹配项</span>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, nextTick, ref, watch } from 'vue'
import type { MentionsEmits, MentionsProps, MentionOption } from './types'
import type { FormItemContext } from '../Form/types'
import { formItemContextKey } from '../Form/types'

defineOptions({
  name: 'MyMentions',
})

const props = withDefaults(defineProps<MentionsProps>(), {
  modelValue: '',
  options: () => [],
  placeholder: '请输入内容',
  disabled: false,
  rows: 3,
  size: 'default',
  prefix: '@',
  placement: 'bottom',
})

const emit = defineEmits<MentionsEmits>()

const textareaValue = ref(props.modelValue ?? '')
const textareaRef = ref<HTMLTextAreaElement>()
const mentionsRef = ref<HTMLDivElement>()
const dropdownVisible = ref(false)
const measureInfo = ref<{ prefix: string; start: number } | null>(null)
const searchText = ref('')
const activeIndex = ref(-1)
const isFocused = ref(false)

const formItem = inject<FormItemContext | null>(formItemContextKey, null)

const finalSize = computed(() => props.size ?? formItem?.size.value ?? 'default')
const finalDisabled = computed(() => props.disabled || formItem?.disabled.value || false)

const mentionsClass = computed(() => [
  'my-mentions',
  `my-mentions--${finalSize.value}`,
  {
    'is-disabled': finalDisabled.value,
    'is-focused': isFocused.value,
  },
])

const prefixList = computed(() =>
  Array.isArray(props.prefix) ? props.prefix : [props.prefix]
)

const defaultFilterOption = (search: string, option: MentionOption) => {
  if (!search) return true
  const text = (option.label || option.value).toLowerCase()
  return text.includes(search.toLowerCase())
}

const filteredOptions = computed(() => {
  if (!dropdownVisible.value) return []
  const filter = props.filterOption ?? defaultFilterOption
  return props.options.filter(option => filter(searchText.value, option))
})

watch(
  () => props.modelValue,
  value => {
    if (value !== undefined && value !== textareaValue.value) {
      textareaValue.value = value
    }
  }
)

watch(dropdownVisible, visible => {
  if (!visible) {
    activeIndex.value = -1
  } else {
    nextTick(() => {
      activeIndex.value = getNextEnabledIndex(-1, 1)
    })
  }
})

const emitSearch = (search: string, prefix: string) => {
  emit('search', search, prefix)
}

const updateMeasureState = () => {
  if (finalDisabled.value) {
    hideDropdown()
    return
  }
  const textarea = textareaRef.value
  if (!textarea) return
  const selectionStart = textarea.selectionStart ?? textareaValue.value.length
  const info = getMeasureInfo(textareaValue.value, selectionStart)
  if (info) {
    measureInfo.value = { prefix: info.prefix, start: info.start }
    searchText.value = info.search
    dropdownVisible.value = true
    emitSearch(info.search, info.prefix)
  } else {
    hideDropdown()
  }
}

const getMeasureInfo = (text: string, selectionStart: number): { prefix: string; start: number; search: string } | null => {
  let match: { prefix: string; start: number; search: string } | null = null
  prefixList.value.forEach(prefix => {
    const idx = text.lastIndexOf(prefix, selectionStart - 1)
    if (idx === -1) return
    const charBefore = idx === 0 ? ' ' : text[idx - 1]
    if (idx > 0 && !/\s/.test(charBefore)) return
    const sliced = text.slice(idx + prefix.length, selectionStart)
    if (/\s/.test(sliced)) return
    if (!match || idx > match.start) {
      match = { prefix, start: idx, search: sliced }
    }
  })
  return match
}

const hideDropdown = () => {
  dropdownVisible.value = false
  searchText.value = ''
  measureInfo.value = null
}

const handleInput = (event: Event) => {
  const target = event.target as HTMLTextAreaElement
  textareaValue.value = target.value
  emit('update:modelValue', target.value)
  emit('input', target.value)
  formItem?.onFieldChange()
  updateMeasureState()
}

const handleFocus = (event: FocusEvent) => {
  isFocused.value = true
  emit('focus', event)
  updateMeasureState()
}

const handleBlur = (event: FocusEvent) => {
  isFocused.value = false
  emit('blur', event)
  formItem?.onFieldBlur()
  hideDropdown()
}

const getNextEnabledIndex = (start: number, step: 1 | -1) => {
  if (!filteredOptions.value.length) return -1
  let idx = start
  for (let i = 0; i < filteredOptions.value.length; i += 1) {
    idx = (idx + step + filteredOptions.value.length) % filteredOptions.value.length
    if (!filteredOptions.value[idx].disabled) {
      return idx
    }
  }
  return -1
}

const handleKeydown = (event: KeyboardEvent) => {
  if (!dropdownVisible.value || !filteredOptions.value.length) return
  if (event.key === 'ArrowDown') {
    event.preventDefault()
    activeIndex.value = getNextEnabledIndex(activeIndex.value, 1)
  } else if (event.key === 'ArrowUp') {
    event.preventDefault()
    activeIndex.value = getNextEnabledIndex(
      activeIndex.value === -1 ? 0 : activeIndex.value,
      -1
    )
  } else if (event.key === 'Enter') {
    if (activeIndex.value >= 0) {
      event.preventDefault()
      handleSelect(filteredOptions.value[activeIndex.value])
    }
  } else if (event.key === 'Escape') {
    event.preventDefault()
    hideDropdown()
  }
}

const handleKeyup = (event: KeyboardEvent) => {
  if (['ArrowUp', 'ArrowDown', 'Enter', 'Escape'].includes(event.key)) {
    return
  }
  updateMeasureState()
}

const handleCaretUpdate = () => {
  updateMeasureState()
}

const handleSelect = (option: MentionOption) => {
  if (option.disabled || !measureInfo.value) return
  const textarea = textareaRef.value
  if (!textarea) return
  const selectionStart = textarea.selectionStart ?? textareaValue.value.length
  const before = textareaValue.value.slice(0, measureInfo.value.start)
  const mentionText = `${measureInfo.value.prefix}${option.value} `
  const after = textareaValue.value.slice(selectionStart)
  const nextValue = `${before}${mentionText}${after}`
  textareaValue.value = nextValue
  emit('update:modelValue', nextValue)
  emit('input', nextValue)
  emit('select', option)
  formItem?.onFieldChange()
  hideDropdown()
  nextTick(() => {
    const caret = before.length + mentionText.length
    textarea.focus()
    textarea.setSelectionRange(caret, caret)
  })
}
</script>

<style scoped>
.my-mentions {
  position: relative;
  width: 100%;
}

.my-mentions__textarea {
  width: 100%;
  padding: 8px 12px;
  font-size: var(--font-size-base);
  line-height: 1.5;
  color: var(--text-regular);
  background-color: var(--form-control-bg, var(--bg-color));
  border: 1px solid var(--form-control-border, var(--border-color-base));
  border-width: var(--form-control-border-width, 1px);
  border-radius: var(--form-control-radius, var(--border-radius-base));
  outline: none;
  transition: var(--transition-base);
  resize: vertical;
  min-height: 80px;
  box-sizing: border-box;
}

.my-mentions__textarea::placeholder {
  color: var(--text-placeholder);
}

.my-mentions__textarea:hover:not(:disabled) {
  border-color: var(--form-control-hover-border, var(--border-color-light));
}

.my-mentions__textarea:focus {
  border-color: var(--form-control-focus-border, var(--primary-color));
  box-shadow: var(--form-control-focus-shadow, none);
}

.my-mentions__textarea:disabled {
  background-color: var(--bg-color-light);
  cursor: not-allowed;
  color: var(--text-placeholder);
}

.my-mentions--large .my-mentions__textarea {
  padding: 12px 16px;
  font-size: var(--font-size-large);
}

.my-mentions--small .my-mentions__textarea {
  padding: 6px 10px;
  font-size: var(--font-size-small);
  min-height: 64px;
}

.my-mentions__dropdown {
  position: absolute;
  left: 0;
  right: 0;
  z-index: 10;
  border-radius: 8px;
  background-color: var(--bg-color, #fff);
  box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.08),
    0 3px 6px -4px rgba(0, 0, 0, 0.12),
    0 9px 28px 8px rgba(0, 0, 0, 0.05);
  overflow-y: auto;
  max-height: 220px;
  display: flex;
  flex-direction: column;
  margin-top: 4px;
}

.my-mentions__dropdown.is-top {
  top: auto;
  bottom: calc(100% + 4px);
  margin-top: 0;
  margin-bottom: 4px;
}

.my-mentions__dropdown.is-bottom {
  top: calc(100% + 4px);
}

.my-mentions__option {
  padding: 8px 12px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s;
  color: var(--text-regular);
}

.my-mentions__option:hover {
  background-color: var(--bg-color-light);
}

.my-mentions__option.is-active {
  background-color: rgba(64, 158, 255, 0.12);
}

.my-mentions__option.is-disabled {
  color: var(--text-placeholder);
  cursor: not-allowed;
  background-color: transparent;
}

.my-mentions__empty {
  padding: 10px 12px;
  text-align: center;
  color: var(--text-placeholder);
}

.mentions-fade-enter-active,
.mentions-fade-leave-active {
  transition: opacity 0.12s ease;
}

.mentions-fade-enter-from,
.mentions-fade-leave-to {
  opacity: 0;
}
</style>
