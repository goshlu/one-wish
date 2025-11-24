# Divider 分割线

用于分隔内容的分割线组件，支持水平和竖直两种方向。

## 基础用法

使用默认的水平分割线。

<DemoBlock>
  <div>
    <p>上方内容</p>
    <my-divider />
    <p>下方内容</p>
  </div>

  <template #code>

  ```vue
  <template>
    <div>
      <p>上方内容</p>
      <my-divider />
      <p>下方内容</p>
    </div>
  </template>
  ```

  </template>
</DemoBlock>

## 竖直分割线

使用 `direction="vertical"` 创建竖直分割线。

<DemoBlock>
  <div style="display: flex; align-items: center; gap: 16px;">
    <span>左侧内容</span>
    <my-divider direction="vertical" />
    <span>右侧内容</span>
  </div>

  <template #code>

  ```vue
  <template>
    <div style="display: flex; align-items: center; gap: 16px;">
      <span>左侧内容</span>
      <my-divider direction="vertical" />
      <span>右侧内容</span>
    </div>
  </template>
  ```

  </template>
</DemoBlock>

## 带文字的分割线

使用 `content` 属性添加文字。

<DemoBlock>
  <div>
    <my-divider content="分割线" />
    <p>这是分割线下方的内容</p>
  </div>

  <template #code>

  ```vue
  <template>
    <div>
      <my-divider content="分割线" />
      <p>这是分割线下方的内容</p>
    </div>
  </template>
  ```

  </template>
</DemoBlock>

## 文字位置

使用 `contentPosition` 属性控制文字位置。

<DemoBlock>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <div>
      <my-divider content="左对齐" contentPosition="left" />
    </div>
    <div>
      <my-divider content="居中" contentPosition="center" />
    </div>
    <div>
      <my-divider content="右对齐" contentPosition="right" />
    </div>
  </div>

  <template #code>

  ```vue
  <template>
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <div>
        <my-divider content="左对齐" contentPosition="left" />
      </div>
      <div>
        <my-divider content="居中" contentPosition="center" />
      </div>
      <div>
        <my-divider content="右对齐" contentPosition="right" />
      </div>
    </div>
  </template>
  ```

  </template>
</DemoBlock>

## 不同样式

使用 `borderStyle` 属性改变分割线样式。

<DemoBlock>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <div>
      <my-divider content="实线" borderStyle="solid" />
    </div>
    <div>
      <my-divider content="虚线" borderStyle="dashed" />
    </div>
    <div>
      <my-divider content="点线" borderStyle="dotted" />
    </div>
  </div>

  <template #code>

  ```vue
  <template>
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <div>
        <my-divider content="实线" borderStyle="solid" />
      </div>
      <div>
        <my-divider content="虚线" borderStyle="dashed" />
      </div>
      <div>
        <my-divider content="点线" borderStyle="dotted" />
      </div>
    </div>
  </template>
  ```

  </template>
</DemoBlock>

## 自定义颜色

使用 `borderColor` 和 `textColor` 属性自定义颜色。

<DemoBlock>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <div>
      <my-divider content="红色" borderColor="red" textColor="red" />
    </div>
    <div>
      <my-divider content="蓝色" borderColor="blue" textColor="blue" />
    </div>
    <div>
      <my-divider content="绿色" borderColor="green" textColor="green" />
    </div>
  </div>

  <template #code>

  ```vue
  <template>
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <div>
        <my-divider content="红色" borderColor="red" textColor="red" />
      </div>
      <div>
        <my-divider content="蓝色" borderColor="blue" textColor="blue" />
      </div>
      <div>
        <my-divider content="绿色" borderColor="green" textColor="green" />
      </div>
    </div>
  </template>
  ```

  </template>
</DemoBlock>

## 自定义间距

使用 `margin` 属性控制间距。

<DemoBlock>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <div>
      <p>小间距</p>
      <my-divider margin="8px" />
      <p>内容</p>
    </div>
    <div>
      <p>大间距</p>
      <my-divider margin="32px" />
      <p>内容</p>
    </div>
  </div>

  <template #code>

  ```vue
  <template>
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <div>
        <p>小间距</p>
        <my-divider margin="8px" />
        <p>内容</p>
      </div>
      <div>
        <p>大间距</p>
        <my-divider margin="32px" />
        <p>内容</p>
      </div>
    </div>
  </template>
  ```

  </template>
</DemoBlock>

## 自定义宽度

使用 `borderWidth` 属性改变分割线宽度。

<DemoBlock>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <div>
      <my-divider content="细线" borderWidth="1px" />
    </div>
    <div>
      <my-divider content="中等" borderWidth="2px" />
    </div>
    <div>
      <my-divider content="粗线" borderWidth="3px" />
    </div>
  </div>

  <template #code>

  ```vue
  <template>
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <div>
        <my-divider content="细线" borderWidth="1px" />
      </div>
      <div>
        <my-divider content="中等" borderWidth="2px" />
      </div>
      <div>
        <my-divider content="粗线" borderWidth="3px" />
      </div>
    </div>
  </template>
  ```

  </template>
</DemoBlock>

## API

### Props

| 属性            | 说明                                    | 类型                           | 默认值      |
| --------------- | --------------------------------------- | ------------------------------ | ----------- |
| direction       | 分割线方向                              | `horizontal \| vertical`       | `horizontal` |
| content         | 分割线内容                              | `string`                       | —           |
| contentPosition | 内容位置（仅在 direction 为 horizontal 时有效） | `left \| center \| right` | `center`    |
| borderStyle     | 分割线样式                              | `solid \| dashed \| dotted`    | `solid`     |
| borderColor     | 分割线颜色                              | `string`                       | `#d9d9d9`   |
| borderWidth     | 分割线宽度                              | `string`                       | `1px`       |
| margin          | 间距                                    | `string`                       | `16px`      |
| textColor       | 文字颜色                                | `string`                       | `#999`      |
| fontSize        | 文字大小                                | `string`                       | `14px`      |

### Slots

| 插槽名  | 说明     |
| ------- | -------- |
| default | 分割线内容 |

## 使用场景

### 内容分隔

```vue
<template>
  <div>
    <section>
      <h2>第一部分</h2>
      <p>内容...</p>
    </section>
    
    <my-divider />
    
    <section>
      <h2>第二部分</h2>
      <p>内容...</p>
    </section>
  </div>
</template>
```

### 列表分隔

```vue
<template>
  <div>
    <div v-for="(item, index) in items" :key="item.id">
      <div>{{ item.name }}</div>
      <my-divider v-if="index < items.length - 1" />
    </div>
  </div>
</template>
```

### 导航分隔

```vue
<template>
  <nav>
    <a href="#">首页</a>
    <my-divider direction="vertical" />
    <a href="#">关于</a>
    <my-divider direction="vertical" />
    <a href="#">联系</a>
  </nav>
</template>
```

### 表单分组

```vue
<template>
  <form>
    <div class="form-group">
      <label>用户名</label>
      <input type="text" />
    </div>
    
    <my-divider content="个人信息" />
    
    <div class="form-group">
      <label>邮箱</label>
      <input type="email" />
    </div>
  </form>
</template>
```

## TypeScript 支持

```typescript
import type { DividerProps } from 'one-wish'
```
