import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'OneWish',
      fileName: format => `one-wish.${format}.js`,
      formats: ['es', 'umd'],
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue',
        },
        // 导出类型声明文件
        exports: 'named',
        assetFileNames: assetInfo => {
          if (assetInfo.name === 'style.css') return 'style.css'
          return assetInfo.name as string
        },
      },
    },
    // 清空输出目录
    emptyOutDir: true,
    // 生成 sourcemap
    sourcemap: true,
  },
  css: {
    preprocessorOptions: {
      css: {
        charset: false,
      },
    },
  },
})
