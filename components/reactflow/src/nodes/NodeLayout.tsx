import React, { FC } from 'react';
import { Card, Typography, Flex } from 'antd';
import { Handle, Position } from '@xyflow/react';
import * as Icons from '@ant-design/icons';
import { HandleConfig } from './types';

const { Text } = Typography;

export interface NodeLayoutProps {
  type: string;
  title: string;
  selected?: boolean;
  count?: number;
  className?: string;
  children?: React.ReactNode;
  /** 声明式的整卡/容器级 Handle 配置数组 */
  handles?: HandleConfig[];
}

// 转换 Handle 位置到 React Flow 的 Position enum
const POSITION_MAP = {
  left: Position.Left,
  right: Position.Right,
  top: Position.Top,
  bottom: Position.Bottom,
};

/** 边的默认描边色 */
export const DEFAULT_EDGE_COLOR = '#d9d9d9';

/**
 * 统一的色彩和图标字典
 */
export const NODE_THEMES: Record<
  string,
  { color: string; icon: React.ComponentType<any> }
> = {
  dataset: { color: '#096dd9', icon: Icons.DatabaseOutlined },
  annotate: { color: '#1890ff', icon: Icons.EditOutlined },
  consensus: { color: '#fa8c16', icon: Icons.ApartmentOutlined },
  aiReview: { color: '#722ed1', icon: Icons.RobotOutlined },
  model: { color: '#2f54eb', icon: Icons.GlobalOutlined },
  logic: { color: '#eb2f96', icon: Icons.BranchesOutlined },
  review: { color: '#faad14', icon: Icons.AuditOutlined },
  sampling: { color: '#13c2c2', icon: Icons.SlidersOutlined },
  webhook: { color: '#fa541c', icon: Icons.ApiOutlined },
  archive: { color: '#8c8c8c', icon: Icons.DeleteOutlined },
  complete: { color: '#52c41a', icon: Icons.CheckCircleOutlined },
};

/**
 * 通用自定义节点底座组件
 * 自动根据节点类型（type）匹配特定的图标与主题色，并支持选中时的主题色发光外边框
 * 通过结构化声明数据（handles）实现对各种不同 Handle 挂载与定位的自由配置
 */
export const NodeLayout: FC<NodeLayoutProps> = ({
  type,
  title,
  selected = false,
  count,
  className = '',
  children,
  handles = [],
}) => {
  const theme = NODE_THEMES[type] || {
    color: '#1677ff',
    icon: Icons.QuestionCircleOutlined,
  };
  const IconComponent = theme.icon;

  const cardStyle = selected
    ? {
        overflow: 'visible' as const,
        border: `1.5px solid ${theme.color}`,
        width: 240,
        boxShadow: `0 0 0 3px ${theme.color}15, 0 4px 12px rgba(0, 0, 0, 0.08)`,
      }
    : {
        overflow: 'visible' as const,
        border: '1.5px solid transparent',
        width: 240,
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
      };

  // 辅助渲染单个 Handle 点
  const renderHandle = (h: HandleConfig) => (
    <Handle
      key={h.id}
      type={h.type}
      position={POSITION_MAP[h.position]}
      id={h.id}
      className={`node-handle node-handle-${h.position} ${h.className || ''}`}
      style={h.style}
    />
  );

  return (
    <Card
      size="small"
      className={`universal-node ${className}`}
      styles={{ body: { padding: 0, overflow: 'visible' } }}
      style={{ ...cardStyle, position: 'relative' }}
    >
      {/* 1. 渲染挂载在 card 级的 Handle (如卡片正顶部、正底部) */}
      {handles.filter((h) => h.renderAt === 'card').map(renderHandle)}

      {/* Header 区域：主题色图标 + 标题 + Count */}
      <div
        className="universal-node-header"
        style={{
          borderBottom: children ? '1px solid #f0f0f0' : 'none',
          position: 'relative',
        }}
      >
        {/* 2. 渲染挂载在 header 级的 Handle (普通两侧输入/输出，默认为 header 级) */}
        {handles
          .filter((h) => !h.renderAt || h.renderAt === 'header')
          .map(renderHandle)}

        <Flex justify="space-between" align="center" style={{ padding: '2px 14px 4px' }}>
          <Flex align="center" gap={8}>
            <IconComponent style={{ color: theme.color, fontSize: 15 }} />
            <Text strong style={{ fontSize: 13.5 }}>
              {title}
            </Text>
          </Flex>
          {count !== undefined && (
            <span
              style={{
                background: '#f0f0f0',
                padding: '1px 8px',
                borderRadius: '10px',
                fontSize: '11px',
                color: 'rgba(0, 0, 0, 0.45)',
                fontWeight: 500,
              }}
            >
              {count}
            </span>
          )}
        </Flex>
      </div>

      {/* Body / Content 区域 */}
      {children && (
        <div className="universal-node-body" style={{ padding: '8px 14px' }}>
          {children}
        </div>
      )}
    </Card>
  );
};
