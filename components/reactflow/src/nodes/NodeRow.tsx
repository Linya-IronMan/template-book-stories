import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { NodeRowData } from './types';

/**
 * 节点中的单行组件
 * 支持左右侧 Handle 的独立配置
 */
export const NodeRow: React.FC<NodeRowData> = ({
  id,
  content,
  hasLeftHandle,
  hasRightHandle,
  leftHandleType = 'target',
  rightHandleType = 'source',
}) => {
  return (
    <div className="node-row">
      {hasLeftHandle && (
        <Handle
          type={leftHandleType}
          position={Position.Left}
          id={`${id}-left`}
          className="node-handle node-handle-left"
        />
      )}
      
      <div className="node-row-content">
        {content}
      </div>

      {hasRightHandle && (
        <Handle
          type={rightHandleType}
          position={Position.Right}
          id={`${id}-right`}
          className="node-handle node-handle-right"
        />
      )}
    </div>
  );
};
