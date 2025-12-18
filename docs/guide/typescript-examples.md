# TypeScript 使用示例

本指南展示如何在 TypeScript 项目中最大化 One Wish 组件库的类型安全性。

## 基础类型导入

```typescript
import type {
  // 按钮组件
  ButtonProps,
  ButtonEmits,
  ButtonSize,
  ButtonType,

  // 输入框组件
  InputProps,
  InputEmits,
  InputType,

  // 卡片组件
  CardProps,
  CardEmits,
  CardSlots,
  CardSize,
  CardShadow,
} from 'one-wish'
```

## 组件 Props 类型

### 使用组件类型定义

```typescript
import type { CardProps } from 'one-wish'

// 定义卡片配置
const cardConfig: CardProps = {
  title: '卡片标题',
  subtitle: '副标题',
  shadow: 'always',
  bordered: true,
  hoverable: true,
  size: 'default',
  padding: '20px',
}

// 创建卡片工厂函数
function createCard(overrides?: Partial<CardProps>): CardProps {
  return {
    ...cardConfig,
    ...overrides,
  }
}

// 使用
const productCard = createCard({
  title: '产品卡片',
  hoverable: true,
})
```

### 组件 Props 接口定义

```typescript
import type { ButtonProps, InputProps } from 'one-wish'

interface FormComponentProps {
  buttons: ButtonProps[]
  inputs: InputProps[]
}

const formConfig: FormComponentProps = {
  buttons: [
    {
      type: 'primary',
      size: 'large',
      disabled: false,
    },
    {
      type: 'danger',
      plain: true,
    },
  ],
  inputs: [
    {
      type: 'text',
      placeholder: '请输入内容',
      clearable: true,
    },
  ],
}
```

## 事件处理类型

### 处理组件事件

```typescript
import type { ButtonProps } from 'one-wish'

// 按钮点击事件
const handleButtonClick = (event: MouseEvent) => {
  console.log('按钮被点击:', event)
}

// 输入框输入事件
const handleInputChange = (value: string | number) => {
  console.log('输入内容:', value)
}

// 表单提交事件
const handleFormSubmit = (formData: Record<string, any>) => {
  console.log('表单数据:', formData)
}
```

### 类型安全的事件处理

```vue
<script setup lang="ts">
import type { CardEmits } from 'one-wish'

// 定义事件处理函数类型
const emit = defineEmits<CardEmits>()

// 类型安全的事件处理
const handleClick = (event: MouseEvent) => {
  emit('click', event)
}

const handleDblclick = (event: MouseEvent) => {
  emit('dblclick', event)
}

const handleMouseenter = (event: MouseEvent) => {
  emit('mouseenter', event)
}

const handleMouseleave = (event: MouseEvent) => {
  emit('mouseleave', event)
}
</script>
```

## 自定义组件包装

### 创建类型安全的组件包装器

```typescript
import type { ComponentProps } from 'vue'
import { MyButton } from 'one-wish'
import type { ButtonProps } from 'one-wish'

// 继承原组件的 Props
interface CustomButtonProps extends ButtonProps {
  // 添加自定义属性
  customAttribute?: string
}

// 创建包装组件
export const CustomButton = {
  props: {
    ...MyButton.props,
    customAttribute: String,
  },
  emits: MyButton.emits,
  setup(props: CustomButtonProps, { slots, emit }) {
    return () => (
      <MyButton {...props} onClickOnClick={() => emit('click')}>
        {slots.default?.()}
      </MyButton>
    )
  },
}
```

### 高阶组件包装

```typescript
import { ref, computed } from 'vue'
import type { InputProps } from 'one-wish'

// 创建带有验证的输入框
export function useValidatedInput() {
  const value = ref('')
  const error = ref('')

  const isValid = computed(() => error.value === '')

  const validate = (rule: (value: string) => boolean) => {
    if (!rule(value.value)) {
      error.value = '验证失败'
      return false
    }
    error.value = ''
    return true
  }

  const inputProps = computed<Partial<InputProps>>(() => ({
    modelValue: value.value,
    status: isValid.value ? undefined : 'error',
  }))

  return {
    value,
    error,
    isValid,
    validate,
    inputProps,
  }
}
```

