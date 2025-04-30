# 🧱 Sokoban Game – 多环境适配的响应式小游戏

## 📌 项目简介

本项目是一个基于 Vite + Vue3 构建的 Sokoban（推箱子）小游戏，初衷是为了教学 Vue3 的响应式 hooks。但在实现过程中，我思考如何将**游戏逻辑与视图渲染解耦**，以便同时适配 Vue、React 和原生 DOM。因此本项目演变为一个探索性架构设计实践。

## 🧠 技术亮点

- 🎯 **数据与视图解耦**（class + IViewer 接口）
- 🏗️ 支持原生 DOM、Vue、React 三种渲染方式
- 🧩 **抽象工厂函数注入**，按需创建 Viewer 实例
- 🔁 Vue 使用 `reactive` + `computed` 实现自动更新
- 📬 React 使用 `useSyncExternalStore` + pub-sub 实现手动订阅
- 🎮 关卡可扩展，通过组合式 hook 管理关卡切换
- 🧱 纯 TypeScript 类实现游戏核心（Game / Ruler）

## 📁 项目结构

```tree
src/
├── skoban/                 # 核心逻辑（地图、角色、规则等）
│   ├── core/               # Game、Ruler 等核心类
│   └── viewers/            # IViewer 接口与 DOM/Vue/React 实现
├── hooks/                  # 各种响应式 hooks（移动控制、关卡切换等）
├── views/
│     └──oop/
│         ├── dom           # 原生 DOM 渲染实现
│         ├── vue           # Vue 渲染实现（reactive+computed）
│         └── react         # React 渲染实现（通过 ReactDOM 嵌入 Vue）
├── store/                  # 静态关卡数据
└── utils/                  # 工具函数（如 generateMap）
```

## 🚀 快速开始

```bash
pnpm install      # 安装依赖
pnpm dev          # 启动开发
pnpm build        # 构建发布
```

## 键盘操作

使用键盘方向键移动角色：↑ ↓ ← →(hooks-> useMove)

## 🏗️ 开发回顾

初始目标是教学 Composition API，但为了框架无关性，抽象出核心类。

第一次意识到 Vue 中 reactive 会把 this 变成 Proxy，带来 this 指向差异。

React 中遇到了 useSyncExternalStore 对 class 实例的 snapshot 比较问题，最终使用平面对象解决。

发现 DOM 实现反而是最轻量好写的版本。

## 后续计划

地图编辑器 UI

自定义皮肤样式

关卡导入导出 / 存档功能
