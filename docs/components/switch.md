# Switch 开关

用于表示开/关状态的按钮，常用于切换功能或即时配置。

<script setup lang="ts">
import { ref } from 'vue'

const basicValue = ref(true)
const labelsValue = ref(false)
const sizeValue = ref(true)
const loadingValue = ref(true)
</script>

## 基础用法

使用 `v-model` 绑定布尔值即可。

<DemoBlock>
  <my-switch v-model="basicValue" />
  <span style="margin-left: 12px;">当前：{{ basicValue ? '开' : '关' }}</span>

  <template #code>

  ```vue
  <template>
    <my-switch v-model="checked" />
  </template>

  <script setup lang="ts">
  import { ref } from 'vue'
  const checked = ref(true)
  </script>
  ```

  </template>
</DemoBlock>

## 自定义文案

通过 `checked-children` 与 `un-checked-children` 设置不同状态下的文案。

<DemoBlock>
  <my-switch
    v-model="labelsValue"
    checked-children="开"
    un-checked-children="关"
  />
</DemoBlock>

## 尺寸与禁用

`size="small"` 获取更紧凑的尺寸；`disabled` 关闭交互。

<DemoBlock>
  <my-switch v-model="sizeValue" size="small" />
  <my-switch v-model="sizeValue" style="margin-left: 12px;" />
  <my-switch v-model="sizeValue" disabled style="margin-left: 12px;" />
</DemoBlock>

## 加载状态

设置 `loading` 可以展示旋转指示，通常用于等待异步操作完成。

<DemoBlock>
  <my-switch v-model="loadingValue" loading />
</DemoBlock>

## API

### Switch Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue / v-model | 当前值 | `boolean` | `false` |
| disabled | 是否禁用 | `boolean` | `false` |
| loading | 是否显示加载中 | `boolean` | `false` |
| checkedChildren | 选中时的文案 | `string` | `''` |
| unCheckedChildren | 未选中时的文案 | `string` | `''` |
| size | 尺寸 | `'default' \| 'small'` | `'default'` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| update:modelValue | 值变化时触发 | `(value: boolean)` |
| change | 同上 | `(value: boolean)` |
