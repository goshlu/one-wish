# MyFloatButton 悬浮按钮组件

悬浮按钮是一个固定在页面特定位置的快捷操作按钮，常用于返回顶部、快捷操作等场景。

## 基础用法

```vue
<template>
  <my-float-button icon="↑" tooltip="返回顶部" @click="scrollToTop" />
</template>
```

## 不同类型

```vue
<template>
  <!-- 默认类型 -->
  <my-float-button icon="💡" />

  <!-- 主要类型 -->
  <my-float-button type="primary" icon="✉️" />
</template>
```

## 不同形状

```vue
<template>
  <!-- 圆形（默认） -->
  <my-float-button shape="circle" icon="↑" />

  <!-- 方形 -->
  <my-float-button shape="square" icon="↑" />
</template>
```

## 不同位置

```vue
<template>
  <!-- 右下角（默认） -->
  <my-float-button position="right-bottom" icon="↑" />

  <!-- 右上角 -->
  <my-float-button position="right-top" icon="↑" />

  <!-- 左下角 -->
  <my-float-button position="left-bottom" icon="↑" />

  <!-- 左上角 -->
  <my-float-button position="left-top" icon="↑" />
</template>
```

## 带描述文字

```vue
<template>
  <my-float-button icon="✉️" description="反馈" type="primary" />
</template>
```

## 带徽标

```vue
<template>
  <my-float-button icon="🔔" :badge="5" tooltip="通知" />

  <my-float-button icon="💬" badge="NEW" tooltip="消息" />
</template>
```

## 作为链接

```vue
<template>
  <my-float-button
    icon="🏠"
    href="https://example.com"
    target="_blank"
    tooltip="访问首页"
  />
</template>
```

## 禁用状态

```vue
<template>
  <my-float-button icon="↑" disabled />
</template>
```

## 悬浮按钮组

使用 `MyFloatButtonGroup` 组件可以将多个悬浮按钮组合在一起。

### 点击触发（默认）

```vue
<template>
  <my-float-button-group>
    <my-float-button icon="📝" description="编辑" @click="handleEdit" />
    <my-float-button icon="💾" description="保存" @click="handleSave" />
    <my-float-button icon="🗑️" description="删除" @click="handleDelete" />
  </my-float-button-group>
</template>
```

### 悬停触发

```vue
<template>
  <my-float-button-group trigger="hover">
    <my-float-button icon="📝" description="编辑" />
    <my-float-button icon="💾" description="保存" />
    <my-float-button icon="🗑️" description="删除" />
  </my-float-button-group>
</template>
```

### 主要类型按钮组

```vue
<template>
  <my-float-button-group type="primary" shape="square">
    <my-float-button icon="📝" description="编辑" />
    <my-float-button icon="💾" description="保存" />
  </my-float-button-group>
</template>
```

## API

### MyFloatButton Props

| 属性        | 说明                      | 类型            | 可选值                                            | 默认值       |
| ----------- | ------------------------- | --------------- | ------------------------------------------------- | ------------ |
| type        | 按钮类型                  | string          | primary / default                                 | default      |
| shape       | 按钮形状                  | string          | circle / square                                   | circle       |
| position    | 按钮位置                  | string          | right-bottom / right-top / left-bottom / left-top | right-bottom |
| icon        | 图标（支持 emoji 或文字） | string          | —                                                 | —            |
| description | 描述文字                  | string          | —                                                 | —            |
| tooltip     | 提示文字                  | string          | —                                                 | —            |
| href        | 链接地址                  | string          | —                                                 | —            |
| target      | 链接打开方式              | string          | \_blank / \_self / \_parent / \_top               | —            |
| badge       | 徽标内容                  | number / string | —                                                 | —            |
| disabled    | 是否禁用                  | boolean         | —                                                 | false        |

### MyFloatButton Events

| 事件名 | 说明           | 回调参数            |
| ------ | -------------- | ------------------- |
| click  | 点击按钮时触发 | (event: MouseEvent) |

### MyFloatButton Slots

| 插槽名  | 说明                                              |
| ------- | ------------------------------------------------- |
| default | 自定义内容（当未设置 icon 和 description 时使用） |

### MyFloatButtonGroup Props

| 属性     | 说明     | 类型   | 可选值                                            | 默认值       |
| -------- | -------- | ------ | ------------------------------------------------- | ------------ |
| type     | 按钮类型 | string | primary / default                                 | default      |
| shape    | 按钮形状 | string | circle / square                                   | circle       |
| position | 按钮位置 | string | right-bottom / right-top / left-bottom / left-top | right-bottom |
| trigger  | 触发方式 | string | click / hover                                     | click        |

### MyFloatButtonGroup Slots

| 插槽名  | 说明                                    |
| ------- | --------------------------------------- |
| default | 悬浮按钮（只能放置 MyFloatButton 组件） |

## 使用场景

### 返回顶部

```vue
<template>
  <my-float-button icon="↑" tooltip="返回顶部" @click="scrollToTop" />
</template>
```

### 客服/帮助

```vue
<template>
  <my-float-button
    type="primary"
    icon="💬"
    description="客服"
    :badge="unreadCount"
    @click="openChat"
  />
</template>
```

### 快捷操作菜单

```vue
<template>
  <my-float-button-group type="primary" position="right-bottom">
    <my-float-button icon="➕" description="新建" @click="handleCreate" />
    <my-float-button icon="📤" description="导出" @click="handleExport" />
    <my-float-button icon="⚙️" description="设置" @click="handleSettings" />
  </my-float-button-group>
</template>
```

## 样式定制

可以通过 CSS 变量自定义样式：

```css
.my-float-button {
  --float-button-size: 48px;
  --float-button-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  --float-button-hover-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
}
```

或使用内联样式调整位置：

```vue
<template>
  <!-- 自定义距离底部的位置 -->
  <my-float-button icon="↑" style="bottom: 100px" />
</template>
```

## 注意事项

1. **位置冲突**：如果在同一位置使用多个悬浮按钮，需要通过内联样式调整位置
2. **图标选择**：建议使用 emoji 或简洁的文字图标，保持简洁美观
3. **移动端适配**：在移动端应适当调整按钮大小和位置
4. **性能考虑**：悬浮按钮会固定在视窗中，数量不宜过多
5. **可访问性**：建议为所有悬浮按钮添加 tooltip 提示文字

## TypeScript 支持

```typescript
import type {
  FloatButtonProps,
  FloatButtonEmits,
  FloatButtonGroupProps,
} from 'vue3-component-library'
```

<script setup>
import { ref } from 'vue'

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const handleEdit = () => console.log('编辑')
const handleSave = () => console.log('保存')
const handleDelete = () => console.log('删除')

const unreadCount = ref(3)
const openChat = () => {
  console.log('打开客服')
}

const handleCreate = () => console.log('新建')
const handleExport = () => console.log('导出')
const handleSettings = () => console.log('设置')
</script>
