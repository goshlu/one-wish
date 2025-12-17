# Avatar 头像

头像组件，用于展示用户头像、图标或文字。

## 基础用法

最简单的用法，传入图片地址即可显示头像。

<DemoBlock>
  <div style="display: flex; gap: 16px; align-items: center; margin-bottom: 16px;">
    <my-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
    <my-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" shape="square" />
    <my-avatar>U</my-avatar>
    <my-avatar>
      <my-icon icon="user" />
    </my-avatar>
  </div>

  <template #code>

  ```vue
  <template>
    <my-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
    <my-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" shape="square" />
    <my-avatar>U</my-avatar>
    <my-avatar>
      <my-icon icon="user" />
    </my-avatar>
  </template>
  ```

  </template>
</DemoBlock>

## 三种类型

Avatar 组件支持三种类型：图片、图标和文字。

<DemoBlock>
  <div style="display: flex; gap: 16px; align-items: center;">
    <my-avatar shape="square" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
    <my-avatar shape="circle" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
    <my-avatar shape="square">
      <my-icon icon="user" />
    </my-avatar>
    <my-avatar shape="circle">
      <my-icon icon="user" />
    </my-avatar>
  </div>

  <template #code>

  ```vue
  <template>
    <my-avatar shape="square" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
    <my-avatar shape="circle" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
    <my-avatar shape="square">
      <my-icon icon="user" />
    </my-avatar>
    <my-avatar shape="circle">
      <my-icon icon="user" />
    </my-avatar>
  </template>
  ```

  </template>
</DemoBlock>

## 尺寸

Avatar 提供了三种预设尺寸：`small`、`default`、`large`，也可以通过 `size` 属性自定义尺寸。

<DemoBlock>
  <div style="display: flex; gap: 16px; align-items: center;">
    <my-avatar :size="64" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
    <my-avatar size="large" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
    <my-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
    <my-avatar size="small" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
  </div>

  <template #code>

  ```vue
  <template>
    <my-avatar :size="64" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
    <my-avatar size="large" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
    <my-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
    <my-avatar size="small" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
  </template>
  ```

  </template>
</DemoBlock>

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| src | 图片地址 | `string` | - |
| alt | 图片 alt 属性 | `string` | - |
| size | 头像尺寸 | `number \| 'small' \| 'default' \| 'large'` | `'default'` |
| shape | 头像形状 | `'circle' \| 'square'` | `'circle'` |
| icon | 图标组件 | `Component` | - |
| fallback | 加载失败时显示的内容 | `string` | - |

### Events

| 事件名 | 说明 | 类型 |
| --- | --- | --- |
| load | 图片加载成功时触发 | `(e: Event) => void` |
| error | 图片加载失败时触发 | `(e: Event) => void` |

### CSS Variables

| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| `--avatar-bg` | 头像背景色 | `#f5f5f5` |
| `--avatar-text-color` | 文字颜色 | `#666` |
| `--avatar-border-radius` | 边框圆角 | `50%` |
| `--avatar-font-size` | 字体大小 | `18px` |

## 主题定制

Avatar 组件使用 CSS 变量来定义样式，你可以通过覆盖这些变量来自定义主题：

```css
.my-avatar {
  --avatar-bg: #e6f7ff;
  --avatar-text-color: #1890ff;
  --avatar-border-radius: 8px;
  --avatar-font-size: 20px;
}
