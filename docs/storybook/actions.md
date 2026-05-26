# Storybook Actions 原理与使用方式

在 Storybook 中，**Actions 面板**的核心作用是帮助开发者确认“组件是否在正确的时机，抛出了正确的数据”。

要让组件的一个参数（通常是回调函数）被 Actions 面板识别并记录，有以下三种方式：

## 1. 使用 `fn()` 显式声明 (Storybook 8+ 最佳实践)

这是目前最推荐的方式。通过导入 `@storybook/test` 中的 `fn()`，将其赋值给特定的 args。

`fn()` 本质上是一个类似于 Jest/Vitest `vi.fn()` 的 Spy 函数。它不仅能让事件被捕获并展示在 Actions 面板中，还可以直接用于 Play 函数中进行自动化交互测试（例如：`expect(canvas.getByRole('button')).toHaveBeenCalled()`）。

**配置位置：** 组件的 `*.stories.tsx`
```typescript
import { fn } from '@storybook/test';

export default {
  // ...
  args: {
    // 明确告诉 Storybook：拦截这两个回调并记录在面板上
    onNodesChange: fn(),
    onEdgesChange: fn(),
  },
};
```

> **注意：** 在本模板中，我们**统一采用此规范**。所有的交互回调都应在 `args` 里面使用 `fn()` 显式挂载。

## 2. 自动识别（基于正则表达式）

这是早期的常见做法，通过配置正则表达式来自动拦截事件。

如果配置了正则，Storybook 会自动寻找所有以特定前缀（如 `on`）开头的 Props，自动为其注入 Mock 函数。这种方式虽然方便，但在 Storybook 8 中**不再推荐**，因为它会带来意想不到的性能开销，也容易与测试工具发生冲突。

**配置位置：** `.storybook/preview.ts`
```typescript
export default {
  parameters: {
    // 配置 actions 插件，自动捕获所有以 on 开头且紧跟大写字母的回调函数
    actions: { argTypesRegex: "^on[A-Z].*" },
  },
};
```

## 3. 使用 `argTypes` 显式声明

如果你需要更细粒度的控制，或者想要**自定义在面板上显示的事件名称**，可以通过配置 `argTypes` 来实现。

`argTypes` 是用来**配置 Storybook 面板行为**的元数据，传对象是告诉引擎生成特定行为的合法指令，最终组件收到的依然是 Storybook 依据这个指令自动生成的一个真实函数。

**配置位置：** 组件的 `*.stories.tsx`
```typescript
export default {
  // ...
  argTypes: {
    // 即使属性名叫 handleUpdate，也能被当做 action 记录，面板显示名称为 "节点更新了"
    handleUpdate: { action: '节点更新了' },
  },
};
```

## 补充：Storybook 是如何“接住”事件的？

Storybook 能获取组件的回调参数，是因为采用了一种**注入代理 (Proxying)** 机制：

1. **生成代理函数**：Storybook 读取 `fn()` 或正则配置后，在内存中生成了一个代理函数。
2. **作为 Props 注入**：Storybook 在渲染你的组件时，将这个代理函数作为真实的 Props（比如 `onConnect`）传递给组件。
3. **通信总线广播**：组件内部发生交互并调用该 Props 时，实际上执行的是这个代理函数。代理函数会将入参序列化，通过 Storybook 内部的 Channel 通信总线广播出去。
4. **面板展示**：Actions 面板接收到总线上的消息，将事件名和参数打印在界面上。
