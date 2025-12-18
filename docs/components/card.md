# Card 卡片

卡片组件用于展示一块内容的容器，通常包含标题、内容和操作区域。

## 基础用法

最简单的卡片包含标题和内容。

<DemoBlock>
  <my-card title="卡片标题">
    <p>这是卡片的内容，可以包含任何 HTML 元素或组件。</p>
  </my-card>

  <template #code>

```vue
<template>
  <my-card title="卡片标题">
    <p>这是卡片的内容，可以包含任何 HTML 元素或组件。</p>
  </my-card>
</template>
```

  </template>
</DemoBlock>

## 带副标题

卡片支持添加副标题来提供额外的信息说明。

<DemoBlock>
  <my-card title="产品名称" subtitle="这是一个关于产品的简短描述">
    <p>这里是产品的详细介绍内容。</p>
  </my-card>

  <template #code>

```vue
<template>
  <my-card title="产品名称" subtitle="这是一个关于产品的简短描述">
    <p>这里是产品的详细介绍内容。</p>
  </my-card>
</template>
```

  </template>
</DemoBlock>

## 阴影效果

通过 `shadow` 属性控制卡片的阴影显示时机。

<DemoBlock>
  <div style="display: flex; gap: 20px; flex-wrap: wrap;">
    <my-card shadow="always" title="始终显示阴影" style="width: 200px">
      <p>Always</p>
    </my-card>
    <my-card shadow="hover" title="悬停显示阴影" style="width: 200px">
      <p>Hover</p>
    </my-card>
    <my-card shadow="never" title="从不显示阴影" style="width: 200px">
      <p>Never</p>
    </my-card>
  </div>

  <template #code>

```vue
<template>
  <!-- 始终显示阴影 -->
  <my-card shadow="always" title="始终显示阴影">
    <p>Always</p>
  </my-card>

  <!-- 悬停时显示阴影 -->
  <my-card shadow="hover" title="悬停显示阴影">
    <p>Hover</p>
  </my-card>

  <!-- 不显示阴影 -->
  <my-card shadow="never" title="从不显示阴影">
    <p>Never</p>
  </my-card>
</template>
```

  </template>
</DemoBlock>

## 栅格卡片

在系统级页面，卡片通常配合栅格系统使用。

<DemoBlock>
  <my-grid :columns="3" :gap="16">
    <my-card title="卡片 1">内容 1</my-card>
    <my-card title="卡片 2">内容 2</my-card>
    <my-card title="卡片 3">内容 3</my-card>
  </my-grid>

  <template v-slot:code>

```vue
<template>
  <my-grid :columns="3" :gap="16">
    <my-card title="卡片 1">内容 1</my-card>
    <my-card title="卡片 2">内容 2</my-card>
    <my-card title="卡片 3">内容 3</my-card>
  </my-grid>
</template>
```

  </template>
</DemoBlock>

## 预加载卡片

数据在大规模渲染前，可以使用加载状态来减少用户的焦虑。

<DemoBlock>
  <div style="margin-bottom: 16px;">
    <my-switch v-model="isLoading" />
    <span style="margin-left: 8px;">切换加载状态</span>
  </div>
  <my-grid :columns="2" :gap="16">
    <my-card :loading="isLoading" title="默认骨架屏">
      <p>这里是加载完成后的真实内容。</p>
    </my-card>
    <my-card :loading="isLoading" title="自定义加载内容">
      <template v-slot:loading>
        <div style="text-align: center; padding: 20px 0;">
          <my-icon name="loading" spin size="24" color="var(--primary-color)" />
          <p style="margin-top: 10px; color: var(--text-secondary);">自定义加载中...</p>
        </div>
      </template>
      <p>这里是加载完成后的真实内容。</p>
    </my-card>
  </my-grid>

  <template v-slot:code>

```vue
<template>
  <my-card :loading="isLoading" title="默认骨架屏">...</my-card>

  <my-card :loading="isLoading" title="自定义加载内容">
    <template #loading>
      <div style="text-align: center;">
        <my-icon name="loading" spin />
        <p>自定义加载中...</p>
      </div>
    </template>
    <p>内容...</p>
  </my-card>
</template>
```

  </template>
