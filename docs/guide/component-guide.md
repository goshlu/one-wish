# 组件库完整指南

本指南提供了 One Wish 组件库所有组件的详细使用说明。

## 组件分类

### 基础组件

基础组件是最常用的组件，用于构建用户界面的基本元素。

#### Button 按钮

按钮用于触发某个操作。

**基础用法：**

```vue
<template>
  <my-button>默认按钮</my-button>
  <my-button type="primary">主要按钮</my-button>
  <my-button type="success">成功按钮</my-button>
  <my-button type="warning">警告按钮</my-button>
  <my-button type="danger">危险按钮</my-button>
</template>
```

**主要属性：**

- `type` - 按钮类型：`primary`、`success`、`warning`、`danger`、`info`
- `size` - 按钮大小：`large`、`default`、`small`
- `disabled` - 是否禁用
- `loading` - 是否加载中
- `round` - 是否为圆角
- `plain` - 是否为朴素按钮

**详细文档：** [查看 Button 文档](/components/button)

#### Input 输入框

输入框用于接收用户输入。

**基础用法：**

```vue
<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
</script>

<template>
  <my-input v-model="value" placeholder="请输入内容" />
</template>
```

**主要属性：**

- `v-model` - 输入框的值
- `type` - 输入框类型：`text`、`password`、`number`、`email`、`tel`
- `placeholder` - 占位符
- `disabled` - 是否禁用
- `clearable` - 是否显示清空按钮
- `readonly` - 是否只读
- `maxlength` - 最大输入长度
- `showWordLimit` - 是否显示字数限制

**详细文档：** [查看 Input 文档](/components/input)

#### Icon 图标

图标用于在界面中显示符号和视觉标记。

**基础用法：**

```vue
<template>
  <my-icon name="star" />
  <my-icon name="star" size="32" color="red" />
  <my-icon name="loading" spin />
</template>
```

**主要属性：**

- `name` - 图标名称
- `size` - 图标大小
- `color` - 图标颜色
- `spin` - 是否旋转

**详细文档：** [查看 Icon 文档](/components/icon)

#### Divider 分割线

分割线用于分隔内容。

**基础用法：**

```vue
<template>
  <my-divider />
  <my-divider content="分割线" />
  <my-divider direction="vertical" />
</template>
```

**主要属性：**

- `direction` - 方向：`horizontal`、`vertical`
- `content` - 分割线文字
- `contentPosition` - 文字位置：`left`、`center`、`right`
- `borderStyle` - 边框样式：`solid`、`dashed`、`dotted`

**详细文档：** [查看 Divider 文档](/components/divider)

### 表单组件

表单组件用于收集和处理用户数据。

#### AutoComplete 自动完成

自动完成组件提供输入建议。

```vue
<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
const options = [{ value: 'Vue' }, { value: 'React' }, { value: 'Angular' }]
</script>

<template>
  <my-autocomplete
    v-model="value"
    :options="options"
    placeholder="请输入框架名称"
  />
</template>
```

**详细文档：** [查看 AutoComplete 文档](/components/autocomplete)

#### Cascader 级联选择

级联选择器用于多层级数据选择。

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
      },
    ],
  },
]
</script>

<template>
  <my-cascader v-model="value" :options="options" />
</template>
```

**详细文档：** [查看 Cascader 文档](/components/cascader)

#### Checkbox 多选框

多选框用于选择多个选项。

```vue
<script setup lang="ts">
import { ref } from 'vue'

const checkedList = ref(['选项1'])
</script>

<template>
  <my-checkbox-group v-model="checkedList">
    <my-checkbox label="选项1">选项1</my-checkbox>
    <my-checkbox label="选项2">选项2</my-checkbox>
  </my-checkbox-group>
</template>
```

**详细文档：** [查看 Checkbox 文档](/components/checkbox)

#### Radio 单选框

单选框用于从多个选项中选择一个。

```vue
<script setup lang="ts">
import { ref } from 'vue'

