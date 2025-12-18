# 最佳实践

本指南提供了使用 One Wish 组件库的最佳实践和常见模式。

## 项目结构

### 推荐的项目结构

```
src/
├── components/          # 业务组件
│   ├── Header.vue
│   ├── Sidebar.vue
│   └── Layout.vue
├── views/              # 页面
│   ├── Home.vue
│   ├── About.vue
│   └── NotFound.vue
├── hooks/              # 自定义 hooks
│   ├── useAuth.ts
│   └── useData.ts
├── stores/             # 状态管理
│   ├── user.ts
│   └── app.ts
├── styles/             # 全局样式
│   ├── index.css
│   └── variables.css
├── utils/              # 工具函数
│   ├── api.ts
│   └── helpers.ts
├── App.vue
└── main.ts
```

## 组件使用规范

### 1. 导入方式

**✅ 推荐：自动按需导入**

配置 `unplugin-vue-components` 后，无需手动导入：

```vue
<template>
  <my-card title="自动导入">
    <p>组件会自动导入</p>
  </my-card>
</template>
```

**✅ 可接受：显式按需导入**

```vue
<script setup lang="ts">
import { MyCard } from 'one-wish'
</script>

<template>
  <my-card title="显式导入">
    <p>手动导入组件</p>
  </my-card>
</template>
```

**❌ 避免：全局导入大量组件**

```typescript
// 不推荐 - 加大包体积
import OneWish from 'one-wish'
app.use(OneWish)
```

### 2. Props 定义

**✅ 推荐：使用 TypeScript 类型**

```vue
<script setup lang="ts">
import type { ButtonProps } from 'one-wish'

const buttonProps: ButtonProps = {
  type: 'primary',
  size: 'large',
  disabled: false,
}
</script>

<template>
  <my-button v-bind="buttonProps">提交</my-button>
</template>
```

**✅ 推荐：在组件中定义 props 约束**

```vue
<script setup lang="ts">
interface Props {
  title: string
  count?: number
  loading?: boolean
}

withDefaults(defineProps<Props>(), {
  count: 0,
  loading: false,
})
</script>
```

### 3. 事件处理

**✅ 推荐：使用 v-on 缩写**

```vue
<template>
  <my-button @click="handleClick">点击</my-button>
  <my-input @input="handleInput" @blur="handleBlur" />
</template>
```

**✅ 推荐：使用类型安全的事件处理**

```vue
<script setup lang="ts">
const handleClick = (event: MouseEvent) => {
  console.log('已点击')
}

const handleInput = (value: string) => {
  console.log('输入内容:', value)
}
</script>
```

**❌ 避免：在事件中进行复杂的业务逻辑**

```vue
<!-- 不推荐 -->
<my-button @click="count++; loading = true; fetch(...); ...">提交</my-button>
```

### 4. 插槽使用

**✅ 推荐：使用具名插槽**

```vue
<my-card title="卡片标题">
  <!-- 默认插槽 -->
  <p>卡片内容</p>

  <!-- 具名插槽 -->
  <template #extra>
    <my-button type="primary">编辑</my-button>
  </template>

  <template #actions>
    <my-button plain>保存</my-button>
    <my-button plain>删除</my-button>
  </template>
</my-card>
```

**✅ 推荐：使用插槽作用域数据**

```vue
<template>
  <my-list :items="items">
    <template #default="{ item, index }">
      <div>{{ index }}: {{ item.name }}</div>
    </template>
  </my-list>
</template>
```

## 样式和主题

### 1. 全局样式配置

**✅ 推荐：在 `main.ts` 中集中管理**

```typescript
import { createApp } from 'vue'
import App from './App.vue'
import 'one-wish/style.css'
import './styles/index.css'

const app = createApp(App)
app.mount('#app')
```

### 2. CSS 变量定制

**✅ 推荐：创建主题文件**

```css
/* src/styles/theme.css */
:root {
  /* 颜色 */
  --primary-color: #409eff;
  --success-color: #67c23a;
  --warning-color: #e6a23c;
  --danger-color: #f56c6c;

  /* 圆角 */
  --border-radius-base: 4px;
  --border-radius-large: 8px;

  /* 字体 */
  --font-size-base: 14px;
  --font-size-large: 16px;
  --font-size-small: 12px;

  /* 过渡 */
  --transition-base: all 0.3s ease;
}
```

### 3. 组件级样式

**✅ 推荐：使用 scoped 样式和深层选择器**