</DemoBlock>

## 网格型内嵌卡片

通过栅格组件，可以在一个卡片内实现网格布局。

<DemoBlock>
  <my-card title="内嵌网格示例" :body-padding="0">
    <my-grid :columns="3" :gap="0">
      <div 
        v-for="i in 6" 
        :key="i"
        style="padding: 24px; border: 1px solid var(--card-border-color); cursor: pointer; transition: all 0.3s;"
        onmouseover="this.style.boxShadow='inset 0 0 10px rgba(0,0,0,0.1)'"
        onmouseout="this.style.boxShadow='none'"
      >
        <div style="font-weight: 500; margin-bottom: 8px;">项目 {{ i }}</div>
        <div style="color: var(--text-secondary); font-size: 12px;">这是一个内嵌网格卡片的内容展示区域。</div>
      </div>
    </my-grid>
  </my-card>

  <template v-slot:code>

```vue
<template>
  <my-card title="内嵌网格示例" :body-padding="0">
    <my-grid :columns="3" :gap="0">
      <div v-for="i in 6" :key="i" style="padding: 24px; border: 1px solid #e4e7ed;">
        <h4>项目 {{ i }}</h4>
        <p>内容描述...</p>
      </div>
    </my-grid>
  </my-card>
</template>
```

  </template>
</DemoBlock>

## 带页签的卡片

可以通过 `extra` 或 `title` 插槽配合 `Tabs` 组件实现页签卡片。

<DemoBlock>
  <my-card>
    <template v-slot:title>
      <my-tabs 
        v-model="activeTab" 
        :tabs="[
          { label: '页签 1', key: 'tab1' },
          { label: '页签 2', key: 'tab2' }
        ]" 
      />
    </template>
    <template v-slot:extra>
      <a href="#" style="color: var(--primary-color); font-size: 14px; text-decoration: none;">更多</a>
    </template>
    <div style="padding: 20px;">
      <div v-if="activeTab === 'tab1'">这是页签 1 的内容。</div>
      <div v-else>这是页签 2 的内容。</div>
    </div>
  </my-card>

  <template v-slot:code>

```vue
<template>
  <my-card>
    <template #title>
      <my-tabs v-model="activeTab" :tabs="tabList" />
    </template>
    <template #extra>
      <a href="#">更多</a>
    </template>
    <div v-if="activeTab === 'tab1'">内容 1</div>
    <div v-else>内容 2</div>
  </my-card>
</template>
```

  </template>
</DemoBlock>

## 丰富的内容配置

展示卡片的所有插槽配置，包括封面、页眉、内容、操作区和页脚。

<DemoBlock>
  <my-card title="完整配置卡片" subtitle="包含所有功能区域的详细展示" style="max-width: 400px;">
    <template v-slot:extra>
      <my-button size="small">操作</my-button>
    </template>
    
    <template v-slot:cover>
      <img src="https://picsum.photos/400/200" alt="cover" />
    </template>

    <div style="line-height: 1.8;">
      <p>卡片提供了极高的自定义程度，您可以自由组合各种区域。</p>
      <p style="color: var(--text-secondary); font-size: 13px;">主要内容区域支持任何组件。</p>
    </div>

    <template v-slot:actions>
      <my-button size="small" plain>取消</my-button>
      <my-button size="small" type="primary">确认</my-button>
    </template>

    <template v-slot:footer>
      <div style="font-size: 12px; color: var(--text-placeholder); display: flex; align-items: center; gap: 4px;">
        <my-icon name="info" size="14" />
        最后更新于 2025-12-18
      </div>
    </template>
  </my-card>

  <template v-slot:code>

```vue
<template>
  <my-card title="完整配置卡片" subtitle="描述信息">
    <template #extra>
      <my-button size="small">操作</my-button>
    </template>
    
    <template #cover>
      <img src="..." />
    </template>

    <p>内容区域...</p>

    <template #actions>
      <my-button size="small" plain>取消</my-button>
      <my-button size="small" type="primary">确认</my-button>
    </template>

    <template #footer>
      <span>最后更新于 2025-12-18</span>
    </template>
  </my-card>
</template>
```

  </template>
