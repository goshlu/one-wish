# Steps 步骤条

展示任务的进度与阶段。

## 基础用法

<DemoBlock>
  <template #default>
    <my-steps :steps="stepItems" :current="1" />
  </template>

  <template #code>

  ```vue
  <script setup lang="ts">
  const stepItems = [
    { title: '创建任务', description: '填写信息' },
    { title: '审批中', description: '等待确认' },
    { title: '完成', description: '发布上线' },
  ]
  </script>

  <template>
    <my-steps :steps="stepItems" :current="1" />
  </template>
  ```

  </template>
</DemoBlock>

## 自定义状态

<DemoBlock>
  <template #default>
    <my-steps :steps="[{ title: '校验', status: 'error' }, { title: '提交', status: 'wait' }]" />
  </template>

  <template #code>

  ```vue
  <template>
    <my-steps :steps="[{ title: '校验', status: 'error' }, { title: '提交', status: 'wait' }]" />
  </template>
  ```

  </template>
</DemoBlock>

## API

### Steps Props

| 属性    | 说明       | 类型                                      | 默认值 |
| ------- | ---------- | ----------------------------------------- | ------ |
| steps   | 步骤列表   | `{ title: string; description?: string; status?: 'wait' \| 'process' \| 'finish' \| 'error' }[]` | `[]`   |
| current | 当前步骤序号（从 0 开始） | `number` | `0` |

<script setup lang="ts">
const stepItems = [
  { title: '创建任务', description: '填写信息' },
  { title: '审批中', description: '等待确认' },
  { title: '完成', description: '发布上线' },
]
</script>