```vue
<template>
  <div class="custom-card">
    <my-card title="自定义卡片">
      <p>内容</p>
    </my-card>
  </div>
</template>

<style scoped>
.custom-card {
  --primary-color: #1890ff;
}

.custom-card :deep(.my-card) {
  border-radius: 12px;
}
</style>
```

**❌ 避免：使用过深的选择器层级**

```css
/* 不推荐 - 选择器过深 */
.wrapper > div > .card :deep(.card__body :deep(.card__title)) {
  color: red;
}
```

## 表单处理

### 1. 表单绑定

**✅ 推荐：使用 v-model 双向绑定**

```vue
<script setup lang="ts">
import { ref, reactive } from 'vue'

// 简单表单
const email = ref('')

// 复杂表单
const form = reactive({
  username: '',
  email: '',
  agree: false,
})
</script>

<template>
  <my-form :model="form">
    <my-form-item label="用户名">
      <my-input v-model="form.username" />
    </my-form-item>

    <my-form-item label="邮箱">
      <my-input v-model="form.email" type="email" />
    </my-form-item>

    <my-form-item label="同意条款">
      <my-checkbox v-model="form.agree" />
    </my-form-item>
  </my-form>
</template>
```

### 2. 表单验证

**✅ 推荐：使用 useForm hook**

```vue
<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useForm } from 'one-wish'

const form = reactive({
  username: '',
  password: '',
})

const { validate, resetFields, setFieldsValue } = useForm()

const handleSubmit = async () => {
  const valid = await validate()
  if (valid) {
    console.log('表单数据:', form)
  }
}
</script>

<template>
  <my-form :model="form" @submit="handleSubmit">
    <my-form-item label="用户名">
      <my-input v-model="form.username" />
    </my-form-item>

    <my-form-item label="密码">
      <my-input v-model="form.password" type="password" />
    </my-form-item>

    <my-button type="primary" @click="handleSubmit">提交</my-button>
    <my-button @click="resetFields">重置</my-button>
  </my-form>
</template>
```

## 列表和表格

### 1. 列表渲染

**✅ 推荐：使用 v-for 和 key 属性**

```vue
<script setup lang="ts">
import { ref } from 'vue'

interface Item {
  id: string
  name: string
  status: string
}

const items = ref<Item[]>([
  { id: '1', name: '项目1', status: 'active' },
  { id: '2', name: '项目2', status: 'inactive' },
])
</script>

<template>
  <div class="item-list">
    <my-card v-for="item in items" :key="item.id" :title="item.name">
      <p>状态: {{ item.status }}</p>
    </my-card>
  </div>
</template>
```

**❌ 避免：使用 index 作为 key**

```vue
<!-- 不推荐 -->
<my-card v-for="(item, index) in items" :key="index">
  {{ item.name }}
</my-card>
```

### 2. 虚拟滚动

**✅ 推荐：大列表使用虚拟滚动**

```vue
<script setup lang="ts">
import { ref, computed } from 'vue'

const items = ref(
  Array.from({ length: 10000 }, (_, i) => ({
    id: i,
    name: `项目${i}`,
  }))
)

// 只渲染可见项
const visibleItems = computed(() => {
  return items.value.slice(0, 50) // 简化示例
})
</script>

<template>
  <div class="virtual-list">
    <my-card v-for="item in visibleItems" :key="item.id">
      {{ item.name }}
    </my-card>
  </div>
</template>
```

## 异步处理

### 1. 数据加载

**✅ 推荐：使用 loading 状态**

```vue
<script setup lang="ts">
import { ref } from 'vue'

const loading = ref(false)
const data = ref(null)

const fetchData = async () => {
  loading.value = true
  try {
    const response = await fetch('/api/data')
    data.value = await response.json()
  } catch (error) {
    console.error('加载失败:', error)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <my-card :loading="loading" title="数据">
    <div v-if="data">{{ data }}</div>
    <my-button v-else @click="fetchData">加载数据</my-button>
  </my-card>
</template>
```

### 2. 防抖和节流

**✅ 推荐：搜索输入使用防抖**

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { debounce } from './utils'

const searchText = ref('')
const results = ref([])

const handleSearch = debounce(async (text: string) => {
  if (!text) {
    results.value = []
    return
  }
  const response = await fetch(`/api/search?q=${text}`)
  results.value = await response.json()
}, 300)

const onInput = (text: string) => {
  searchText.value = text
  handleSearch(text)
}
</script>

