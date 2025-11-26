# Select 选择器

下拉选择器，支持单选/多选、搜索过滤、清空以及禁用状态。

<script setup lang="ts">
import { ref } from 'vue'

const singleValue = ref('apple')
const multipleValue = ref<string[]>(['hangzhou'])
const clearableValue = ref('banana')
const searchValue = ref('')
const disabledValue = ref(null)

const fruitOptions = [
  { label: '苹果', value: 'apple' },
  { label: '香蕉', value: 'banana' },
  { label: '橙子', value: 'orange' },
  { label: '葡萄', value: 'grape' },
]

const cityOptions = [
  { label: '北京', value: 'beijing' },
  { label: '上海', value: 'shanghai' },
  { label: '杭州', value: 'hangzhou' },
  { label: '深圳', value: 'shenzhen' },
]
</script>

## 基础用法

通过 `options` 指定数据源，`v-model` 同步当前值。

<DemoBlock>
  <my-select v-model="singleValue" :options="fruitOptions" placeholder="请选择水果" />
  <span style="margin-left: 12px;">当前：{{ singleValue }}</span>

  <template #code>

  ```vue
  <template>
    <my-select v-model="value" :options="options" placeholder="请选择" />
  </template>

  <script setup lang="ts">
  import { ref } from 'vue'
  const value = ref('apple')
  const options = [
    { label: '苹果', value: 'apple' },
    { label: '香蕉', value: 'banana' },
  ]
  </script>
  ```

  </template>
</DemoBlock>

## 多选

设置 `multiple` 后即可选择多个值，已选项会显示为标签。

<DemoBlock>
  <my-select
    v-model="multipleValue"
    :options="cityOptions"
    placeholder="选择城市"
    multiple
  />
  <p>当前：{{ multipleValue.join(', ') }}</p>
</DemoBlock>

## 可清空 & 搜索

`clearable` 会展示清空按钮；`filterable` 允许输入关键字过滤。

<DemoBlock>
  <my-select
    v-model="clearableValue"
    :options="fruitOptions"
    clearable
    filterable
    placeholder="可搜索水果"
  />
</DemoBlock>

## 禁用

可以单独禁用选择器，也可以在选项上设置 `disabled`。

<DemoBlock>
  <my-select
    v-model="searchValue"
    :options="[
      { label: '杭州', value: 'hangzhou' },
      { label: '南京', value: 'nanjing', disabled: true },
      { label: '广州', value: 'guangzhou' },
    ]"
    placeholder="含禁用选项"
  />
  <my-select
    v-model="disabledValue"
    :options="fruitOptions"
    disabled
    style="margin-left: 16px;"
  />
</DemoBlock>

## API

### Select Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue / v-model | 当前选中的值，`multiple` 时为数组 | `string \| number \| (string \| number)[] \| null` | `null` |
| options | 数据源 | `SelectOption[]` | `[]` |
| placeholder | 占位文案 | `string` | `'请选择'` |
| disabled | 禁止交互 | `boolean` | `false` |
| clearable | 是否可以清空 | `boolean` | `false` |
| filterable | 是否可搜索 | `boolean` | `false` |
| multiple | 是否多选 | `boolean` | `false` |
| size | 尺寸 | `'large' \| 'default' \| 'small'` | `'default'` |

### SelectOption

```ts
interface SelectOption {
  label?: string
  value: string | number
  disabled?: boolean
}
```

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| update:modelValue | 选中值变化 | `(value: SelectProps['modelValue'])` |
| change | 同上 | `(value: SelectProps['modelValue'])` |
| clear | 清空时触发 | `()` |
| visibleChange | 下拉显隐变化 | `(visible: boolean)` |
