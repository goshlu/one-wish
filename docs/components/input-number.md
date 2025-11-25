# InputNumber 数字输入框

通过鼠标或键盘输入数字，支持步长、上下限、精度控制、实时运算等场景。

<script setup lang="ts">
import { computed, ref } from 'vue'

const basicValue = ref(10)
const stepValue = ref(40)
const precisionValue = ref(3.14)
const disabledValue = ref(5)
const noControlValue = ref(8)
const largeValue = ref(88)
const defaultSizeValue = ref(32)
const smallValue = ref(2)
const quantity = ref(2)
const unitPrice = ref(1999)
const amount = computed(() => Number((quantity.value * unitPrice.value).toFixed(2)))
const ageValue = ref<number | null>(18)
const ageError = computed(() => {
  if (ageValue.value === null) return '请输入年龄'
  if (ageValue.value < 18) return '未满 18 周岁'
  if (ageValue.value > 60) return '超过可报名年龄'
  return ''
})
</script>

## 基础用法

最简单的使用方式，借助 `v-model` 双向绑定即可获得响应式数字输入。

<DemoBlock>
  <my-input-number v-model="basicValue" placeholder="请输入数量" />

  <template #code>

  ```vue
  <script setup lang="ts">
  import { ref } from 'vue'

  const value = ref(10)
  </script>

  <template>
    <my-input-number v-model="value" placeholder="请输入数量" />
  </template>
  ```

  </template>
</DemoBlock>

## 不同尺寸

通过 `size` 属性适配表单或表格的空间要求。

<DemoBlock>
  <div class="demo-column">
    <my-input-number v-model="largeValue" size="large" placeholder="大尺寸" />
    <my-input-number v-model="defaultSizeValue" placeholder="默认尺寸" />
    <my-input-number v-model="smallValue" size="small" placeholder="小尺寸" />
  </div>

  <template #code>

  ```vue
  <template>
    <my-input-number v-model="large" size="large" />
    <my-input-number v-model="middle" />
    <my-input-number v-model="small" size="small" />
  </template>
  ```

  </template>
</DemoBlock>

## 步长与范围

结合 `step`、`min`、`max` 可限制输入范围或构建计数器。

<DemoBlock>
  <my-input-number v-model="stepValue" :step="5" :min="0" :max="100" />

  <template #code>

  ```vue
  <template>
    <my-input-number v-model="value" :step="5" :min="0" :max="100" />
  </template>
  ```

  </template>
</DemoBlock>

## 精度控制

`precision` 用于限制小数位数，通常与较小的 `step` 一同使用。

<DemoBlock>
  <my-input-number v-model="precisionValue" :precision="2" :step="0.1" />

  <template #code>

  ```vue
  <template>
    <my-input-number v-model="value" :precision="2" :step="0.1" />
  </template>
  ```

  </template>
</DemoBlock>

## 状态控制

可以禁用输入或隐藏左右控制按钮，只保留纯输入体验。

<DemoBlock>
  <div class="demo-column">
    <my-input-number v-model="disabledValue" disabled placeholder="禁用" />
    <my-input-number v-model="noControlValue" :controls="false" placeholder="隐藏控制按钮" />
  </div>
</DemoBlock>

## 实时计算示例

结合 `computed` 计算属性可实现动态合计、报价等需求。

<DemoBlock>
  <div class="demo-column">
    <div class="demo-row">
      <span>数量：</span>
      <my-input-number v-model="quantity" :min="1" />
    </div>
    <div class="demo-row">
      <span>单价：</span>
      <my-input-number v-model="unitPrice" :min="1" :step="100" />
    </div>
    <div class="demo-row">合计：¥{{ amount.toLocaleString() }}</div>
  </div>

  <template #code>

  ```vue
  <script setup lang="ts">
  import { computed, ref } from 'vue'

  const quantity = ref(1)
  const unitPrice = ref(1999)
  const amount = computed(() => Number((quantity.value * unitPrice.value).toFixed(2)))
  </script>
  ```

  </template>
</DemoBlock>

## 与表单校验配合

InputNumber 自身会按照 `min/max` 做限制，也可以配合表单逻辑给出更友好的文案反馈。

<DemoBlock>
  <div class="demo-column">
    <my-input-number v-model="ageValue" :min="0" :max="120" placeholder="填写年龄" />
    <p v-if="ageError" style="color: var(--danger-color); margin: 0">{{ ageError }}</p>
  </div>

  <template #code>

  ```vue
  <script setup lang="ts">
  import { computed, ref } from 'vue'

  const age = ref<number | null>(18)
  const ageError = computed(() => {
    if (age.value === null) return '请输入年龄'
    if (age.value < 18) return '未满 18 周岁'
    if (age.value > 60) return '超过可报名年龄'
    return ''
  })
  ```

  </template>
</DemoBlock>

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue / v-model | 绑定值（支持 `number` 与 `null` 表示空输入） | `number \| null` | `null` |
| min | 最小值，超出时会被自动夹取 | `number` | — |
| max | 最大值，超出时会被自动夹取 | `number` | — |
| step | 每次点击按钮或滚轮调节的增量 | `number` | `1` |
| precision | 保留的小数位数（会对输入值四舍五入） | `number` | — |
| disabled | 是否禁用 | `boolean` | `false` |
| controls | 是否显示增减按钮 | `boolean` | `true` |
| size | 输入框尺寸 | `'large' \| 'default' \| 'small'` | `'default'` |
| placeholder | 占位文本 | `string` | `''` |

> `precision` 与 `step` 建议搭配使用，例如 `precision=2`、`step=0.1`，以避免浮点误差导致的视觉抖动。

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| update:modelValue | 输入过程中触发，常用于同步表单数据 | `(value: number \| null)` |
| change | 输入完成（`blur` 或按回车）后触发，适合提交请求 | `(value: number \| null)` |
| focus | 获得焦点时触发 | `(event: FocusEvent)` |
| blur | 失去焦点时触发 | `(event: FocusEvent)` |

### TypeScript

```ts
import type { InputNumberProps, InputNumberEmits } from 'one-wish'
```
