# ColorPicker 颜色选择器

用于颜色选择，支持多种格式。

## 基础用法

<DemoBlock>
  <div>
    <my-color-picker v-model="color" />
    <p>当前颜色: {{ color }}</p>
  </div>

  <template #code>

  ```vue
  <template>
    <div>
      <my-color-picker v-model="color" />
      <p>当前颜色: {{ color }}</p>
    </div>
  </template>

  <script setup lang="ts">
  import { ref } from 'vue'

  const color = ref('#409eff')
  </script>
  ```

  </template>
</DemoBlock>

## 预定义颜色

<DemoBlock>
  <div>
    <my-color-picker v-model="color2" :predefine-colors="predefineColors" />
    <p>当前颜色: {{ color2 }}</p>
  </div>

  <template #code>

  ```vue
  <template>
    <div>
      <my-color-picker v-model="color" :predefine-colors="predefineColors" />
      <p>当前颜色: {{ color }}</p>
    </div>
  </template>

  <script setup lang="ts">
  import { ref } from 'vue'

  const color = ref('#409eff')
  const predefineColors = [
    '#ff4500',
    '#ff8c00',
    '#ffd700',
    '#90ee90',
    '#00ced1',
    '#1e90ff',
    '#c71585',
  ]
  </script>
  ```

  </template>
</DemoBlock>

<script setup>
import { ref } from 'vue'

const color = ref('#409eff')
const color2 = ref('#409eff')
const predefineColors = [
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
]
</script>

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue / v-model | 绑定值 | string | '#409eff' |
| disabled | 是否禁用 | boolean | false |
| showAlpha | 是否支持透明度 | boolean | false |
| predefineColors | 预定义颜色 | string[] | [] |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| update:modelValue | 值改变时触发 | (value: string) |
| change | 颜色改变时触发 | (value: string) |

## TypeScript

```typescript
import type {
  ColorPickerProps,
  ColorPickerEmits,
} from 'one-wish'
```
