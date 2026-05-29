import React, { FC } from 'react';
import { NodeProps, Node } from '@xyflow/react';
import { Typography, Flex, Tag } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { ReviewNodeData, HandleConfig } from './types';
import { NodeLayout } from './NodeLayout';
import { NodeRow } from './NodeRow';

const { Text } = Typography;

/**
 * 审核节点组件 (逻辑/分叉节点)
 * 输入 Handle (review-input-left) 挂载在 Header 左侧
 * 输出 Handle 与 Body 内的 'if Accepted' 和 'if Rejected' 分支行右侧对齐，支持行级分叉
 */
export const ReviewNode: FC<NodeProps<Node<ReviewNodeData>>> = ({
  data,
  selected,
}) => {
  // 声明式定义：整卡输入 Handle 挂载在 Header 左侧
  const handles: HandleConfig[] = [
    { id: 'review-input-left', type: 'target', position: 'left' },
  ];

  return (
    <NodeLayout
      type="review"
      title={data.title}
      count={data.count}
      selected={selected}
      handles={handles}
    >
      {/* 接受分支 (行级，输出 Handle 对齐本行右侧) */}
      <NodeRow
        id="review-accepted"
        content={
          <Tag color="success" style={{ fontSize: 11, borderRadius: 4, margin: 0 }}>
            if Accepted
          </Tag>
        }
        hasRightHandle
      />

      {/* 拒绝分支 (行级，输出 Handle 对齐本行右侧) */}
      <NodeRow
        id="review-rejected"
        content={
          <Tag
            color="error"
            style={{ fontSize: 11, borderRadius: 4, margin: 0, marginTop: 4 }}
          >
            if Rejected
          </Tag>
        }
        hasRightHandle
      />

      {/* 审核人行 */}
      <NodeRow
        id="review-assignee"
        content={
          <Flex
            align="center"
            gap={6}
            style={{
              marginTop: 6,
              paddingTop: 6,
              borderTop: '1px solid #f5f5f5',
            }}
          >
            <UserOutlined style={{ color: 'rgba(0, 0, 0, 0.45)' }} />
            <Text style={{ fontSize: 12 }}>{data.assignee || 'Anyone'}</Text>
          </Flex>
        }
      />
    </NodeLayout>
  );
};
