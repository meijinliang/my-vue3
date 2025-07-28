## 包管理器

1. 包管理器使用 pnpm
2. 添加 pnpm-workspace.yaml 配置启用 Monorepo（Monorepo 的作用就是 是一种将多个项目代码存储在同一个代码仓库中的开发策略，而不是将每个项目分散到不同的代码仓库中。）
3. 启用 。。。。 安装依赖例如 pnpm install typescript -D -w 想要在根路径下安装就需要-w 的标识
4. 安装 typescript 只有需要初始化 ts 的配置 需要使用 npx 去执行 ts 的初始化 好处就是保证初始化执行 typescript 的版本是同一个 npx 执行的是项目中安装的 typescript

- npx tsc --init npx 执行的是项目中安装的 typescript
- tsc --init 如果安装了全局的 typescript 执行的就是全局的

Monorepo关联多项目安装本地依赖 pnpm install @vue/shared --workspace --filter @vue/reactivity @vue/shared 安装依赖的包名 --workspace 安装本地 --filter <> 安装目标项目
