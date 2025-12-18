import type { App } from 'vue'
import MyAnchor from './components/Anchor/Anchor.vue'
import MyAutoComplete from './components/AutoComplete/AutoComplete.vue'
import MyAvatar from './components/Avatar/Avatar.vue'
import MyBadge from './components/Badge/Badge.vue'
import MyBreadcrumb from './components/Breadcrumb/Breadcrumb.vue'
import MyButton from './components/Button/Button.vue'
import MyCard from './components/Card/Card.vue'
import MyCascader from './components/Cascader/Cascader.vue'
import MyCheckbox from './components/Checkbox/Checkbox.vue'
import MyCheckboxGroup from './components/Checkbox/CheckboxGroup.vue'
import MyColorPicker from './components/ColorPicker/ColorPicker.vue'
import MyDatePicker from './components/DatePicker/DatePicker.vue'
import MyDivider from './components/Divider/Divider.vue'
import MyDropdown from './components/Dropdown/Dropdown.vue'
import MyFlex from './components/Flex/Flex.vue'
import MyFloatButton from './components/FloatButton/FloatButton.vue'
import MyFloatButtonGroup from './components/FloatButton/FloatButtonGroup.vue'
import MyGrid from './components/Grid/Grid.vue'
import MyIcon from './components/Icon/Icon.vue'
import MyInput from './components/Input/Input.vue'
import MyInputNumber from './components/InputNumber/InputNumber.vue'
import MyMentions from './components/Mentions/Mentions.vue'
import MyRadio from './components/Radio/Radio.vue'
import MyRadioGroup from './components/Radio/RadioGroup.vue'
import MyRate from './components/Rate/Rate.vue'
import MySelect from './components/Select/Select.vue'
import MySwitch from './components/Switch/Switch.vue'
import MyLayout from './components/Layout/Layout.vue'
import MyLayoutContent from './components/Layout/LayoutContent.vue'
import MyLayoutFooter from './components/Layout/LayoutFooter.vue'
import MyLayoutHeader from './components/Layout/LayoutHeader.vue'
import MyLayoutSider from './components/Layout/LayoutSider.vue'
import MyMasonry from './components/Masonry/Masonry.vue'
import MyMenu from './components/Menu/Menu.vue'
import MyForm from './components/Form/Form.vue'
import MyFormItem from './components/Form/FormItem.vue'
import MyPagination from './components/Pagination/Pagination.vue'
import MySpace from './components/Space/Space.vue'
import MySplitter from './components/Splitter/Splitter.vue'
import MySplitterPane from './components/Splitter/SplitterPane.vue'
import MySteps from './components/Steps/Steps.vue'
import MyTabs from './components/Tabs/Tabs.vue'
import MyTimePicker from './components/TimePicker/TimePicker.vue'
import MyTransfer from './components/Transfer/Transfer.vue'
import MyTreeSelect from './components/TreeSelect/TreeSelect.vue'
import MyUpload from './components/Upload/Upload.vue'

export {
  MyAnchor,
  MyAutoComplete,
  MyAvatar,
  MyBadge,
  MyBreadcrumb,
  MyButton,
  MyCard,
  MyCascader,
  MyCheckbox,
  MyCheckboxGroup,
  MyColorPicker,
  MyDatePicker,
  MyDivider,
  MyDropdown,
  MyFlex,
  MyFloatButton,
  MyFloatButtonGroup,
  MyGrid,
  MyIcon,
  MyInput,
  MyInputNumber,
  MyMentions,
  MyRadio,
  MyRadioGroup,
  MyRate,
  MySelect,
  MySwitch,
  MyLayout,
  MyLayoutContent,
  MyLayoutFooter,
  MyLayoutHeader,
  MyLayoutSider,
  MyMasonry,
  MyForm,
  MyFormItem,
  MyMenu,
  MyPagination,
  MySpace,
  MySplitter,
  MySplitterPane,
  MySteps,
  MyTabs,
  MyTimePicker,
  MyTransfer,
  MyTreeSelect,
  MyUpload,
}

const components = [
  MyAnchor,
  MyAutoComplete,
  MyAvatar,
  MyBadge,
  MyBreadcrumb,
  MyButton,
  MyCard,
  MyCascader,
  MyCheckbox,
  MyCheckboxGroup,
  MyColorPicker,
  MyDatePicker,
  MyDivider,
  MyDropdown,
  MyFlex,
  MyFloatButton,
  MyFloatButtonGroup,
  MyGrid,
  MyIcon,
  MyInput,
  MyInputNumber,
  MyMentions,
  MyRadio,
  MyRadioGroup,
  MyRate,
  MySelect,
  MySwitch,
  MyLayout,
  MyLayoutContent,
  MyLayoutFooter,
  MyLayoutHeader,
  MyLayoutSider,
  MyMasonry,
  MyForm,
  MyFormItem,
  MyMenu,
  MyPagination,
  MySpace,
  MySplitter,
  MySplitterPane,
  MySteps,
  MyTabs,
  MyTimePicker,
  MyTransfer,
  MyTreeSelect,
  MyUpload,
]

const install = (app: App) => {
  components.forEach(component => {
    const name = component.name || (component as any).__name
    if (name) {
      app.component(name, component)
    }
  })
}

export default {
  install,
}

export * from './components/Anchor/types'
export * from './components/AutoComplete/types'
export * from './components/Avatar/types'
export * from './components/Badge/types'
export * from './components/Breadcrumb/types'
export * from './components/Button/types'
export * from './components/Card/types'
export * from './components/Cascader/types'
export * from './components/Checkbox/types'
export * from './components/ColorPicker/types'
export * from './components/DatePicker/types'
export * from './components/Divider/types'
export * from './components/Dropdown/types'
export * from './components/Flex/types'
export * from './components/FloatButton/types'
export * from './components/Grid/types'
export * from './components/Icon/types'
export * from './components/Input/types'
export * from './components/InputNumber/types'
export * from './components/Mentions/types'
export * from './components/Radio/types'
export * from './components/Rate/types'
export * from './components/Select/types'
export * from './components/Switch/types'
export * from './components/Layout/types'
export * from './components/Masonry/types'
export * from './components/Form/types'
export * from './components/Menu/types'
export * from './components/Pagination/types'
export * from './components/Space/types'
export * from './components/Splitter/types'
export * from './components/Steps/types'
export * from './components/Tabs/types'
export * from './components/TimePicker/types'
export * from './components/Transfer/types'
export * from './components/TreeSelect/types'
export * from './components/Upload/types'

// 导出 resolver 用于 unplugin-vue-components
export { OneWishResolver } from './resolver'
export { useForm } from './components/Form/useForm'
