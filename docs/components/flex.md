# Flex 弹性布局

基于 Flexbox 的弹性布局组件。

## 基础用法

最简单的用法。

<DemoBlock>
  <my-flex gap="16">
    <div style="flex: 1; padding: 16px; background-color: #f0f0f0; border-radius: 4px;">Item 1</div>
    <div style="flex: 1; padding: 16px; background-color: #f0f0f0; border-radius: 4px;">Item 2</div>
    <div style="flex: 1; padding: 16px; background-color: #f0f0f0; border-radius: 4px;">Item 3</div>
  </my-flex>

  <template #code>

  ```vue
  <template>
    <my-flex gap="16">
      <div>Item 1</div>
      <div>Item 2</div>
      <div>Item 3</div>
    </my-flex>
  </template>
  ```

  </template>
</DemoBlock>

## 方向

支持行和列两种方向。

<DemoBlock>
  <template #default>
    <div style="display: flex; gap: 32px;">
      <div style="flex: 1;">
        <p style="margin: 0 0 8px 0; font-size: 12px; color: #666;">Row (默认)</p>
        <div style="display: flex; gap: 8px;">
          <div style="padding: 8px 16px; background-color: #f0f0f0; border-radius: 4px;">A</div>
          <div style="padding: 8px 16px; background-color: #f0f0f0; border-radius: 4px;">B</div>
          <div style="padding: 8px 16px; background-color: #f0f0f0; border-radius: 4px;">C</div>
        </div>
      </div>
      <div style="flex: 1;">
        <p style="margin: 0 0 8px 0; font-size: 12px; color: #666;">Column</p>
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <div style="padding: 8px 16px; background-color: #f0f0f0; border-radius: 4px;">A</div>
          <div style="padding: 8px 16px; background-color: #f0f0f0; border-radius: 4px;">B</div>
          <div style="padding: 8px 16px; background-color: #f0f0f0; border-radius: 4px;">C</div>
        </div>
      </div>
    </div>
  </template>

  <template #code>

  ```vue
  <template>
    <!-- 行方向 -->
    <my-flex direction="row" gap="8">
      <div>A</div>
      <div>B</div>
      <div>C</div>
    </my-flex>

    <!-- 列方向 -->
    <my-flex direction="column" gap="8">
      <div>A</div>
      <div>B</div>
      <div>C</div>
    </my-flex>
  </template>
  ```

  </template>
</DemoBlock>

## 对齐方式

支持主轴和交叉轴对齐。

<DemoBlock>
  <template #default>
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <div>
        <p style="margin: 0 0 8px 0; font-size: 12px; color: #666;">justify="center"</p>
        <div style="display: flex; justify-content: center; gap: 8px; padding: 16px; background-color: #f5f5f5; border-radius: 4px;">
          <div style="padding: 8px 16px; background-color: #f0f0f0; border-radius: 4px;">A</div>
          <div style="padding: 8px 16px; background-color: #f0f0f0; border-radius: 4px;">B</div>
        </div>
      </div>
      <div>
        <p style="margin: 0 0 8px 0; font-size: 12px; color: #666;">justify="space-between"</p>
        <div style="display: flex; justify-content: space-between; gap: 8px; padding: 16px; background-color: #f5f5f5; border-radius: 4px;">
          <div style="padding: 8px 16px; background-color: #f0f0f0; border-radius: 4px;">A</div>
          <div style="padding: 8px 16px; background-color: #f0f0f0; border-radius: 4px;">B</div>
        </div>
      </div>
    </div>
  </template>

  <template #code>

  ```vue
  <template>
    <!-- 主轴居中 -->
    <my-flex justify="center">
      <div>A</div>
      <div>B</div>
    </my-flex>

    <!-- 主轴两端对齐 -->
    <my-flex justify="space-between">
      <div>A</div>
      <div>B</div>
    </my-flex>
  </template>
  ```

  </template>
</DemoBlock>

## API

### Flex Props

| 属性      | 说明         | 类型                                                                                    | 默认值       |
| --------- | ------------ | --------------------------------------------------------------------------------------- | ------------ |
| direction | 弹性方向     | `'row'` / `'column'` / `'row-reverse'` / `'column-reverse'`                             | `'row'`      |
| justify   | 主轴对齐方式 | `'flex-start'` / `'flex-end'` / `'center'` / `'space-between'` / `'space-around'` / `'space-evenly'` | `'flex-start'` |
| align     | 交叉轴对齐   | `'flex-start'` / `'flex-end'` / `'center'` / `'stretch'` / `'baseline'`                 | `'stretch'`  |
| wrap      | 换行方式     | `'nowrap'` / `'wrap'` / `'wrap-reverse'`                                                | `'nowrap'`   |
| gap       | 间距         | `string` / `number`                                                                     | —            |
| tag       | 自定义标签   | `string`                                                                                | `'div'`      |
