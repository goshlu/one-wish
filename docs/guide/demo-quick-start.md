# 快速开始：添加代码演示

只需 3 步，即可在文档中添加交互式代码演示。

## 第 1 步：编写文档

在你的 markdown 文件中，使用 `DemoBlock` 组件：

```vue
# 我的组件

## 基础用法

<DemoBlock>
  <my-button type="primary">点击我</my-button>
  <my-button type="success">成功</my-button>
</DemoBlock>
```

## 第 2 步：运行文档

```bash
pnpm docs:dev
```

## 第 3 步：查看效果

打开浏览器，你会看到：

1. ✅ 可交互的组件预览
2. ✅ "查看代码"按钮
3. ✅ "复制代码"按钮
4. ✅ 代码高亮显示

## 就这么简单！

不需要：
- ❌ 重复编写代码
- ❌ 手动创建演示组件
- ❌ 复杂的配置

只需要：
- ✅ 使用 `DemoBlock` 组件
- ✅ 传入代码字符串

## 更多示例

### 多个组件

```vue
<DemoBlock>
  <my-button>按钮 1</my-button>
  <my-button type="primary">按钮 2</my-button>
  <my-button type="success">按钮 3</my-button>
</DemoBlock>
```

### 带属性

```vue
<DemoBlock>
  <my-button size="large" type="primary">大按钮</my-button>
  <my-button size="small" type="danger">小按钮</my-button>
</DemoBlock>
```

### 带状态

```vue
<DemoBlock>
  <my-button disabled>禁用</my-button>
  <my-button loading>加载中</my-button>
</DemoBlock>
```

## 下一步

- 查看 [完整使用指南](/guide/demo-usage)
- 浏览 [示例文档](/components/button-new)
- 了解 [系统架构](/.vitepress/DEMO_SYSTEM.md)
