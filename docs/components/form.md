# Form 表单

用于收集、校验和提交数据的表单容器组件，提供多种布局、外观与交互方式。

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules, FormVariant } from 'one-wish'
import { useForm } from 'one-wish'

const basicForm = reactive({ name: '', birthday: '' })
const ruleFormModel = reactive({ email: '', age: -1 })
const layoutForm = reactive({ company: '', department: '', memo: '' })
const inlineForm = reactive({ keyword: '', date: '' })
const variantForm = reactive({ project: '', owner: '', budget: '' })

const rules: FormRules = {
  name: [{ required: true, message: '请输入姓名', trigger: ['blur', 'change'] }],
  birthday: [{ required: true, message: '请选择生日', trigger: ['blur', 'change'] }],
  email: [
    { required: true, message: '请输入邮箱', trigger: ['blur', 'change'] },
    { pattern: /^[\w-.]+@[\w-]+\.[\w-.]+$/, message: '邮箱格式不正确', trigger: ['blur', 'change'] },
  ],
  age: [
    { required: true, message: '请输入年龄', trigger: ['blur', 'change'] },
    {
      validator: value => (value >= 0 && value <= 150) || '年龄需在 0-150 之间',
      trigger: ['blur', 'change'],
    },
  ],
}

const handleBasicSubmit = () => {
  window.alert(JSON.stringify(basicForm, null, 2))
}

const ruleFormRef = ref<FormInstance>()
const [, ruleForm] = useForm(ruleFormRef)
const handleValidate = async () => {
  await ruleForm.validate()
}
const handleReset = () => {
  ruleForm.resetFields()
}

const currentVariant = ref<FormVariant>('outlined')
const variantOptions: FormVariant[] = ['outlined', 'filled', 'borderless', 'underlined']
const formDisabled = ref(false)
const toggleDisabled = () => {
  formDisabled.value = !formDisabled.value
}
</script>

## 基础用法

通过 `model` 绑定表单数据，`my-form-item` 包裹具体输入组件，`prop` 对应字段名。

<DemoBlock>
  <my-form :model="basicForm" :rules="rules" label-width="90px">
    <my-form-item label="姓名" prop="name">
      <my-input v-model="basicForm.name" placeholder="请输入姓名" />
    </my-form-item>
    <my-form-item label="生日" prop="birthday">
      <my-date-picker v-model="basicForm.birthday" placeholder="请选择日期" />
    </my-form-item>
    <my-form-item>
      <my-button type="primary" @click="handleBasicSubmit">提交</my-button>
    </my-form-item>
  </my-form>

<template #code>

```vue
<script setup lang="ts">
import { reactive } from 'vue'

const form = reactive({ name: '', birthday: '' })
const handleSubmit = () => window.alert(JSON.stringify(form))
</script>

<template>
  <my-form :model="form">
    <my-form-item label="姓名" prop="name">
      <my-input v-model="form.name" />
    </my-form-item>
    <my-form-item label="生日" prop="birthday">
      <my-date-picker v-model="form.birthday" />
    </my-form-item>
    <my-form-item>
      <my-button type="primary" @click="handleSubmit">提交</my-button>
    </my-form-item>
  </my-form>
</template>
```

  </template>
</DemoBlock>

## 校验与 Form.useForm

`useForm` 返回表单实例 `ref` 及 `validate / resetFields / clearValidate` 三个方法，便于在逻辑中调用。

<DemoBlock>
  <my-form :model="ruleFormModel" :rules="rules" ref="ruleFormRef" label-width="90px" show-message>
    <my-form-item label="邮箱" prop="email" show-message>
      <my-input v-model="ruleFormModel.email" placeholder="请输入邮箱" />
    </my-form-item>
    <my-form-item label="年龄" prop="age" show-message>
      <my-input-number v-model="ruleFormModel.age" :min="0" :max="150" />
    </my-form-item>
    <my-form-item>
      <my-space>
        <my-button type="primary" @click="handleValidate">校验</my-button>
        <my-button @click="handleReset">重置</my-button>
      </my-space>
    </my-form-item>
  </my-form>

<template #code>

