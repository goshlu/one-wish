# 使用指南

本指南介绍如何在你的 Vue 3 项目中使用 One Wish。

## 安装

```bash
npm install one-wish
# 或
pnpm add one-wish
# 或
yarn add one-wish
```

## 全局引入

在 `main.ts` 中注册所有组件：

```typescript
import { createApp } from 'vue'
import App from './App.vue'
import OneWish from 'one-wish'
import 'one-wish/style.css'

const app = createApp(App)

// 注册所有组件
app.use(OneWish)

app.mount('#app')
```

然后在任何组件中直接使用：

```vue
<template>
  <my-button type="primary">点击我</my-button>
  <my-input placeholder="输入内容" />
  <my-icon name="star" />
</template>
```

## 按需引入

如果你只需要某些组件，可以按需引入：

```vue
<script setup lang="ts">
import { MyButton, MyIcon } from 'one-wish'
</script>

<template>
  <my-button type="primary">点击我</my-button>
  <my-icon name="star" />
</template>
```

## 样式引入

### 全局样式

```typescript
import 'one-wish/style.css'
```

### 按需样式

每个组件都包含自己的样式，按需引入时会自动包含。

## 组件列表

### 基础组件

- **Button** - 按钮组件
- **Input** - 输入框组件
- **Icon** - 图标组件
- **Divider** - 分割线组件

### 表单组件

- **AutoComplete** - 自动完成组件
- **Cascader** - 级联选择器
- **Checkbox** - 多选框组件
- **ColorPicker** - 颜色选择器

### 布局组件

- **Flex** - 弹性布局
- **Grid** - 栅格布局
- **Layout** - 布局容器
- **Space** - 间距组件
- **Splitter** - 分隔面板

### 其他组件

- **FloatButton** - 悬浮按钮组件
- **FloatButtonGroup** - 悬浮按钮组

## 快速示例

### Button 按钮

```vue
<template>
  <!-- 基础按钮 -->
  <my-button>默认按钮</my-button>
  
  <!-- 不同类型 -->
  <my-button type="primary">主要按钮</my-button>
  <my-button type="success">成功按钮</my-button>
  <my-button type="danger">危险按钮</my-button>
  
  <!-- 不同大小 -->
  <my-button size="large">大按钮</my-button>
  <my-button size="small">小按钮</my-button>
  
  <!-- 其他状态 -->
  <my-button disabled>禁用按钮</my-button>
  <my-button loading>加载中</my-button>
  <my-button round>圆角按钮</my-button>
  <my-button plain>朴素按钮</my-button>
</template>
```

### Input 输入框

```vue
<template>
  <!-- 基础输入框 -->
  <my-input placeholder="请输入内容" />
  
  <!-- 不同类型 -->
  <my-input type="password" placeholder="请输入密码" />
  <my-input type="number" placeholder="请输入数字" />
  
  <!-- 不同大小 -->
  <my-input size="large" placeholder="大输入框" />
  <my-input size="small" placeholder="小输入框" />
  
  <!-- 其他状态 -->
  <my-input disabled placeholder="禁用输入框" />
  <my-input readonly placeholder="只读输入框" />
  <my-input clearable placeholder="可清空输入框" />
</template>
```

### Icon 图标

```vue
<template>
  <!-- 基础图标 -->
  <my-icon name="star" />
  
  <!-- 自定义大小 -->
  <my-icon name="star" size="32" />
  
  <!-- 自定义颜色 -->
  <my-icon name="star" color="red" />
  
  <!-- 旋转动画 -->
  <my-icon name="loading" spin />
  
  <!-- 描边样式 -->
  <my-icon name="circle" fill="none" stroke="currentColor" />
</template>
```

### Divider 分割线

```vue
<template>
  <!-- 基础分割线 -->
  <my-divider />
  
  <!-- 竖直分割线 -->
  <my-divider direction="vertical" />
  
  <!-- 带文字的分割线 -->
  <my-divider content="分割线" />
  
  <!-- 不同样式 -->
  <my-divider content="虚线" borderStyle="dashed" />
  <my-divider content="点线" borderStyle="dotted" />
  
  <!-- 自定义颜色 -->
  <my-divider content="红色" borderColor="red" textColor="red" />
  
  <!-- 文字位置 -->
  <my-divider content="左对齐" contentPosition="left" />
  <my-divider content="右对齐" contentPosition="right" />
</template>
```

### AutoComplete 自动完成

```vue
<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
const options = [
  { value: 'Vue' },
  { value: 'React' },
  { value: 'Angular' },
]
</script>

<template>
  <!-- 基础用法 -->
  <my-autocomplete
    v-model="value"
    :options="options"
    placeholder="请输入框架名称"
    clearable
  />
</template>
```

