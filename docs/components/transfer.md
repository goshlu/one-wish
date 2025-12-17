# Transfer 穿梭框

双栏列表选择组件，用于在两个列表间进行数据迁移。

<script setup lang="ts">
import { ref } from 'vue'

const basicValue = ref([])
const basicData = ref([
  { key: 1, label: '选项1' },
  { key: 2, label: '选项2' },
  { key: 3, label: '选项3' },
  { key: 4, label: '选项4' },
  { key: 5, label: '选项5' },
])

const filterableValue = ref([])
const filterableData = ref([
  { key: 1, label: '苹果' },
  { key: 2, label: '香蕉' },
  { key: 3, label: '橙子' },
  { key: 4, label: '葡萄' },
  { key: 5, label: '西瓜' },
  { key: 6, label: '草莓' },
  { key: 7, label: '芒果' },
  { key: 8, label: '柠檬' },
])

const customTextValue = ref([])
const customTextData = ref([
  { key: 1, label: '文档1' },
  { key: 2, label: '文档2' },
  { key: 3, label: '文档3' },
  { key: 4, label: '文档4' },
])

const disabledValue = ref([])
const disabledData = ref([
  { key: 1, label: '禁用选项1' },
  { key: 2, label: '禁用选项2' },
])

const partialDisabledValue = ref([])
const partialDisabledData = ref([
  { key: 1, label: '可用选项1' },
  { key: 2, label: '禁用选项2', disabled: true },
  { key: 3, label: '可用选项3' },
  { key: 4, label: '禁用选项4', disabled: true },
])

const largeValue = ref([])
const defaultSizeValue = ref([])
const smallValue = ref([])
const sizeData = ref([
  { key: 1, label: '尺寸选项1' },
  { key: 2, label: '尺寸选项2' },
  { key: 3, label: '尺寸选项3' },
])

const originalOrderValue = ref([])
const pushOrderValue = ref([])
const orderData = ref([
  { key: 1, label: '顺序选项1' },
  { key: 2, label: '顺序选项2' },
  { key: 3, label: '顺序选项3' },
  { key: 4, label: '顺序选项4' },
])
</script>

## 基础用法

<DemoBlock>
  <my-transfer
    v-model="basicValue"
    :data="basicData"
    :titles="['源列表', '目标列表']"
  />

  <template #code>

  ```vue
  <script setup lang="ts">
  import { ref } from 'vue'

  const basicValue = ref([])
  const basicData = ref([
    { key: 1, label: '选项1' },
    { key: 2, label: '选项2' },
    { key: 3, label: '选项3' },
    { key: 4, label: '选项4' },
    { key: 5, label: '选项5' },
  ])
  </script>

  <template>
    <my-transfer
      v-model="basicValue"
      :data="basicData"
      :titles="['源列表', '目标列表']"
    />
  </template>
  ```

  </template>
</DemoBlock>

## 可搜索

可以设置搜索框来过滤选项。

<DemoBlock>
  <my-transfer
    v-model="filterableValue"
    :data="filterableData"
    filterable
    :filter-placeholder="'请输入搜索内容'"
    :titles="['可搜索源列表', '可搜索目标列表']"
  />

  <template #code>

  ```vue
  <template>
    <my-transfer
      v-model="value"
      :data="data"
      filterable
      :filter-placeholder="'请输入搜索内容'"
    />
  </template>
  ```

  </template>
</DemoBlock>

## 自定义按钮文字

可以自定义操作按钮的文字。

<DemoBlock>
  <my-transfer
    v-model="customTextValue"
    :data="customTextData"
    :button-texts="['添加到右侧', '添加到左侧']"
    :titles="['自定义按钮', '自定义按钮']"
  />

  <template #code>

  ```vue
  <template>
    <my-transfer
      v-model="value"
      :data="data"
      :button-texts="['添加到右侧', '添加到左侧']"
    />
  </template>
  ```

  </template>
</DemoBlock>

## 禁用状态

可以禁用整个穿梭框或特定选项。

