# Masonry 瀑布流

瀑布流布局组件。

## 基础用法

最简单的用法。

<DemoBlock>
  <my-masonry :columns="3" gap="16">
    <div style="padding: 16px; background-color: #f0f0f0; border-radius: 4px; text-align: center; height: 100px; display: flex; align-items: center; justify-content: center;">Item 1</div>
    <div style="padding: 16px; background-color: #f0f0f0; border-radius: 4px; text-align: center; height: 120px; display: flex; align-items: center; justify-content: center;">Item 2</div>
    <div style="padding: 16px; background-color: #f0f0f0; border-radius: 4px; text-align: center; height: 90px; display: flex; align-items: center; justify-content: center;">Item 3</div>
    <div style="padding: 16px; background-color: #f0f0f0; border-radius: 4px; text-align: center; height: 110px; display: flex; align-items: center; justify-content: center;">Item 4</div>
    <div style="padding: 16px; background-color: #f0f0f0; border-radius: 4px; text-align: center; height: 100px; display: flex; align-items: center; justify-content: center;">Item 5</div>
    <div style="padding: 16px; background-color: #f0f0f0; border-radius: 4px; text-align: center; height: 130px; display: flex; align-items: center; justify-content: center;">Item 6</div>
  </my-masonry>

  <template #code>

  ```vue
  <template>
    <my-masonry :columns="3" gap="16">
      <div>Item 1</div>
      <div>Item 2</div>
      <div>Item 3</div>
      <div>Item 4</div>
      <div>Item 5</div>
      <div>Item 6</div>
    </my-masonry>
  </template>
  ```

  </template>
</DemoBlock>

## 不同列数

支持不同的列数配置。

<DemoBlock>
  <template #default>
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <div>
        <p style="margin: 0 0 8px 0; font-size: 12px; color: #666;">2 列</p>
        <my-masonry :columns="2" gap="12">
          <div style="padding: 12px; background-color: #f0f0f0; border-radius: 4px; text-align: center; height: 80px; display: flex; align-items: center; justify-content: center;">A</div>
          <div style="padding: 12px; background-color: #f0f0f0; border-radius: 4px; text-align: center; height: 110px; display: flex; align-items: center; justify-content: center;">B</div>
          <div style="padding: 12px; background-color: #f0f0f0; border-radius: 4px; text-align: center; height: 90px; display: flex; align-items: center; justify-content: center;">C</div>
          <div style="padding: 12px; background-color: #f0f0f0; border-radius: 4px; text-align: center; height: 130px; display: flex; align-items: center; justify-content: center;">D</div>
        </my-masonry>
      </div>
      <div>
        <p style="margin: 0 0 8px 0; font-size: 12px; color: #666;">4 列</p>
        <my-masonry :columns="4" gap="12">
          <div style="padding: 12px; background-color: #f0f0f0; border-radius: 4px; text-align: center; height: 70px; display: flex; align-items: center; justify-content: center;">A</div>
          <div style="padding: 12px; background-color: #f0f0f0; border-radius: 4px; text-align: center; height: 120px; display: flex; align-items: center; justify-content: center;">B</div>
          <div style="padding: 12px; background-color: #f0f0f0; border-radius: 4px; text-align: center; height: 90px; display: flex; align-items: center; justify-content: center;">C</div>
          <div style="padding: 12px; background-color: #f0f0f0; border-radius: 4px; text-align: center; height: 100px; display: flex; align-items: center; justify-content: center;">D</div>
          <div style="padding: 12px; background-color: #f0f0f0; border-radius: 4px; text-align: center; height: 80px; display: flex; align-items: center; justify-content: center;">E</div>
          <div style="padding: 12px; background-color: #f0f0f0; border-radius: 4px; text-align: center; height: 110px; display: flex; align-items: center; justify-content: center;">F</div>
        </my-masonry>
      </div>
    </div>
  </template>

  <template #code>

  ```vue
  <template>
    <!-- 2 列 -->
    <my-masonry :columns="2" gap="12">
      <div>A</div>
      <div>B</div>
      <div>C</div>
      <div>D</div>
    </my-masonry>

    <!-- 4 列 -->
    <my-masonry :columns="4" gap="12">
      <div>A</div>
      <div>B</div>
      <div>C</div>
      <div>D</div>
      <div>E</div>
      <div>F</div>
    </my-masonry>
  </template>
  ```

  </template>
</DemoBlock>

## API

### Masonry Props

| 属性    | 说明       | 类型                | 默认值  |
| ------- | ---------- | ------------------- | ------- |
| columns | 列数       | `number`            | `3`     |
| gap     | 间距       | `string` / `number` | `16`    |
| tag     | 自定义标签 | `string`            | `'div'` |
