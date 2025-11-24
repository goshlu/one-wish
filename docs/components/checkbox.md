# Checkbox 多选框

多选框组件，用于在一组选项中进行多项选择。

## 基础用法

<DemoBlock>
  <div>
    <my-checkbox v-model="checked">选项</my-checkbox>
    <p>选中状态: {{ checked }}</p>
  </div>

  <template #code>

  ```vue
  <template>
    <div>
      <my-checkbox v-model="checked">选项</my-checkbox>
      <p>选中状态: {{ checked }}</p>
    </div>
  </template>

  <script setup lang="ts">
  import { ref } from 'vue'

  const checked = ref(false)
  </script>
  ```

  </template>
</DemoBlock>

## 多选框组

<DemoBlock>
  <div>
    <my-checkbox-group v-model="checkedList">
      <my-checkbox label="选项1">选项1</my-checkbox>
      <my-checkbox label="选项2">选项2</my-checkbox>
      <my-checkbox label="选项3">选项3</my-checkbox>
    </my-checkbox-group>
    <p>已选: {{ checkedList }}</p>
  </div>

  <template #code>

  ```vue
  <template>
    <div>
      <my-checkbox-group v-model="checkedList">
        <my-checkbox label="选项1">选项1</my-checkbox>
        <my-checkbox label="选项2">选项2</my-checkbox>
        <my-checkbox label="选项3">选项3</my-checkbox>
      </my-checkbox-group>
      <p>已选: {{ checkedList }}</p>
    </div>
  </template>

  <script setup lang="ts">
  import { ref } from 'vue'

  const checkedList = ref(['选项1'])
  </script>
  ```

  </template>
</DemoBlock>

## 半选状态

<DemoBlock>
  <div>
    <my-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAll">
      全选
    </my-checkbox>
    <my-checkbox-group v-model="checkedList2" @change="handleCheckedChange">
      <my-checkbox label="选项1">选项1</my-checkbox>
      <my-checkbox label="选项2">选项2</my-checkbox>
      <my-checkbox label="选项3">选项3</my-checkbox>
    </my-checkbox-group>
  </div>

  <template #code>

  ```vue
  <template>
    <div>
      <my-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAll">
        全选
      </my-checkbox>
      <my-checkbox-group v-model="checkedList" @change="handleCheckedChange">
        <my-checkbox label="选项1">选项1</my-checkbox>
        <my-checkbox label="选项2">选项2</my-checkbox>
        <my-checkbox label="选项3">选项3</my-checkbox>
      </my-checkbox-group>
    </div>
  </template>

  <script setup lang="ts">
  import { ref, computed } from 'vue'

  const checkAll = ref(false)
  const checkedList = ref<string[]>([])
  const allOptions = ['选项1', '选项2', '选项3']

  const isIndeterminate = computed(() => {
    const len = checkedList.value.length
    return len > 0 && len < allOptions.length
  })

  const handleCheckAll = (val: boolean) => {
    checkedList.value = val ? allOptions : []
  }

  const handleCheckedChange = (value: (string | number)[]) => {
    checkAll.value = value.length === allOptions.length
  }
  </script>
  ```

  </template>
</DemoBlock>

<script setup>
import { ref, computed } from 'vue'

const checked = ref(false)
const checkedList = ref(['选项1'])

const checkAll = ref(false)
const checkedList2 = ref([])
const allOptions = ['选项1', '选项2', '选项3']

const isIndeterminate = computed(() => {
  const len = checkedList2.value.length
  return len > 0 && len < allOptions.length
})

const handleCheckAll = (val) => {
  checkedList2.value = val ? allOptions : []
}

const handleCheckedChange = (value) => {
  checkAll.value = value.length === allOptions.length
}
</script>

## API

### Checkbox Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue / v-model | 绑定值 | boolean \| string \| number | false |
| label | 选项的值 | string \| number | - |
| disabled | 是否禁用 | boolean | false |
| indeterminate | 半选状态 | boolean | false |

### Checkbox Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| update:modelValue | 值改变时触发 | (value: boolean \| string \| number) |
| change | 值改变时触发 | (value: boolean) |

### CheckboxGroup Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue / v-model | 绑定值 | (string \| number)[] | [] |
| disabled | 是否禁用 | boolean | false |

### CheckboxGroup Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| update:modelValue | 值改变时触发 | (value: (string \| number)[]) |
| change | 值改变时触发 | (value: (string \| number)[]) |

## TypeScript

```typescript
import type {
  CheckboxProps,
  CheckboxEmits,
  CheckboxGroupProps,
  CheckboxGroupEmits,
} from 'one-wish'
```
