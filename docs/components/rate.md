# Rate 评分

用于对事物进行快速打分，支持半星、只读展示以及提示文案。

<script setup lang="ts">
import { ref } from 'vue'

const basicValue = ref(3)
const halfValue = ref(2.5)
const clearableValue = ref(4)
const disabledValue = ref(3)
const tooltips = ['糟糕', '一般', '不错', '推荐', '力荐']
</script>

## 基础用法

最简单的评分交互，支持 `v-model` 同步分值。

<DemoBlock>
  <my-rate v-model="basicValue" />
  <span style="margin-left: 12px;">{{ basicValue }}</span>

  <template #code>

  ```vue
  <template>
    <my-rate v-model="value" />
  </template>

  <script setup lang="ts">
  import { ref } from 'vue'
  const value = ref(3)
  </script>
  ```

  </template>
</DemoBlock>

## 半星

开启 `allow-half` 可以精确到 0.5，适合更细致的评价。

<DemoBlock>
  <my-rate v-model="halfValue" allow-half />
  <span style="margin-left: 12px;">{{ halfValue }}</span>
</DemoBlock>

## 提示与可清空

设置 `tooltips` 在悬停时展示文案；开启 `allow-clear` 可在点击当前分值时清空。

<DemoBlock>
  <my-rate
    v-model="clearableValue"
    :tooltips="tooltips"
    allow-half
    allow-clear
  />
</DemoBlock>

## 禁用与只读

`disabled` 会阻止交互并变成灰色；`readonly` 只用于展示当前评分。

<DemoBlock>
  <my-rate v-model="disabledValue" disabled />
  <my-rate v-model="disabledValue" readonly style="margin-left: 24px;" />
</DemoBlock>

## API

### Rate Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue / v-model | 当前分值 | `number` | `0` |
| count | 星星总数 | `number` | `5` |
| allowHalf | 是否允许选择半星 | `boolean` | `false` |
| allowClear | 再次点击当前值时是否清空 | `boolean` | `true` |
| disabled | 禁用交互 | `boolean` | `false` |
| readonly | 只读显示，不允许更改 | `boolean` | `false` |
| tooltips | 每颗星的提示文案 | `string[]` | `[]` |

### Rate Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| update:modelValue | 分值变更时触发 | `(value: number)` |
| change | 同上 | `(value: number)` |
| hoverChange | 鼠标悬停值变化时触发 | `(value: number)` |
