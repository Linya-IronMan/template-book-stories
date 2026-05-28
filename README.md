# template-book-stories

这是一个基于 **npm workspaces monorepo** 结构的开发模板。

## 目录结构

```text
docs/                # 项目文档
```

每个子项目都拥有：

- 独立的 React + Vite 应用
- 独立的 .storybook 配置
- 独立的 package.json 脚本
- 独立的 TypeScript 检查命令

## 根目录常用命令

```bash
npm run check
npm run lint
npm run build
npm run build-storybook
```

以上命令会遍历所有 workspace 执行。
