# ReactFlow 组件规范

本文档定义了 `@template-book-stories/reactflow` 组件的设计目标、实现方式及二次开发规范。

## 1. 概述

`reactflow` 组件是基于 [@xyflow/react](https://reactflow.dev/) (原 React Flow) 的二次封装，旨在为项目提供统一的流程图/节点图基础底座。

- **官方网站**: [reactflow.dev](https://reactflow.dev/)
- **学习文档**: [React Flow Learn](https://reactflow.dev/learn)

## 2. 设计目标

- **易用性**：提供开箱即用的基础配置（网格、控制、缩略图）。
- **可扩展性**：支持自定义节点（Custom Nodes）和自定义边（Custom Edges）的注入。
- **一致性**：统一项目内所有流程图的视觉风格与交互逻辑。

## 3. 基础用法

组件目前提供 `CustomReactFlow` 导出，接收以下 Props：

| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `initialNodes` | `Node[]` | `[]` | 初始节点列表 |
| `initialEdges` | `Edge[]` | `[]` | 初始连线列表 |
| `height` | `string \| number` | `'500px'` | 画布高度 |
| `width` | `string \| number` | `'100%'` | 画布宽度 |

## 4. 二次开发指南

### 自定义节点

若需新增节点类型，请在 `components/reactflow/src/nodes` (需创建) 下定义，并在 `CustomReactFlow` 中通过 `nodeTypes` 注册。

### 样式定制

组件强制引入了 `@xyflow/react/dist/style.css`。如需覆盖样式，建议在组件包内新建 `.css` 文件并使用类名覆盖。

## 5. 维护要求

- 任何对底层 API 的重大变更必须先在此文档中更新协议。
- 新增功能需同步提供 Storybook 示例。