```vue
<template>
  <my-form :model="model" :rules="rules" ref="formRef" label-width="90px">
    <my-form-item label="邮箱" prop="email">
      <my-input v-model="model.email" placeholder="请输入邮箱" />
    </my-form-item>
    <my-form-item label="年龄" prop="age">
      <my-input-number v-model="model.age" :min="0" :max="150" />
    </my-form-item>
    <my-form-item>
      <my-space>
        <my-button type="primary" @click="handleValidate">校验</my-button>
        <my-button @click="handleReset">重置</my-button>
      </my-space>
    </my-form-item>
  </my-form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'one-wish'

const model = reactive({ email: '', age: -1 })

const rules: FormRules = {
  email: [
    { required: true, message: '请输入邮箱地址', trigger: ['blur', 'change'] },
    {
      pattern: /^[\w-.]+@[\w-]+\.[\w-.]+$/,
      message: '邮箱格式不正确',
      trigger: ['blur', 'change'],
    },
  ],
  age: [
    { required: true, message: '请输入年龄', trigger: ['blur', 'change'] },
    {
      validator: value => (value >= 0 && value <= 150) || '年龄需在 0-150 之间',
      trigger: ['blur', 'change'],
    },
  ],
}

const formRef = ref<FormInstance>()

const handleValidate = async () => {
  const valid = await formRef.value?.validate()
  if (valid) {
    window.alert('校验通过')
  } else {
    window.alert('校验未通过，请检查上方红色提示')
  }
}

const handleReset = () => {
  formRef.value?.resetFields()
}
</script>
```

  </template>
</DemoBlock>

## 布局方式

通过 `layout` 控制整体布局，也可在单个 `Form.Item` 上设置 `layout` 实现一个表单多种排列。

<DemoBlock>
  <div class="form-layout-grid">
    <div class="demo-form-block">
      <h4>水平布局（默认）</h4>
      <my-form :model="layoutForm" layout="horizontal" label-width="90px">
        <my-form-item label="公司" prop="company">
          <my-input v-model="layoutForm.company" />
        </my-form-item>
        <my-form-item label="部门" prop="department">
          <my-input v-model="layoutForm.department" />
        </my-form-item>
        <my-form-item label="备注" layout="vertical">
          <my-input v-model="layoutForm.memo" placeholder="请输入备注" />
        </my-form-item>
      </my-form>
    </div>
    <div class="demo-form-block">
      <h4>垂直布局</h4>
      <my-form :model="layoutForm" layout="vertical">
        <my-form-item label="公司" prop="company">
          <my-input v-model="layoutForm.company" />
        </my-form-item>
        <my-form-item label="部门" prop="department">
          <my-input v-model="layoutForm.department" />
        </my-form-item>
        <my-form-item label="备注" prop="memo">
          <my-input v-model="layoutForm.memo" placeholder="请输入备注" />
        </my-form-item>
      </my-form>
    </div>
  </div>
</DemoBlock>

## 行内表单

设置 `layout="inline"` 可以在一行内放置紧凑字段，适合筛选场景。

<DemoBlock>
  <my-form :model="inlineForm" layout="inline" size="small">
    <my-form-item label="关键词">
      <my-input v-model="inlineForm.keyword" placeholder="搜索内容" />
    </my-form-item>
    <my-form-item label="日期">
      <my-date-picker v-model="inlineForm.date" />
    </my-form-item>
    <my-form-item>
      <my-button type="primary">搜索</my-button>
    </my-form-item>
  </my-form>
</DemoBlock>

## 变体与禁用

`variant` 控制输入控件的风格（描边、填充、无边框、下划线），`disabled` 会影响整个表单域。

<DemoBlock>
  <div class="variant-toolbar">
    <label>风格：</label>
    <select v-model="currentVariant">
      <option v-for="variant in variantOptions" :key="variant" :value="variant">
        {{ variant }}
      </option>
    </select>
    <my-button size="small" @click="toggleDisabled">
      {{ formDisabled ? '启用表单' : '禁用表单' }}
    </my-button>
  </div>
  <my-form :model="variantForm" :variant="currentVariant" :disabled="formDisabled" label-width="90px">
    <my-form-item label="项目" prop="project">
      <my-input v-model="variantForm.project" placeholder="请输入项目名称" />
    </my-form-item>
    <my-form-item label="负责人" prop="owner">
      <my-input v-model="variantForm.owner" placeholder="请输入负责人" />
    </my-form-item>
    <my-form-item label="预算" prop="budget">
      <my-input-number v-model="variantForm.budget" :min="0" />
    </my-form-item>
  </my-form>
</DemoBlock>

## API

### Form Props

