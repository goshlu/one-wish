# Layout 布局

页面布局容器组件。

## 基础用法

最简单的用法。

<DemoBlock>
  <my-layout style="height: 300px; border: 1px solid #ddd; border-radius: 4px; overflow: hidden;">
    <my-layout-header style="padding: 16px; background-color: #f5f5f5;">Header</my-layout-header>
    <div style="display: flex; flex: 1; overflow: hidden;">
      <my-layout-sider style="padding: 16px; background-color: #fafafa;">Sider</my-layout-sider>
      <my-layout-content style="padding: 16px; background-color: #fff;">Content</my-layout-content>
    </div>
    <my-layout-footer style="padding: 16px; background-color: #f5f5f5;">Footer</my-layout-footer>
  </my-layout>

  <template #code>

  ```vue
  <template>
    <my-layout>
      <my-layout-header>Header</my-layout-header>
      <div style="display: flex; flex: 1;">
        <my-layout-sider>Sider</my-layout-sider>
        <my-layout-content>Content</my-layout-content>
      </div>
      <my-layout-footer>Footer</my-layout-footer>
    </my-layout>
  </template>
  ```

  </template>
</DemoBlock>

## 侧边栏布局

常见的侧边栏布局。

<DemoBlock>
  <my-layout style="height: 300px; border: 1px solid #ddd; border-radius: 4px; overflow: hidden;">
    <my-layout-header style="padding: 16px; background-color: #f5f5f5;">Header</my-layout-header>
    <div style="display: flex; flex: 1; overflow: hidden;">
      <my-layout-sider :width="200" style="padding: 16px; background-color: #fafafa;">
        <div style="padding: 8px 0; cursor: pointer;">Menu 1</div>
        <div style="padding: 8px 0; cursor: pointer;">Menu 2</div>
        <div style="padding: 8px 0; cursor: pointer;">Menu 3</div>
      </my-layout-sider>
      <my-layout-content style="padding: 16px; background-color: #fff;">Main Content</my-layout-content>
    </div>
  </my-layout>

  <template #code>

  ```vue
  <template>
    <my-layout>
      <my-layout-header>Header</my-layout-header>
      <div style="display: flex; flex: 1;">
        <my-layout-sider :width="200">
          <div>Menu 1</div>
          <div>Menu 2</div>
          <div>Menu 3</div>
        </my-layout-sider>
        <my-layout-content>Main Content</my-layout-content>
      </div>
    </my-layout>
  </template>
  ```

  </template>
</DemoBlock>

## API

### Layout Props

| 属性 | 说明       | 类型     | 默认值  |
| ---- | ---------- | -------- | ------- |
| tag  | 自定义标签 | `string` | `'div'` |

### LayoutHeader Props

| 属性 | 说明       | 类型     | 默认值     |
| ---- | ---------- | -------- | ---------- |
| tag  | 自定义标签 | `string` | `'header'` |

### LayoutSider Props

| 属性       | 说明       | 类型                | 默认值    |
| ---------- | ---------- | ------------------- | --------- |
| width      | 宽度       | `string` / `number` | `'200px'` |
| collapsible | 是否可折叠 | `boolean`           | `false`   |
| collapsed  | 是否已折叠 | `boolean`           | `false`   |
| tag        | 自定义标签 | `string`            | `'aside'` |

### LayoutContent Props

| 属性 | 说明       | 类型     | 默认值   |
| ---- | ---------- | -------- | -------- |
| tag  | 自定义标签 | `string` | `'main'` |

### LayoutFooter Props

| 属性 | 说明       | 类型     | 默认值     |
| ---- | ---------- | -------- | ---------- |
| tag  | 自定义标签 | `string` | `'footer'` |
