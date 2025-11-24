<template>
  <div class="my-steps">
    <div
      v-for="(step, index) in steps"
      :key="step.title"
      :class="['my-step', statusClass(index, step.status)]"
    >
      <div class="my-step__icon">{{ index + 1 }}</div>
      <div class="my-step__content">
        <div class="my-step__title">{{ step.title }}</div>
        <div v-if="step.description" class="my-step__desc">{{ step.description }}</div>
      </div>
      <div v-if="index < steps.length - 1" class="my-step__line"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { StepsProps } from './types'

defineOptions({
  name: 'MySteps',
})

const props = withDefaults(defineProps<StepsProps>(), {
  steps: () => [],
  current: 0,
})

const statusClass = (index: number, custom?: StepsProps['steps'][number]['status']) => {
  const status = custom || (index < props.current! ? 'finish' : index === props.current ? 'process' : 'wait')
  return `is-${status}`
}
</script>

<style scoped>
.my-steps {
  display: flex;
  gap: 12px;
}

.my-step {
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  padding-right: 24px;
}

.my-step__icon {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: var(--bg-color);
  border: 1px solid var(--border-color-base);
  color: var(--text-regular);
  transition: var(--transition-base);
  flex-shrink: 0;
}

.my-step__content {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.my-step__title {
  font-weight: 600;
  color: var(--text-regular);
}

.my-step__desc {
  color: var(--text-secondary);
  font-size: 13px;
}

.my-step__line {
  position: absolute;
  height: 2px;
  width: 40px;
  background-color: var(--border-color-light);
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

.my-step.is-finish .my-step__icon {
  background-color: var(--success-color);
  border-color: var(--success-color);
  color: #fff;
}

.my-step.is-process .my-step__icon {
  border-color: var(--primary-color);
  color: var(--primary-color);
}

.my-step.is-error .my-step__icon {
  border-color: var(--danger-color);
  color: var(--danger-color);
}
</style>