## 表单类型定义

### 定义表单数据类型

```typescript
import type { ButtonProps, InputProps, SelectProps } from 'one-wish'

// 用户表单数据
interface UserFormData {
  username: string
  email: string
  role: string
  active: boolean
}

// 表单配置
interface FormFieldConfig {
  name: keyof UserFormData
  label: string
  props: Partial<InputProps | SelectProps>
  rules?: {
    required?: boolean
    minLength?: number
    pattern?: RegExp
  }
}

// 表单配置数组
const userFormFields: FormFieldConfig[] = [
  {
    name: 'username',
    label: '用户名',
    props: { placeholder: '请输入用户名' },
    rules: { required: true, minLength: 3 },
  },
  {
    name: 'email',
    label: '邮箱',
    props: { type: 'email' },
    rules: { required: true },
  },
  {
    name: 'role',
    label: '角色',
    props: {
      options: [
        { label: '管理员', value: 'admin' },
        { label: '用户', value: 'user' },
      ],
    },
  },
]
```

### 泛型表单组件

```typescript
import type { Ref } from 'vue'
import type { InputProps } from 'one-wish'

// 泛型表单类型
interface FormState<T> {
  data: T
  errors: Partial<Record<keyof T, string>>
  loading: boolean
}

// 泛型表单 hook
export function useForm<T extends Record<string, any>>(initialData: T) {
  const state: FormState<T> = reactive({
    data: { ...initialData },
    errors: {},
    loading: false,
  })

  // 更新表单字段
  const updateField = (field: keyof T, value: any) => {
    state.data[field] = value
    // 清除该字段的错误
    delete state.errors[field]
  }

  // 提交表单
  const submit = async (validator?: (data: T) => Promise<boolean>) => {
    state.loading = true
    try {
      const isValid = validator ? await validator(state.data) : true
      if (!isValid) {
        throw new Error('验证失败')
      }
      return state.data
    } finally {
      state.loading = false
    }
  }

  return {
    ...toRefs(state),
    updateField,
    submit,
  }
}

// 使用
const form = useForm({
  username: '',
  email: '',
})
```

## 列表和数据类型

### 定义数据模型

```typescript
import type { CardProps } from 'one-wish'

// 产品数据模型
interface Product {
  id: string
  name: string
  price: number
  description: string
  image: string
  inStock: boolean
}

// 列表数据
interface ListState<T> {
  items: T[]
  loading: boolean
  error: string | null
  total: number
  currentPage: number
  pageSize: number
}

// 初始化列表状态
function createListState<T>(): ListState<T> {
  return {
    items: [],
    loading: false,
    error: null,
    total: 0,
    currentPage: 1,
    pageSize: 10,
  }
}

// 使用
const productList = createListState<Product>()
```

### 类型安全的列表操作

```typescript
import { ref, computed } from 'vue'
import type { Ref } from 'vue'

export function useList<T extends { id: string }>(items: Ref<T[]>) {
  // 添加项目
  const addItem = (item: T) => {
    items.value.push(item)
  }

  // 移除项目
  const removeItem = (id: string) => {
    items.value = items.value.filter(item => item.id !== id)
  }

  // 更新项目
  const updateItem = (id: string, updates: Partial<T>) => {
    const index = items.value.findIndex(item => item.id === id)
    if (index !== -1) {
      items.value[index] = { ...items.value[index], ...updates }
    }
  }

  // 查找项目
  const findItem = (id: string) => {
    return items.value.find(item => item.id === id)
  }

  // 过滤项目
  const filterItems = (predicate: (item: T) => boolean) => {
    return computed(() => items.value.filter(predicate))
  }

  return {
    addItem,
    removeItem,
    updateItem,
    findItem,
    filterItems,
  }
}
```

## API 请求类型

### 定义 API 响应类型

