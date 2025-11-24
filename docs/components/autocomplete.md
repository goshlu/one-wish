# AutoComplete 自动完成

根据输入内容提供建议列表，支持键盘导航和自定义选项。

## 基础用法

<DemoBlock>
  <div>
    <my-autocomplete
      v-model="value"
      :options="options"
      placeholder="请输入内容"
      clearable
    />
    <p>输入值: {{ value }}</p>
  </div>

  <template #code>

  ```vue
  <template>
    <div>
      <my-autocomplete
        v-model="value"
        :options="options"
        placeholder="请输入内容"
        clearable
      />
      <p>输入值: {{ value }}</p>
    </div>
  </template>

  <script setup lang="ts">
  import { ref } from 'vue'

  const value = ref('')
  const options = [
    { value: 'Vue' },
    { value: 'React' },
    { value: 'Angular' },
    { value: 'Svelte' },
    { value: 'Solid' },
  ]
  </script>
  ```

  </template>
</DemoBlock>

## 自定义选项

通过 `label` 属性可以自定义选项的显示文本，通过监听 `search` 事件可以动态更新选项列表。

<DemoBlock>
  <div>
    <my-autocomplete
      v-model="value2"
      :options="options2"
      placeholder="搜索邮箱"
      @search="handleSearch"
    />
    <p>输入值: {{ value2 }}</p>
  </div>

  <template #code>

  ```vue
  <template>
    <div>
      <my-autocomplete
        v-model="value"
        :options="options"
        placeholder="搜索邮箱"
        @search="handleSearch"
      />
      <p>输入值: {{ value }}</p>
    </div>
  </template>

  <script setup lang="ts">
  import { ref } from 'vue'

  const value = ref('')
  const options = ref([
    { value: 'admin@example.com', label: '管理员' },
    { value: 'user@example.com', label: '用户' },
  ])

  const handleSearch = (query: string) => {
    if (query) {
      options.value = [
        { value: `${query}@gmail.com` },
        { value: `${query}@qq.com` },
        { value: `${query}@163.com` },
      ]
    }
  }
  </script>
  ```

  </template>
</DemoBlock>

## 远程搜索

结合 `search` 事件可以实现远程搜索功能，例如搜索用户、城市等。

<DemoBlock>
  <div>
    <my-autocomplete
      v-model="value3"
      :options="searchResults"
      placeholder="搜索城市"
      clearable
      @search="handleRemoteSearch"
    />
    <p>选中城市: {{ value3 }}</p>
  </div>

  <template #code>

  ```vue
  <template>
    <div>
      <my-autocomplete
        v-model="value"
        :options="searchResults"
        placeholder="搜索城市"
        clearable
        @search="handleRemoteSearch"
      />
      <p>选中城市: {{ value }}</p>
    </div>
  </template>

  <script setup lang="ts">
  import { ref } from 'vue'

  const value = ref('')
  const searchResults = ref([])

  // 模拟城市数据
  const cities = [
    { value: '北京', label: '北京 Beijing' },
    { value: '上海', label: '上海 Shanghai' },
    { value: '广州', label: '广州 Guangzhou' },
    { value: '深圳', label: '深圳 Shenzhen' },
    { value: '杭州', label: '杭州 Hangzhou' },
    { value: '成都', label: '成都 Chengdu' },
    { value: '重庆', label: '重庆 Chongqing' },
    { value: '西安', label: '西安 Xi\'an' },
  ]

  const handleRemoteSearch = (query: string) => {
    if (query) {
      // 模拟远程搜索
      searchResults.value = cities.filter(city =>
        city.value.includes(query) || city.label.toLowerCase().includes(query.toLowerCase())
      )
    } else {
      searchResults.value = []
    }
  }
  </script>
  ```

  </template>
</DemoBlock>

## 选中回调

通过 `select` 事件可以在用户选中选项时执行自定义操作。

<DemoBlock>
  <div>
    <my-autocomplete
      v-model="value4"
      :options="frameworks"
      placeholder="选择前端框架"
      @select="handleSelect"
    />
    <p v-if="selectedInfo">你选择了: {{ selectedInfo }}</p>
  </div>

  <template #code>

  ```vue
  <template>
    <div>
      <my-autocomplete
        v-model="value"
        :options="frameworks"
        placeholder="选择前端框架"
        @select="handleSelect"
      />
      <p v-if="selectedInfo">你选择了: {{ selectedInfo }}</p>
    </div>
  </template>

  <script setup lang="ts">
  import { ref } from 'vue'

  const value = ref('')
  const selectedInfo = ref('')

  const frameworks = [
    { value: 'Vue', label: 'Vue.js - 渐进式框架' },
    { value: 'React', label: 'React - 用于构建用户界面的库' },
    { value: 'Angular', label: 'Angular - 完整的前端框架' },
    { value: 'Svelte', label: 'Svelte - 编译时框架' },
  ]

  const handleSelect = (option) => {
    selectedInfo.value = option.label || option.value
  }
  </script>
  ```

  </template>
