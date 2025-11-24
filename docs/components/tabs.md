# Tabs 标签页

用于在同一空间内切换不同的内容视图。

## 基础用法

<DemoBlock>
  <template #default>
    <my-tabs v-model="activeTab" :tabs="tabItems">
      <template #default="{ active }">
        <div style="padding: 12px; border: 1px dashed #d9d9d9; border-radius: 6px;">
          当前内容：{{ active }}
        </div>
      </template>
    </my-tabs>
  </template>

  <template #code>

  ```vue
  <script setup lang="ts">
  const tabItems = [
    { key: 'tab-1', label: '标签一' },
    { key: 'tab-2', label: '标签二' },
    { key: 'tab-3', label: '标签三' },
  ]

  const activeTab = ref('tab-1')
  </script>

  <template>
    <my-tabs v-model="activeTab" :tabs="tabItems">
      <template #default="{ active }">
        <div>当前内容：{{ active }}</div>
      </template>
    </my-tabs>
  </template>
  ```

  </template>
</DemoBlock>

## 禁用项

<DemoBlock>
  <template #default>
    <my-tabs :tabs="[{ key: 'a', label: '可用' }, { key: 'b', label: '禁用', disabled: true }]" />
  </template>

  <template #code>

  ```vue
  <template>
    <my-tabs :tabs="[{ key: 'a', label: '可用' }, { key: 'b', label: '禁用', disabled: true }]" />
  </template>
  ```

  </template>
</DemoBlock>

## API

### Tabs Props

| 属性       | 说明       | 类型                                  | 默认值 |
| ---------- | ---------- | ------------------------------------- | ------ |
| tabs       | 标签数据   | `{ key: string; label: string; disabled?: boolean }[]` | `[]`   |
| modelValue | 选中项 key | `string`                              | `tabs[0]?.key` |

### Tabs Events

| 事件名            | 说明       | 回调参数     |
| ----------------- | ---------- | ------------ |
| change            | 选项变化   | `key: string` |
| update:modelValue | 双向绑定   | `key: string` |

<script setup lang="ts">
import { ref } from 'vue'

const tabItems = [
  { key: 'tab-1', label: '标签一' },
  { key: 'tab-2', label: '标签二' },
  { key: 'tab-3', label: '标签三' },
]

const activeTab = ref('tab-1')
</script>