### Cascader 级联选择

```vue
<script setup lang="ts">
import { ref } from 'vue'

const value = ref([])
const options = [
  {
    value: 'zhejiang',
    label: '浙江',
    children: [
      {
        value: 'hangzhou',
        label: '杭州',
        children: [
          { value: 'xihu', label: '西湖' },
        ],
      },
    ],
  },
]
</script>

<template>
  <my-cascader v-model="value" :options="options" clearable />
</template>
```

### Checkbox 多选框

```vue
<script setup lang="ts">
import { ref } from 'vue'

const checked = ref(false)
const checkedList = ref(['选项1'])
</script>

<template>
  <!-- 单个多选框 -->
  <my-checkbox v-model="checked">同意协议</my-checkbox>
  
  <!-- 多选框组 -->
  <my-checkbox-group v-model="checkedList">
    <my-checkbox label="选项1">选项1</my-checkbox>
    <my-checkbox label="选项2">选项2</my-checkbox>
    <my-checkbox label="选项3">选项3</my-checkbox>
  </my-checkbox-group>
</template>
```

### ColorPicker 颜色选择器

```vue
<script setup lang="ts">
import { ref } from 'vue'

const color = ref('#409eff')
const predefineColors = [
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
]
</script>

<template>
  <!-- 基础用法 -->
  <my-color-picker v-model="color" />
  
  <!-- 预定义颜色 -->
  <my-color-picker v-model="color" :predefine-colors="predefineColors" />
</template>
```

### FloatButton 悬浮按钮

```vue
<template>
  <!-- 基础悬浮按钮 -->
  <my-float-button icon="↑" tooltip="返回顶部" @click="scrollToTop" />
  
  <!-- 不同类型 -->
  <my-float-button type="primary" icon="💬" description="客服" />
  
  <!-- 不同形状 -->
  <my-float-button shape="square" icon="↑" />
  
  <!-- 不同位置 -->
  <my-float-button position="left-bottom" icon="↑" />
  
  <!-- 带徽标 -->
  <my-float-button icon="🔔" :badge="5" tooltip="通知" />
</template>

<script setup lang="ts">
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>
```

## TypeScript 支持

所有组件都提供完整的 TypeScript 类型定义：

```typescript
import type {
  // 基础组件
  ButtonProps,
  InputProps,
  IconProps,
  DividerProps,
  // 表单组件
  AutoCompleteProps,
  AutoCompleteOption,
  CascaderProps,
  CascaderOption,
  CheckboxProps,
  CheckboxGroupProps,
  ColorPickerProps,
  // 布局组件
  FlexProps,
  GridProps,
  LayoutProps,
  SpaceProps,
  SplitterProps,
  // 其他组件
  FloatButtonProps,
} from 'one-wish'
```

## 主题定制

### CSS 变量

所有组件都支持通过 CSS 变量进行主题定制：

```css
:root {
  /* 按钮 */
  --my-button-primary-color: #409eff;
  --my-button-success-color: #67c23a;
  --my-button-danger-color: #f56c6c;
  
  /* 输入框 */
  --my-input-border-color: #dcdfe6;
  --my-input-focus-color: #409eff;
  
  /* 图标 */
  --my-icon-color: currentColor;
}
```

## 常见问题

### Q: 如何在 Nuxt 中使用？

A: 创建一个插件文件 `plugins/ui-library.ts`：

```typescript
import OneWish from 'one-wish'
import 'one-wish/style.css'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(OneWish)
})
```

### Q: 如何自定义组件样式？

A: 使用 CSS 变量或 scoped styles：

```vue
<style scoped>
:deep(.my-button) {
  /* 自定义样式 */
}
</style>
```

### Q: 支持哪些浏览器？

A: 支持所有现代浏览器（Chrome、Firefox、Safari、Edge）。

## 更多资源

### 基础组件
- [Button 按钮](/components/button)
- [Input 输入框](/components/input)
- [Icon 图标](/components/icon)
- [Divider 分割线](/components/divider)

### 表单组件
- [AutoComplete 自动完成](/components/autocomplete)
- [Cascader 级联选择](/components/cascader)
- [Checkbox 多选框](/components/checkbox)
- [ColorPicker 颜色选择器](/components/color-picker)

### 布局组件
- [Flex 弹性布局](/components/flex)
- [Grid 栅格](/components/grid)
- [Layout 布局](/components/layout)
- [Space 间距](/components/space)
- [Splitter 分隔面板](/components/splitter)

### 其他组件
- [FloatButton 悬浮按钮](/components/float-button)

### 链接
- [GitHub 仓库](https://github.com/goshlu/one-wish)
