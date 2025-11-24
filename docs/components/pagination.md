# Pagination 分页

用于数据列表的分页切换。
## 基础用法

<DemoBlock>
  <template #default>
    <my-pagination :total="120" v-model:current-page="page" />
  </template>

  <template #code>

  ```vue
  <script setup lang="ts">
  const page = ref(1)
  </script>

  <template>
    <my-pagination :total="120" v-model:current-page="page" />
  </template>
  ```

  </template>
</DemoBlock>

## 切换每页数量

<DemoBlock>
  <template #default>
    <my-pagination
      :total="240"
      v-model:current-page="page"
      show-size-changer
      :page-size-options="[10, 20, 50]"
      show-jumper
    />
  </template>

  <template #code>

  ```vue
  <template>
    <my-pagination
      :total="240"
      v-model:current-page="page"
      show-size-changer
      :page-size-options="[10, 20, 50]"
      show-jumper
    />
  </template>
  ```

  </template>
</DemoBlock>

## 跳转指定页

<DemoBlock>
  <template #default>
    <my-pagination
      :total="500"
      v-model:current-page="page"
      show-size-changer
      :page-size-options="[10, 20, 50]"
      show-jumper
    />
  </template>

  <template #code>

  ```vue
  <template>
    <my-pagination
      :total="500"
      v-model:current-page="page"
      show-size-changer
      :page-size-options="[10, 20, 50]"
      show-jumper
    />
  </template>
  ```

  </template>
</DemoBlock>

## API

### Pagination Props

| 属性            | 说明             | 类型          | 默认值      |
| ---------------- | ---------------- | ------------- | ----------- |
| total            | 总条目数         | `number`      | `0`         |
| pageSize         | 每页数量         | `number`      | `10`        |
| currentPage      | 当前页码         | `number`      | `1`         |
| pageSizeOptions  | 可选页大小列表   | `number[]`    | `[10,20,50]` |
| showSizeChanger  | 是否允许改页大小 | `boolean`     | `false`     |
| showJumper       | 是否显示跳页器   | `boolean`     | `false`     |

### Pagination Events

| 事件名            | 说明             | 回调参数                              |
| ----------------- | ---------------- | ------------------------------------- |
| change            | 页码或页大小变化 | `(page: number, pageSize: number)`    |
| update:currentPage | 双向绑定        | `page: number`                        |
| page-size-change  | 仅页大小变化     | `pageSize: number`                    |

<script setup lang="ts">
import { ref } from 'vue'

const page = ref(1)
</script>
