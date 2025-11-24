<template>
  <div class="demo-wrapper">
    <div class="demo-content">
      <slot></slot>
    </div>
    <details class="demo-code" v-if="$slots.code">
      <summary>查看代码</summary>
      <div class="code-content">
        <slot name="code"></slot>
      </div>
    </details>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'Demo',
})
</script>

<style scoped>
.demo-wrapper {
  margin: 20px 0;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
}

.demo-content {
  padding: 24px;
  background-color: var(--vp-c-bg-soft);
}

.demo-code {
  border-top: 1px solid var(--vp-c-divider);
}

.demo-code summary {
  padding: 12px 24px;
  cursor: pointer;
  user-select: none;
  background-color: var(--vp-c-bg);
  font-size: 14px;
  color: var(--vp-c-text-2);
  transition: all 0.2s;
}

.demo-code summary:hover {
  background-color: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
}

.demo-code[open] summary {
  border-bottom: 1px solid var(--vp-c-divider);
}

.code-content {
  padding: 0;
}

.code-content :deep(div[class*='language-']) {
  margin: 0;
  border-radius: 0;
}
</style>
