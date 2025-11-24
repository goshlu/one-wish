# 安装

## 环境要求

- Node.js >= 18
- Vue >= 3.5.0

## 使用包管理器

我们建议使用包管理器（如 npm、pnpm 或 yarn）安装 One Wish。

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

## 浏览器直接引入

通过浏览器的 HTML 标签直接引入 One Wish，然后就可以使用全局变量 `OneWish`。

我们在 CDN 上提供了最新版本的资源链接：

```html
<head>
  <!-- 引入样式 -->
  <link
    rel="stylesheet"
    href="https://unpkg.com/one-wish/dist/style.css"
  />
</head>
<body>
  <!-- 引入 Vue -->
  <script src="https://unpkg.com/vue@3"></script>
  <!-- 引入组件库 -->
  <script src="https://unpkg.com/one-wish"></script>
</body>
```

::: tip
我们建议使用 CDN 引入组件库的用户在链接地址上锁定版本，以免将来组件库升级时受到非兼容性更新的影响。锁定版本的方法请查看 [unpkg.com](https://unpkg.com)。
:::

## Hello World

通过 CDN 的方式我们可以很容易地使用 One Wish 写出一个 Hello world 页面。

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <link
      rel="stylesheet"
      href="https://unpkg.com/one-wish/dist/style.css"
    />
  </head>
  <body>
    <div id="app">
      <my-button type="primary" @click="handleClick">{{ message }}</my-button>
    </div>
  </body>
  <script src="https://unpkg.com/vue@3"></script>
  <script src="https://unpkg.com/one-wish"></script>
  <script>
    const { createApp, ref } = Vue

    const App = {
      setup() {
        const message = ref('Hello World')

        const handleClick = () => {
          message.value = 'Clicked!'
        }

        return {
          message,
          handleClick,
        }
      },
    }

    const app = createApp(App)
    app.use(OneWish)
    app.mount('#app')
  </script>
</html>
```

## 开发环境构建

如果你的项目使用了 npm 并且希望通过 Vite 或 Webpack 等工具构建项目，那么请继续阅读下面的内容。

### 引入样式

你需要在入口文件中引入组件库的样式：

```typescript
import 'one-wish/style.css'
```

### 按需引入

One Wish 支持基于 ES modules 的 tree shaking。

```typescript
import { MyButton, MyInput } from 'one-wish'
```

### 全局配置

在引入组件库时，可以传入一个全局配置对象：

```typescript
import { createApp } from 'vue'
import OneWish from 'one-wish'

const app = createApp(App)
app.use(OneWish, {
  // 全局配置选项
})
```

## 开始使用

现在你可以开始使用组件库了。请参阅每个组件的文档来学习如何使用它们。

- [Button 按钮](/components/button)
- [Input 输入框](/components/input)
- [FloatButton 悬浮按钮](/components/float-button)
