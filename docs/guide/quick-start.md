# 快速开始

本节将介绍如何在项目中快速使用 One Wish。

## 安装

使用包管理器安装：

::: code-group

```bash [npm]
npm install one-wish
```

```bash [pnpm]
pnpm add one-wish
```

```bash [yarn]
yarn add one-wish
```

:::

## 完整引入

在 `main.ts` 中引入所有组件：

```typescript
import { createApp } from 'vue'
import App from './App.vue'
import OneWish from 'one-wish'
import 'one-wish/style.css'

const app = createApp(App)
app.use(OneWish)
app.mount('#app')
```

现在可以在任何组件中使用：

```vue
<template>
  <div>
    <my-button type="primary">主要按钮</my-button>
    <my-input v-model="value" placeholder="请输入内容" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
</script>
```

## 按需引入

按需引入组件可以减小打包体积：

```vue
<template>
  <div>
    <MyButton type="primary" @click="handleClick">点击我</MyButton>
    <MyInput v-model="value" placeholder="输入内容" clearable />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { MyButton, MyInput } from 'one-wish'
import 'one-wish/style.css'

const value = ref('')
const handleClick = () => {
  console.log('按钮被点击')
}
</script>
```

## 自动按需引入（推荐）

使用 `unplugin-vue-components` 插件实现自动按需导入，无需手动 import 组件。

### 1. 安装插件

::: code-group

```bash [npm]
npm install -D unplugin-vue-components
```

```bash [pnpm]
pnpm add -D unplugin-vue-components
```

```bash [yarn]
yarn add -D unplugin-vue-components
```

:::

### 2. 配置 Vite

在 `vite.config.ts` 中配置：

```typescript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { OneWishResolver } from 'one-wish/resolver'

export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [OneWishResolver()],
    }),
  ],
})
```

### 3. 配置 Webpack

在 `webpack.config.js` 中配置：

```javascript
const Components = require('unplugin-vue-components/webpack')
const { OneWishResolver } = require('one-wish/resolver')

module.exports = {
  plugins: [
    Components({
      resolvers: [OneWishResolver()],
    }),
  ],
}
```

### 4. 直接使用

配置完成后，可以直接在模板中使用组件，无需手动导入：

```vue
<template>
  <div>
    <my-button type="primary" @click="handleClick">点击我</my-button>
    <my-input v-model="value" placeholder="输入内容" clearable />
    <my-float-button icon="🚀" description="返回顶部" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 无需导入组件，插件会自动处理
const value = ref('')
const handleClick = () => {
  console.log('按钮被点击')
}
</script>
```

::: tip 提示
使用自动导入后，组件会在首次使用时自动注册，样式也会自动引入，无需手动导入 CSS 文件。
:::

## CDN 引入

通过 CDN 的方式可以快速使用组件库：

```html
<!DOCTYPE html>
<html>
  <head>
    <link
      rel="stylesheet"
      href="https://unpkg.com/one-wish/dist/style.css"
    />
  </head>
  <body>
    <div id="app">
      <my-button type="primary">主要按钮</my-button>
    </div>

    <script src="https://unpkg.com/vue@3"></script>
    <script src="https://unpkg.com/one-wish"></script>
    <script>
      const { createApp } = Vue
      const app = createApp({})
      app.use(OneWish)
      app.mount('#app')
    </script>
  </body>
</html>
```

## 在 Nuxt 3 中使用

1. 安装依赖：

```bash
npm install one-wish
```

2. 创建插件 `plugins/component-library.ts`：

```typescript
import OneWish from 'one-wish'
import 'one-wish/style.css'

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.use(OneWish)
})
```

## 下一步

- 了解[安装细节](/guide/installation)
- 查看[组件文档](/components/button)
- 学习[主题定制](/guide/theme)
