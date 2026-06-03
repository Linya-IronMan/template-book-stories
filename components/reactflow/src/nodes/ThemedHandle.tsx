import React, { FC, ComponentProps } from 'react';
import { Handle, useNodeId, useStore } from '@xyflow/react';

type ThemedHandleProps = ComponentProps<typeof Handle>;

/**
 * Handle 包装组件：自动检测连线状态，无连线时添加呼吸灯效果。
 * 主题色通过 CSS 变量 --handle-color 从父级节点容器继承。
 */
export const ThemedHandle: FC<ThemedHandleProps> = ({ className = '', ...rest }) => {
  const nodeId = useNodeId();

  const isConnected = useStore((state) =>
    state.edges.some((edge) =>
      rest.type === 'source'
        ? edge.source === nodeId && edge.sourceHandle === rest.id
        : edge.target === nodeId && edge.targetHandle === rest.id
    )
  );

  return (
    <Handle
      {...rest}
      className={`${className}${!isConnected ? ' node-handle-breathing' : ''}`}
    />
  );
};
