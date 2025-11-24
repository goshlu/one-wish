# FloatButton 悬浮按钮

悬浮在页面上的操作按钮。

> 说明：为了避免示例跑到全局视口，所有 Demo 都在 `position: relative` 的容器内，并通过 `mode="absolute"`（或行内样式）让组件只在容器内定位。

## 基础用法

最简单的用法，点击返回顶部。

<DemoBlock>
  <template #default>
    <div style="position: relative; display: flex; align-items: center; justify-content: center; width: 100%; height: 200px; border: 1px dashed #ccc; border-radius: 4px;">
      <my-float-button
        mode="absolute"
        icon="^"
        tooltip="返回顶部"
        @click="() => window.scrollTo({ top: 0, behavior: 'smooth' })"
      />
    </div>
  </template>

  <template #code>

  ```vue
  <script setup lang="ts">
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  </script>

  <template>
    <my-float-button icon="^" tooltip="返回顶部" @click="scrollToTop" />
  </template>
  ```

  </template>
</DemoBlock>

## 不同类型

提供 default 和 primary 两种类型。

<DemoBlock>
  <template #default>
    <div style="position: relative; width: 100%; height: 200px; border: 1px dashed #ccc; border-radius: 4px;">
      <my-float-button mode="absolute" icon="i" style="top: 24px; left: 24px;" />
      <my-float-button mode="absolute" type="primary" icon="*" style="top: 24px; left: 96px;" />
    </div>
  </template>

  <template #code>

  ```vue
  <template>
    <!-- 默认类型 -->
    <my-float-button mode="absolute" icon="i" />

    <!-- 主要类型 -->
    <my-float-button mode="absolute" type="primary" icon="*" />
  </template>
  ```

  </template>
</DemoBlock>

## 不同形状

提供圆形和方形两种形状。

<DemoBlock>
  <template #default>
    <div style="position: relative; width: 100%; height: 200px; border: 1px dashed #ccc; border-radius: 4px;">
      <my-float-button mode="absolute" shape="circle" icon="^" style="top: 24px; left: 24px;" />
      <my-float-button mode="absolute" shape="square" icon="^" style="top: 24px; left: 96px;" />
    </div>
  </template>

  <template #code>

  ```vue
  <template>
    <!-- 圆形（默认） -->
    <my-float-button mode="absolute" shape="circle" icon="^" />

    <!-- 方形 -->
    <my-float-button mode="absolute" shape="square" icon="^" />
  </template>
  ```

  </template>
</DemoBlock>

## 位置

可以放置在页面的四个角落（示例依然在容器内）。

<DemoBlock>
  <template #default>
    <div style="position: relative; width: 100%; height: 220px; border: 1px dashed #ccc; border-radius: 4px;">
      <my-float-button mode="absolute" position="right-bottom" icon="v" />
      <my-float-button mode="absolute" position="right-top" icon="^" />
      <my-float-button mode="absolute" position="left-bottom" icon="v" />
      <my-float-button mode="absolute" position="left-top" icon="^" />
    </div>
  </template>

  <template #code>

  ```vue
  <template>
    <!-- 右下角（默认） -->
    <my-float-button position="right-bottom" icon="v" />

    <!-- 右上角 -->
    <my-float-button position="right-top" icon="^" />

    <!-- 左下角 -->
    <my-float-button position="left-bottom" icon="v" />

    <!-- 左上角 -->
    <my-float-button position="left-top" icon="^" />
  </template>
  ```

  </template>
</DemoBlock>

## 带描述

可以添加描述文字。

<DemoBlock>
  <template #default>
    <div style="position: relative; width: 100%; height: 180px; border: 1px dashed #ccc; border-radius: 4px;">
      <my-float-button mode="absolute" icon="*" description="反馈" type="primary" />
    </div>
  </template>

  <template #code>

  ```vue
  <template>
    <my-float-button icon="*" description="反馈" type="primary" />
  </template>
  ```

  </template>
</DemoBlock>

## 徽标

可以显示徽标数字或文字。

<DemoBlock>
  <template #default>
    <div style="position: relative; width: 100%; height: 200px; border: 1px dashed #ccc; border-radius: 4px;">
      <my-float-button mode="absolute" icon="!" :badge="5" tooltip="通知" style="top: 24px; left: 24px;" />
      <my-float-button mode="absolute" icon="@" badge="NEW" tooltip="消息" style="top: 24px; left: 96px;" />
    </div>
  </template>

  <template #code>

  ```vue
  <template>
    <my-float-button icon="!" :badge="5" tooltip="通知" />

    <my-float-button icon="@" badge="NEW" tooltip="消息" />
  </template>
  ```

  </template>
