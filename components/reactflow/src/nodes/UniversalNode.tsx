import React, { memo, FC } from 'react';
import { NodeProps, Node } from '@xyflow/react';
import { Card, Typography } from 'antd';
import { UniversalNodeData } from './types';
import { NodeRow } from './NodeRow';
import '../styles/nodes.css';

const { Text } = Typography;

/**
 * 通用三段式节点组件
 * 使用 antd Card 作为容器，包含 Header、Body、Footer 三个区域
 * 每个区域可由多行（NodeRow）组成，支持行级 Handle 配置
 */
const UniversalNodeComponent: FC<NodeProps<Node<UniversalNodeData>>> = ({ data, selected }) => {
  const {
    title,
    headerRows = [],
    bodyRows = [],
    footerRows = [],
    themeColor = '#1677ff',
    className = '',
  } = data;

  const cardStyle = selected
    ? {
        overflow: 'visible' as const,
        border: `1.5px solid ${themeColor}`,
        minWidth: 240,
        boxShadow: `0 0 0 3px ${themeColor}15, 0 4px 12px rgba(0, 0, 0, 0.08)`,
      }
    : {
        overflow: 'visible' as const,
        border: '1.5px solid transparent',
        minWidth: 240,
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
      };

  return (
    <Card
      size="small"
      className={`universal-node ${selected ? 'is-selected' : ''} ${className}`}
      styles={{ body: { padding: 0, overflow: 'visible' } }}
      style={cardStyle}
    >
      {/* Header 区域 */}
      <div className="universal-node-header">
        <div className="node-row universal-node-title">
          <Text strong style={{ fontSize: 14 }}>{title}</Text>
        </div>
        {headerRows.map((row) => (
          <NodeRow key={row.id} {...row} />
        ))}
      </div>

      {/* Body 区域 */}
      {bodyRows.length > 0 && (
        <div className="universal-node-body">
          {bodyRows.map((row) => (
            <NodeRow key={row.id} {...row} />
          ))}
        </div>
      )}

      {/* Footer 区域 */}
      {footerRows.length > 0 && (
        <div className="universal-node-footer">
          {footerRows.map((row) => (
            <NodeRow key={row.id} {...row} />
          ))}
        </div>
      )}
    </Card>
  );
};

export const UniversalNode = memo(UniversalNodeComponent);
