# Cascader 级联选择

级联选择器，用于多层级数据的选择。

## 基础用法

<demo src="../demos/cascader/basic.vue"></demo>

## 可清空

<demo src="../demos/cascader/clearable.vue"></demo>

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue / v-model | 绑定值 | (string \| number)[] | [] |
| options | 选项数据 | CascaderOption[] | [] |
| placeholder | 占位文本 | string | '请选择' |
| disabled | 是否禁用 | boolean | false |
| clearable | 是否可清空 | boolean | false |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| update:modelValue | 值改变时触发 | (value: (string \| number)[]) |
| change | 选择完成时触发 | (value: (string \| number)[]) |

### Types

```ts
interface CascaderOption {
  value: string | number
  label: string
  children?: CascaderOption[]
  disabled?: boolean
}
```