</DemoBlock>

## 悬浮按钮组

使用 `MyFloatButtonGroup` 组件可以将多个悬浮按钮组合在一起。为避免全局定位，示例通过行内样式覆盖为容器内绝对定位。

### 点击触发

<DemoBlock>
  <template #default>
    <div style="position: relative; width: 100%; height: 260px; border: 1px dashed #ccc; border-radius: 4px;">
      <my-float-button-group style="position: absolute; right: 24px; bottom: 24px;">
        <my-float-button icon="E" description="编辑" />
        <my-float-button icon="S" description="保存" />
        <my-float-button icon="D" description="删除" />
      </my-float-button-group>
    </div>
  </template>

  <template #code>

  ```vue
  <script setup lang="ts">
  const handleEdit = () => console.log('编辑')
  const handleSave = () => console.log('保存')
  const handleDelete = () => console.log('删除')
  </script>

  <template>
    <my-float-button-group style="position: absolute; right: 24px; bottom: 24px;">
      <my-float-button icon="E" description="编辑" @click="handleEdit" />
      <my-float-button icon="S" description="保存" @click="handleSave" />
      <my-float-button icon="D" description="删除" @click="handleDelete" />
    </my-float-button-group>
  </template>
  ```

  </template>
</DemoBlock>

### 悬停触发

<DemoBlock>
  <template #default>
    <div style="position: relative; width: 100%; height: 260px; border: 1px dashed #ccc; border-radius: 4px;">
      <my-float-button-group trigger="hover" style="position: absolute; right: 24px; bottom: 24px;">
        <my-float-button icon="E" description="编辑" />
        <my-float-button icon="S" description="保存" />
        <my-float-button icon="D" description="删除" />
      </my-float-button-group>
    </div>
  </template>

  <template #code>

  ```vue
  <template>
    <my-float-button-group trigger="hover" style="position: absolute; right: 24px; bottom: 24px;">
      <my-float-button icon="E" description="编辑" />
      <my-float-button icon="S" description="保存" />
      <my-float-button icon="D" description="删除" />
    </my-float-button-group>
  </template>
  ```

  </template>
</DemoBlock>

## API

### FloatButton Props

| 属性        | 说明         | 类型                | 可选值                                                      | 默认值          |
| ----------- | ------------ | ------------------- | ----------------------------------------------------------- | -------------- |
| type        | 按钮类型     | `string`            | `primary` / `default`                                       | `default`      |
| shape       | 按钮形状     | `string`            | `circle` / `square`                                         | `circle`       |
| position    | 按钮位置     | `string`            | `right-bottom` / `right-top` / `left-bottom` / `left-top`   | `right-bottom` |
| mode        | 定位模式     | `string`            | `fixed` / `absolute`                                        | `fixed`        |
| icon        | 图标内容     | `string`            | —                                                           | —              |
| description | 描述文字     | `string`            | —                                                           | —              |
| tooltip     | 提示文字     | `string`            | —                                                           | —              |
| href        | 链接地址     | `string`            | —                                                           | —              |
| target      | 链接打开方式 | `string`            | `_blank` / `_self` / `_parent` / `_top`                     | —              |
| badge       | 徽标内容     | `number` / `string` | —                                                           | —              |
| disabled    | 是否禁用     | `boolean`           | —                                                           | `false`        |

### FloatButton Events

| 事件名 | 说明           | 回调参数              |
| ------ | -------------- | --------------------- |
| click  | 点击按钮时触发 | `(event: MouseEvent)` |

### FloatButtonGroup Props

| 属性     | 说明     | 类型      | 可选值                                                      | 默认值          |
| -------- | -------- | --------- | ----------------------------------------------------------- | -------------- |
| type     | 按钮类型 | `string`  | `primary` / `default`                                       | `default`      |
| shape    | 按钮形状 | `string`  | `circle` / `square`                                         | `circle`       |
| position | 按钮位置 | `string`  | `right-bottom` / `right-top` / `left-bottom` / `left-top`   | `right-bottom` |
| trigger  | 触发方式 | `string`  | `click` / `hover`                                           | `click`        |

### FloatButtonGroup Slots

| 插槽名  | 说明                                  |
| ------ | ------------------------------------- |
| default | 悬浮按钮（只能放置 MyFloatButton 组件） |

## TypeScript

```typescript
import type {
  FloatButtonProps,
  FloatButtonEmits,
  FloatButtonType,
  FloatButtonShape,
  FloatButtonPosition,
  FloatButtonGroupProps,
} from 'vue3-component-library'
```
