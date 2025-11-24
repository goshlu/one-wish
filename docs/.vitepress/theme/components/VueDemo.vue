<template>
  <div class="vue-demo">
    <div class="demo-preview">
      <slot></slot>
    </div>
    
    <div class="demo-actions">
      <button 
        class="demo-action-btn" 
        @click="showCode = !showCode"
        :title="showCode ? '隐藏代码' : '查看代码'"
      >
        <svg viewBox="0 0 24 24" width="16" height="16">
          <path fill="currentColor" d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
        </svg>
        {{ showCode ? '隐藏代码' : '查看代码' }}
      </button>
      <button 
        class="demo-action-btn" 
        @click="copyCode"
        :title="copied ? '已复制' : '复制代码'"
      >
        <svg v-if="!copied" viewBox="0 0 24 24" width="16" height="16">
          <path fill="currentColor" d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
        </svg>
        <svg v-else viewBox="0 0 24 24" width="16" height="16">
          <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
        </svg>
        {{ copied ? '已复制' : '复制代码' }}
      </button>
    </div>

    <div v-show="showCode" class="demo-code">
      <slot name="code"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const showCode = ref(false)
const copied = ref(false)

const copyCode = async () => {
  try {
    const codeSlot = document.querySelector('.vue-demo .demo-code code')
    if (codeSlot) {
      await navigator.clipboard.writeText(codeSlot.textContent || '')
      copied.value = true
      setTimeout(() => {
        copied.value = false
      }, 2000)
    }
  } catch (error) {
    console.error('复制失败:', error)
  }
}
</script>

<style scoped>
.vue-demo {
  margin: 24px 0;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
  transition: box-shadow 0.2s;
}

.vue-demo:hover {
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

.demo-preview {
  padding: 24px;
  background-color: var(--vp-c-bg-soft);
  min-height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
}

.demo-actions {
  display: flex;
  gap: 8px;
  padding: 8px 16px;
  background-color: var(--vp-c-bg);
  border-top: 1px solid var(--vp-c-divider);
}

.demo-action-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  font-size: 13px;
  color: var(--vp-c-text-2);
  background: transparent;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}

.demo-action-btn:hover {
  color: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
  background-color: var(--vp-c-bg-soft);
}

.demo-action-btn svg {
  flex-shrink: 0;
}

.demo-code {
  border-top: 1px solid var(--vp-c-divider);
  background-color: var(--vp-c-bg-alt);
}

.demo-code :deep(div[class*='language-']) {
  margin: 0;
  border-radius: 0;
}
</style>
