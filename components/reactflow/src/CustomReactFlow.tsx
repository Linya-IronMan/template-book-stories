import React, { useMemo } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  type Node,
  type Edge,
  type Connection,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';

export interface CustomReactFlowProps {
  initialNodes?: Node[];
  initialEdges?: Edge[];
  height?: string | number;
  width?: string | number;
}

/**
 * ReactFlow 基础封装组件
 * 用于对 @xyflow/react 进行二次开发
 */
export const CustomReactFlow: React.FC<CustomReactFlowProps> = ({
  initialNodes = [],
  initialEdges = [],
  height = '500px',
  width = '100%',
}) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = (params: Connection) => setEdges((eds) => addEdge(params, eds));

  const containerStyle = useMemo(() => ({ height, width }), [height, width]);

  return (
    <div style={containerStyle}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
};
