# introduction.md

项目介绍:包括使用技术栈、文件夹结构等

## Overview

NomUI 是一个基于 es6 的原生的 ui 组件库

## Architecture

### Solution Structure

```
components/ 实现的组件目录
├── demos/                    # 该组件的 demo
├── styles/                    # 该组件的涉及的样式
├── index.md/                    # 该组件的文档
├── framework/              # Framework layer (shared infrastructure)
dist/ 组件打包后的js
docs/ 组件的文档
libs/ 依赖的外部js
script/ 构建脚本
```

### 命令

```
npm build # 编译成发布包
npm dev # 本地开发启动
```
