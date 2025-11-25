import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import './custom.css'

// 导入组件库样式
import '../../../src/styles/index.css'

// 导入组件库
import MyAnchor from '../../../src/components/Anchor/Anchor.vue'
import MyAutoComplete from '../../../src/components/AutoComplete/AutoComplete.vue'
import MyBreadcrumb from '../../../src/components/Breadcrumb/Breadcrumb.vue'
import MyButton from '../../../src/components/Button/Button.vue'
import MyCascader from '../../../src/components/Cascader/Cascader.vue'
import MyCheckbox from '../../../src/components/Checkbox/Checkbox.vue'
import MyCheckboxGroup from '../../../src/components/Checkbox/CheckboxGroup.vue'
import MyColorPicker from '../../../src/components/ColorPicker/ColorPicker.vue'
import MyDivider from '../../../src/components/Divider/Divider.vue'
import MyDropdown from '../../../src/components/Dropdown/Dropdown.vue'
import MyFlex from '../../../src/components/Flex/Flex.vue'
import MyFloatButton from '../../../src/components/FloatButton/FloatButton.vue'
import MyFloatButtonGroup from '../../../src/components/FloatButton/FloatButtonGroup.vue'
import MyGrid from '../../../src/components/Grid/Grid.vue'
import MyIcon from '../../../src/components/Icon/Icon.vue'
import MyInput from '../../../src/components/Input/Input.vue'
import MyDatePicker from '../../../src/components/DatePicker/DatePicker.vue'
import MyLayout from '../../../src/components/Layout/Layout.vue'
import MyLayoutContent from '../../../src/components/Layout/LayoutContent.vue'
import MyLayoutFooter from '../../../src/components/Layout/LayoutFooter.vue'
import MyLayoutHeader from '../../../src/components/Layout/LayoutHeader.vue'
import MyLayoutSider from '../../../src/components/Layout/LayoutSider.vue'
import MyMasonry from '../../../src/components/Masonry/Masonry.vue'
import MyMenu from '../../../src/components/Menu/Menu.vue'
import MyPagination from '../../../src/components/Pagination/Pagination.vue'
import MySpace from '../../../src/components/Space/Space.vue'
import MySplitter from '../../../src/components/Splitter/Splitter.vue'
import MySplitterPane from '../../../src/components/Splitter/SplitterPane.vue'
import MySteps from '../../../src/components/Steps/Steps.vue'
import MyTabs from '../../../src/components/Tabs/Tabs.vue'

// 导入演示组件
import Demo from './components/Demo.vue'
import DemoBlock from './components/DemoBlock.vue'
import Layout from './Layout.vue'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    // 注册组件库组件
    app.component('MyAnchor', MyAnchor)
    app.component('MyAutoComplete', MyAutoComplete)
    app.component('MyBreadcrumb', MyBreadcrumb)
    app.component('MyButton', MyButton)
    app.component('MyCascader', MyCascader)
    app.component('MyCheckbox', MyCheckbox)
    app.component('MyCheckboxGroup', MyCheckboxGroup)
    app.component('MyColorPicker', MyColorPicker)
    app.component('MyDivider', MyDivider)
    app.component('MyDropdown', MyDropdown)
    app.component('MyFlex', MyFlex)
    app.component('MyFloatButton', MyFloatButton)
    app.component('MyFloatButtonGroup', MyFloatButtonGroup)
    app.component('MyGrid', MyGrid)
    app.component('MyIcon', MyIcon)
    app.component('MyInput', MyInput)
    app.component('MyDatePicker', MyDatePicker)
    app.component('MyLayout', MyLayout)
    app.component('MyLayoutContent', MyLayoutContent)
    app.component('MyLayoutFooter', MyLayoutFooter)
    app.component('MyLayoutHeader', MyLayoutHeader)
    app.component('MyLayoutSider', MyLayoutSider)
    app.component('MyMasonry', MyMasonry)
    app.component('MyMenu', MyMenu)
    app.component('MyPagination', MyPagination)
    app.component('MySpace', MySpace)
    app.component('MySplitter', MySplitter)
    app.component('MySplitterPane', MySplitterPane)
    app.component('MySteps', MySteps)
    app.component('MyTabs', MyTabs)

    // 注册演示组件
    app.component('Demo', Demo)
    app.component('DemoBlock', DemoBlock)
  },
} satisfies Theme
