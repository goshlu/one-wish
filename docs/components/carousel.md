# Carousel 走马灯

在有限空间内，循环播放同一类型的图片、文字等内容。

## 基础用法

最简单的走马灯，默认自动播放。

<DemoBlock>
  <my-carousel height="200px">
    <my-carousel-item v-for="item in 4" :key="item">
      <div :style="{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors[item - 1],
        fontSize: '24px',
        color: '#fff'
      }">
        {{ item }}
      </div>
    </my-carousel-item>
  </my-carousel>

  <template #code>

```vue
<template>
  <my-carousel height="200px">
    <my-carousel-item v-for="item in 4" :key="item">
      <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; 
      background-color: #409eff; font-size: 24px; color: #fff;">
        {{ item }}
      </div>
    </my-carousel-item>
  </my-carousel>
</template>
```

  </template>
</DemoBlock>

## 指示器位置

可以设置指示器的显示位置。

<DemoBlock>
  <div style="display: flex; flex-direction: column; gap: 40px;">
    <div>
      <h4 style="margin-bottom: 16px;">外部指示器（默认）</h4>
      <my-carousel height="200px" indicator-position="outside">
        <my-carousel-item v-for="item in 3" :key="item">
          <div :style="{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors[item - 1],
            fontSize: '24px',
            color: '#fff'
          }">
            Slide {{ item }}
          </div>
        </my-carousel-item>
      </my-carousel>
    </div>

    <div>
      <h4 style="margin-bottom: 16px;">内部指示器</h4>
      <my-carousel height="200px" indicator-position="inside">
        <my-carousel-item v-for="item in 3" :key="item">
          <div :style="{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors[item - 1],
            fontSize: '24px',
            color: '#fff'
          }">
            Slide {{ item }}
          </div>
        </my-carousel-item>
      </my-carousel>
    </div>

    <div>
      <h4 style="margin-bottom: 16px;">无指示器</h4>
      <my-carousel height="200px" indicator-position="none">
        <my-carousel-item v-for="item in 3" :key="item">
          <div :style="{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors[item - 1],
            fontSize: '24px',
            color: '#fff'
          }">
            Slide {{ item }}
          </div>
        </my-carousel-item>
      </my-carousel>
    </div>
  </div>

  <template #code>

```vue
<template>
  <!-- 外部指示器 -->
  <my-carousel height="200px" indicator-position="outside">
    <my-carousel-item v-for="item in 3" :key="item">
      <div>Slide {{ item }}</div>
    </my-carousel-item>
  </my-carousel>

  <!-- 内部指示器 -->
  <my-carousel height="200px" indicator-position="inside">
    <my-carousel-item v-for="item in 3" :key="item">
      <div>Slide {{ item }}</div>
    </my-carousel-item>
  </my-carousel>

  <!-- 无指示器 -->
  <my-carousel height="200px" indicator-position="none">
    <my-carousel-item v-for="item in 3" :key="item">
      <div>Slide {{ item }}</div>
    </my-carousel-item>
  </my-carousel>
</template>
```

  </template>
</DemoBlock>

## 切换箭头

可以设置切换箭头的显示时机。

<DemoBlock>
  <div style="display: flex; flex-direction: column; gap: 40px;">
    <div>
      <h4 style="margin-bottom: 16px;">悬停时显示（默认）</h4>
      <my-carousel height="200px" arrow="hover">
        <my-carousel-item v-for="item in 3" :key="item">
          <div :style="{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors[item - 1],
            fontSize: '24px',
            color: '#fff'
          }">
            Slide {{ item }}
          </div>
        </my-carousel-item>
      </my-carousel>
    </div>

    <div>
      <h4 style="margin-bottom: 16px;">始终显示</h4>
      <my-carousel height="200px" arrow="always">
        <my-carousel-item v-for="item in 3" :key="item">
          <div :style="{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors[item - 1],
            fontSize: '24px',
            color: '#fff'
          }">
            Slide {{ item }}
          </div>
        </my-carousel-item>
      </my-carousel>
    </div>

    <div>
      <h4 style="margin-bottom: 16px;">不显示</h4>
      <my-carousel height="200px" arrow="never">
        <my-carousel-item v-for="item in 3" :key="item">
          <div :style="{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors[item - 1],
            fontSize: '24px',
            color: '#fff'
          }">
            Slide {{ item }}
          </div>
        </my-carousel-item>
      </my-carousel>
    </div>
  </div>

  <template #code>