const selected = ref('选项1')
</script>

<template>
  <my-radio-group v-model="selected">
    <my-radio label="选项1">选项1</my-radio>
    <my-radio label="选项2">选项2</my-radio>
  </my-radio-group>
</template>
```

**详细文档：** [查看 Radio 文档](/components/radio)

#### Select 选择框

选择框用于从下拉列表中选择。

```vue
<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
const options = [
  { label: '选项1', value: 'option1' },
  { label: '选项2', value: 'option2' },
]
</script>

<template>
  <my-select v-model="value" :options="options" />
</template>
```

**详细文档：** [查看 Select 文档](/components/select)

#### Switch 开关

开关用于切换两种状态。

```vue
<script setup lang="ts">
import { ref } from 'vue'

const enabled = ref(false)
</script>

<template>
  <my-switch v-model="enabled" />
</template>
```

**详细文档：** [查看 Switch 文档](/components/switch)

#### ColorPicker 颜色选择器

颜色选择器用于选择颜色。

```vue
<script setup lang="ts">
import { ref } from 'vue'

const color = ref('#409eff')
</script>

<template>
  <my-color-picker v-model="color" />
</template>
```

**详细文档：** [查看 ColorPicker 文档](/components/color-picker)

#### DatePicker 日期选择器

日期选择器用于选择日期。

```vue
<script setup lang="ts">
import { ref } from 'vue'

const date = ref('')
</script>

<template>
  <my-date-picker v-model="date" />
</template>
```

**详细文档：** [查看 DatePicker 文档](/components/date-picker)

#### TimePicker 时间选择器

时间选择器用于选择时间。

```vue
<script setup lang="ts">
import { ref } from 'vue'

const time = ref('')
</script>

<template>
  <my-time-picker v-model="time" />
</template>
```

**详细文档：** [查看 TimePicker 文档](/components/time-picker)

#### InputNumber 数字输入框

数字输入框用于输入数字。

```vue
<script setup lang="ts">
import { ref } from 'vue'

const value = ref(0)
</script>

<template>
  <my-input-number v-model="value" />
</template>
```

**详细文档：** [查看 InputNumber 文档](/components/input-number)

#### Rate 评分

评分组件用于提交评分。

```vue
<script setup lang="ts">
import { ref } from 'vue'

const score = ref(3)
</script>

<template>
  <my-rate v-model="score" />
</template>
```

**详细文档：** [查看 Rate 文档](/components/rate)

#### Mentions 提及

提及组件用于在输入框中提及用户。

```vue
<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
const users = [{ value: '@张三' }, { value: '@李四' }]
</script>

<template>
  <my-mentions v-model="value" :options="users" />
</template>
```

**详细文档：** [查看 Mentions 文档](/components/mentions)

#### Transfer 穿梭框

穿梭框用于在两个列表间转移数据。

```vue
<script setup lang="ts">
import { ref } from 'vue'

const selected = ref([])
const options = [
  { value: 'item1', label: '选项1' },
  { value: 'item2', label: '选项2' },
]
</script>

<template>
  <my-transfer v-model="selected" :options="options" />
</template>
```

**详细文档：** [查看 Transfer 文档](/components/transfer)

#### Upload 上传

上传组件用于上传文件。

```vue
<template>
  <my-upload action="/upload" />
</template>
```

**详细文档：** [查看 Upload 文档](/components/upload)

### 布局组件

布局组件用于组织和排列页面元素。

#### Layout 布局

布局容器用于创建页面框架。

```vue
<template>
  <my-layout>
    <my-layout-header>头部</my-layout-header>
    <my-layout>
      <my-layout-sider>侧边栏</my-layout-sider>
      <my-layout-content>主要内容</my-layout-content>
    </my-layout>
    <my-layout-footer>底部</my-layout-footer>
  </my-layout>
