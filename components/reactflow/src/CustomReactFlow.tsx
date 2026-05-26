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
  type OnNodesChange,
  type OnEdgesChange,
  type OnConnect,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';

export interface CustomReactFlowProps {
  initialNodes?: Node[];
  initialEdges?: Edge[];
  height?: string | number;
  width?: string | number;
  onNodesChange?: OnNodesChange;
  onEdgesChange?: OnEdgesChange;
  onConnect?: OnConnect;
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
  onNodesChange: onNodesChangeProp,
  onEdgesChange: onEdgesChangeProp,
  onConnect: onConnectProp,
}) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const handleNodesChange: OnNodesChange = (changes) => {
    onNodesChange(changes);
    onNodesChangeProp?.(changes);
  };

  const handleEdgesChange: OnEdgesChange = (changes) => {
    onEdgesChange(changes);
    onEdgesChangeProp?.(changes);
  };

  const handleConnect: OnConnect = (params) => {
    setEdges((eds) => addEdge(params, eds));
    onConnectProp?.(params);
  };

  const containerStyle = useMemo(() => ({ height, width }), [height, width]);

  return (
    <div style={containerStyle}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={handleNodesChange}
        onEdgesChange={handleEdgesChange}
        onConnect={handleConnect}
        fitView
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
};