| 属性          | 说明                                                         | 类型                                                     | 默认值                 |
| ------------- | ------------------------------------------------------------ | -------------------------------------------------------- | ---------------------- |
| model         | 表单数据对象                                                 | `Record<string, any>`                                    | —                      |
| rules         | 校验规则                                                     | `FormRules`                                              | `{}`                   |
| layout        | 表单布局                                                     | `'horizontal' \| 'vertical' \| 'inline'`                 | `'horizontal'`         |
| labelPosition | 标签位置                                                     | `'left' \| 'right' \| 'top'`                             | 根据 `layout` 自动计算 |
| labelWidth    | 标签宽度                                                     | `string`                                                 | `'100px'`              |
| size          | 表单尺寸                                                     | `'large' \| 'default' \| 'small'`                        | `'default'`            |
| showMessage   | 是否显示校验信息                                             | `boolean`                                                | `true`                 |
| disabled      | 是否禁用整个表单                                             | `boolean`                                                | `false`                |
| variant       | 输入控件变体                                                 | `'outlined' \| 'filled' \| 'borderless' \| 'underlined'` | `'outlined'`           |
| inline        | 是否开启旧版行内模式（将被废弃，推荐使用 `layout="inline"`） | `boolean`                                                | `false`                |

### Form Events

| 事件名 | 说明       | 回调参数         |
| ------ | ---------- | ---------------- |
| submit | 提交时触发 | `(event: Event)` |

### Form Expose

| 方法                  | 说明                                                  |
| --------------------- | ----------------------------------------------------- |
| validate(props?)      | 对指定字段或整个表单进行校验，返回 `Promise<boolean>` |
| resetFields(props?)   | 重置指定字段或整个表单                                |
| clearValidate(props?) | 清除校验提示                                          |

### FormItem Props

| 属性          | 说明             | 类型                                                     | 默认值   |
| ------------- | ---------------- | -------------------------------------------------------- | -------- |
| label         | 标签文本         | `string`                                                 | —        |
| prop          | 对应表单字段     | `string`                                                 | —        |
| required      | 是否必填         | `boolean`                                                | `false`  |
| showMessage   | 是否显示校验信息 | `boolean`                                                | 跟随表单 |
| labelWidth    | 标签宽度         | `string`                                                 | 跟随表单 |
| labelPosition | 标签位置         | `'left' \| 'right' \| 'top'`                             | 跟随表单 |
| layout        | 单个表单项的布局 | `'horizontal' \| 'vertical'`                             | 跟随表单 |
| size          | 尺寸             | `'large' \| 'default' \| 'small'`                        | 跟随表单 |
| variant       | 输入控件变体     | `'outlined' \| 'filled' \| 'borderless' \| 'underlined'` | 跟随表单 |
| rules         | 单独的校验规则   | `FormRule[]`                                             | —        |

### useForm

`const formRef = ref<FormInstance>()`

`const [, form] = useForm(formRef)`

| 成员                 | 说明                                            |
| -------------------- | ----------------------------------------------- | ---------------------------------------- |
| `formRef`            | 需要绑定到 `<my-form ref="formRef">` 的实例引用 |
| `form.validate`      | `(props?: string                                | string[]) => Promise<boolean>`，触发校验 |
| `form.resetFields`   | `(props?: string                                | string[]) => void`，重置字段             |
| `form.clearValidate` | `(props?: string                                | string[]) => void`，清空校验状态         |

### TypeScript

```ts
import type {
  FormProps,
  FormRules,
  FormInstance,
  FormItemProps,
  UseFormReturn,
} from 'one-wish'
import { useForm } from 'one-wish'
```

```vue
<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'one-wish'
import { useForm } from 'one-wish'

const model = reactive({ email: '', age: 18 })
const rules: FormRules = {
  /* ... */
}
const formRef = ref<FormInstance>()
const [, form] = useForm(formRef)

const submit = async () => {
  const valid = await form.validate()
  if (valid) {
    // do something
  }
}
</script>
```

<style scoped>
.form-layout-grid {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
}

.demo-form-block {
  padding: 12px 16px;
  border: 1px solid var(--border-color-lighter);
  border-radius: var(--border-radius-base);
  background: var(--bg-color);
}

.demo-form-block h4 {
  margin: 0 0 12px;
  font-weight: 600;
  font-size: 14px;
}

.variant-toolbar {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.variant-toolbar select {
  padding: 4px 8px;
  border-radius: 4px;
  border: 1px solid var(--border-color-base);
}
</style>