</template>
```

**详细文档：** [查看 Layout 文档](/components/layout)

#### Flex 弹性布局

弹性布局用于灵活排列元素。

```vue
<template>
  <my-flex gap="12px">
    <div>元素1</div>
    <div>元素2</div>
  </my-flex>
</template>
```

**详细文档：** [查看 Flex 文档](/components/flex)

#### Grid 栅格

栅格用于创建响应式布局。

```vue
<template>
  <my-grid :cols="24" :gap="16">
    <my-grid-item :span="12">列1</my-grid-item>
    <my-grid-item :span="12">列2</my-grid-item>
  </my-grid>
</template>
```

**详细文档：** [查看 Grid 文档](/components/grid)

#### Space 间距

间距组件用于控制元素之间的距离。

```vue
<template>
  <my-space gap="12px">
    <my-button>按钮1</my-button>
    <my-button>按钮2</my-button>
  </my-space>
</template>
```

**详细文档：** [查看 Space 文档](/components/space)

#### Splitter 分隔面板

分隔面板用于分割可调整大小的区域。

```vue
<template>
  <my-splitter>
    <my-splitter-pane>面板1</my-splitter-pane>
    <my-splitter-pane>面板2</my-splitter-pane>
  </my-splitter>
</template>
```

**详细文档：** [查看 Splitter 文档](/components/splitter)

### 数据展示

#### Avatar 头像

头像用于显示用户头像。

```vue
<template>
  <my-avatar src="https://example.com/avatar.jpg" size="48" />
  <my-avatar icon="user" />
</template>
```

**详细文档：** [查看 Avatar 文档](/components/avatar)

#### Badge 徽标

徽标用于显示消息提示或标记。

```vue
<template>
  <my-badge :value="5">消息</my-badge>
  <my-badge content="新" type="danger" />
</template>
```

**详细文档：** [查看 Badge 文档](/components/badge)

#### Breadcrumb 面包屑

面包屑用于显示当前位置导航。

```vue
<template>
  <my-breadcrumb>
    <my-breadcrumb-item href="/">首页</my-breadcrumb-item>
    <my-breadcrumb-item href="/list">列表</my-breadcrumb-item>
    <my-breadcrumb-item>详情</my-breadcrumb-item>
  </my-breadcrumb>
</template>
```

**详细文档：** [查看 Breadcrumb 文档](/components/breadcrumb)

#### Pagination 分页

分页用于将内容分成多页。

```vue
<script setup lang="ts">
import { ref } from 'vue'

const currentPage = ref(1)
</script>

<template>
  <my-pagination v-model="currentPage" :total="100" />
</template>
```

**详细文档：** [查看 Pagination 文档](/components/pagination)

#### Card 卡片

卡片用于展示一块内容的容器。

```vue
<template>
  <my-card title="卡片标题">
    <p>卡片内容</p>
  </my-card>
</template>
```

**详细文档：** [查看 Card 文档](/components/card)

#### Menu 菜单

菜单用于显示导航菜单。

```vue
<template>
  <my-menu>
    <my-menu-item key="1">菜单项1</my-menu-item>
    <my-menu-item key="2">菜单项2</my-menu-item>
  </my-menu>
</template>
```

**详细文档：** [查看 Menu 文档](/components/menu)

#### Steps 步骤条

步骤条用于显示进度步骤。

```vue
<template>
  <my-steps :current="1">
    <my-step title="第一步" />
    <my-step title="第二步" />
    <my-step title="第三步" />
  </my-steps>
</template>
```

**详细文档：** [查看 Steps 文档](/components/steps)

#### Tabs 标签页

标签页用于切换不同的内容区域。

```vue
<script setup lang="ts">
import { ref } from 'vue'

const activeTab = ref('tab-1')
</script>

