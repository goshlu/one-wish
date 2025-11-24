# One Wish

一个基于 Vue 3 + TypeScript + Vite 构建的现代化组件库。

[![npm version](https://img.shields.io/npm/v/one-wish.svg)](https://www.npmjs.com/package/one-wish)
[![license](https://img.shields.io/npm/l/one-wish.svg)](https://github.com/wish/one-wish/blob/main/LICENSE)

## ✨ 特性

- 🚀 **快速构建** - 基于 Vite 5.x 的极速构建体验
- 💪 **类型安全** - 使用 TypeScript 编写，提供完整的类型定义
- 🎨 **简洁设计** - 简洁现代的设计风格，无冗余动画
- 📦 **按需引入** - 支持 Tree-shaking，按需加载
- 🌈 **主题定制** - 基于 CSS 变量，轻松定制主题
- 🔧 **开箱即用** - 完善的文档和示例
- 📘 **TypeScript** - 完整的类型定义文件

## 📦 安装

```bash
npm install one-wish
# 或
pnpm add one-wish
# 或
yarn add one-wish
```

## 🔨 快速开始

### 完整引入

```js
import { createApp } from 'vue'
import App from './App.vue'
import OneWish from 'one-wish'
import 'one-wish/style.css'

const app = createApp(App)
app.use(OneWish)
app.mount('#app')
```

### 按需引入

```js
import { MyButton, MyInput } from 'one-wish'
import 'one-wish/style.css'
```

### 使用示例

```vue
<template>
  <div>
    <my-button type="primary" @click="handleClick">主要按钮</my-button>
    <my-input v-model="value" placeholder="请输入内容" clearable />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const value = ref('')
const handleClick = () => {
  console.log('按钮被点击')
}
</script>
```

## 📚 组件列表

- **MyButton** - 按钮组件

  - 多种类型：primary、success、warning、danger、info
  - 多种尺寸：large、default、small
  - 支持禁用、加载、圆角、朴素等状态

- **MyInput** - 输入框组件

  - 多种类型：text、password、number、email、tel
  - 多种尺寸：large、default、small
  - 支持清空、字数限制、禁用、只读等功能

- **MyFloatButton** - 悬浮按钮组件
  - 多种形状：圆形、方形
  - 多种位置：四个角落任意选择
  - 支持徽标、描述文字、提示文字
  - 支持悬浮按钮组（MyFloatButtonGroup）

更多组件持续更新中...

## 📖 文档

- [📚 在线文档](http://localhost:5174) - VitePress 在线文档（本地开发）
- [使用指南](./USAGE.md) - 详细的使用文档和 API 说明
- [开发指南](./DEVELOPMENT.md) - 如何参与开发
- [发布指南](./PUBLISH.md) - 如何发布到 npm
- [项目结构](./PROJECT_STRUCTURE.md) - 项目结构说明
- [更新日志](./CHANGELOG.md) - 版本更新记录

## 🔧 开发

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 启动文档服务器
pnpm docs:dev

# 构建库
pnpm build

# 构建文档
pnpm docs:build

# 预览构建结果
pnpm preview
```

## 🎨 主题定制

组件使用 CSS 变量，可以轻松定制主题：

```css
:root {
  --primary-color: #409eff;
  --success-color: #67c23a;
  --warning-color: #e6a23c;
  --danger-color: #f56c6c;
  --border-radius-base: 4px;
  --font-size-base: 14px;
  /* 更多变量见 src/styles/index.css */
}
```

## 📦 构建产物

- ES Module 格式：`one-wish.es.js`
- UMD 格式：`one-wish.umd.js`
- 样式文件：`style.css`
- TypeScript 类型：`types/`

## 🌐 浏览器支持

现代浏览器和 IE11+（需要相应的 polyfill）

## 📄 License

MIT

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 👨‍💻 作者

wish

---

**享受编码！** 🎉
