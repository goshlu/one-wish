# 代码演示使用指南

本文档介绍如何在 VitePress 文档中添加交互式代码演示。

## 方法一：使用 DemoBlock 组件（推荐）

直接使用 `DemoBlock` 组件包裹你的组件代码：

```vue
<DemoBlock>
  <my-button type="primary">主要按钮</my-button>
  <my-button type="success">成功按钮</my-button>
</DemoBlock>
```

这会自动提供：
- 可交互的组件预览
- "查看代码"按钮
- "复制代码"按钮

## 方法二：使用原有的 Demo 组件

如果需要更复杂的布局，可以使用原有的 `Demo` 组件：

```vue
<Demo>
  <div class="demo-row">
    <my-button>按钮 1</my-button>
    <my-button type="primary">按钮 2</my-button>
  </div>
  
  <template #code>

\`\`\`vue
<template>
  <my-button>按钮 1</my-button>
  <my-button type="primary">按钮 2</my-button>
</template>
\`\`\`

  </template>
</Demo>
```

## 示例对比

### 旧方式（需要手动写两遍）

```markdown
<Demo>
  <my-button type="primary">主要按钮</my-button>
</Demo>

\`\`\`vue
<my-button type="primary">主要按钮</my-button>
\`\`\`
```

### 新方式（只写一遍）

```vue
<DemoBlock>
  <my-button type="primary">主要按钮</my-button>
</DemoBlock>
```

## 功能特性

✅ 实时预览组件效果  
✅ 一键查看/隐藏代码  
✅ 一键复制代码  
✅ 代码高亮显示  
✅ 响应式设计  
✅ 暗色模式支持  

## 注意事项

1. **组件注册**：确保组件已在 `.vitepress/theme/index.ts` 中注册
2. **代码格式**：代码块中的代码应该是有效的 Vue 模板语法
3. **引号使用**：在 DemoBlock 组件中使用单引号避免冲突
4. **样式隔离**：每个演示块都是独立的，不会相互影响

## 最佳实践

1. 优先使用 `DemoBlock` 组件，简洁高效
2. 每个示例保持简单，专注展示一个功能点
3. 为复杂示例添加文字说明
4. 合理使用空格和换行，保持代码可读性

## 参考示例

查看以下文档了解实际使用：
- [Button 按钮（新版）](/components/button-new)
- [Button 按钮（演示版）](/components/button-demo)