<template>
  <my-tabs v-model="activeTab">
    <my-tab-pane key="tab-1" label="标签1">内容1</my-tab-pane>
    <my-tab-pane key="tab-2" label="标签2">内容2</my-tab-pane>
  </my-tabs>
</template>
```

**详细文档：** [查看 Tabs 文档](/components/tabs)

#### Masonry 瀑布流

瀑布流用于展示网格布局。

```vue
<template>
  <my-masonry :cols="3" gap="16px">
    <div>项目1</div>
    <div>项目2</div>
  </my-masonry>
</template>
```

**详细文档：** [查看 Masonry 文档](/components/masonry)

#### Anchor 锚点

锚点用于快速导航到页面的某个区域。

```vue
<template>
  <my-anchor>
    <my-anchor-link href="#section1" title="第一部分" />
    <my-anchor-link href="#section2" title="第二部分" />
  </my-anchor>
</template>
```

**详细文档：** [查看 Anchor 文档](/components/anchor)

#### TreeSelect 树形选择

树形选择用于从层级数据中选择。

```vue
<script setup lang="ts">
import { ref } from 'vue'

const selected = ref('')
const options = [
  {
    value: 'item1',
    label: '项目1',
    children: [{ value: 'item1-1', label: '项目1-1' }],
  },
]
</script>

<template>
  <my-tree-select v-model="selected" :options="options" />
</template>
```

**详细文档：** [查看 TreeSelect 文档](/components/tree-select)

### 其他组件

#### FloatButton 悬浮按钮

悬浮按钮用于快速访问常用功能。

```vue
<template>
  <my-float-button icon="↑" tooltip="返回顶部" @click="scrollToTop" />
</template>

<script setup lang="ts">
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>
```

**详细文档：** [查看 FloatButton 文档](/components/float-button)

#### Form 表单

表单用于收集和提交用户数据。

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { useForm } from 'one-wish'

const form = ref({
  username: '',
  password: '',
})

const { validate, resetFields } = useForm()
</script>

<template>
  <my-form :model="form">
    <my-form-item label="用户名">
      <my-input v-model="form.username" />
    </my-form-item>
    <my-form-item label="密码">
      <my-input v-model="form.password" type="password" />
    </my-form-item>
  </my-form>
</template>
```

**详细文档：** [查看 Form 文档](/components/form)

## 最佳实践

### 1. 组件选择

- 对于简单的布局，优先使用 **Flex** 或 **Space**
- 对于复杂的布局，考虑使用 **Grid** 或 **Layout**
- 对于数据展示，选择合适的展示组件如 **Card** 或 **Table**

### 2. 样式定制

- 使用 CSS 变量进行全局主题定制
- 使用 scoped styles 进行组件级别定制
- 避免过度嵌套的 CSS 选择器

### 3. 性能优化

- 对于大列表，考虑使用虚拟滚动
- 避免在模板中进行复杂的计算
- 使用 `v-show` 替代 `v-if` 处理频繁切换的元素

### 4. 可访问性

- 为表单项添加标签
- 使用语义化的 HTML 结构
- 确保足够的颜色对比度

### 5. 国际化

- 使用 i18n 库管理多语言文本
- 避免在模板中硬编码文本内容
- 考虑不同语言的文本长度

## 常见问题

### 如何自定义组件样式？

使用 CSS 变量或 scoped styles：

```vue
<style scoped>
:deep(.my-button) {
  /* 自定义样式 */
}
</style>
```

### 如何在 TypeScript 中使用组件？

所有组件都提供完整的 TypeScript 类型定义：

```typescript
import type { ButtonProps } from 'one-wish'

const props: ButtonProps = {
  type: 'primary',
  size: 'large',
}
```

### 如何处理组件的事件？

使用 `@event-name` 绑定事件处理器：

```vue
<template>
  <my-button @click="handleClick">点击</my-button>
</template>

<script setup lang="ts">
const handleClick = (event: MouseEvent) => {
  console.log('按钮被点击')
}
</script>
```