<template>
  <my-input :value="searchText" placeholder="搜索..." @input="onInput" />
  <div v-for="result in results" :key="result.id">
    {{ result.name }}
  </div>
</template>
```

## 响应式设计

### 1. 响应式布局

**✅ 推荐：使用 Flex 和 Grid 响应式布局**

```vue
<template>
  <my-grid :cols="{ xs: 1, sm: 2, md: 3, lg: 4 }" gap="16px">
    <my-grid-item v-for="item in items" :key="item.id">
      <my-card :title="item.name">
        {{ item.description }}
      </my-card>
    </my-grid-item>
  </my-grid>
</template>
```

### 2. 移动端适配

**✅ 推荐：使用媒体查询调整样式**

```vue
<style scoped>
.responsive-layout {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
}

@media (max-width: 768px) {
  .responsive-layout {
    grid-template-columns: 1fr;
  }
}
</style>
```

## 性能优化

### 1. 组件懒加载

**✅ 推荐：使用 defineAsyncComponent**

```typescript
import { defineAsyncComponent } from 'vue'

const HeavyComponent = defineAsyncComponent(
  () => import('./HeavyComponent.vue')
)
```

### 2. 避免频繁的重新渲染

**✅ 推荐：使用 computed 和 memo**

```vue
<script setup lang="ts">
import { ref, computed } from 'vue'

const list = ref([...])

const filteredList = computed(() => {
  return list.value.filter(item => item.active)
})
</script>
```

**✅ 推荐：使用 v-show 替代 v-if**

```vue
<!-- 频繁切换时使用 v-show -->
<div v-show="isVisible">内容</div>

<!-- 一次性隐藏使用 v-if -->
<div v-if="hasPermission">受限内容</div>
```

### 3. 事件委托

**✅ 推荐：使用事件委托处理列表项目**

```vue
<template>
  <div class="list" @click="handleItemClick">
    <div v-for="item in items" :key="item.id" class="item" :data-id="item.id">
      {{ item.name }}
    </div>
  </div>
</template>

<script setup lang="ts">
const handleItemClick = (event: Event) => {
  const target = event.target as HTMLElement
  const id = target.getAttribute('data-id')
  console.log('点击项目:', id)
}
</script>
```

## 可访问性

### 1. 标签和关联

**✅ 推荐：为表单项添加标签**

```vue
<template>
  <my-form-item label="用户名" label-for="username">
    <my-input id="username" v-model="username" />
  </my-form-item>
</template>
```

### 2. ARIA 属性

**✅ 推荐：添加适当的 ARIA 属性**

```vue
<template>
  <div role="alert" aria-live="polite">
    {{ message }}
  </div>

  <button aria-label="关闭对话框" @click="close">×</button>
</template>
```

## 国际化

### 1. i18n 设置

**✅ 推荐：使用 vue-i18n**

```typescript
// i18n.ts
import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    button: {
      save: 'Save',
      cancel: 'Cancel',
    },
  },
  zh: {
    button: {
      save: '保存',
      cancel: '取消',
    },
  },
}

export const i18n = createI18n({
  locale: 'zh',
  messages,
})
```

### 2. 在组件中使用

**✅ 推荐：使用 $t() 函数**

```vue
<template>
  <div>
    <my-button type="primary">{{ $t('button.save') }}</my-button>
    <my-button>{{ $t('button.cancel') }}</my-button>
  </div>
</template>
```

## 错误处理

### 1. 全局错误处理

**✅ 推荐：在 main.ts 中设置错误处理**

```typescript
app.config.errorHandler = error => {
  console.error('应用错误:', error)
  // 显示错误提示
}
```

### 2. 异步错误处理

**✅ 推荐：添加错误提示**

```vue
<script setup lang="ts">
import { ref } from 'vue'

const loading = ref(false)
const error = ref('')

const fetchData = async () => {
  loading.value = true
  error.value = ''
  try {
    const response = await fetch('/api/data')
    if (!response.ok) {
      throw new Error('请求失败')
    }
    // 处理数据
  } catch (err) {
    error.value = err instanceof Error ? err.message : '未知错误'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div v-if="error" class="error">{{ error }}</div>
  <my-card :loading="loading" @mounted="fetchData">内容</my-card>
</template>
```

## 总结

遵循这些最佳实践可以帮助你：

1. 提高代码质量和可维护性
2. 提升应用性能
3. 改善用户体验
4. 降低 bug 的出现率
5. 便于团队协作和代码审查