```typescript
// API 响应类型
interface ApiResponse<T> {
  code: number
  message: string
  data: T
}

// 列表响应
interface ListResponse<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
}

// 使用 API 类型
interface Product {
  id: string
  name: string
  price: number
}

type ProductListResponse = ApiResponse<ListResponse<Product>>

// API 函数
const fetchProducts = async (): Promise<ProductListResponse> => {
  const response = await fetch('/api/products')
  return response.json()
}
```

### 类型安全的 API 调用

```typescript
import axios from 'axios'
import type { AxiosResponse } from 'axios'

// 创建带类型的 axios 实例
const api = axios.create({
  baseURL: '/api',
})

// API 请求类型
interface ApiRequest<T> {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  url: string
  data?: T
}

// 通用 API 请求函数
async function request<T, R>(config: ApiRequest<T>): Promise<R> {
  const response = await api.request<R>({
    method: config.method,
    url: config.url,
    data: config.data,
  })
  return response.data
}

// 使用
const products = await request<void, Product[]>({
  method: 'GET',
  url: '/products',
})
```

## 常见类型模式

### 可选属性处理

```typescript
import type { CardProps } from 'one-wish'

// 定义可选的卡片配置
type PartialCardProps = Partial<CardProps>

// 合并配置
const mergeCardProps = (
  defaults: CardProps,
  overrides?: PartialCardProps
): CardProps => {
  return { ...defaults, ...overrides }
}
```

### 枚举值类型

```typescript
import type { ButtonType, CardSize } from 'one-wish'

// 定义枚举值类型
type AllowedButtonTypes = ButtonType
type AllowedCardSizes = CardSize

// 验证函数
const isValidButtonType = (type: any): type is ButtonType => {
  return ['primary', 'success', 'warning', 'danger', 'info'].includes(type)
}

const isValidCardSize = (size: any): size is CardSize => {
  return ['small', 'default', 'large'].includes(size)
}
```

### 联合类型

```typescript
import type { ButtonProps, InputProps } from 'one-wish'

// 定义组件联合类型
type FormComponentProps = ButtonProps | InputProps

// 类型守卫
const isButtonProps = (props: any): props is ButtonProps => {
  return 'type' in props && 'size' in props
}

const isInputProps = (props: any): props is InputProps => {
  return 'placeholder' in props && 'clearable' in props
}
```

## 最佳实践

### 1. 始终使用类型导入

```typescript
// ✅ 正确
import type { ButtonProps, InputProps } from 'one-wish'

// ❌ 不正确
import { ButtonProps, InputProps } from 'one-wish'
```

### 2. 为组件定义一致的类型

```typescript
// ✅ 推荐：集中管理类型
// types/components.ts
export type CardConfig = CardProps & {
  customAttribute?: string
}

// ❌ 避免：分散的类型定义
```

### 3. 使用函数重载

```typescript
// 为不同的参数提供类型
function createComponent(props: ButtonProps): ButtonProps
function createComponent(props: InputProps): InputProps
function createComponent(props: ButtonProps | InputProps) {
  return props
}
```

### 4. 利用 keyof 获取对象键

```typescript
interface FormData {
  username: string
  email: string
  age: number
}

// 获取表单字段类型
type FormField = keyof FormData

const validateField = (field: FormField, value: any) => {
  // 类型安全的字段验证
}
```

## 调试类型

### 使用类型断言

```typescript
// 当确实知道类型时使用
const element = document.getElementById('app') as HTMLElement

const props = {
  title: '测试',
} as CardProps
```

### 检查类型

```typescript
// 使用 typeof 检查
if (typeof value === 'string') {
  console.log(value.toUpperCase())
}

// 使用类型守卫
function isSring(value: unknown): value is string {
  return typeof value === 'string'
}
```

## 总结

TypeScript 的类型安全性可以帮助你：

1. ✅ 在开发阶段捕获错误
2. ✅ 获得更好的 IDE 智能提示
3. ✅ 提高代码的可维护性
4. ✅ 改善团队协作
5. ✅ 减少运行时错误

始终遵循 TypeScript 最佳实践，充分利用类型系统的强大功能！
