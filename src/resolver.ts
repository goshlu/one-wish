/**
 * One Wish 组件库的自动导入解析器
 * 用于 unplugin-vue-components 插件
 *
 * @example
 * ```ts
 * import Components from 'unplugin-vue-components/vite'
 * import { OneWishResolver } from 'one-wish/resolver'
 *
 * export default {
 *   plugins: [
 *     Components({
 *       resolvers: [OneWishResolver()],
 *     }),
 *   ],
 * }
 * ```
 */
export function OneWishResolver() {
  return {
    type: 'component' as const,
    resolve: (name: string) => {
      // 匹配 My 开头的组件
      if (name.startsWith('My')) {
        return {
          name,
          from: 'one-wish',
        }
      }
    },
  }
}

export default OneWishResolver