</DemoBlock>

## 禁用状态

<DemoBlock>
  <div>
    <my-autocomplete
      v-model="value5"
      :options="options"
      placeholder="禁用状态"
      disabled
    />
  </div>

  <template #code>

  ```vue
  <template>
    <my-autocomplete
      v-model="value"
      :options="options"
      placeholder="禁用状态"
      disabled
    />
  </template>

  <script setup lang="ts">
  import { ref } from 'vue'

  const value = ref('')
  const options = [
    { value: 'Vue' },
    { value: 'React' },
    { value: 'Angular' },
  ]
  </script>
  ```

  </template>
</DemoBlock>

<script setup>
import { ref } from 'vue'

const value = ref('')
const options = [
  { value: 'Vue' },
  { value: 'React' },
  { value: 'Angular' },
  { value: 'Svelte' },
  { value: 'Solid' },
]

const value2 = ref('')
const options2 = ref([
  { value: 'admin@example.com', label: '管理员' },
  { value: 'user@example.com', label: '用户' },
])

const handleSearch = (query) => {
  if (query) {
    options2.value = [
      { value: `${query}@gmail.com` },
      { value: `${query}@qq.com` },
      { value: `${query}@163.com` },
    ]
  }
}

// 远程搜索示例
const value3 = ref('')
const searchResults = ref([])

const cities = [
  { value: '北京', label: '北京 Beijing' },
  { value: '上海', label: '上海 Shanghai' },
  { value: '广州', label: '广州 Guangzhou' },
  { value: '深圳', label: '深圳 Shenzhen' },
  { value: '杭州', label: '杭州 Hangzhou' },
  { value: '成都', label: '成都 Chengdu' },
  { value: '重庆', label: '重庆 Chongqing' },
  { value: '西安', label: '西安 Xi\'an' },
]

const handleRemoteSearch = (query) => {
  if (query) {
    searchResults.value = cities.filter(city =>
      city.value.includes(query) || city.label.toLowerCase().includes(query.toLowerCase())
    )
  } else {
    searchResults.value = []
  }
}

// 选中回调示例
const value4 = ref('')
const selectedInfo = ref('')

const frameworks = [
  { value: 'Vue', label: 'Vue.js - 渐进式框架' },
  { value: 'React', label: 'React - 用于构建用户界面的库' },
  { value: 'Angular', label: 'Angular - 完整的前端框架' },
  { value: 'Svelte', label: 'Svelte - 编译时框架' },
]

const handleSelect = (option) => {
  selectedInfo.value = option.label || option.value
}

// 禁用状态
const value5 = ref('')
</script>

## 使用场景

AutoComplete 组件适用于以下场景：

- **搜索建议**：为搜索框提供历史记录或热门搜索建议
- **邮箱输入**：输入邮箱时自动补全常见邮箱后缀
- **地址输入**：输入地址时提供地址建议
- **标签输入**：输入标签时提供已有标签建议
- **用户搜索**：搜索用户名或昵称时提供匹配结果
- **城市选择**：输入城市名称时提供城市列表

## 特性

- 支持键盘导航（↑/↓ 箭头键）
- 支持 Enter 键选择
- 支持 Escape 键关闭
- 自动过滤匹配选项
- 无匹配时显示空状态提示
- 支持清除按钮
- 支持自定义选项标签
- 支持远程搜索

## 键盘操作

| 按键 | 说明 |
| --- | --- |
| `↑` / `↓` | 在选项间上下导航 |
| `Enter` | 选择当前高亮的选项 |
| `Escape` | 关闭下拉列表 |

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue / v-model | 绑定值 | `string` | `''` |
| options | 选项数据源 | `AutoCompleteOption[]` | `[]` |
| placeholder | 输入框占位文本 | `string` | `'请输入'` |
| disabled | 是否禁用 | `boolean` | `false` |
| clearable | 是否显示清除按钮 | `boolean` | `false` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| update:modelValue | 输入值改变时触发 | `(value: string)` |
| select | 选中选项时触发 | `(option: AutoCompleteOption)` |
| search | 输入搜索时触发 | `(value: string)` |

### Types

```ts
interface AutoCompleteOption {
  value: string      // 选项的值
  label?: string     // 选项的标签（可选，默认使用 value）
}
```

## TypeScript

```typescript
import type {
  AutoCompleteProps,
  AutoCompleteEmits,
  AutoCompleteOption,
} from 'one-wish'
```
