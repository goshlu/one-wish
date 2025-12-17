<template>
  <div :class="wrapperClass">
    <!-- 左侧面板 -->
    <div class="my-transfer__panel">
      <div class="my-transfer__panel-header">
        <span class="my-transfer__panel-title">{{ leftTitle }}</span>
        <span class="my-transfer__panel-count">{{ leftChecked.length }}/{{ leftData.length }}</span>
      </div>
      <div class="my-transfer__panel-body">
        <div v-if="filterable" class="my-transfer__filter">
          <input
            v-model="leftQuery"
            type="text"
            class="my-transfer__filter-input"
            :placeholder="filterPlaceholder"
          />
        </div>
        <div class="my-transfer__list">
          <label
            v-for="item in filteredLeftData"
            :key="item.key"
            :class="[
              'my-transfer__item',
              {
                'is-checked': leftChecked.includes(item.key),
                'is-disabled': item.disabled || disabled
              }
            ]"
          >
            <input
              type="checkbox"
              :checked="leftChecked.includes(item.key)"
              :disabled="item.disabled || disabled"
              @change="handleLeftCheck(item.key, $event)"
            />
            <span class="my-transfer__item-label">{{ item.label }}</span>
          </label>
          <div v-if="!filteredLeftData.length" class="my-transfer__empty">
            {{ leftQuery ? '无匹配数据' : '暂无数据' }}
          </div>
        </div>
      </div>
    </div>

    <!-- 中间操作按钮 -->
    <div class="my-transfer__buttons">
      <button
        type="button"
        :class="[
          'my-transfer__button',
          {
            'is-disabled': !leftChecked.length || disabled,
            'is-with-text': !!buttonTexts?.[0]
          }
        ]"
        :disabled="!leftChecked.length || disabled"
        @click="addToRight"
      >
        <span v-if="buttonTexts?.[0]">{{ buttonTexts[0] }}</span>
        <span v-else>→</span>
      </button>
      <button
        type="button"
        :class="[
          'my-transfer__button',
          {
            'is-disabled': !rightChecked.length || disabled,
            'is-with-text': !!buttonTexts?.[1]
          }
        ]"
        :disabled="!rightChecked.length || disabled"
        @click="addToLeft"
      >
        <span v-if="buttonTexts?.[1]">{{ buttonTexts[1] }}</span>
        <span v-else>←</span>
      </button>
    </div>

    <!-- 右侧面板 -->
    <div class="my-transfer__panel">
      <div class="my-transfer__panel-header">
        <span class="my-transfer__panel-title">{{ rightTitle }}</span>
        <span class="my-transfer__panel-count">{{ rightChecked.length }}/{{ rightData.length }}</span>
      </div>
      <div class="my-transfer__panel-body">
        <div v-if="filterable" class="my-transfer__filter">
          <input
            v-model="rightQuery"
            type="text"
            class="my-transfer__filter-input"
            :placeholder="filterPlaceholder"
          />
        </div>
        <div class="my-transfer__list">
          <label
            v-for="item in filteredRightData"
            :key="item.key"
            :class="[
              'my-transfer__item',
              {
                'is-checked': rightChecked.includes(item.key),
                'is-disabled': item.disabled || disabled
              }
            ]"
          >
            <input
              type="checkbox"
              :checked="rightChecked.includes(item.key)"
              :disabled="item.disabled || disabled"
              @change="handleRightCheck(item.key, $event)"
            />
            <span class="my-transfer__item-label">{{ item.label }}</span>
          </label>
          <div v-if="!filteredRightData.length" class="my-transfer__empty">
            {{ rightQuery ? '无匹配数据' : '暂无数据' }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { TransferProps, TransferEmits, TransferOption } from './types'

defineOptions({
  name: 'MyTransfer',
})

const props = withDefaults(defineProps<TransferProps>(), {
  modelValue: () => [],
  data: () => [],
  titles: () => ['源列表', '目标列表'],
  buttonTexts: () => [],
  placeholder: () => ['请输入搜索内容', '请输入搜索内容'],
  filterable: false,
  filterPlaceholder: '请输入搜索内容',
  disabled: false,
  size: 'default',
  targetOrder: 'original',
})

const emit = defineEmits<TransferEmits>()

const leftChecked = ref<Array<string | number>>([])
const rightChecked = ref<Array<string | number>>([])
const leftQuery = ref('')
const rightQuery = ref('')

const leftTitle = computed(() => props.titles?.[0] || '源列表')
const rightTitle = computed(() => props.titles?.[1] || '目标列表')

const leftData = computed(() => {
  return props.data.filter(item => !props.modelValue.includes(item.key))
})

const rightData = computed(() => {
  const targetKeys = props.modelValue
  return props.data.filter(item => targetKeys.includes(item.key))
})

const filteredLeftData = computed(() => {
  if (!props.filterable || !leftQuery.value.trim()) {
    return leftData.value
  }
  const query = leftQuery.value.toLowerCase()
  return leftData.value.filter(item =>
    item.label.toLowerCase().includes(query)
  )
})

const filteredRightData = computed(() => {
  if (!props.filterable || !rightQuery.value.trim()) {
    return rightData.value
  }
  const query = rightQuery.value.toLowerCase()
  return rightData.value.filter(item =>
    item.label.toLowerCase().includes(query)
  )
})

const wrapperClass = computed(() => [
  'my-transfer',
  `my-transfer--${props.size}`,
  {
    'is-disabled': props.disabled
  }
])

const handleLeftCheck = (key: string | number, event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.checked) {
    leftChecked.value.push(key)
  } else {
    const index = leftChecked.value.indexOf(key)
    if (index > -1) {
      leftChecked.value.splice(index, 1)
    }
  }
  emit('left-check-change', [...leftChecked.value])
}

