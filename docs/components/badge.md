# Badge 标记

出现在按钮、图标旁的数字或状态标记。

## 基础用法

展示新消息数量。

<DemoBlock>
  <div style="display: flex; gap: 16px; align-items: center;">
    <my-badge :value="12" class="item">
      <my-button>评论</my-button>
    </my-badge>
    <my-badge :value="3" class="item">
      <my-button>回复</my-button>
    </my-badge>
    <my-badge :value="1" class="item">
      <my-button>评论</my-button>
    </my-badge>
  </div>

  <template #code>

  ```vue
  <template>
    <my-badge :value="12">
      <my-button>评论</my-button>
    </my-badge>
    <my-badge :value="3">
      <my-button>回复</my-button>
    </my-badge>
    <my-badge :value="1">
      <my-button>评论</my-button>
    </my-badge>
  </template>
  ```

  </template>
</DemoBlock>

## 最大值

可自定义最大值。

<DemoBlock>
  <div style="display: flex; gap: 16px; align-items: center;">
    <my-badge :value="200" :max="99" class="item">
      <my-button>评论</my-button>
    </my-badge>
    <my-badge :value="100" :max="10" class="item">
      <my-button>回复</my-button>
    </my-badge>
  </div>

  <template #code>

  ```vue
  <template>
    <my-badge :value="200" :max="99">
      <my-button>评论</my-button>
    </my-badge>
    <my-badge :value="100" :max="10">
      <my-button>回复</my-button>
    </my-badge>
  </template>
  ```

  </template>
</DemoBlock>

## 自定义颜色

可以自定义徽标颜色。

<DemoBlock>
  <div style="display: flex; gap: 16px; align-items: center;">
    <my-badge value="new" color="#42b883" class="item">
      <my-button>绿色</my-button>
    </my-badge>
    <my-badge value="hot" color="#f56c6c" class="item">
      <my-button>红色</my-button>
    </my-badge>
    <my-badge value="new" color="#e6a23c" class="item">
      <my-button>橙色</my-button>
    </my-badge>
  </div>

  <template #code>

  ```vue
  <template>
    <my-badge value="new" color="#42b883">
      <my-button>绿色</my-button>
    </my-badge>
    <my-badge value="hot" color="#f56c6c">
      <my-button>红色</my-button>
    </my-badge>
    <my-badge value="new" color="#e6a23c">
      <my-button>橙色</my-button>
    </my-badge>
  </template>
  ```

  </template>
</DemoBlock>

## 小圆点

以红点的形式标注需要关注的内容。

<DemoBlock>
  <div style="display: flex; gap: 16px; align-items: center;">
    <my-badge is-dot class="item">
      <my-button>评论</my-button>
    </my-badge>
    <my-badge is-dot class="item">
      <my-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
    </my-badge>
    <my-badge is-dot type="primary" class="item">
      <my-button>主要</my-button>
    </my-badge>
    <my-badge is-dot type="success" class="item">
      <my-button>成功</my-button>
    </my-badge>
  </div>

  <template #code>

  ```vue
  <template>
    <my-badge is-dot>
      <my-button>评论</my-button>
    </my-badge>
    <my-badge is-dot>
      <my-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
    </my-badge>
    <my-badge is-dot type="primary">
      <my-button>主要</my-button>
    </my-badge>
    <my-badge is-dot type="success">
      <my-button>成功</my-button>
    </my-badge>
  </template>
  ```

  </template>
</DemoBlock>

## API

### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| value | 显示的数值 | `string \| number` | — | — |
| max | 最大值，超过最大值会显示 '{max}+' | `number` | — | 99 |
| is-dot | 是否显示小圆点 | `boolean` | — | false |
| hidden | 是否隐藏 badge | `boolean` | — | false |
| type | 徽标类型 | `string` | `primary` / `success` / `warning` / `danger` / `info` | `danger` |
| color | 自定义颜色 | `string` | — | — |

### Events

| 事件名 | 说明 | 类型 |
| --- | --- | --- |
| click | 点击 badge 时触发 | `(event: MouseEvent) => void` |

### Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 包裹的元素 |

### CSS Variables

| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| `--badge-bg` | 徽标背景色 | `var(--danger-color, #f56c6c)` |
| `--badge-color` | 徽标文字颜色 | `#fff` |
| `--badge-border-color` | 徽标边框颜色 | `var(--bg-color, #fff)` |
| `--badge-shadow-color` | 徽标阴影颜色 | `rgba(0, 0, 0, 0.1)` |

## 主题定制

Badge 组件使用 CSS 变量来定义样式，你可以通过覆盖这些变量来自定义主题：

```css
.my-badge {
  --badge-bg: #42b883;
  --badge-color: #fff;
  --badge-border-color: #fff;
  --badge-shadow-color: rgba(0, 0, 0, 0.2);
}