```vue
<template>
  <!-- 悬停时显示 -->
  <my-carousel height="200px" arrow="hover">
    <my-carousel-item v-for="item in 3" :key="item">
      <div>Slide {{ item }}</div>
    </my-carousel-item>
  </my-carousel>

  <!-- 始终显示 -->
  <my-carousel height="200px" arrow="always">
    <my-carousel-item v-for="item in 3" :key="item">
      <div>Slide {{ item }}</div>
    </my-carousel-item>
  </my-carousel>

  <!-- 不显示 -->
  <my-carousel height="200px" arrow="never">
    <my-carousel-item v-for="item in 3" :key="item">
      <div>Slide {{ item }}</div>
    </my-carousel-item>
  </my-carousel>
</template>
```

  </template>
</DemoBlock>

## 指示器样式

支持圆点和线条两种指示器样式。

<DemoBlock>
  <div style="display: flex; flex-direction: column; gap: 40px;">
    <div>
      <h4 style="margin-bottom: 16px;">圆点样式（默认）</h4>
      <my-carousel height="200px" indicator-style="dot">
        <my-carousel-item v-for="item in 3" :key="item">
          <div :style="{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors[item - 1],
            fontSize: '24px',
            color: '#fff'
          }">
            Slide {{ item }}
          </div>
        </my-carousel-item>
      </my-carousel>
    </div>

    <div>
      <h4 style="margin-bottom: 16px;">线条样式</h4>
      <my-carousel height="200px" indicator-style="line">
        <my-carousel-item v-for="item in 3" :key="item">
          <div :style="{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors[item - 1],
            fontSize: '24px',
            color: '#fff'
          }">
            Slide {{ item }}
          </div>
        </my-carousel-item>
      </my-carousel>
    </div>
  </div>

  <template #code>

```vue
<template>
  <!-- 圆点样式 -->
  <my-carousel height="200px" indicator-style="dot">
    <my-carousel-item v-for="item in 3" :key="item">
      <div>Slide {{ item }}</div>
    </my-carousel-item>
  </my-carousel>

  <!-- 线条样式 -->
  <my-carousel height="200px" indicator-style="line">
    <my-carousel-item v-for="item in 3" :key="item">
      <div>Slide {{ item }}</div>
    </my-carousel-item>
  </my-carousel>
</template>
```

  </template>
</DemoBlock>

## 手动控制

通过 `v-model` 或调用组件方法来手动控制轮播。

<DemoBlock>
  <div>
    <div style="margin-bottom: 16px; display: flex; gap: 8px; align-items: center;">
      <my-button @click="currentIndex = (currentIndex - 1 + 4) % 4" size="small">上一张</my-button>
      <my-button @click="currentIndex = (currentIndex + 1) % 4" size="small">下一张</my-button>
      <span style="margin-left: 16px;">当前索引: {{ currentIndex }}</span>
    </div>
    <my-carousel v-model="currentIndex" height="200px" :autoplay="false">
      <my-carousel-item v-for="item in 4" :key="item">
        <div :style="{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: colors[item - 1],
          fontSize: '24px',
          color: '#fff'
        }">
          Slide {{ item }}
        </div>
      </my-carousel-item>
    </my-carousel>
  </div>

  <template #code>

```vue
<template>
  <div>
    <my-button @click="prev">上一张</my-button>
    <my-button @click="next">下一张</my-button>
    <span>当前索引: {{ currentIndex }}</span>
  </div>
  <my-carousel v-model="currentIndex" height="200px" :autoplay="false">
    <my-carousel-item v-for="item in 4" :key="item">
      <div>Slide {{ item }}</div>
    </my-carousel-item>
  </my-carousel>
</template>

<script setup>
import { ref } from 'vue'

const currentIndex = ref(0)

const prev = () => {
  currentIndex.value = (currentIndex.value - 1 + 4) % 4
}

const next = () => {
  currentIndex.value = (currentIndex.value + 1) % 4
}
</script>
```

  </template>
</DemoBlock>

## 自动播放设置

可以控制自动播放及其间隔时间。

<DemoBlock>
  <div style="display: flex; flex-direction: column; gap: 40px;">
    <div>
      <h4 style="margin-bottom: 16px;">快速切换（1秒间隔）</h4>
      <my-carousel height="200px" :interval="1000">
        <my-carousel-item v-for="item in 3" :key="item">
          <div :style="{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors[item - 1],
            fontSize: '24px',
            color: '#fff'
          }">
            Slide {{ item }}
          </div>
        </my-carousel-item>
      </my-carousel>
    </div>

    <div>
      <h4 style="margin-bottom: 16px;">慢速切换（5秒间隔）</h4>
      <my-carousel height="200px" :interval="5000">
        <my-carousel-item v-for="item in 3" :key="item">
          <div :style="{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors[item - 1],
            fontSize: '24px',
            color: '#fff'
          }">
            Slide {{ item }}
          </div>
        </my-carousel-item>
      </my-carousel>
    </div>
  </div>

  <template #code>