const handleRightCheck = (key: string | number, event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.checked) {
    rightChecked.value.push(key)
  } else {
    const index = rightChecked.value.indexOf(key)
    if (index > -1) {
      rightChecked.value.splice(index, 1)
    }
  }
  emit('right-check-change', [...rightChecked.value])
}

const addToRight = () => {
  if (!leftChecked.value.length || props.disabled) return
  
  const movedKeys = leftChecked.value.filter(key => {
    const item = props.data.find(item => item.key === key)
    return item && !item.disabled
  })
  
  const newValue = [...props.modelValue]
  if (props.targetOrder === 'original') {
    // 按原始顺序添加
    props.data.forEach(item => {
      if (movedKeys.includes(item.key) && !newValue.includes(item.key)) {
        newValue.push(item.key)
      }
    })
  } else {
    // 按点击顺序添加
    movedKeys.forEach(key => {
      if (!newValue.includes(key)) {
        newValue.push(key)
      }
    })
  }
  
  emit('update:modelValue', newValue)
  emit('change', newValue, 'right', movedKeys)
  leftChecked.value = []
}

const addToLeft = () => {
  if (!rightChecked.value.length || props.disabled) return
  
  const movedKeys = rightChecked.value.filter(key => {
    const item = props.data.find(item => item.key === key)
    return item && !item.disabled
  })
  
  const newValue = props.modelValue.filter(key => !movedKeys.includes(key))
  
  emit('update:modelValue', newValue)
  emit('change', newValue, 'left', movedKeys)
  rightChecked.value = []
}

// 清空选中状态当数据变化时
watch(() => props.modelValue, () => {
  leftChecked.value = []
  rightChecked.value = []
})

watch(() => props.data, () => {
  leftChecked.value = []
  rightChecked.value = []
})
</script>

<style scoped>
.my-transfer {
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: var(--font-size-base);
}

.my-transfer__panel {
  flex: 1;
  border: 1px solid var(--border-color-base);
  border-radius: var(--border-radius-base);
  background: var(--bg-color);
  overflow: hidden;
}

.my-transfer__panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: var(--bg-color-light);
  border-bottom: 1px solid var(--border-color-base);
}

.my-transfer__panel-title {
  font-weight: 500;
  color: var(--text-regular);
}

.my-transfer__panel-count {
  color: var(--text-secondary);
  font-size: 12px;
}

.my-transfer__panel-body {
  height: 246px;
  display: flex;
  flex-direction: column;
}

.my-transfer__filter {
  padding: 8px;
  border-bottom: 1px solid var(--border-color-light);
}

.my-transfer__filter-input {
  width: 100%;
  padding: 6px 8px;
  border: 1px solid var(--border-color-base);
  border-radius: 4px;
  outline: none;
  font-size: 12px;
}

.my-transfer__filter-input:focus {
  border-color: var(--primary-color);
}

.my-transfer__list {
  flex: 1;
  overflow-y: auto;
  padding: 4px 0;
}

.my-transfer__item {
  display: flex;
  align-items: center;
  padding: 8px 16px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.my-transfer__item:hover {
  background-color: var(--bg-color-light);
}

.my-transfer__item.is-checked {
  background-color: var(--primary-color-light, rgba(64, 158, 255, 0.1));
}

.my-transfer__item.is-disabled {
  cursor: not-allowed;
  color: var(--text-placeholder);
}

.my-transfer__item input[type="checkbox"] {
  margin-right: 8px;
}

.my-transfer__item-label {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.my-transfer__empty {
  text-align: center;
  padding: 20px;
  color: var(--text-placeholder);
  font-size: 12px;
}

.my-transfer__buttons {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0 8px;
}

.my-transfer__button {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 32px;
  height: 32px;
  padding: 0 12px;
  border: 1px solid var(--border-color-base);
  border-radius: var(--border-radius-base);
  background: var(--bg-color);
  color: var(--text-regular);
  cursor: pointer;
  transition: all 0.2s;
  font-size: 12px;
}

.my-transfer__button:hover:not(.is-disabled) {
  border-color: var(--primary-color);
  color: var(--primary-color);
}

.my-transfer__button.is-disabled {
  cursor: not-allowed;
  opacity: 0.6;
  color: var(--text-placeholder);
}

.my-transfer__button.is-with-text {
  min-width: 60px;
}

/* 尺寸变体 */
.my-transfer--large .my-transfer__panel-header {
  padding: 14px 18px;
}

.my-transfer--large .my-transfer__filter {
  padding: 10px;
}

.my-transfer--large .my-transfer__filter-input {
  padding: 8px 10px;
}

.my-transfer--large .my-transfer__item {
  padding: 10px 18px;
}

.my-transfer--large .my-transfer__button {
  height: 36px;
  padding: 0 14px;
  font-size: 14px;
}

.my-transfer--small .my-transfer__panel-header {
  padding: 10px 14px;
}

.my-transfer--small .my-transfer__filter {
  padding: 6px;
}

.my-transfer--small .my-transfer__filter-input {
  padding: 4px 6px;
}

.my-transfer--small .my-transfer__item {
  padding: 6px 14px;
}

.my-transfer--small .my-transfer__button {
  height: 28px;
  padding: 0 10px;
  font-size: 11px;
}

.my-transfer.is-disabled {
  opacity: 0.6;
}

.my-transfer.is-disabled .my-transfer__item {
  cursor: not-allowed;
}
</style>
