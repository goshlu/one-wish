# Button 按钮

常用的操作按钮。

## 基础用法

使用 `type`、`plain` 和 `round` 属性来定义按钮的样式。

<DemoBlock>
  <div style="display: flex; gap: 8px; flex-wrap: wrap;">
    <my-button>默认按钮</my-button>
    <my-button type="primary">主要按钮</my-button>
    <my-button type="success">成功按钮</my-button>
    <my-button type="warning">警告按钮</my-button>
    <my-button type="danger">危险按钮</my-button>
    <my-button type="info">信息按钮</my-button>
  </div>

  <template #code>

  ```vue
  <template>
    <my-button>默认按钮</my-button>
    <my-button type="primary">主要按钮</my-button>
    <my-button type="success">成功按钮</my-button>
    <my-button type="warning">警告按钮</my-button>
    <my-button type="danger">危险按钮</my-button>
    <my-button type="info">信息按钮</my-button>
  </template>
  ```

  </template>
</DemoBlock>

## 朴素按钮

使用 `plain` 属性创建朴素按钮。

<DemoBlock>
  <div style="display: flex; gap: 8px; flex-wrap: wrap;">
    <my-button plain>朴素按钮</my-button>
    <my-button type="primary" plain>主要按钮</my-button>
    <my-button type="success" plain>成功按钮</my-button>
    <my-button type="warning" plain>警告按钮</my-button>
    <my-button type="danger" plain>危险按钮</my-button>
    <my-button type="info" plain>信息按钮</my-button>
  </div>

  <template #code>

  ```vue
  <template>
    <my-button plain>朴素按钮</my-button>
    <my-button type="primary" plain>主要按钮</my-button>
    <my-button type="success" plain>成功按钮</my-button>
    <my-button type="warning" plain>警告按钮</my-button>
    <my-button type="danger" plain>危险按钮</my-button>
    <my-button type="info" plain>信息按钮</my-button>
  </template>
  ```

  </template>
</DemoBlock>

## 圆角按钮

使用 `round` 属性创建圆角按钮。

<DemoBlock>
  <div style="display: flex; gap: 8px; flex-wrap: wrap;">
    <my-button round>圆角按钮</my-button>
    <my-button type="primary" round>主要按钮</my-button>
    <my-button type="success" round>成功按钮</my-button>
  </div>

  <template #code>

  ```vue
  <template>
    <my-button round>圆角按钮</my-button>
    <my-button type="primary" round>主要按钮</my-button>
    <my-button type="success" round>成功按钮</my-button>
  </template>
  ```

  </template>
</DemoBlock>

## 不同尺寸

提供三种尺寸：large、default、small。

<DemoBlock>
  <div style="display: flex; gap: 8px; flex-wrap: wrap;">
    <my-button size="large" type="primary">大型按钮</my-button>
    <my-button type="primary">默认按钮</my-button>
    <my-button size="small" type="primary">小型按钮</my-button>
  </div>

  <template #code>

  ```vue
  <template>
    <my-button size="large" type="primary">大型按钮</my-button>
    <my-button type="primary">默认按钮</my-button>
    <my-button size="small" type="primary">小型按钮</my-button>
  </template>
  ```

  </template>
</DemoBlock>

## 禁用状态

使用 `disabled` 属性来定义按钮是否被禁用。

<DemoBlock>
  <div style="display: flex; gap: 8px; flex-wrap: wrap;">
    <my-button disabled>默认按钮</my-button>
    <my-button type="primary" disabled>主要按钮</my-button>
  </div>

  <template #code>

  ```vue
  <template>
    <my-button disabled>默认按钮</my-button>
    <my-button type="primary" disabled>主要按钮</my-button>
  </template>
  ```

  </template>
</DemoBlock>

## 加载状态

使用 `loading` 属性来定义按钮的加载状态。

<DemoBlock>
  <div style="display: flex; gap: 8px; flex-wrap: wrap;">
    <my-button type="primary" loading>加载中</my-button>
    <my-button type="success" loading>加载中</my-button>
  </div>

  <template #code>

  ```vue
  <template>
    <my-button type="primary" loading>加载中</my-button>
    <my-button type="success" loading>加载中</my-button>
  </template>
  ```

  </template>
</DemoBlock>

## API

### Props

| 属性     | 说明         | 类型      | 可选值                                                            | 默认值    |
| -------- | ------------ | --------- | ----------------------------------------------------------------- | --------- |
| type     | 按钮类型     | `string`  | `primary` / `success` / `warning` / `danger` / `info` / `default` | `default` |
| size     | 按钮尺寸     | `string`  | `large` / `default` / `small`                                     | `default` |
| nativeType | 原生 `type` 属性 | `string` | `button` / `submit` / `reset` | `button` |
| disabled | 是否禁用     | `boolean` | —                                                                 | `false`   |
| loading  | 是否加载中   | `boolean` | —                                                                 | `false`   |
| round    | 是否圆角按钮 | `boolean` | —                                                                 | `false`   |
| plain    | 是否朴素按钮 | `boolean` | —                                                                 | `false`   |

### Events

| 事件名 | 说明           | 回调参数              |
| ------ | -------------- | --------------------- |
| click  | 点击按钮时触发 | `(event: MouseEvent)` |

### Slots

| 插槽名  | 说明     |
| ------- | -------- |
| default | 按钮内容 |

## TypeScript

```typescript
import type {
  ButtonProps,
  ButtonEmits,
  ButtonType,
  ButtonSize,
} from 'vue3-component-library'
```