```vue
<template>
  <!-- 快速切换 -->
  <my-carousel height="200px" :interval="1000">
    <my-carousel-item v-for="item in 3" :key="item">
      <div>Slide {{ item }}</div>
    </my-carousel-item>
  </my-carousel>

  <!-- 慢速切换 -->
  <my-carousel height="200px" :interval="5000">
    <my-carousel-item v-for="item in 3" :key="item">
      <div>Slide {{ item }}</div>
    </my-carousel-item>
  </my-carousel>
</template>
```

  </template>
</DemoBlock>

## 图片展示

常用于图片轮播展示。

<DemoBlock>
  <my-carousel height="300px">
    <my-carousel-item v-for="(img, index) in images" :key="index">
      <img :src="img" alt="carousel image" style="width: 100%; height: 100%; object-fit: cover;" />
    </my-carousel-item>
  </my-carousel>

  <template #code>

```vue
<template>
  <my-carousel height="300px">
    <my-carousel-item v-for="(img, index) in images" :key="index">
      <img :src="img" alt="carousel" style="width: 100%; height: 100%; object-fit: cover;" />
    </my-carousel-item>
  </my-carousel>
</template>

<script setup>
const images = [
  'https://picsum.photos/800/300?random=1',
  'https://picsum.photos/800/300?random=2',
  'https://picsum.photos/800/300?random=3'
]
</script>
```

  </template>
</DemoBlock>

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue / v-model | 当前激活项的索引 | `number` | `0` |
| height | 走马灯的高度 | `string \| number` | `'300px'` |
| indicatorPosition | 指示器的位置 | `'inside' \| 'outside' \| 'none'` | `'outside'` |
| arrow | 切换箭头的显示时机 | `'always' \| 'hover' \| 'never'` | `'hover'` |
| type | 走马灯的类型 | `'default' \| 'card'` | `'default'` |
| autoplay | 是否自动切换 | `boolean` | `true` |
| interval | 自动切换的时间间隔（毫秒） | `number` | `3000` |
| loop | 是否循环显示 | `boolean` | `true` |
| trigger | 指示器的触发方式 | `'click' \| 'hover'` | `'click'` |
| duration | 切换动画持续时间（毫秒） | `number` | `300` |
| pauseOnHover | 鼠标悬停时是否暂停自动播放 | `boolean` | `true` |
| indicatorStyle | 指示器样式 | `'dot' \| 'line'` | `'dot'` |
| direction | 走马灯方向 | `'horizontal' \| 'vertical'` | `'horizontal'` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| update:modelValue | 当前激活项索引变化时触发 | `(value: number)` |
| change | 切换时触发 | `(current: number, prev: number)` |

### Methods

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| prev | 切换至上一张幻灯片 | — |
| next | 切换至下一张幻灯片 | — |
| setActiveItem | 手动切换幻灯片 | `(index: number)` |

### Slots

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| default | 默认插槽，放置 CarouselItem | — |
| indicator | 自定义指示器内容 | `{ index: number, active: boolean }` |

## CarouselItem Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| name | 轮播项的名称，与走马灯的 modelValue 对应 | `string \| number` | — |
| label | 轮播项的标签，可用于指示器 | `string` | — |

## CSS 变量

可以通过覆盖以下 CSS 变量来自定义走马灯样式：

| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| `--carousel-item-bg` | 轮播项背景色 | `#f5f5f5` |
| `--primary-color` | 激活状态的主题色 | `#409eff` |

## TypeScript

```typescript
import type { CarouselProps, CarouselEmits, CarouselSlots, CarouselItemProps } from 'one-wish'

// 在组件中使用类型
const props: CarouselProps = {
  height: '400px',
  autoplay: true,
  interval: 3000
}
```

<script setup>
import { ref } from 'vue'

const colors = ['#409eff', '#67c23a', '#e6a23c', '#f56c6c']
const currentIndex = ref(0)
const images = [
  'https://picsum.photos/800/300?random=1',
  'https://picsum.photos/800/300?random=2',
  'https://picsum.photos/800/300?random=3'
]
</script>
