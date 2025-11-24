# Icon 图标

通用的图标组件，支持自定义大小、颜色和动画。

## 基础用法

使用 `name` 属性指定图标名称。

<DemoBlock>
  <div style="display: flex; gap: 12px;">
    <my-icon name="star" />
    <my-icon name="heart" />
    <my-icon name="check" />
    <my-icon name="close" />
  </div>

  <template #code>

  ```vue
  <my-icon name="star" />
  <my-icon name="heart" />
  <my-icon name="check" />
  <my-icon name="close" />
  ```

  </template>
</DemoBlock>

## 不同大小

使用 `size` 属性设置图标大小。

<DemoBlock>
  <div style="display: flex; gap: 12px; align-items: center;">
    <my-icon name="star" size="16" />
    <my-icon name="star" size="24" />
    <my-icon name="star" size="32" />
    <my-icon name="star" size="48" />
  </div>

  <template #code>

  ```vue
  <my-icon name="star" size="16" />
  <my-icon name="star" size="24" />
  <my-icon name="star" size="32" />
  <my-icon name="star" size="48" />
  ```

  </template>
</DemoBlock>

## 自定义颜色

使用 `color` 属性设置图标颜色。

<DemoBlock>
  <div style="display: flex; gap: 12px;">
    <my-icon name="star" color="red" />
    <my-icon name="star" color="orange" />
    <my-icon name="star" color="yellow" />
    <my-icon name="star" color="green" />
    <my-icon name="star" color="blue" />
  </div>

  <template #code>

  ```vue
  <my-icon name="star" color="red" />
  <my-icon name="star" color="orange" />
  <my-icon name="star" color="yellow" />
  <my-icon name="star" color="green" />
  <my-icon name="star" color="blue" />
  ```

  </template>
</DemoBlock>

## 旋转动画

使用 `spin` 属性添加旋转动画。

<DemoBlock>
  <div style="display: flex; gap: 12px;">
    <my-icon name="loading" spin />
    <my-icon name="refresh" spin />
  </div>

  <template #code>

  ```vue
  <my-icon name="loading" spin />
  <my-icon name="refresh" spin />
  ```

  </template>
</DemoBlock>

## 描边样式

使用 `stroke` 属性设置描边。

<DemoBlock>
  <div style="display: flex; gap: 12px;">
    <my-icon name="circle" fill="none" stroke="currentColor" />
    <my-icon name="square" fill="none" stroke="currentColor" />
  </div>

  <template #code>

  ```vue
  <my-icon name="circle" fill="none" stroke="currentColor" />
  <my-icon name="square" fill="none" stroke="currentColor" />
  ```

  </template>
</DemoBlock>

## API

### Props

| 属性           | 说明           | 类型                                                    | 默认值        |
| -------------- | -------------- | ------------------------------------------------------- | ------------- |
| name           | 图标名称       | `string`                                                | —             |
| size           | 图标大小       | `number \| string`                                      | `24`          |
| color          | 图标颜色       | `string`                                                | `inherit`     |
| fill           | 填充颜色       | `string`                                                | `currentColor` |
| stroke         | 描边颜色       | `string`                                                | `none`        |
| strokeWidth    | 描边宽度       | `number`                                                | `2`           |
| strokeLinecap  | 描边线帽       | `butt \| round \| square`                               | `round`       |
| strokeLinejoin | 描边连接       | `arcs \| bevel \| miter \| miter-clip \| round`         | `round`       |
| viewBox        | 视图框         | `string`                                                | `0 0 24 24`   |
| spin           | 是否旋转       | `boolean`                                               | `false`       |

### Slots

| 插槽名  | 说明     |
| ------- | -------- |
| default | 图标内容 |

## 引入方式

### 全局引入

在 `main.ts` 中：

```typescript
import { createApp } from 'vue'
import App from './App.vue'
import OneWish from 'one-wish'
import 'one-wish/style.css'

const app = createApp(App)
app.use(OneWish)
app.mount('#app')
```

