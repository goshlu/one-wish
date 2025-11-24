<template>
  <div :class="dividerClass" :style="dividerStyle">
    <div v-if="content && direction === 'horizontal'" class="my-divider__content">
      <slot>{{ content }}</slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { DividerProps } from './types'

defineOptions({
  name: 'MyDivider',
})

const props = withDefaults(defineProps<DividerProps>(), {
  direction: 'horizontal',
  content: '',
  contentPosition: 'center',
  borderStyle: 'solid',
  borderColor: '#d9d9d9',
  borderWidth: '1px',
  margin: '16px',
  textColor: '#999',
  fontSize: '14px',
})

const dividerClass = computed(() => {
  return [
    'my-divider',
    `my-divider--${props.direction}`,
    {
      'my-divider--with-content': props.content && props.direction === 'horizontal',
    },
  ]
})

const dividerStyle = computed(() => {
  const style: Record<string, string> = {
    borderStyle: props.borderStyle,
    borderColor: props.borderColor,
  }

  if (props.direction === 'horizontal') {
    style.borderTop = `${props.borderWidth} ${props.borderStyle} ${props.borderColor}`
    style.margin = `${props.margin} 0`
    
    if (props.content) {
      style.display = 'flex'
      style.alignItems = 'center'
      style.borderTop = 'none'
      
      if (props.contentPosition === 'left') {
        style.justifyContent = 'flex-start'
      } else if (props.contentPosition === 'right') {
        style.justifyContent = 'flex-end'
      } else {
        style.justifyContent = 'center'
      }
    }
  } else {
    style.borderLeft = `${props.borderWidth} ${props.borderStyle} ${props.borderColor}`
    style.margin = `0 ${props.margin}`
    style.height = '1em'
    style.display = 'inline-block'
    style.verticalAlign = 'middle'
  }

  return style
})
</script>

<style scoped>
.my-divider {
  box-sizing: border-box;
}

.my-divider--horizontal {
  border-top: 1px solid #d9d9d9;
  margin: 16px 0;
}

.my-divider--horizontal.my-divider--with-content {
  display: flex;
  align-items: center;
  border-top: none;
  margin: 16px 0;
}

.my-divider--horizontal.my-divider--with-content::before,
.my-divider--horizontal.my-divider--with-content::after {
  content: '';
  flex: 1;
  border-top: 1px solid v-bind('borderColor');
}

.my-divider--horizontal.my-divider--with-content::before {
  margin-right: 12px;
}

.my-divider--horizontal.my-divider--with-content::after {
  margin-left: 12px;
}

.my-divider--vertical {
  border-left: 1px solid #d9d9d9;
  margin: 0 16px;
  height: 1em;
  display: inline-block;
  vertical-align: middle;
}

.my-divider__content {
  color: v-bind('textColor');
  font-size: v-bind('fontSize');
  white-space: nowrap;
  padding: 0 12px;
}
</style>
