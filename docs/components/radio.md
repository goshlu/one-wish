# Radio 单选

在一组选项中进行单项选择，支持按钮样式、尺寸切换和禁用状态。

<script setup lang="ts">
import { ref } from 'vue'

const fruitValue = ref('apple')
const sizeValue = ref<'large' | 'default' | 'small'>('default')
const buttonValue = ref('杭州')
const disabledValue = ref('apple')
const fruits = [
  { label: '苹果', value: 'apple' },
  { label: '香蕉', value: 'banana' },
  { label: '橙子', value: 'orange' },
]
const cities = ['北京', '上海', '杭州', '深圳']
</script>

## 基础用法

通过 `my-radio-group` 统一管理状态，`value` 指定选项值。

<DemoBlock>
  <my-radio-group v-model="fruitValue">
    <my-radio v-for="item in fruits" :key="item.value" :value="item.value">
      {{ item.label }}
    </my-radio>
  </my-radio-group>

  <template #code>

  ```vue
  <template>
    <my-radio-group v-model="value">
      <my-radio value="apple">苹果</my-radio>
      <my-radio value="banana">香蕉</my-radio>
      <my-radio value="orange">橙子</my-radio>
    </my-radio-group>
  </template>

  <script setup lang="ts">
  import { ref } from 'vue'
  const value = ref('apple')
  </script>
  ```

  </template>
</DemoBlock>

## 按钮样式

设置 `option-type="button"` 可获得按钮形态，`button-style="solid"` 会使用实心高亮。

<DemoBlock>
  <my-radio-group v-model="buttonValue" option-type="button" button-style="solid">
    <my-radio v-for="city in cities" :key="city" :value="city">
      {{ city }}
    </my-radio>
  </my-radio-group>
</DemoBlock>

## 尺寸

通过 `size` 控制整体大小，支持 large / default / small。

<DemoBlock>
  <my-radio-group v-model="sizeValue" option-type="button">
    <my-radio value="large">Large</my-radio>
    <my-radio value="default">Default</my-radio>
    <my-radio value="small">Small</my-radio>
  </my-radio-group>

  <div style="margin-top: 16px;">
    <my-radio-group v-model="fruitValue" :size="sizeValue">
      <my-radio v-for="item in fruits" :key="item.value" :value="item.value">
        {{ item.label }}
      </my-radio>
    </my-radio-group>
  </div>
</DemoBlock>

## 禁用

可以直接禁用单个 `my-radio`，也可以在 `my-radio-group` 上统一设置。

<DemoBlock>
  <my-radio-group v-model="disabledValue" disabled>
    <my-radio value="apple">苹果</my-radio>
    <my-radio value="banana">香蕉</my-radio>
    <my-radio value="orange">橙子</my-radio>
  </my-radio-group>
</DemoBlock>

## API

### Radio Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 选项值（结合 `my-radio-group` 使用） | `string \| number \| boolean` | — |
| label | 展示文本（也可通过默认插槽提供） | `string \| number` | — |
| modelValue | 单独使用时是否选中 | `boolean` | `false` |
| disabled | 是否禁用 | `boolean` | `false` |
| size | 尺寸，只在未处于 `my-radio-group` 时生效 | `'large' \| 'default' \| 'small'` | `'default'` |
| optionType | 形态，`'button'` 会启用按钮样式 | `'default' \| 'button'` | `'default'` |
| buttonStyle | 按钮样式，仅在 `optionType="button"` 时生效 | `'outline' \| 'solid'` | `'outline'` |

### Radio Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| update:modelValue | 单独使用时选中状态变化 | `(value: boolean)` |
| change | 同 `update:modelValue` | `(value: boolean)` |

### RadioGroup Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue / v-model | 当前选中的值 | `string \| number \| boolean` | — |
| disabled | 是否禁用整个组合 | `boolean` | `false` |
| size | 尺寸，会影响内部全部 `my-radio` | `'large' \| 'default' \| 'small'` | `'default'` |
| optionType | 组合内的显示样式 | `'default' \| 'button'` | `'default'` |
| buttonStyle | 按钮样式 | `'outline' \| 'solid'` | `'outline'` |

### RadioGroup Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| update:modelValue | 值变化时触发 | `(value: string \| number \| boolean)` |
| change | 同 `update:modelValue` | `(value: string \| number \| boolean)` |