### 按需引入

```vue
<script setup lang="ts">
import { MyIcon } from 'one-wish'
</script>

<template>
  <my-icon name="star" />
</template>
```

## 使用场景

### 按钮中的图标

<DemoBlock>
  <div style="display: flex; gap: 8px;">
    <my-button>
      <my-icon name="download" size="16" />
      下载
    </my-button>
    <my-button type="primary">
      <my-icon name="upload" size="16" />
      上传
    </my-button>
  </div>

  <template #code>

  ```vue
  <my-button>
    <my-icon name="download" size="16" />
    下载
  </my-button>
  <my-button type="primary">
    <my-icon name="upload" size="16" />
    上传
  </my-button>
  ```

  </template>
</DemoBlock>

### 加载状态

<DemoBlock>
  <div style="display: flex; gap: 16px; align-items: center;">
    <my-icon name="loading" spin size="32" />
    <span>加载中...</span>
  </div>

  <template #code>

  ```vue
  <div style="display: flex; gap: 16px; align-items: center;">
    <my-icon name="loading" spin size="32" />
    <span>加载中...</span>
  </div>
  ```

  </template>
</DemoBlock>

### 状态指示

<DemoBlock>
  <div style="display: flex; gap: 16px;">
    <div style="display: flex; align-items: center; gap: 8px;">
      <my-icon name="check" color="green" />
      <span>成功</span>
    </div>
    <div style="display: flex; align-items: center; gap: 8px;">
      <my-icon name="close" color="red" />
      <span>失败</span>
    </div>
    <div style="display: flex; align-items: center; gap: 8px;">
      <my-icon name="warning" color="orange" />
      <span>警告</span>
    </div>
  </div>

  <template #code>

  ```vue
  <div style="display: flex; gap: 16px;">
    <div style="display: flex; align-items: center; gap: 8px;">
      <my-icon name="check" color="green" />
      <span>成功</span>
    </div>
    <div style="display: flex; align-items: center; gap: 8px;">
      <my-icon name="close" color="red" />
      <span>失败</span>
    </div>
    <div style="display: flex; align-items: center; gap: 8px;">
      <my-icon name="warning" color="orange" />
      <span>警告</span>
    </div>
  </div>
  ```

  </template>
</DemoBlock>

### 导航菜单中的图标

<DemoBlock>
  <div style="display: flex; flex-direction: column; gap: 8px;">
    <div style="display: flex; align-items: center; gap: 8px; padding: 8px; cursor: pointer; border-radius: 4px; hover: background-color: #f0f0f0;">
      <my-icon name="home" />
      <span>首页</span>
    </div>
    <div style="display: flex; align-items: center; gap: 8px; padding: 8px; cursor: pointer; border-radius: 4px;">
      <my-icon name="settings" />
      <span>设置</span>
    </div>
    <div style="display: flex; align-items: center; gap: 8px; padding: 8px; cursor: pointer; border-radius: 4px;">
      <my-icon name="user" />
      <span>用户</span>
    </div>
  </div>

  <template #code>

  ```vue
  <div style="display: flex; flex-direction: column; gap: 8px;">
    <div style="display: flex; align-items: center; gap: 8px; padding: 8px;">
      <my-icon name="home" />
      <span>首页</span>
    </div>
    <div style="display: flex; align-items: center; gap: 8px; padding: 8px;">
      <my-icon name="settings" />
      <span>设置</span>
    </div>
    <div style="display: flex; align-items: center; gap: 8px; padding: 8px;">
      <my-icon name="user" />
      <span>用户</span>
    </div>
  </div>
  ```

  </template>
</DemoBlock>

## TypeScript 支持

```typescript
import type { IconProps } from 'one-wish'

// 使用类型
const iconProps: IconProps = {
  name: 'star',
  size: 24,
  color: 'red',
  spin: false,
}
```
