# Splitter 分隔面板

可拖拽分隔的面板组件。

## 基础用法

最简单的用法。

<DemoBlock>
  <my-splitter style="height: 300px; border: 1px solid #ddd; border-radius: 4px;">
    <my-splitter-pane style="padding: 16px; background-color: #f5f5f5;">
      <p style="margin: 0;">Pane 1</p>
    </my-splitter-pane>
    <my-splitter-pane style="padding: 16px; background-color: #fff;">
      <p style="margin: 0;">Pane 2</p>
    </my-splitter-pane>
  </my-splitter>

  <template #code>

  ```vue
  <template>
    <my-splitter>
      <my-splitter-pane>Pane 1</my-splitter-pane>
      <my-splitter-pane>Pane 2</my-splitter-pane>
    </my-splitter>
  </template>
  ```

  </template>
</DemoBlock>

## 方向

支持水平和垂直两种分隔方向。

<DemoBlock>
  <template #default>
    <div style="display: flex; gap: 16px;">
      <div style="flex: 1;">
        <p style="margin: 0 0 8px 0; font-size: 12px; color: #666;">Horizontal (默认)</p>
        <my-splitter style="height: 150px; border: 1px solid #ddd; border-radius: 4px;">
          <my-splitter-pane style="padding: 12px; background-color: #f5f5f5;">Pane 1</my-splitter-pane>
          <my-splitter-pane style="padding: 12px; background-color: #fff;">Pane 2</my-splitter-pane>
        </my-splitter>
      </div>
      <div style="flex: 1;">
        <p style="margin: 0 0 8px 0; font-size: 12px; color: #666;">Vertical</p>
        <my-splitter direction="vertical" style="height: 150px; border: 1px solid #ddd; border-radius: 4px;">
          <my-splitter-pane style="padding: 12px; background-color: #f5f5f5;">Pane 1</my-splitter-pane>
          <my-splitter-pane style="padding: 12px; background-color: #fff;">Pane 2</my-splitter-pane>
        </my-splitter>
      </div>
    </div>
  </template>

  <template #code>

  ```vue
  <template>
    <!-- 水平分隔 -->
    <my-splitter direction="horizontal">
      <my-splitter-pane>Pane 1</my-splitter-pane>
      <my-splitter-pane>Pane 2</my-splitter-pane>
    </my-splitter>

    <!-- 垂直分隔 -->
    <my-splitter direction="vertical">
      <my-splitter-pane>Pane 1</my-splitter-pane>
      <my-splitter-pane>Pane 2</my-splitter-pane>
    </my-splitter>
  </template>
  ```

  </template>
</DemoBlock>

## 多个面板

支持多个面板分隔。

<DemoBlock>
  <template #default>
    <my-splitter style="height: 250px; border: 1px solid #ddd; border-radius: 4px;">
      <my-splitter-pane style="padding: 12px; background-color: #f5f5f5; overflow: auto;">Pane 1</my-splitter-pane>
      <my-splitter-pane style="padding: 12px; background-color: #fff; overflow: auto;">Pane 2</my-splitter-pane>
      <my-splitter-pane style="padding: 12px; background-color: #f5f5f5; overflow: auto;">Pane 3</my-splitter-pane>
    </my-splitter>
  </template>

  <template #code>

  ```vue
  <template>
    <my-splitter>
      <my-splitter-pane>Pane 1</my-splitter-pane>
      <my-splitter-pane>Pane 2</my-splitter-pane>
      <my-splitter-pane>Pane 3</my-splitter-pane>
    </my-splitter>
  </template>
  ```

  </template>
</DemoBlock>

## API

### Splitter Props

| 属性      | 说明       | 类型                      | 默认值         |
| --------- | ---------- | ------------------------- | -------------- |
| direction | 分隔方向   | `'horizontal'` / `'vertical'` | `'horizontal'` |
| tag       | 自定义标签 | `string`                  | `'div'`        |

### SplitterPane Props

| 属性      | 说明       | 类型                | 默认值  |
| --------- | ---------- | ------------------- | ------- |
| size      | 面板大小   | `string` / `number` | —       |
| minSize   | 最小大小   | `string` / `number` | —       |
| maxSize   | 最大大小   | `string` / `number` | —       |
| resizable | 是否可拖拽 | `boolean`           | `true`  |
| tag       | 自定义标签 | `string`            | `'div'` |
