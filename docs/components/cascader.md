# Cascader 级联选择

级联选择器，用于多层级数据的选择。

## 基础用法

<DemoBlock>
  <div>
    <my-cascader v-model="value" :options="options" />
    <p>选中值: {{ value }}</p>
  </div>

  <template #code>

  ```vue
  <template>
    <div>
      <my-cascader v-model="value" :options="options" />
      <p>选中值: {{ value }}</p>
    </div>
  </template>

  <script setup lang="ts">
  import { ref } from 'vue'

  const value = ref([])
  const options = [
    {
      value: 'zhejiang',
      label: '浙江',
      children: [
        {
          value: 'hangzhou',
          label: '杭州',
          children: [
            { value: 'xihu', label: '西湖' },
            { value: 'binjiang', label: '滨江' },
          ],
        },
        {
          value: 'ningbo',
          label: '宁波',
          children: [
            { value: 'haishu', label: '海曙' },
            { value: 'jiangbei', label: '江北' },
          ],
        },
      ],
    },
    {
      value: 'jiangsu',
      label: '江苏',
      children: [
        {
          value: 'nanjing',
          label: '南京',
          children: [
            { value: 'xuanwu', label: '玄武' },
            { value: 'qinhuai', label: '秦淮' },
          ],
        },
      ],
    },
  ]
  </script>
  ```

  </template>
</DemoBlock>

## 可清空

<DemoBlock>
  <div>
    <my-cascader v-model="value2" :options="options" clearable />
    <p>选中值: {{ value2 }}</p>
  </div>

  <template #code>

  ```vue
  <template>
    <div>
      <my-cascader v-model="value" :options="options" clearable />
      <p>选中值: {{ value }}</p>
    </div>
  </template>

  <script setup lang="ts">
  import { ref } from 'vue'

  const value = ref(['zhejiang', 'hangzhou', 'xihu'])
  const options = [
    {
      value: 'zhejiang',
      label: '浙江',
      children: [
        {
          value: 'hangzhou',
          label: '杭州',
          children: [
            { value: 'xihu', label: '西湖' },
            { value: 'binjiang', label: '滨江' },
          ],
        },
      ],
    },
  ]
  </script>
  ```

  </template>
</DemoBlock>

<script setup>
import { ref } from 'vue'

const value = ref([])
const value2 = ref(['zhejiang', 'hangzhou', 'xihu'])
const options = [
  {
    value: 'zhejiang',
    label: '浙江',
    children: [
      {
        value: 'hangzhou',
        label: '杭州',
        children: [
          { value: 'xihu', label: '西湖' },
          { value: 'binjiang', label: '滨江' },
        ],
      },
      {
        value: 'ningbo',
        label: '宁波',
        children: [
          { value: 'haishu', label: '海曙' },
          { value: 'jiangbei', label: '江北' },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: '江苏',
    children: [
      {
        value: 'nanjing',
        label: '南京',
        children: [
          { value: 'xuanwu', label: '玄武' },
          { value: 'qinhuai', label: '秦淮' },
        ],
      },
    ],
  },
]
</script>

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue / v-model | 绑定值 | (string \| number)[] | [] |
| options | 选项数据 | CascaderOption[] | [] |
| placeholder | 占位文本 | string | '请选择' |
| disabled | 是否禁用 | boolean | false |
| clearable | 是否可清空 | boolean | false |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| update:modelValue | 值改变时触发 | (value: (string \| number)[]) |
| change | 选择完成时触发 | (value: (string \| number)[]) |

### Types

```ts
interface CascaderOption {
  value: string | number      // 选项的值
  label: string               // 选项的标签
  children?: CascaderOption[] // 子选项
  disabled?: boolean          // 是否禁用
}
```

## TypeScript

```typescript
import type {
  CascaderProps,
  CascaderEmits,
  CascaderOption,
} from 'one-wish'
```
