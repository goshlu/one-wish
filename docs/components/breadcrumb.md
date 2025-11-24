# Breadcrumb 面包屑

显示当前页面在系统层级结构中的位置，并能快速返回上级页面。

## 基础用法

通过 `items` 属性配置面包屑每一项的内容，默认分隔符为 `/`。

<DemoBlock>
  <div>
    <my-breadcrumb :items="breadcrumbItems" />
  </div>

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

通过 `separator` 属性可以自定义分隔符，支持文本或符号。

<DemoBlock>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <div>
      <p style="margin-bottom: 8px; color: #666;">使用箭头分隔符：</p>
      <my-breadcrumb :items="breadcrumbItems" separator=">" />
    </div>
    <div>
      <p style="margin-bottom: 8px; color: #666;">使用点分隔符：</p>
      <my-breadcrumb :items="breadcrumbItems" separator="·" />
    </div>
    <div>
      <p style="margin-bottom: 8px; color: #666;">使用双箭头分隔符：</p>
      <my-breadcrumb :items="breadcrumbItems" separator=">>" />
    </div>
  </div>

  <template #code>

  ```vue
  <template>
    <!-- 箭头分隔符 -->
    <my-breadcrumb :items="breadcrumbItems" separator=">" />
    
    <!-- 点分隔符 -->
    <my-breadcrumb :items="breadcrumbItems" separator="·" />
    
    <!-- 双箭头分隔符 -->
    <my-breadcrumb :items="breadcrumbItems" separator=">>" />
  </template>

  <script setup lang="ts">
  const breadcrumbItems = [
    { label: '首页', href: '/' },
    { label: '列表', href: '/list' },
    { label: '详情' },
  ]
  </script>
  ```

  </template>
</DemoBlock>

## 多层级导航

面包屑可以展示多层级的页面结构。

<DemoBlock>
  <div>
    <my-breadcrumb :items="multiLevelItems" />
  </div>

  <template #code>

  ```vue
  <script setup lang="ts">
  const multiLevelItems = [
    { label: '首页', href: '/' },
    { label: '产品中心', href: '/products' },
    { label: '电子产品', href: '/products/electronics' },
    { label: '手机', href: '/products/electronics/phones' },
    { label: 'iPhone 15 Pro' },
  ]
  </script>

  <template>
    <my-breadcrumb :items="multiLevelItems" />
  </template>
  ```

  </template>
</DemoBlock>

## 不同场景

展示面包屑在不同业务场景下的应用。

<DemoBlock>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <div>
      <p style="margin-bottom: 8px; color: #666;">电商场景：</p>
      <my-breadcrumb :items="ecommerceItems" separator=">" />
    </div>
    <div>
      <p style="margin-bottom: 8px; color: #666;">后台管理：</p>
      <my-breadcrumb :items="adminItems" separator=">" />
    </div>
    <div>
      <p style="margin-bottom: 8px; color: #666;">文档系统：</p>
      <my-breadcrumb :items="docsItems" separator=">" />
    </div>
  </div>

  <template #code>

  ```vue
  <script setup lang="ts">
  // 电商场景
  const ecommerceItems = [
    { label: '首页', href: '/' },
    { label: '女装', href: '/category/women' },
    { label: '连衣裙', href: '/category/women/dress' },
    { label: '商品详情' },
  ]

  // 后台管理
  const adminItems = [
    { label: '控制台', href: '/dashboard' },
    { label: '用户管理', href: '/users' },
    { label: '用户列表', href: '/users/list' },
    { label: '用户详情' },
  ]

  // 文档系统
  const docsItems = [
    { label: '文档', href: '/docs' },
    { label: '组件', href: '/docs/components' },
    { label: '导航组件', href: '/docs/components/navigation' },
    { label: 'Breadcrumb 面包屑' },
  ]
  </script>

  <template>
    <my-breadcrumb :items="ecommerceItems" separator=">" />
    <my-breadcrumb :items="adminItems" separator=">" />
    <my-breadcrumb :items="docsItems" separator=">" />
  </template>
  ```

  </template>
</DemoBlock>

## 使用场景

面包屑导航适用于以下场景：

- **电商网站**：商品分类导航（首页 > 女装 > 连衣裙 > 商品详情）
- **后台管理**：功能模块导航（控制台 > 用户管理 > 用户列表）
- **文档系统**：文档层级导航（文档 > 组件 > 导航组件 > 面包屑）
- **内容管理**：内容分类导航（内容 > 文章 > 技术文章 > 详情）
- **文件系统**：文件路径导航（我的文档 > 项目 > 前端 > Vue）

## 设计建议

1. **最后一项不可点击**：当前页面不应该是链接
2. **保持简洁**：避免层级过深，建议不超过 5 级
3. **使用合适的分隔符**：常用 `/`、`>`、`·` 等
4. **响应式处理**：移动端可考虑只显示上一级和当前级

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| items | 面包屑数据数组 | `BreadcrumbItem[]` | `[]` |
| separator | 分隔符 | `string` | `'/'` |

### BreadcrumbItem

| 属性 | 说明 | 类型 | 必填 |
| --- | --- | --- | --- |
| label | 显示的文字 | `string` | 是 |
| href | 跳转的链接地址 | `string` | 否 |

**注意**：最后一项通常不设置 `href`，表示当前页面。

## TypeScript

```typescript
import type {
  BreadcrumbProps,
  BreadcrumbItem,
} from 'one-wish'

// 使用示例
const items: BreadcrumbItem[] = [
  { label: '首页', href: '/' },
  { label: '列表', href: '/list' },
  { label: '详情' }, // 当前页面，无 href
]
```

<script setup lang="ts">
const breadcrumbItems = [
  { label: '首页', href: '/' },
  { label: '列表', href: '/list' },
  { label: '详情' },
]

const multiLevelItems = [
  { label: '首页', href: '/' },
  { label: '产品中心', href: '/products' },
  { label: '电子产品', href: '/products/electronics' },
  { label: '手机', href: '/products/electronics/phones' },
  { label: 'iPhone 15 Pro' },
]

const ecommerceItems = [
  { label: '首页', href: '/' },
  { label: '女装', href: '/category/women' },
  { label: '连衣裙', href: '/category/women/dress' },
  { label: '商品详情' },
]

const adminItems = [
  { label: '控制台', href: '/dashboard' },
  { label: '用户管理', href: '/users' },
  { label: '用户列表', href: '/users/list' },
  { label: '用户详情' },
]

const docsItems = [
  { label: '文档', href: '/docs' },
  { label: '组件', href: '/docs/components' },
  { label: '导航组件', href: '/docs/components/navigation' },
  { label: 'Breadcrumb 面包屑' },
]
</script>
