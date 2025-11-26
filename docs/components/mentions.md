# Mentions 提及

带下拉建议的多行输入框，支持通过特殊前缀触发人员或话题提及。

<script setup lang="ts">
import { ref } from 'vue'
import type { MentionOption } from 'one-wish'

const userOptions: MentionOption[] = [
  { value: 'afc163' },
  { value: 'zombieJ' },
  { value: 'yesmeck' },
  { value: 'sunflower' },
]

const topicOptions: MentionOption[] = [
  { value: '需求讨论' },
  { value: '线上问题' },
  { value: '设计规范' },
  { value: '发布计划' },
]

const basicValue = ref('')
const multiPrefixValue = ref('')
const topPlacementValue = ref('')
const filterValue = ref('')

const strictFilterOption = (search: string, option: MentionOption) => {
  if (!search) return true
  return option.value.toLowerCase().startsWith(search.toLowerCase())
}
</script>

## 基础用法

当输入 `@` 后显示匹配的选项，选择后会自动插入并在末尾补充空格。

<DemoBlock>
  <my-mentions
    v-model="basicValue"
    :options="userOptions"
    placeholder="输入 @ 提及同事"
  />

  <template #code>

  ```vue
  <script setup lang="ts">
  import { ref } from 'vue'

  const value = ref('')
  const options = [
    { value: 'afc163' },
    { value: 'zombieJ' },
  ]
  </script>

  <template>
    <my-mentions v-model="value" :options="options" placeholder="输入 @ 提及" />
  </template>
  ```

  </template>
</DemoBlock>

## 多前缀

通过 `prefix` 配置多个触发字符，例如 `@` 提及成员，`#` 插入话题。

<DemoBlock>
  <my-mentions
    v-model="multiPrefixValue"
    :options="[...userOptions, ...topicOptions]"
    :prefix="['@', '#']"
    placeholder="输入 @ 或 # 触发不同类型"
  />
</DemoBlock>

## 放置位置与禁用

`placement="top"` 可以让下拉在输入框上方显示，设置 `disabled` 则完全关闭输入与触发。

<DemoBlock>
  <my-mentions
    v-model="topPlacementValue"
    :options="topicOptions"
    placement="top"
    :rows="4"
    placeholder="在顶部展示建议"
  />
  <my-mentions
    model-value="@one-wish "
    :options="userOptions"
    disabled
    placeholder="禁用状态"
  />
</DemoBlock>

## 自定义过滤

传入 `filterOption` 可控制匹配逻辑，下面示例只展示以关键字开头的选项。

<DemoBlock>
  <my-mentions
    v-model="filterValue"
    :options="userOptions"
    :filter-option="strictFilterOption"
    placeholder="输入 @ + 前缀"
  />
</DemoBlock>

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue / v-model | 绑定值 | `string` | `''` |
| options | 建议数据源 | `MentionOption[]` | `[]` |
| placeholder | 占位提示 | `string` | `'请输入内容'` |
| disabled | 是否禁用 | `boolean` | `false` |
| rows | 文本域行数 | `number` | `3` |
| size | 文本域尺寸 | `'large' \| 'default' \| 'small'` | `'default'` |
| prefix | 触发前缀，可以是一个或多个 | `string \| string[]` | `'@'` |
| placement | 下拉出现位置 | `'top' \| 'bottom'` | `'bottom'` |
| filterOption | 自定义过滤函数 | `(search: string, option: MentionOption) => boolean` | 模糊匹配 |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| update:modelValue | 文本变更时触发 | `(value: string)` |
| input | 同步输入时触发 | `(value: string)` |
| select | 选择建议项 | `(option: MentionOption)` |
| search | 输入触发查询 | `(search: string, prefix: string)` |
| focus | 获得焦点 | `(event: FocusEvent)` |
| blur | 失去焦点 | `(event: FocusEvent)` |

### MentionOption

```ts
interface MentionOption {
  value: string
  label?: string
  disabled?: boolean
}
```
