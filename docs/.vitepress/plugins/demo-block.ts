import type MarkdownIt from 'markdown-it'

export function demoBlockPlugin(md: MarkdownIt) {
  const defaultRender = md.renderer.rules.fence || function (tokens, idx, options, env, self) {
    return self.renderToken(tokens, idx, options)
  }

  md.renderer.rules.fence = (tokens, idx, options, env, self) => {
    const token = tokens[idx]
    const lang = token.info.trim()

    // 只处理标记为 vue-demo 的代码块
    if (lang === 'vue-demo') {
      const code = token.content.trim()
      const escapedCode = code
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')

      return `
<ClientOnly>
  <DemoBlock code="${escapedCode}" />
</ClientOnly>
`
    }

    return defaultRender(tokens, idx, options, env, self)
  }
}
