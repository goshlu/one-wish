# Checkbox 多选框

多选框组件，用于在一组选项中进行多项选择。

## 基础用法

<demo src="../demos/checkbox/basic.vue"></demo>

## 多选框组

<demo src="../demos/checkbox/group.vue"></demo>

## 半选状态

<demo src="../demos/checkbox/indeterminate.vue"></demo>

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
