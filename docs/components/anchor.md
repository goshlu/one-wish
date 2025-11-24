# Anchor 锚点

为页面内的标题生成可快速跳转的导航。

## 基础用法

通过 `items` 配置锚点列表，点击或滚动都会同步高亮。

<DemoBlock>
  <template #default>
    <div style="display: flex; gap: 16px; align-items: flex-start;">
      <div style="flex: 1; height: 220px; padding: 12px; border: 1px dashed #d9d9d9; border-radius: 8px; overflow: auto;">
        <h3 id="section-1" style="margin-top: 0;">章节一</h3>
        <p>这里放一些示例内容。</p>
        <h3 id="section-2">章节二</h3>
        <p>这里放一些示例内容。</p>
        <h3 id="section-3">章节三</h3>
        <p>这里放一些示例内容。</p>
      </div>
      <div style="width: 180px;">
        <my-anchor :items="anchorItems" />
      </div>
    </div>
  </template>

  <template #code>

  ```vue
  <script setup lang="ts">
  const anchorItems = [
    { href: '#section-1', title: '章节一' },
    { href: '#section-2', title: '章节二' },
    { href: '#section-3', title: '章节三' },
  ]
  </script>

  <template>
    <div class="container">
      <div class="content">
        <h3 id="section-1">章节一</h3>
        <h3 id="section-2">章节二</h3>
        <h3 id="section-3">章节三</h3>
      </div>
      <my-anchor :items="anchorItems" />
    </div>
  </template>
  ```

  </template>
</DemoBlock>

## API

### Anchor Props

| 属性   | 说明         | 类型                        | 默认值 |
| ------ | ------------ | --------------------------- | ------ |
| items  | 锚点列表     | `{ href: string; title: string }[]` | `[]`   |
| offset | 激活偏移距离 | `number`                    | `80`   |

### Anchor Events

| 事件名 | 说明           | 回调参数     |
| ------ | -------------- | ------------ |
| select | 点击时触发     | `href: string` |

<script setup lang="ts">
const anchorItems = [
  { href: '#section-1', title: '章节一' },
  { href: '#section-2', title: '章节二' },
  { href: '#section-3', title: '章节三' },
]
</script>
