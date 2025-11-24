# VitePress 文档部署指南

## 本地预览

### 启动开发服务器

```bash
pnpm docs:dev
```

访问 http://localhost:5174 查看文档

### 构建文档

```bash
pnpm docs:build
```

构建产物会生成在 `docs/.vitepress/dist` 目录

### 预览构建结果

```bash
pnpm docs:preview
```

## 部署到 GitHub Pages

### 1. 配置 GitHub Pages

在 `.vitepress/config.ts` 中设置 base：

```typescript
export default defineConfig({
  base: '/vue3-component-library/', // 仓库名
  // ...其他配置
})
```

### 2. 添加部署脚本

创建 `deploy.sh`：

```bash
#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
pnpm docs:build

# 进入生成的文件夹
cd docs/.vitepress/dist

git init
git add -A
git commit -m 'deploy'

# 推送到 gh-pages 分支
git push -f git@github.com:your-username/vue3-component-library.git master:gh-pages

cd -
```

运行部署：

```bash
sh deploy.sh
```

### 3. 使用 GitHub Actions

创建 `.github/workflows/deploy.yml`：

```yaml
name: Deploy Docs

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: 18

      - uses: pnpm/action-setup@v2
        with:
          version: 10

      - name: Install dependencies
        run: pnpm install

      - name: Build docs
        run: pnpm docs:build

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: docs/.vitepress/dist
```

## 部署到 Vercel

### 1. 导入项目

访问 [Vercel](https://vercel.com) 导入你的 GitHub 仓库

### 2. 配置构建设置

- **Framework Preset**: VitePress
- **Build Command**: `pnpm docs:build`
- **Output Directory**: `docs/.vitepress/dist`

### 3. 部署

点击 Deploy 即可自动部署

## 部署到 Netlify

### 1. 导入项目

访问 [Netlify](https://netlify.com) 导入你的 GitHub 仓库

### 2. 配置构建设置

创建 `netlify.toml`：

```toml
[build]
  command = "pnpm docs:build"
  publish = "docs/.vitepress/dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### 3. 部署

推送到 GitHub 即可自动部署

## 部署到自己的服务器

### 1. 构建静态文件

```bash
pnpm docs:build
```

### 2. 配置 Nginx

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        root /path/to/docs/.vitepress/dist;
        index index.html;
        try_files $uri $uri/ /index.html;
    }
}
```

### 3. 上传文件

将 `docs/.vitepress/dist` 目录上传到服务器

## 自定义域名

### GitHub Pages

在 `docs/.vitepress/public` 目录创建 `CNAME` 文件：

```
your-domain.com
```

### Vercel/Netlify

在项目设置中添加自定义域名即可

## 环境变量

如果需要使用环境变量，创建 `.env` 文件：

```bash
VITE_API_URL=https://api.example.com
```

在文档中使用：

```typescript
const apiUrl = import.meta.env.VITE_API_URL
```

## 最佳实践

1. **版本化文档**：为不同版本维护独立的文档分支
2. **自动部署**：使用 GitHub Actions 实现自动部署
3. **CDN 加速**：使用 CDN 服务加速文档访问
4. **SEO 优化**：配置合适的 meta 标签和 sitemap
5. **分析工具**：集成 Google Analytics 或其他分析工具
