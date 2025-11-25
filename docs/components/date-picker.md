# DatePicker 日期选择框

选择日期或日期时间的输入组件。

## 基础用法

<DemoBlock>
  <my-date-picker v-model="basicDate" placeholder="请选择日期" />

  <template #code>

  ```vue
  <script setup lang="ts">
  import { ref } from 'vue'

  const basicDate = ref('')
  </script>

  <template>
    <my-date-picker v-model="basicDate" placeholder="请选择日期" />
  </template>
  ```

  </template>
</DemoBlock>

## 日期时间

通过设置 `type="datetime-local"` 选择日期与时间。

<DemoBlock>
  <my-date-picker
    v-model="datetimeValue"
    type="datetime-local"
    placeholder="请选择日期时间"
  />

  <template #code>

  ```vue
  <template>
    <my-date-picker v-model="value" type="datetime-local" />
  </template>
  ```

  </template>
</DemoBlock>

## 可清空与禁用范围

可以限制可选范围并允许一键清空。

<DemoBlock>
  <div class="demo-row">
    <my-date-picker
      v-model="limitedDate"
      clearable
      :min="'2025-01-01'"
      :max="'2025-12-31'"
    />
    <my-date-picker v-model="disabledDate" disabled />
  </div>

  <template #code>

  ```vue
  <template>
    <my-date-picker v-model="value" clearable :min="'2025-01-01'" :max="'2025-12-31'" />
    <my-date-picker v-model="value2" disabled />
  </template>
  ```

  </template>
</DemoBlock>

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue / v-model | 绑定值 | `string` | `''` |
| type | 输入框类型 | `'date' \| 'datetime-local'` | `'date'` |
| placeholder | 占位文本 | `string` | `''` |
| disabled | 是否禁用 | `boolean` | `false` |
| clearable | 是否显示清除按钮 | `boolean` | `false` |
| size | 尺寸 | `'large' \| 'default' \| 'small'` | `'default'` |
| min | 最小可选日期 | `string` | — |
| max | 最大可选日期 | `string` | — |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| update:modelValue | 值变更时触发 | `(value: string)` |
| change | 选择完成时触发 | `(value: string)` |
| focus | 获得焦点时触发 | `(event: FocusEvent)` |
| blur | 失去焦点时触发 | `(event: FocusEvent)` |
| clear | 点击清除按钮时触发 | — |

### TypeScript

```ts
import type { DatePickerProps, DatePickerEmits } from 'one-wish'
```

<script setup>
import { ref } from 'vue'

const basicDate = ref('')
const datetimeValue = ref('')
const limitedDate = ref('2025-05-20')
const disabledDate = ref('2025-06-18')
</script>
