# Dropdown 下拉菜单

点击或悬停触发的下拉操作菜单。

## 基础用法

<DemoBlock>
  <template #default>
    <my-dropdown :options="dropdownOptions" @select="onSelect">
      <my-button type="primary">点击触发</my-button>
    </my-dropdown>
  </template>

  <template #code>

  ```vue
  <script setup lang="ts">
  const dropdownOptions = [
    { label: '编辑', value: 'edit' },
    { label: '复制', value: 'copy' },
    { label: '删除', value: 'delete' },
  ]

  const onSelect = (option: any) => {
    console.log(option)
  }
  </script>

  <template>
    <my-dropdown :options="dropdownOptions" @select="onSelect">
      <my-button type="primary">点击触发</my-button>
    </my-dropdown>
  </template>
  ```

  </template>
</DemoBlock>

## 悬停触发

<DemoBlock>
  <template #default>
    <my-dropdown trigger="hover" :options="dropdownOptions">
      <my-button>悬停展开</my-button>
    </my-dropdown>
  </template>

  <template #code>

  ```vue
  <template>
    <my-dropdown trigger="hover" :options="dropdownOptions">
      <my-button>悬停展开</my-button>
    </my-dropdown>
  </template>
  ```

  </template>
</DemoBlock>

## API

### Dropdown Props

| 属性      | 说明           | 类型                                                | 默认值         |
| --------- | -------------- | --------------------------------------------------- | -------------- |
| options   | 选项列表       | `{ label: string; value: string \| number; disabled?: boolean }[]` | `[]`           |
| trigger   | 触发方式       | `'click' \| 'hover'`                                | `'click'`      |
| placement | 菜单位置       | `'bottom-start' \| 'bottom-end'`                    | `'bottom-start'` |

### Dropdown Events

| 事件名          | 说明           | 回调参数                  |
| --------------- | -------------- | ------------------------- |
| select          | 选择时触发     | `option`                  |
| visible-change  | 显隐变化触发   | `visible: boolean`        |

<script setup lang="ts">
const dropdownOptions = [
  { label: '编辑', value: 'edit' },
  { label: '复制', value: 'copy' },
  { label: '删除', value: 'delete' },
]

const onSelect = (option: any) => {
  console.log(option)
}
</script>
