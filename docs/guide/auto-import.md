# 自动按需导入

One Wish 支持通过 `unplugin-vue-components` 插件实现自动按需导入，无需手动 import 组件。

## 安装

首先安装 `unplugin-vue-components` 插件：

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

## 配置

### Vite

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

### Webpack

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

### Vue CLI

在 `vue.config.js` 中配置：

```javascript
const Components = require('unplugin-vue-components/webpack')
const { OneWishResolver } = require('one-wish/resolver')

module.exports = {
  configureWebpack: {
    plugins: [
      Components({
        resolvers: [OneWishResolver()],
      }),
    ],
  },
}
```

## 使用

配置完成后，可以直接在模板中使用组件，无需手动导入：

```vue
<template>
  <div>
    <!-- 直接使用，无需 import -->
    <my-button type="primary" @click="handleClick">
      点击我
    </my-button>
    
    <my-input 
      v-model="value" 
      placeholder="请输入内容" 
      clearable 
    />
    
    <my-float-button 
      icon="🚀" 
      description="返回顶部"
      @click="scrollToTop"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 无需导入组件，插件会自动处理
const value = ref('')

const handleClick = () => {
  console.log('按钮被点击')
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>
```

## 工作原理

`unplugin-vue-components` 会在编译时扫描你的模板，自动识别使用的组件并生成相应的 import 语句。

例如，当你在模板中使用 `<my-button>` 时，插件会自动生成：

```typescript
import { MyButton } from 'one-wish'
```

## 优势

- **零配置使用**：无需手动导入组件
- **按需加载**：只打包使用到的组件
- **类型支持**：完整的 TypeScript 类型提示
- **开发体验**：减少重复的 import 语句

## TypeScript 支持

插件会自动生成 `components.d.ts` 文件，提供完整的类型支持：

```typescript
// components.d.ts (自动生成)
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    MyButton: typeof import('one-wish')['MyButton']
    MyInput: typeof import('one-wish')['MyInput']
    // ... 其他使用到的组件
  }
}
```

## 注意事项

1. 确保组件名称以 `My` 开头（如 `MyButton`、`MyInput`）
2. 插件会在首次构建时生成类型文件，可能需要重启 IDE 以获得类型提示
3. 样式会自动引入，无需手动导入 CSS 文件

## 更多配置

你可以自定义 `unplugin-vue-components` 的配置：

```typescript
Components({
  resolvers: [OneWishResolver()],
  // 自定义组件目录
  dirs: ['src/components'],
  // 自定义类型文件路径
  dts: 'src/components.d.ts',
  // 深度搜索子目录
  deep: true,
})
```

更多配置选项请参考 [unplugin-vue-components 文档](https://github.com/unplugin/unplugin-vue-components)。
