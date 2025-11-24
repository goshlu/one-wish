# Breadcrumb 面包屑

显示当前页面层级，并能快速返回上级。

## 基础用法

通过 `items` 属性配置面包屑每一项的内容，默认分隔符为 `/`。

<DemoBlock>
  <template #default>
    <my-breadcrumb :items="breadcrumbItems" />
  </template>

  <template #code>

  ```vue
  <script setup lang="ts">
  const breadcrumbItems = [
    { label: '首页', href: '/' },
    { label: '列表', href: '/list' },
    { label: '详情' },
  ]
  </script>

  <template>
    <my-breadcrumb :items="breadcrumbItems" />
  </template>
  ```

  </template>
</DemoBlock>

## 自定义分隔符

通过 `separator` 属性自定义分隔符。

<DemoBlock>
  <template #default>
    <my-breadcrumb :items="breadcrumbItems" separator=">" />
  </template>

  <template #code>

  ```vue
  <template>
    <my-breadcrumb :items="breadcrumbItems" separator=">" />
  </template>
  ```

  </template>
</DemoBlock>

## API

### Props

| 属性 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| items | 面包屑数据 | `BreadcrumbItem[]` | — | `[]` |
| separator | 分隔符 | `string` | — | `/` |

### BreadcrumbItem Data Structure

| 属性 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| label | 显示文字 | `string` | — | — |
| href | 跳转链接 | `string` | — | — |

## TypeScript

```typescript
import type {
  BreadcrumbProps,
  BreadcrumbItem,
} from 'vue3-component-library'
```

<script setup lang="ts">
const breadcrumbItems = [
  { label: '首页', href: '/' },
  { label: '列表', href: '/list' },
  { label: '详情' },
]
</script>
