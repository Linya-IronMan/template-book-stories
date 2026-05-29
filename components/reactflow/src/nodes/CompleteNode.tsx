import React, { FC } from 'react';
import { NodeProps, Node } from '@xyflow/react';
import { HandleConfig } from './types';
import { NodeLayout } from './NodeLayout';

/**
 * 完成节点组件 (终态)
 * 纯 Header 扁平卡片结构，输入 Handle 声明式挂载于左侧
 */
export const CompleteNode: FC<NodeProps<Node<any>>> = ({ data, selected }) => {
  const handles: HandleConfig[] = [
    { id: 'complete-input-left', type: 'target', position: 'left' },
  ];

  return (
    <NodeLayout
      type="complete"
      title={data.title || 'Complete'}
      count={data.count}
      selected={selected}
      handles={handles}
    />
  );
};
