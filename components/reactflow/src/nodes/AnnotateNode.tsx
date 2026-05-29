import React, { FC } from 'react';
import { NodeProps, Node } from '@xyflow/react';
import { Typography, Flex } from 'antd';
import { TagOutlined, UserOutlined } from '@ant-design/icons';
import { AnnotateNodeData, HandleConfig } from './types';
import { NodeLayout } from './NodeLayout';
import { NodeRow } from './NodeRow';

const { Text } = Typography;

/**
 * 标注节点组件
 * 使用声明式 Handle 将输入 Handle 与输出 Handle 配置在 Header 左右两侧
 */
export const AnnotateNode: FC<NodeProps<Node<AnnotateNodeData>>> = ({
  data,
  selected,
}) => {
  // 声明式定义：输入与输出 Handle 分别挂载在 Header 左、右两侧
  const handles: HandleConfig[] = [
    { id: 'annotate-class-left', type: 'target', position: 'left' },
    { id: 'annotate-class-right', type: 'source', position: 'right' },
  ];

  return (
    <NodeLayout
      type="annotate"
      title={data.title}
      count={data.count}
      selected={selected}
      handles={handles}
    >
      <NodeRow
        id="annotate-class"
        content={
          <Flex align="center" gap={6}>
            <TagOutlined style={{ color: 'rgba(0, 0, 0, 0.45)' }} />
            <Text style={{ fontSize: 12 }}>{data.className || 'Any class'}</Text>
          </Flex>
        }
      />

      <NodeRow
        id="annotate-assignee"
        content={
          <Flex align="center" gap={6} style={{ marginTop: 2 }}>
            <UserOutlined style={{ color: 'rgba(0, 0, 0, 0.45)' }} />
            <Text style={{ fontSize: 12 }}>{data.assignee || 'Anyone'}</Text>
          </Flex>
        }
      />
    </NodeLayout>
  );
};
