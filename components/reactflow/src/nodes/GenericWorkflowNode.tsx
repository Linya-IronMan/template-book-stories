import React, { FC } from 'react';
import { NodeProps, Node } from '@xyflow/react';
import { Typography, Flex } from 'antd';
import { GenericWorkflowNodeData, HandleConfig } from './types';
import { NodeLayout } from './NodeLayout';
import { NodeRow } from './NodeRow';

const { Text } = Typography;

/**
 * 通用高级工作流节点组件
 * 支持 Consensus, AI Review, Model, Logic, Sampling, Webhook 等类型
 * 输入/输出 Handle 声明式挂载在 Header 左右两侧
 */
export const GenericWorkflowNode: FC<
  NodeProps<Node<GenericWorkflowNodeData>>
> = ({ id, data, selected }) => {
  // 声明式定义：通用节点默认在 Header 左右两侧配置输入和输出 Handle
  const handles: HandleConfig[] = [
    { id: `${id}-left`, type: 'target', position: 'left' },
    { id: `${id}-right`, type: 'source', position: 'right' },
  ];

  return (
    <NodeLayout
      type={data.type}
      title={data.title}
      count={data.count}
      selected={selected}
      handles={handles}
    >
      <NodeRow
        id="generic-content"
        content={
          <Flex vertical gap={2}>
            {data.description && (
              <Text style={{ fontSize: 12 }}>{data.description}</Text>
            )}
            {data.subText && (
              <Text type="secondary" style={{ fontSize: 10 }}>
                {data.subText}
              </Text>
            )}
          </Flex>
        }
      />
    </NodeLayout>
  );
};
