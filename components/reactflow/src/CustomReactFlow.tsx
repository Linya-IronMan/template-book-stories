import React, { useMemo, FC } from 'react';
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
  type NodeTypes,
} from '@xyflow/react';
import { ConfigProvider } from 'antd';

import '@xyflow/react/dist/style.css';
import { builtinNodeTypes } from './nodes/registry';

/**
 * 默认支持的节点类型
 */
const defaultNodeTypes: NodeTypes = builtinNodeTypes;

export interface CustomReactFlowProps {
  initialNodes?: Node[];
  initialEdges?: Edge[];
  height?: string | number;
  width?: string | number;
  onNodesChange?: OnNodesChange;
  onEdgesChange?: OnEdgesChange;
  onConnect?: OnConnect;
  /** 可选的自定义节点类型 */
  nodeTypes?: NodeTypes;
}

/**
 * ReactFlow 基础封装组件
 * 用于对 @xyflow/react 进行二次开发
 * 内部集成 antd ConfigProvider，确保自定义节点可正常使用 antd 组件
 */
export const CustomReactFlow: FC<CustomReactFlowProps> = ({
  initialNodes = [],
  initialEdges = [],
  height = '500px',
  width = '100%',
  onNodesChange: onNodesChangeProp,
  onEdgesChange: onEdgesChangeProp,
  onConnect: onConnectProp,
  nodeTypes: nodeTypesProp,
}) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  /**
   * 合并默认节点类型与外部传入的节点类型
   */
  const nodeTypes = useMemo(() => ({
    ...defaultNodeTypes,
    ...nodeTypesProp,
  }), [nodeTypesProp]);

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
    <ConfigProvider>
      <div style={containerStyle}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={handleNodesChange}
          onEdgesChange={handleEdgesChange}
          onConnect={handleConnect}
          nodeTypes={nodeTypes}
          fitView
        >
          <Background />
          <Controls />
          <MiniMap />
        </ReactFlow>
      </div>
    </ConfigProvider>
  );
};
