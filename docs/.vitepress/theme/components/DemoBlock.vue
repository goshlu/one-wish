<template>
  <div class="demo-block">
    <div class="demo-preview">
      <slot />
    </div>
    
    <div class="demo-actions">
      <button class="demo-action-btn" @click="showCode = !showCode">
        <svg viewBox="0 0 24 24" width="16" height="16">
          <path fill="currentColor" d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
        </svg>
        {{ showCode ? '隐藏代码' : '查看代码' }}
      </button>
    </div>

    <div v-if="showCode" class="demo-code">
      <slot name="code" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const showCode = ref(false)
</script>

<style scoped>
.demo-block {
  margin: 24px 0;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
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
  padding: 16px;
  max-height: 400px;
  overflow: auto;
}

.demo-code :deep(pre) {
  margin: 0;
  background-color: transparent;
}

.demo-code :deep(code) {
  font-family: var(--vp-font-family-mono);
  font-size: 14px;
  line-height: 1.6;
  color: var(--vp-c-text-1);
}
</style>
