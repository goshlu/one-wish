# Menu 导航菜单

纵向层级导航，支持子菜单展开。

## 基础用法

<DemoBlock>
  <template #default>
    <div style="width: 240px;">
      <my-menu v-model="menuValue" :items="menuItems" />
    </div>
  </template>

  <template #code>

  ```vue
  <script setup lang="ts">
  const menuItems = [
    { key: 'anchor', label: 'Anchor 锚点' },
    { key: 'breadcrumb', label: 'Breadcrumb 面包屑' },
    {
      key: 'menu',
      label: 'Menu 导航菜单',
      children: [
        { key: 'menu-1', label: '子菜单 1' },
        { key: 'menu-2', label: '子菜单 2' },
      ],
    },
  ]

  const menuValue = ref('anchor')
  </script>

  <template>
    <my-menu v-model="menuValue" :items="menuItems" />
  </template>
  ```

  </template>
</DemoBlock>

## 默认展开

<DemoBlock>
  <template #default>
    <div style="width: 240px;">
      <my-menu v-model="menuValue" :items="menuItems" :default-open-keys="['menu']" />
    </div>
  </template>

  <template #code>

  ```vue
  <template>
    <my-menu v-model="menuValue" :items="menuItems" :default-open-keys="['menu']" />
  </template>
  ```

  </template>
</DemoBlock>

## API

### Menu Props

| 属性             | 说明           | 类型                               | 默认值 |
| ---------------- | -------------- | ---------------------------------- | ------ |
| items            | 菜单数据       | `{ key: string; label: string; disabled?: boolean; children?: MenuItem[] }[]` | `[]`   |
| defaultOpenKeys  | 默认展开的 key | `string[]`                         | `[]`   |
| modelValue       | 选中项 key     | `string`                           | `items[0]?.key` |

### Menu Events

| 事件名         | 说明           | 回调参数       |
| -------------- | -------------- | -------------- |
| select         | 选中时触发     | `key: string`  |
| open-change    | 展开变化时触发 | `keys: string[]` |

<script setup lang="ts">
import { ref } from 'vue'

const menuItems = [
  { key: 'anchor', label: 'Anchor 锚点' },
  { key: 'breadcrumb', label: 'Breadcrumb 面包屑' },
  {
    key: 'menu',
    label: 'Menu 导航菜单',
    children: [
      { key: 'menu-1', label: '子菜单 1' },
      { key: 'menu-2', label: '子菜单 2' },
    ],
  },
]

const menuValue = ref('anchor')
</script>
