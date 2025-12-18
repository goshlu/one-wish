import { defineConfig } from 'vitepress'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { fileURLToPath } from 'node:url'

const libraryEntry = fileURLToPath(new URL('../../src/index.ts', import.meta.url))

export default defineConfig({
  vite: {
    plugins: [vueJsx()],
    resolve: {
      alias: {
        'one-wish': libraryEntry,
      },
    },
    server: {
      port: 8390,
    },
  },
  title: 'One Wish',
  description: 'One Wish - 一个基于 Vue 3 + TypeScript + Vite 构建的现代化组件库',
  lang: 'zh-CN',

  cleanUrls: true,

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo1.svg' }],
    ['meta', { name: 'theme-color', content: '#409eff' }],
    ['meta', { name: 'og:type', content: 'website' }],
    ['meta', { name: 'og:locale', content: 'zh-CN' }],
    ['meta', { name: 'og:site_name', content: 'One Wish' }],
  ],

  themeConfig: {
    logo: '/logo1.svg',

    nav: [
      { text: '指南', link: '/guide/introduction' },
      { text: '组件', link: '/components/button' },
      { text: '更新日志', link: '/changelog' },
      {
        text: 'v1.1.0',
        items: [
          { text: '更新日志', link: '/changelog' },
          {
            text: 'GitHub',
            link: 'https://github.com/goshlu/one-wish',
          },
        ],
      },
    ],

    sidebar: {
      '/guide/': [
        {
          text: '开始',
          items: [
            { text: '介绍', link: '/guide/introduction' },
            { text: '快速开始', link: '/guide/quick-start' },
            { text: '安装', link: '/guide/installation' },
            { text: '使用指南', link: '/guide/usage' },
          ],
        },
        {
          text: '进阶',
          items: [
            { text: '自动按需导入', link: '/guide/auto-import' },
            { text: '主题定制', link: '/guide/theme' },
            { text: 'TypeScript', link: '/guide/typescript' },
          ],
        },
        {
          text: '文档编写',
          items: [
            { text: '代码演示快速开始', link: '/guide/demo-quick-start' },
            { text: '代码演示使用指南', link: '/guide/demo-usage' },
          ],
        },
      ],
      '/components/': [
        {
          text: '基础组件',
          items: [
            { text: 'Avatar 头像', link: '/components/avatar' },
            { text: 'Badge 标记', link: '/components/badge' },
            { text: 'Button 按钮', link: '/components/button' },
            { text: 'Card 卡片', link: '/components/card' },
            { text: 'Input 输入框', link: '/components/input' },
            { text: 'InputNumber 数字输入框', link: '/components/input-number' },
            { text: 'Icon 图标', link: '/components/icon' },
            { text: 'Divider 分割线', link: '/components/divider' },
          ],
        },
        {
          text: '表单组件',
          items: [
            { text: 'AutoComplete 自动完成', link: '/components/autocomplete' },
            { text: 'Cascader 级联选择', link: '/components/cascader' },
            { text: 'Checkbox 多选框', link: '/components/checkbox' },
            { text: 'ColorPicker 颜色选择器', link: '/components/color-picker' },
            { text: 'DatePicker 日期选择器', link: '/components/date-picker' },
            { text: 'Form 表单', link: '/components/form' },
            { text: 'Mentions 提及', link: '/components/mentions' },
            { text: 'Radio 单选框', link: '/components/radio' },
            { text: 'Rate 评分', link: '/components/rate' },
            { text: 'Select 选择器', link: '/components/select' },
            { text: 'Switch 开关', link: '/components/switch' },
            { text: 'TimePicker 时间选择器', link: '/components/time-picker' },
            { text: 'Transfer 穿梭框', link: '/components/transfer' },
            { text: 'TreeSelect 选择器', link: '/components/tree-select' },
            { text: 'Upload 上传', link: '/components/upload' },
          ],
        },
        {
          text: '布局组件',
          items: [
            { text: 'Flex 弹性布局', link: '/components/flex' },
            { text: 'Grid 栅格', link: '/components/grid' },
            { text: 'Layout 布局', link: '/components/layout' },
            { text: 'Space 间距', link: '/components/space' },
            { text: 'Splitter 分隔面板', link: '/components/splitter' },
            { text: 'Masonry 瀑布流', link: '/components/masonry' },
          ],
        },
        {
          text: '导航组件',
          items: [
            { text: 'Anchor 锚点', link: '/components/anchor' },
            { text: 'Breadcrumb 面包屑', link: '/components/breadcrumb' },
            { text: 'Dropdown 下拉菜单', link: '/components/dropdown' },
            { text: 'Menu 导航菜单', link: '/components/menu' },
            { text: 'Pagination 分页', link: '/components/pagination' },
            { text: 'Steps 步骤条', link: '/components/steps' },
            { text: 'Tabs 标签页', link: '/components/tabs' },
          ],
        },
        {
          text: '其他组件',
          items: [{ text: 'FloatButton 悬浮按钮', link: '/components/float-button' }],
        },
      ],
    },

    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/goshlu/one-wish',
      },
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2025-present wish',
    },

    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索文档',
            buttonAriaLabel: '搜索文档',
          },
          modal: {
            noResultsText: '无法找到相关结果',
            resetButtonTitle: '清除查询条件',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭',
            },
          },
        },
      },
    },

    outline: {
      level: [2, 3],
      label: '目录',
    },

    docFooter: {
      prev: '上一页',
      next: '下一页',
    },

    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium',
      },
    },
  },

  markdown: {
    lineNumbers: true,
  },
})
