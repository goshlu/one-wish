# TimePicker 时间选择框

选择时间的输入组件。

## 基础用法

<DemoBlock>
  <my-time-picker v-model="basicTime" placeholder="请选择时间" />

  <template #code>

  ```vue
  <script setup lang="ts">
  import { ref } from 'vue'

  const basicTime = ref('')
  </script>

  <template>
    <my-time-picker v-model="basicTime" placeholder="请选择时间" />
  </template>
  ```

  </template>
</DemoBlock>

## 可清空与禁用

可以设置可清空和禁用状态。

<DemoBlock>
  <div class="demo-row">
    <my-time-picker
      v-model="clearableTime"
      clearable
      placeholder="可清空时间选择器"
    />
    <my-time-picker v-model="disabledTime" disabled placeholder="禁用状态" />
  </div>

  <template #code>

  ```vue
  <template>
    <my-time-picker v-model="value" clearable placeholder="可清空时间选择器" />
    <my-time-picker v-model="value2" disabled placeholder="禁用状态" />
  </template>
  ```

  </template>
</DemoBlock>

## 尺寸

提供三种尺寸：大、默认、小。

<DemoBlock>
  <div class="demo-row">
    <my-time-picker v-model="largeTime" size="large" placeholder="大尺寸" />
    <my-time-picker v-model="defaultTime" size="default" placeholder="默认尺寸" />
    <my-time-picker v-model="smallTime" size="small" placeholder="小尺寸" />
  </div>

  <template #code>

  ```vue
  <template>
    <my-time-picker v-model="value" size="large" placeholder="大尺寸" />
    <my-time-picker v-model="value2" size="default" placeholder="默认尺寸" />
    <my-time-picker v-model="value3" size="small" placeholder="小尺寸" />
  </template>
  ```

  </template>
</DemoBlock>

## 时间范围限制

可以限制可选的时间范围。

<DemoBlock>
  <my-time-picker
    v-model="limitedTime"
    :min="'09:00'"
    :max="'18:00'"
    placeholder="工作时间 (09:00-18:00)"
  />

  <template #code>

  ```vue
  <template>
    <my-time-picker 
      v-model="value" 
      :min="'09:00'" 
      :max="'18:00'" 
      placeholder="工作时间 (09:00-18:00)" 
    />
  </template>
  ```

  </template>
</DemoBlock>

## 时间步长

可以设置时间的步长，例如只允许选择整点时间。

<DemoBlock>
  <div class="demo-row">
    <my-time-picker
      v-model="hourlyTime"
      :step="3600"
      placeholder="整点时间"
    />
    <my-time-picker
      v-model="halfHourTime"
      :step="1800"
      placeholder="半小时间隔"
    />
  </div>

  <template #code>

  ```vue
  <template>
    <my-time-picker v-model="value" :step="3600" placeholder="整点时间" />
    <my-time-picker v-model="value2" :step="1800" placeholder="半小时间隔" />
  </template>
  ```

  </template>
</DemoBlock>

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue / v-model | 绑定值 | `string` | `''` |
| placeholder | 占位文本 | `string` | `''` |
| disabled | 是否禁用 | `boolean` | `false` |
| clearable | 是否显示清除按钮 | `boolean` | `false` |
| size | 尺寸 | `'large' \| 'default' \| 'small'` | `'default'` |
| min | 最小可选时间 | `string` | — |
| max | 最大可选时间 | `string` | — |
| step | 时间步长（秒） | `number` | `60` |

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
import type { TimePickerProps, TimePickerEmits } from 'one-wish'
```

<script setup>
import { ref } from 'vue'

const basicTime = ref('')
const clearableTime = ref('14:30')
const disabledTime = ref('09:00')
const largeTime = ref('')
const defaultTime = ref('')
const smallTime = ref('')
const limitedTime = ref('')
const hourlyTime = ref('')
const halfHourTime = ref('')
</script>

<style scoped>
.demo-row {
  display: flex;
  gap: 16px;
  align-items: center;
  flex-wrap: wrap;
}

.demo-row > * {
  flex: 1;
  min-width: 200px;
}
</style>
