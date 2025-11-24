# ColorPicker 颜色选择器

用于颜色选择，支持多种格式。

## 基础用法

<demo src="../demos/color-picker/basic.vue"></demo>

## 预定义颜色

<demo src="../demos/color-picker/predefine.vue"></demo>

## API

### Props

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue / v-model | 绑定值 | string | '#409eff' |
| disabled | 是否禁用 | boolean | false |
| showAlpha | 是否支持透明度 | boolean | false |
| predefineColors | 预定义颜色 | string[] | [] |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| update:modelValue | 值改变时触发 | (value: string) |
| change | 颜色改变时触发 | (value: string) |