<DemoBlock>
  <div class="demo-row">
    <my-transfer
      v-model="disabledValue"
      :data="disabledData"
      disabled
      :titles="['禁用状态', '禁用状态']"
    />
    <my-transfer
      v-model="partialDisabledValue"
      :data="partialDisabledData"
      :titles="['部分禁用', '部分禁用']"
    />
  </div>

  <template #code>

  ```vue
  <template>
    <my-transfer v-model="value" :data="data" disabled />
    <my-transfer v-model="value2" :data="data2" />
  </template>
  ```

  </template>
</DemoBlock>

## 不同尺寸

提供三种尺寸：大、默认、小。

<DemoBlock>
  <div class="demo-column">
    <my-transfer
      v-model="largeValue"
      :data="sizeData"
      size="large"
      :titles="['大尺寸', '大尺寸']"
    />
    <my-transfer
      v-model="defaultSizeValue"
      :data="sizeData"
      size="default"
      :titles="['默认尺寸', '默认尺寸']"
    />
    <my-transfer
      v-model="smallValue"
      :data="sizeData"
      size="small"
      :titles="['小尺寸', '小尺寸']"
    />
  </div>

  <template #code>

  ```vue
  <template>
    <my-transfer v-model="value" :data="data" size="large" />
    <my-transfer v-model="value2" :data="data" size="default" />
    <my-transfer v-model="value3" :data="data" size="small" />
  </template>
  ```

  </template>
</DemoBlock>

## 目标列表顺序

可以设置目标列表的排序方式。

<DemoBlock>
  <div class="demo-row">
    <my-transfer
      v-model="originalOrderValue"
      :data="orderData"
      target-order="original"
      :titles="['原始顺序', '原始顺序']"
    />
    <my-transfer
      v-model="pushOrderValue"
      :data="orderData"
      target-order="push"
      :titles="['点击顺序', '点击顺序']"
    />
  </div>

  <template #code>

  ```vue
  <template>
    <my-transfer v-model="value" :data="data" target-order="original" />
    <my-transfer v-model="value2" :data="data" target-order="push" />
  </template>
  ```

  </template>
</DemoBlock>

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue / v-model | 绑定值 | `Array<string \| number>` | `[]` |
| data | 数据源 | `TransferOption[]` | `[]` |
| titles | 自定义列表标题 | `string[]` | `['源列表', '目标列表']` |
| buttonTexts | 自定义操作按钮文字 | `string[]` | `[]` |
| placeholder | 自定义搜索框占位符 | `string[]` | `['请输入搜索内容', '请输入搜索内容']` |
| filterable | 是否可搜索 | `boolean` | `false` |
| filterPlaceholder | 搜索框占位符 | `string` | `'请输入搜索内容'` |
| disabled | 是否禁用 | `boolean` | `false` |
| size | 尺寸 | `'large' \| 'default' \| 'small'` | `'default'` |
| targetOrder | 目标列表排序方式 | `'original' \| 'push'` | `'original'` |

### TransferOption

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| key | 唯一标识 | `string \| number` | — |
| label | 显示文本 | `string` | — |
| disabled | 是否禁用 | `boolean` | `false` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| update:modelValue | 绑定值变更时触发 | `(value: Array<string \| number>)` |
| change | 数据迁移时触发 | `(value: Array<string \| number>, direction: 'left' \| 'right', movedKeys: Array<string \| number>)` |
| left-check-change | 左侧列表选中状态变更时触发 | `(checkedKeys: Array<string \| number>)` |
| right-check-change | 右侧列表选中状态变更时触发 | `(checkedKeys: Array<string \| number>)` |

### TypeScript

```ts
import type { TransferProps, TransferEmits, TransferOption } from 'one-wish'
```

<style scoped>
.demo-row {
  display: flex;
  gap: 24px;
  align-items: flex-start;
  flex-wrap: wrap;
}

.demo-row > * {
  flex: 1;
  min-width: 300px;
}

.demo-column {
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: center;
}

.demo-column > * {
  width: 100%;
  max-width: 500px;
}
</style>
