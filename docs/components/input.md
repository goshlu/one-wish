# Input 输入框

通过鼠标或键盘输入字符。

## 基础用法

<DemoBlock>
  <my-input v-model="value" placeholder="请输入内容" />

  <template #code>

  ```vue
  <script setup lang="ts">
  import { ref } from 'vue'
  const value = ref('')
  </script>

  <template>
    <my-input v-model="value" placeholder="请输入内容" />
  </template>
  ```

  </template>
</DemoBlock>

## 可清空

使用 `clearable` 属性可以快速清空输入内容。

<DemoBlock>
  <my-input v-model="value" placeholder="请输入内容" clearable />

  <template #code>

  ```vue
  <template>
    <my-input v-model="value" clearable />
  </template>
  ```

  </template>
</DemoBlock>

## 密码输入

使用 `type="password"` 创建密码输入框。

<DemoBlock>
  <my-input v-model="password" type="password" placeholder="请输入密码" />

  <template #code>

  ```vue
  <script setup lang="ts">
  import { ref } from 'vue'
  const password = ref('')
  </script>

  <template>
    <my-input v-model="password" type="password" placeholder="请输入密码" />
  </template>
  ```

  </template>
</DemoBlock>

## 字数限制

使用 `maxlength` 和 `show-word-limit` 属性可以限制输入长度并显示字数统计。

<DemoBlock>
  <my-input 
    v-model="limitValue" 
    :maxlength="20" 
    show-word-limit 
    placeholder="最多输入20个字符"
  />

  <template #code>

  ```vue
  <template>
    <my-input
      v-model="value"
      :maxlength="20"
      show-word-limit
      placeholder="最多输入20个字符"
    />
  </template>
  ```

  </template>
</DemoBlock>

## 不同尺寸

提供三种尺寸：large、default、small。

<DemoBlock>
  <div style="display: flex; flex-direction: column; gap: 8px;">
    <my-input v-model="value" size="large" placeholder="大型输入框" />
    <my-input v-model="value" placeholder="默认输入框" />
    <my-input v-model="value" size="small" placeholder="小型输入框" />
  </div>

  <template #code>

  ```vue
  <template>
    <my-input v-model="value" size="large" />
    <my-input v-model="value" />
    <my-input v-model="value" size="small" />
  </template>
  ```

  </template>
</DemoBlock>

## 禁用状态

使用 `disabled` 属性禁用输入框。

<DemoBlock>
  <my-input v-model="disabledValue" disabled placeholder="禁用状态" />

  <template #code>

  ```vue
  <template>
    <my-input v-model="value" disabled />
  </template>
  ```

  </template>
</DemoBlock>

## API

### Props

| 属性                 | 说明             | 类型                | 可选值                                           | 默认值    |
| -------------------- | ---------------- | ------------------- | ------------------------------------------------ | --------- |
| modelValue / v-model | 绑定值           | `string` / `number` | —                                                | —         |
| type                 | 输入框类型       | `string`            | `text` / `password` / `number` / `email` / `tel` | `text`    |
| size                 | 输入框尺寸       | `string`            | `large` / `default` / `small`                    | `default` |
| placeholder          | 占位文本         | `string`            | —                                                | —         |
| disabled             | 是否禁用         | `boolean`           | —                                                | `false`   |
| clearable            | 是否可清空       | `boolean`           | —                                                | `false`   |
| maxlength            | 最大输入长度     | `number`            | —                                                | —         |
| showWordLimit        | 是否显示字数统计 | `boolean`           | —                                                | `false`   |
| readonly             | 是否只读         | `boolean`           | —                                                | `false`   |

### Events

| 事件名            | 说明               | 回调参数                    |
| ----------------- | ------------------ | --------------------------- |
| update:modelValue | 值更新时触发       | `(value: string \| number)` |
| input             | 输入时触发         | `(value: string \| number)` |
| change            | 值改变时触发       | `(value: string \| number)` |
| focus             | 获得焦点时触发     | `(event: FocusEvent)`       |
| blur              | 失去焦点时触发     | `(event: FocusEvent)`       |
| clear             | 点击清空按钮时触发 | —                           |

## TypeScript

```typescript
import type {
  InputProps,
  InputEmits,
  InputType,
  InputSize,
} from 'vue3-component-library'
```

<script setup>
import { ref } from 'vue'
const value = ref('')
const password = ref('')
const limitValue = ref('')
const disabledValue = ref('禁用的内容')
</script>
