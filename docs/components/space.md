# Space 间距

用于控制元素之间间距的组件。

## 基础用法

最简单的用法。

<DemoBlock>
  <my-space>
    <button style="padding: 8px 16px; border: 1px solid #ddd; border-radius: 4px; cursor: pointer;">Button 1</button>
    <button style="padding: 8px 16px; border: 1px solid #ddd; border-radius: 4px; cursor: pointer;">Button 2</button>
    <button style="padding: 8px 16px; border: 1px solid #ddd; border-radius: 4px; cursor: pointer;">Button 3</button>
  </my-space>

  <template #code>

  ```vue
  <template>
    <my-space>
      <button>Button 1</button>
      <button>Button 2</button>
      <button>Button 3</button>
    </my-space>
  </template>
  ```

  </template>
</DemoBlock>

## 方向

支持水平和垂直两种方向。

<DemoBlock>
  <template #default>
    <div style="display: flex; gap: 32px;">
      <div style="flex: 1;">
        <p style="margin: 0 0 8px 0; font-size: 12px; color: #666;">Horizontal (默认)</p>
        <div style="display: flex; gap: 8px;">
          <span style="padding: 4px 8px; background-color: #f0f0f0; border-radius: 4px;">Item 1</span>
          <span style="padding: 4px 8px; background-color: #f0f0f0; border-radius: 4px;">Item 2</span>
          <span style="padding: 4px 8px; background-color: #f0f0f0; border-radius: 4px;">Item 3</span>
        </div>
      </div>
      <div style="flex: 1;">
        <p style="margin: 0 0 8px 0; font-size: 12px; color: #666;">Vertical</p>
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <span style="padding: 4px 8px; background-color: #f0f0f0; border-radius: 4px;">Item 1</span>
          <span style="padding: 4px 8px; background-color: #f0f0f0; border-radius: 4px;">Item 2</span>
          <span style="padding: 4px 8px; background-color: #f0f0f0; border-radius: 4px;">Item 3</span>
        </div>
      </div>
    </div>
  </template>

  <template #code>

  ```vue
  <template>
    <!-- 水平方向 -->
    <my-space direction="horizontal">
      <span>Item 1</span>
      <span>Item 2</span>
      <span>Item 3</span>
    </my-space>

    <!-- 垂直方向 -->
    <my-space direction="vertical">
      <span>Item 1</span>
      <span>Item 2</span>
      <span>Item 3</span>
    </my-space>
  </template>
  ```

  </template>
</DemoBlock>

## 间距大小

支持自定义间距大小。

<DemoBlock>
  <template #default>
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <div>
        <p style="margin: 0 0 8px 0; font-size: 12px; color: #666;">size="8"</p>
        <div style="display: flex; gap: 8px;">
          <span style="padding: 4px 8px; background-color: #f0f0f0; border-radius: 4px;">A</span>
          <span style="padding: 4px 8px; background-color: #f0f0f0; border-radius: 4px;">B</span>
          <span style="padding: 4px 8px; background-color: #f0f0f0; border-radius: 4px;">C</span>
        </div>
      </div>
      <div>
        <p style="margin: 0 0 8px 0; font-size: 12px; color: #666;">size="16"</p>
        <div style="display: flex; gap: 16px;">
          <span style="padding: 4px 8px; background-color: #f0f0f0; border-radius: 4px;">A</span>
          <span style="padding: 4px 8px; background-color: #f0f0f0; border-radius: 4px;">B</span>
          <span style="padding: 4px 8px; background-color: #f0f0f0; border-radius: 4px;">C</span>
        </div>
      </div>
    </div>
  </template>

  <template #code>

  ```vue
  <template>
    <my-space :size="8">
      <span>A</span>
      <span>B</span>
      <span>C</span>
    </my-space>

    <my-space :size="16">
      <span>A</span>
      <span>B</span>
      <span>C</span>
    </my-space>
  </template>
  ```

  </template>
</DemoBlock>

## API

### Space Props

| 属性      | 说明         | 类型                                                                                    | 默认值         |
| --------- | ------------ | --------------------------------------------------------------------------------------- | -------------- |
| direction | 方向         | `'horizontal'` / `'vertical'`                                                           | `'horizontal'` |
| align     | 对齐方式     | `'start'` / `'end'` / `'center'` / `'baseline'`                                         | `'center'`     |
| justify   | 主轴对齐     | `'flex-start'` / `'flex-end'` / `'center'` / `'space-between'` / `'space-around'` / `'space-evenly'` | —              |
| size      | 间距大小     | `string` / `number` / `[string \| number, string \| number]`                           | `8`            |
| wrap      | 是否换行     | `boolean`                                                                               | `false`        |
| tag       | 自定义标签   | `string`                                                                                | `'div'`        |