</DemoBlock>

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 卡片标题 | `string` | — |
| subtitle | 卡片副标题 | `string` | — |
| shadow | 阴影显示时机 | `'always' \| 'hover' \| 'never'` | `'always'` |
| bordered | 是否显示边框 | `boolean` | `true` |
| headerBordered | 是否显示 header 底部边界线 | `boolean` | `true` |
| padding | 卡片统一内边距 | `string \| number` | `'20px'` |
| headerPadding | header 区域内边距 | `string \| number` | — |
| bodyPadding | body 区域内边距 | `string \| number` | — |
| footerPadding | footer 区域内边距 | `string \| number` | — |
| borderRadius | 卡片圆角 | `string \| number` | `8px` |
| width | 卡片宽度 | `string \| number` | — |
| height | 卡片高度 | `string \| number` | — |
| hoverable | 是否启用悬停升起效果 | `boolean` | `false` |
| loading | 是否处于加载状态 (显示骨架屏) | `boolean` | `false` |
| size | 卡片尺寸 | `'small' \| 'default' \| 'large'` | `'default'` |
| disabled | 是否禁用交互 | `boolean` | `false` |
| headerStyle | 自定义 header 样式 | `CSSProperties` | — |
| bodyStyle | 自定义 body 样式 | `CSSProperties` | — |
| footerStyle | 自定义 footer 样式 | `CSSProperties` | — |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| click | 点击卡片时触发 | `(event: MouseEvent)` |
| dblclick | 双击卡片时触发 | `(event: MouseEvent)` |
| mouseenter | 鼠标进入卡片时触发 | `(event: MouseEvent)` |
| mouseleave | 鼠标离开卡片时触发 | `(event: MouseEvent)` |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 卡片主要内容 |
| title | 自定义标题内容 |
| subtitle | 自定义副标题内容 |
| extra | 头部右侧额外区域 |
| cover | 卡片封面区域 (通常放置图片) |
| actions | 底部操作按钮区域 |
| footer | 卡片页脚区域 |
| loading | 自定义加载状态内容 |

## CSS 变量

可以通过覆盖以下 CSS 变量来自定义卡片样式：

| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| `--card-bg` | 卡片背景色 | `#fff` |
| `--card-border-color` | 边框颜色 | `#e4e7ed` |
| `--card-border-radius` | 圆角大小 | `8px` |
| `--card-color` | 正文文字颜色 | `#333` |
| `--card-font-size` | 正文字体大小 | `14px` |
| `--card-shadow` | 默认阴影 | `0 2px 12px 0 rgba(0,0,0,0.1)` |
| `--card-shadow-hover` | 悬停时的阴影 | `0 2px 8px 0 rgba(0,0,0,0.06)` |
| `--card-header-padding` | 头部内边距 | `20px 20px 0 20px` |
| `--card-header-border-color`| 头部下边框颜色 | `#f2f6fc` |
| `--card-title-font-size` | 标题字体大小 | `16px` |
| `--card-title-color` | 标题文字颜色 | `#303133` |
| `--card-subtitle-color` | 副标题文字颜色 | `#606266` |
| `--card-body-padding` | 内容区域内边距 | `0 20px 20px 20px` |
| `--card-actions-padding` | 操作区域内边距 | `12px 20px` |
| `--card-footer-padding` | 页脚区域内边距 | `12px 20px` |

## 主题定制

你可以通过 CSS 变量轻松实现卡片的主题化：

```css
/* 现代深色风格卡片 */
.dark-card {
  --card-bg: #1a1a1a;
  --card-color: #eee;
  --card-title-color: #fff;
  --card-border-color: #333;
  --card-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
}
```

## TypeScript

```typescript
import type { CardProps, CardEmits, CardSlots } from 'one-wish'

// 在组件中使用类型
const props: CardProps = {
  title: 'My Card',
  hoverable: true
}
```

<script setup>
import { ref } from 'vue'
const isLoading = ref(true)
const activeTab = ref('tab1')
const tabList = [
  { label: '页签 1', key: 'tab1' },
  { label: '页签 2', key: 'tab2' }
]
</script>
