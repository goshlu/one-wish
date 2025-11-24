# Grid 栅格

基于 CSS Grid 的栅格布局组件。

## 基础用法

最简单的用法。

<DemoBlock>
  <my-grid :columns="3" gap="16">
    <div style="padding: 16px; background-color: #f0f0f0; border-radius: 4px; text-align: center;">1</div>
    <div style="padding: 16px; background-color: #f0f0f0; border-radius: 4px; text-align: center;">2</div>
    <div style="padding: 16px; background-color: #f0f0f0; border-radius: 4px; text-align: center;">3</div>
    <div style="padding: 16px; background-color: #f0f0f0; border-radius: 4px; text-align: center;">4</div>
    <div style="padding: 16px; background-color: #f0f0f0; border-radius: 4px; text-align: center;">5</div>
    <div style="padding: 16px; background-color: #f0f0f0; border-radius: 4px; text-align: center;">6</div>
  </my-grid>

  <template #code>

  ```vue
  <template>
    <my-grid :columns="3" gap="16">
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
      <div>5</div>
      <div>6</div>
    </my-grid>
  </template>
  ```

  </template>
</DemoBlock>

## 自定义列数

支持不同的列数配置。

<DemoBlock>
  <template #default>
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <div>
        <p style="margin: 0 0 8px 0; font-size: 12px; color: #666;">2 列</p>
        <my-grid :columns="2" gap="8">
          <div style="padding: 12px; background-color: #f0f0f0; border-radius: 4px; text-align: center;">A</div>
          <div style="padding: 12px; background-color: #f0f0f0; border-radius: 4px; text-align: center;">B</div>
          <div style="padding: 12px; background-color: #f0f0f0; border-radius: 4px; text-align: center;">C</div>
          <div style="padding: 12px; background-color: #f0f0f0; border-radius: 4px; text-align: center;">D</div>
        </my-grid>
      </div>
      <div>
        <p style="margin: 0 0 8px 0; font-size: 12px; color: #666;">4 列</p>
        <my-grid :columns="4" gap="8">
          <div style="padding: 12px; background-color: #f0f0f0; border-radius: 4px; text-align: center;">A</div>
          <div style="padding: 12px; background-color: #f0f0f0; border-radius: 4px; text-align: center;">B</div>
          <div style="padding: 12px; background-color: #f0f0f0; border-radius: 4px; text-align: center;">C</div>
          <div style="padding: 12px; background-color: #f0f0f0; border-radius: 4px; text-align: center;">D</div>
        </my-grid>
      </div>
    </div>
  </template>

  <template #code>

  ```vue
  <template>
    <!-- 2 列 -->
    <my-grid :columns="2" gap="8">
      <div>A</div>
      <div>B</div>
      <div>C</div>
      <div>D</div>
    </my-grid>

    <!-- 4 列 -->
    <my-grid :columns="4" gap="8">
      <div>A</div>
      <div>B</div>
      <div>C</div>
      <div>D</div>
    </my-grid>
  </template>
  ```

  </template>
</DemoBlock>

## API

### Grid Props

| 属性      | 说明         | 类型                | 默认值  |
| --------- | ------------ | ------------------- | ------- |
| columns   | 列数         | `number` / `string` | `12`    |
| rows      | 行数         | `number` / `string` | —       |
| gap       | 间距         | `string` / `number` | —       |
| columnGap | 列间距       | `string` / `number` | —       |
| rowGap    | 行间距       | `string` / `number` | —       |
| autoFlow  | 自动流方向   | `string`            | —       |
| tag       | 自定义标签   | `string`            | `'div'` |
