<template>
  <div class="my-pagination">
    <button class="my-pagination__btn" :disabled="isFirst" @click="changePage(current - 1)">
      ‹
    </button>

    <template v-for="page in pages" :key="page">
      <button
        v-if="typeof page === 'number'"
        :class="['my-pagination__page', { 'is-active': page === current }]"
        @click="changePage(page)"
      >
        {{ page }}
      </button>
      <button
        v-else
        class="my-pagination__page my-pagination__more"
        @click="handleMoreClick(page)"
      >
        ...
      </button>
    </template>

    <button class="my-pagination__btn" :disabled="isLast" @click="changePage(current + 1)">
      ›
    </button>

    <label v-if="showSizeChangerEnabled" class="my-pagination__sizes">
      <select v-model.number="sizeState" @change="handleSizeChange">
        <option v-for="size in pageSizeOptions" :key="size" :value="size">
          {{ size }}条/页
        </option>
      </select>
    </label>

    <label v-if="showJumperEnabled" class="my-pagination__jumper">
      <span>跳至</span>
      <input
        type="text"
        inputmode="numeric"
        pattern="[0-9]*"
        placeholder="页码"
        v-model.trim="jumperInput"
        @keyup.enter="handleJump"
        @blur="handleJump"
      />
      <span>页</span>
    </label>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { PaginationProps, PaginationEmits } from './types'

defineOptions({
  name: 'MyPagination',
})

const props = withDefaults(defineProps<PaginationProps>(), {
  pageSize: 10,
  currentPage: 1,
  pageSizeOptions: () => [10, 20, 50],
  showSizeChanger: false,
  showJumper: false,
  pagerCount: 7,
})

const emit = defineEmits<PaginationEmits>()

const sizeState = ref(props.pageSize)
const pageCount = computed(() => Math.max(1, Math.ceil(props.total / sizeState.value)))
const current = computed(() => Math.min(Math.max(1, props.currentPage), pageCount.value))
const jumperInput = ref('')
const resolveBooleanProp = (value: unknown) => (value === '' ? true : Boolean(value))
const showSizeChangerEnabled = computed(() => resolveBooleanProp(props.showSizeChanger))
const showJumperEnabled = computed(() => resolveBooleanProp(props.showJumper))

watch(
  () => props.pageSize,
  size => {
    sizeState.value = size
  }
)

const pages = computed(() => {
  const pagerCount = props.pagerCount
  const totalPage = pageCount.value
  const currentPage = current.value

  if (totalPage <= pagerCount) {
    return Array.from({ length: totalPage }, (_, i) => i + 1)
  }

  const halfPagerCount = (pagerCount - 1) / 2
  const showPrevMore = currentPage > pagerCount - halfPagerCount
  const showNextMore = currentPage < totalPage - halfPagerCount

  const result: (number | string)[] = []

  if (!showPrevMore) {
    for (let i = 1; i <= pagerCount - 2; i++) {
      result.push(i)
    }
    result.push('more-next')
    result.push(totalPage)
  } else if (!showNextMore) {
    result.push(1)
    result.push('more-prev')
    for (let i = totalPage - (pagerCount - 2) + 1; i <= totalPage; i++) {
      result.push(i)
    }
  } else {
    result.push(1)
    result.push('more-prev')
    const count = pagerCount - 4
    const offset = Math.floor(count / 2)
    for (let i = currentPage - offset; i <= currentPage + offset; i++) {
      result.push(i)
    }
    result.push('more-next')
    result.push(totalPage)
  }

  return result
})

const isFirst = computed(() => current.value === 1)
const isLast = computed(() => current.value === pageCount.value)

const changePage = (page: number) => {
  const next = Math.min(Math.max(1, page), pageCount.value)
  emit('update:currentPage', next)
  emit('change', next, sizeState.value)
}

const handleMoreClick = (type: string) => {
  const step = props.pagerCount - 2
  if (type === 'more-prev') {
    changePage(current.value - step)
  } else if (type === 'more-next') {
    changePage(current.value + step)
  }
}

const handleSizeChange = () => {
  const page = Math.min(current.value, Math.ceil(props.total / sizeState.value) || 1)
  emit('page-size-change', sizeState.value)
  emit('change', page, sizeState.value)
  emit('update:currentPage', page)
}

const handleJump = () => {
  const page = Number.parseInt(jumperInput.value, 10)
  if (Number.isNaN(page)) {
    jumperInput.value = ''
    return
  }
  changePage(page)
  jumperInput.value = ''
}
</script>

<style scoped>
.my-pagination {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: var(--text-regular);
}

.my-pagination__btn,
.my-pagination__page {
  min-width: 32px;
  height: 32px;
  padding: 0 4px;
  border: 1px solid var(--border-color-base);
  background-color: var(--bg-color);
  color: inherit;
  border-radius: var(--border-radius-base);
  cursor: pointer;
  transition: var(--transition-base);
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.my-pagination__btn:hover:not(:disabled),
.my-pagination__page:hover {
  color: var(--primary-color);
  border-color: var(--primary-hover);
}

.my-pagination__btn:disabled {
  cursor: not-allowed;
  color: var(--text-placeholder);
  background-color: var(--bg-color-disabled);
}

.my-pagination__page.is-active {
  background-color: var(--primary-color);
  color: #fff;
  border-color: var(--primary-color);
}

.my-pagination__more {
  border: none;
  background: transparent;
  color: var(--text-secondary);
}

.my-pagination__more:hover {
  color: var(--primary-color);
  background: transparent;
  border: none;
}

.my-pagination__sizes {
  display: inline-flex;
  align-items: center;
  margin-left: 8px;
}

.my-pagination select {
  height: 32px;
  border: 1px solid var(--border-color-base);
  border-radius: var(--border-radius-base);
  padding: 0 8px;
  outline: none;
}

.my-pagination select:focus {
  border-color: var(--primary-color);
}

.my-pagination select option {
  color: var(--text-regular);
}

.my-pagination__jumper {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  margin-left: 8px;
  color: var(--text-secondary);
}

.my-pagination__jumper input {
  width: 60px;
  height: 32px;
  border: 1px solid var(--border-color-base);
  border-radius: var(--border-radius-base);
  padding: 0 8px;
  outline: none;
}

.my-pagination__jumper input:focus {
  border-color: var(--primary-color);
}
</style>
