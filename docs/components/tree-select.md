# TreeSelect 树选择

树形选择控件，可通过树形结构展示选项，支持多选、搜索、清空等功能。

<script setup lang="ts">
import { ref } from 'vue'

const singleValue = ref('node1')
const multipleValue = ref<string[]>(['node1-1'])
const checkableValue = ref<string[]>(['node1', 'node1-1'])
const searchableValue = ref('')
const disabledValue = ref(null)

const treeData = [
  {
    label: '节点1',
    value: 'node1',
    children: [
      {
        label: '子节点1-1',
        value: 'node1-1',
      },
      {
        label: '子节点1-2',
        value: 'node1-2',
        children: [
          {
            label: '子节点1-2-1',
            value: 'node1-2-1',
          },
          {
            label: '子节点1-2-2',
            value: 'node1-2-2',
          },
        ],
      },
    ],
  },
  {
    label: '节点2',
    value: 'node2',
    children: [
      {
        label: '子节点2-1',
        value: 'node2-1',
      },
      {
        label: '子节点2-2',
        value: 'node2-2',
      },
    ],
  },
  {
    label: '节点3',
    value: 'node3',
  },
]
</script>

## 基础用法

最简单的用法，通过 `options` 指定数据源，`v-model` 同步当前值。

<DemoBlock>
  <my-tree-select v-model="singleValue" :options="treeData" placeholder="请选择" />
  <span style="margin-left: 12px;">当前：{{ singleValue }}</span>

  <template #code>

  ```vue
  <template>
    <my-tree-select v-model="value" :options="treeData" placeholder="请选择" />
  </template>

  <script setup lang="ts">
  import { ref } from 'vue'
  const value = ref('node1')
  const treeData = [
    {
      label: '节点1',
      value: 'node1',
      children: [
        {
          label: '子节点1-1',
          value: 'node1-1',
        },
      ],
    },
  ]
  </script>
  ```

  </template>
</DemoBlock>

## 多选

设置 `multiple` 后即可选择多个值，已选项会显示为标签。

<DemoBlock>
  <my-tree-select
    v-model="multipleValue"
    :options="treeData"
    placeholder="选择多个节点"
    multiple
  />
  <p>当前：{{ multipleValue.join(', ') }}</p>
</DemoBlock>

## 可勾选

设置 `checkable` 后显示复选框，支持勾选操作。

<DemoBlock>
  <my-tree-select
    v-model="checkableValue"
    :options="treeData"
    placeholder="可勾选节点"
    multiple
    checkable
  />
  <p>当前：{{ checkableValue.join(', ') }}</p>
</DemoBlock>

## 可搜索 & 可清空

`filterable` 允许输入关键字过滤；`clearable` 会展示清空按钮。

<DemoBlock>
  <my-tree-select
    v-model="searchableValue"
    :options="treeData"
    placeholder="可搜索节点"
    filterable
    clearable
  />
</DemoBlock>

## 禁用

可以单独禁用选择器，也可以在选项上设置 `disabled`。

<DemoBlock>
  <my-tree-select
    v-model="searchableValue"
    :options="[
      {
        label: '节点1',
        value: 'node1',
        children: [
          { label: '子节点1-1', value: 'node1-1' },
          { label: '子节点1-2', value: 'node1-2', disabled: true },
        ],
      },
    ]"
    placeholder="含禁用选项"
  />
  <my-tree-select
    v-model="disabledValue"
    :options="treeData"
    disabled
    style="margin-left: 16px;"
  />
</DemoBlock>

## 默认展开

设置 `tree-default-expand-all` 默认展开所有节点，或通过 `tree-default-expanded-keys` 指定默认展开的节点。

<DemoBlock>
  <my-tree-select
    v-model="singleValue"
    :options="treeData"
    placeholder="默认展开所有节点"
    tree-default-expand-all
  />
</DemoBlock>

## 尺寸

提供 `large`、`default`、`small` 三种尺寸。

<DemoBlock>
  <my-tree-select
    v-model="singleValue"
    :options="treeData"
    placeholder="大尺寸"
    size="large"
    style="margin-bottom: 8px;"
  />
  <br />
  <my-tree-select
    v-model="singleValue"
    :options="treeData"
    placeholder="默认尺寸"
    style="margin-bottom: 8px;"
  />
  <br />
  <my-tree-select
    v-model="singleValue"
    :options="treeData"
    placeholder="小尺寸"
    size="small"
  />
</DemoBlock>

## API

### TreeSelect Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue / v-model | 当前选中的值，`multiple` 时为数组 | `string \| number \| (string \| number)[] \| null` | `null` |
| options | 数据源 | `TreeSelectOption[]` | `[]` |
| placeholder | 占位文案 | `string` | `'请选择'` |
| disabled | 禁止交互 | `boolean` | `false` |
| clearable | 是否可以清空 | `boolean` | `false` |
| filterable | 是否可搜索 | `boolean` | `false` |
| multiple | 是否多选 | `boolean` | `false` |
| checkable | 是否显示复选框 | `boolean` | `false` |
| showCheckedStrategy | 选中项回显策略 | `'SHOW_CHILD' \| 'SHOW_PARENT' \| 'ALL'` | `'SHOW_CHILD'` |
| size | 尺寸 | `'large' \| 'default' \| 'small'` | `'default'` |
| treeDefaultExpandAll | 是否默认展开所有节点 | `boolean` | `false` |
| treeDefaultExpandedKeys | 默认展开的节点键值数组 | `Array<string \| number>` | `[]` |
| treeLine | 是否显示树形连接线 | `boolean` | `false` |
| virtual | 是否启用虚拟滚动 | `boolean` | `false` |
| listHeight | 下拉列表高度 | `number` | `256` |

### TreeSelectOption

```ts
interface TreeSelectOption {
  label: string
  value: string | number
  children?: TreeSelectOption[]
  disabled?: boolean
  disableCheckbox?: boolean
  checkable?: boolean
  selectable?: boolean
  isLeaf?: boolean
}
```

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| update:modelValue | 选中值变化 | `(value: TreeSelectProps['modelValue'])` |
| change | 选中值变化 | `(value: TreeSelectProps['modelValue'], label: string \| string[])` |
| clear | 清空时触发 | `()` |
| visibleChange | 下拉显隐变化 | `(visible: boolean)` |
| search | 搜索时触发 | `(value: string)` |
| select | 节点选择时触发 | `(value: string \| number, selected: boolean, node: TreeSelectOption)` |
| check | 节点勾选时触发 | `(value: string \| number, checked: boolean, node: TreeSelectOption)` |
