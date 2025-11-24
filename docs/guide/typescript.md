# TypeScript 支持

Vue3 Component Library 使用 TypeScript 编写，提供完整的类型定义。

## 类型导出

组件库导出了所有组件的 Props 和 Events 类型定义：

```typescript
import type {
  // Button
  ButtonProps,
  ButtonEmits,
  ButtonType,
  ButtonSize,

  // Input
  InputProps,
  InputEmits,
  InputType,
  InputSize,

  // FloatButton
  FloatButtonProps,
  FloatButtonEmits,
  FloatButtonType,
  FloatButtonShape,
  FloatButtonPosition,
  FloatButtonGroupProps,
} from 'vue3-component-library'
```

## 组件类型

### 在 Vue 组件中使用

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { MyButton, MyInput } from 'vue3-component-library'
import type { ButtonType, InputType } from 'vue3-component-library'

const buttonType = ref<ButtonType>('primary')
const inputValue = ref<string>('')
const inputType = ref<InputType>('text')
</script>
```

### 在普通 TypeScript 中使用

```typescript
import type { ButtonProps, InputProps } from 'vue3-component-library'

const buttonConfig: ButtonProps = {
  type: 'primary',
  size: 'large',
  disabled: false,
}

const inputConfig: InputProps = {
  modelValue: '',
  type: 'text',
  placeholder: '请输入内容',
  clearable: true,
}
```

## Props 类型

所有组件的 Props 都有完整的类型定义：

### Button Props

```typescript
interface ButtonProps {
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'default'
  size?: 'large' | 'default' | 'small'
  disabled?: boolean
  loading?: boolean
  round?: boolean
  plain?: boolean
}
```

### Input Props

```typescript
interface InputProps {
  modelValue?: string | number
  type?: 'text' | 'password' | 'number' | 'email' | 'tel'
  size?: 'large' | 'default' | 'small'
  placeholder?: string
  disabled?: boolean
  clearable?: boolean
  maxlength?: number
  showWordLimit?: boolean
  readonly?: boolean
}
```

### FloatButton Props

```typescript
interface FloatButtonProps {
  type?: 'primary' | 'default'
  shape?: 'circle' | 'square'
  position?: 'right-bottom' | 'right-top' | 'left-bottom' | 'left-top'
  icon?: string
  description?: string
  tooltip?: string
  href?: string
  target?: '_blank' | '_self' | '_parent' | '_top'
  badge?: number | string
  disabled?: boolean
}
```

## Events 类型

组件的事件回调也有完整的类型定义：

```typescript
import type { ButtonEmits, InputEmits } from 'vue3-component-library'

// Button Events
interface ButtonEmits {
  (e: 'click', event: MouseEvent): void
}

// Input Events
interface InputEmits {
  (e: 'update:modelValue', value: string | number): void
  (e: 'input', value: string | number): void
  (e: 'change', value: string | number): void
  (e: 'focus', event: FocusEvent): void
  (e: 'blur', event: FocusEvent): void
  (e: 'clear'): void
}
```

## 组件实例类型

你可以通过 `ref` 获取组件实例并使用其类型：

```vue
<template>
  <my-button ref="buttonRef">按钮</my-button>
  <my-input ref="inputRef" v-model="value" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { ComponentPublicInstance } from 'vue'

const buttonRef = ref<ComponentPublicInstance>()
const inputRef = ref<ComponentPublicInstance>()

// 访问组件实例
const focusInput = () => {
  inputRef.value?.$el.querySelector('input')?.focus()
}
</script>
```

## 全局类型声明

如果你使用全局注册组件，可以扩展 Vue 的全局组件类型：

```typescript
// types/components.d.ts
import { MyButton, MyInput, MyFloatButton } from 'vue3-component-library'

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    MyButton: typeof MyButton
    MyInput: typeof MyInput
    MyFloatButton: typeof MyFloatButton
  }
}

export {}
```

这样在模板中使用组件时就能获得完整的类型提示。

## 类型工具函数

你可以使用 TypeScript 的工具类型来处理组件类型：

```typescript
import type { ButtonProps } from 'vue3-component-library'

// 获取某个属性的类型
type ButtonType = ButtonProps['type'] // 'primary' | 'success' | ...

// 使 Props 全部可选
type PartialButtonProps = Partial<ButtonProps>

// 使 Props 全部必填
type RequiredButtonProps = Required<ButtonProps>

// 选择部分属性
type ButtonTypeAndSize = Pick<ButtonProps, 'type' | 'size'>

// 排除某些属性
type ButtonWithoutDisabled = Omit<ButtonProps, 'disabled'>
```

## 自定义组件封装

当你基于组件库封装自己的组件时，可以继承原有类型：

```vue
<!-- CustomButton.vue -->
<template>
  <my-button v-bind="$attrs" :type="type" :size="size">
    <slot></slot>
  </my-button>
</template>

<script setup lang="ts">
import type { ButtonProps } from 'vue3-component-library'

interface CustomButtonProps extends Omit<ButtonProps, 'type'> {
  type?: 'primary' | 'danger' // 限制只使用部分类型
  customProp?: string // 添加自定义属性
}

defineProps<CustomButtonProps>()
</script>
```

## 类型检查

确保你的 `tsconfig.json` 配置正确：

```json
{
  "compilerOptions": {
    "strict": true,
    "jsx": "preserve",
    "moduleResolution": "bundler",
    "types": ["vite/client"]
  },
  "include": ["src/**/*.ts", "src/**/*.vue"]
}
```

## VSCode 支持

安装推荐的 VSCode 扩展以获得最佳的开发体验：

- [Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
- [TypeScript Vue Plugin](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin)

## 最佳实践

1. **严格模式**：启用 TypeScript 的严格模式
2. **类型导入**：使用 `import type` 导入类型，避免运行时开销
3. **Props 定义**：为自定义组件明确定义 Props 类型
4. **事件处理**：为事件处理函数添加正确的参数类型
5. **泛型使用**：合理使用泛型提高代码复用性

```typescript
// 好的实践
import { ref } from 'vue'
import type { ButtonType } from 'vue3-component-library'

const buttonType = ref<ButtonType>('primary')

const handleClick = (event: MouseEvent) => {
  console.log(event.target)
}

// 避免使用 any
const config: any = {} // ❌
const config: ButtonProps = {} // ✅
```
