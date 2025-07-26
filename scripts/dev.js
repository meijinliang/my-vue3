import esbuild from 'esbuild'

import { parseArgs } from 'node:util'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createRequire } from 'node:module'

// 解析命令行参数
const {
  values: { format: rawFormat, prod, inline },
  positionals
} = parseArgs({
  allowPositionals: true,
  options: {
    format: {
      type: 'string',
      default: 'global',
      short: 'f',
      description: 'Specify the module format (esm or cjs)'
    },
    prod: {
      type: 'boolean',
      default: false,
      short: 'p',
      description: 'Enable hot module replacement'
    },
    inline: {
      type: 'boolean',
      default: false,
      short: 'i',
      description: 'Inline the module format in the output'
    }
  }
})

// 允许在 ES 模块中使用 CommonJS 的 require 方法
const require = createRequire(import.meta.url)

// 获取当前模块文件所在的目录名（在 ES 模块中没有 __dirname，需要这样获取）
const __dirname = dirname(fileURLToPath(import.meta.url))

const format = rawFormat || 'global'
const targets = positionals.length ? positionals : ['vue']

const outputFormat = format.startsWith('global')
  ? 'iife'
  : format === 'cjs'
    ? 'cjs'
    : 'esm'
console.log('dev script running...', rawFormat, positionals)

console.log(esbuild)

for (const target of targets) {
  // context中传入打包的配置
  esbuild
    .context({
      entryPoints: [resolve(__dirname, `../packages/${target}/src/index.ts`)], // 入口文件
      outfile: resolve(
        __dirname,
        `../packages/${target}/dist/${target}.${format}.js`
      ), // 输出文件
      bundle: true, // 把所有的文件打包，打包到一个文件里
      format: outputFormat, // 打包格式
      platform: format === 'cjs' ? 'node' : 'browser', // 打包平台 默认情况下，esbuild 的打包器为浏览器生成代码, 如果打包的代码要在node环境中执行需要设置为node
      sourcemap: true // 开启sourcemap方便调试
    })
    .then(ctx => ctx.watch()) // 文件变化的时候会重新进行打包
}
