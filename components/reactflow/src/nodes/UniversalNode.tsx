import React, { memo } from 'react';
import { NodeProps, Node } from '@xyflow/react';
import { UniversalNodeData } from './types';
import { NodeRow } from './NodeRow';
import '../styles/nodes.css';

/**
 * 通用三段式节点组件
 * 包含 Header、Body、Footer 三个区域，每个区域可由多行组成
 */
const UniversalNodeComponent: React.FC<NodeProps<Node<UniversalNodeData>>> = ({ data }) => {
  const {
    title,
    headerRows = [],
    bodyRows = [],
    footerRows = [],
    themeColor = '#007aff',
    className = '',
  } = data;

  return (
    <div className={`universal-node ${className}`}>
      {/* 顶部装饰条 */}
      <div 
        className="universal-node-header-bar" 
        style={{ backgroundColor: themeColor }} 
      />
      
      {/* Header 区域 */}
      <div className="universal-node-header">
        <div className="node-row" style={{ fontWeight: 'bold', fontSize: '14px' }}>
          {title}
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
    </div>
  );
};

export const UniversalNode = memo(UniversalNodeComponent);
