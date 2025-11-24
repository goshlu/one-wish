# AutoComplete 自动完成

输入建议组件，为输入框提供自动补全功能。

## 基础用法

<demo src="../demos/autocomplete/basic.vue"></demo>

## 自定义选项

<demo src="../demos/autocomplete/custom.vue"></demo>

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue / v-model | 绑定值 | string | '' |
| options | 选项数据 | AutoCompleteOption[] | [] |
| placeholder | 占位文本 | string | '请输入' |
| disabled | 是否禁用 | boolean | false |
| clearable | 是否可清空 | boolean | false |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| update:modelValue | 值改变时触发 | (value: string) |
| select | 选中选项时触发 | (option: AutoCompleteOption) |
| search | 搜索时触发 | (value: string) |

### Types

```ts
interface AutoCompleteOption {
  value: string
  label?: string
}
```
