# 主题定制

Vue3 Component Library 使用 CSS 变量来定义主题样式，你可以轻松定制组件的外观。

## CSS 变量

组件库提供了一套完整的 CSS 变量系统，定义在 `src/styles/index.css` 中。

### 颜色变量

```css
:root {
  /* 主题色 */
  --primary-color: #409eff;
  --primary-hover: #66b1ff;
  --primary-active: #3a8ee6;

  /* 功能色 */
  --success-color: #67c23a;
  --warning-color: #e6a23c;
  --danger-color: #f56c6c;
  --info-color: #909399;

  /* 文本颜色 */
  --text-primary: #303133;
  --text-regular: #606266;
  --text-secondary: #909399;
  --text-placeholder: #c0c4cc;

  /* 边框颜色 */
  --border-color-base: #dcdfe6;
  --border-color-light: #e4e7ed;
  --border-color-lighter: #ebeef5;

  /* 背景色 */
  --bg-color: #ffffff;
  --bg-color-light: #f5f7fa;
}
```

### 尺寸变量

```css
:root {
  /* 圆角 */
  --border-radius-base: 4px;
  --border-radius-small: 2px;

  /* 字体大小 */
  --font-size-base: 14px;
  --font-size-small: 13px;
  --font-size-large: 16px;

  /* 过渡动画 */
  --transition-base: all 0.2s ease;
}
```

## 自定义主题

### 方式一：覆盖 CSS 变量

在你的项目中创建一个 CSS 文件，覆盖默认的 CSS 变量：

```css
/* custom-theme.css */
:root {
  --primary-color: #1890ff;
  --primary-hover: #40a9ff;
  --primary-active: #096dd9;

  --success-color: #52c41a;
  --warning-color: #faad14;
  --danger-color: #f5222d;

  --border-radius-base: 8px;
  --font-size-base: 16px;
}
```

然后在入口文件中引入：

```typescript
import 'vue3-component-library/style.css'
import './custom-theme.css'
```

### 方式二：动态修改

在运行时动态修改 CSS 变量：

```typescript
// 修改主题色
document.documentElement.style.setProperty('--primary-color', '#1890ff')

// 或者批量修改
const setTheme = (colors: Record<string, string>) => {
  Object.entries(colors).forEach(([key, value]) => {
    document.documentElement.style.setProperty(`--${key}`, value)
  })
}

setTheme({
  'primary-color': '#1890ff',
  'success-color': '#52c41a',
  'warning-color': '#faad14',
})
```

## 主题切换示例

### 亮色/暗色主题切换

```vue
<template>
  <div>
    <my-button @click="toggleTheme">
      切换至{{ isDark ? '亮色' : '暗色' }}主题
    </my-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isDark = ref(false)

const lightTheme = {
  'primary-color': '#409eff',
  'text-primary': '#303133',
  'bg-color': '#ffffff',
}

const darkTheme = {
  'primary-color': '#409eff',
  'text-primary': '#ffffff',
  'bg-color': '#1e1e1e',
}

const toggleTheme = () => {
  isDark.value = !isDark.value
  const theme = isDark.value ? darkTheme : lightTheme

  Object.entries(theme).forEach(([key, value]) => {
    document.documentElement.style.setProperty(`--${key}`, value)
  })
}
</script>
```

## 预设主题

你可以创建多个预设主题供用户选择：

```typescript
// themes.ts
export const themes = {
  default: {
    'primary-color': '#409eff',
    'success-color': '#67c23a',
    'warning-color': '#e6a23c',
    'danger-color': '#f56c6c',
  },
  green: {
    'primary-color': '#52c41a',
    'success-color': '#73d13d',
    'warning-color': '#fadb14',
    'danger-color': '#ff4d4f',
  },
  purple: {
    'primary-color': '#722ed1',
    'success-color': '#52c41a',
    'warning-color': '#fa8c16',
    'danger-color': '#f5222d',
  },
}

export const applyTheme = (themeName: keyof typeof themes) => {
  const theme = themes[themeName]
  Object.entries(theme).forEach(([key, value]) => {
    document.documentElement.style.setProperty(`--${key}`, value)
  })
}
```

使用：

```vue
<template>
  <div>
    <my-button @click="applyTheme('default')">默认主题</my-button>
    <my-button @click="applyTheme('green')">绿色主题</my-button>
    <my-button @click="applyTheme('purple')">紫色主题</my-button>
  </div>
</template>

<script setup lang="ts">
import { applyTheme } from './themes'
</script>
```

## 组件级别定制

如果只想修改特定组件的样式，可以使用 CSS 作用域：

```vue
<template>
  <div class="custom-button-wrapper">
    <my-button type="primary">自定义按钮</my-button>
  </div>
</template>

<style scoped>
.custom-button-wrapper {
  --primary-color: #1890ff;
  --border-radius-base: 20px;
}
</style>
```

## 最佳实践

1. **统一管理**：将主题配置集中管理，便于维护
2. **性能优化**：避免频繁修改 CSS 变量，使用防抖处理
3. **用户体验**：提供主题切换时的过渡动画
4. **持久化**：将用户选择的主题保存到 localStorage

```typescript
// 保存主题
const saveTheme = (themeName: string) => {
  localStorage.setItem('theme', themeName)
  applyTheme(themeName)
}

// 加载主题
const loadTheme = () => {
  const savedTheme = localStorage.getItem('theme') || 'default'
  applyTheme(savedTheme)
}

// 应用启动时加载
loadTheme()
```
