import React from 'react';
import { Position } from '@xyflow/react';

/**
 * 声明式 Handle 连线点配置接口
 */
export interface HandleConfig {
  /** 唯一标识符，用于 Handle 的 id */
  id: string;
  /** 点的类型：输入 target 或 输出 source */
  type: 'source' | 'target';
  /** 点的位置：左、右、上、下 */
  position: 'left' | 'right' | 'top' | 'bottom';
  /** 挂载的容器位置：'header' (默认，在头部两侧) 或 'card' (在整个卡片边缘) */
  renderAt?: 'header' | 'card';
  /** 自定义行内定位样式微调 */
  style?: React.CSSProperties;
  className?: string;
}

/**
 * 节点行的数据定义
 */
export interface NodeRowData {
  /** 唯一标识符，用于 Handle 的 id */
  id: string;
  /** 行内容 */
  content: React.ReactNode;
  /** 是否有左侧输入点 */
  hasLeftHandle?: boolean;
  /** 是否有右侧输出点 */
  hasRightHandle?: boolean;
  /** 左侧点类型，默认为 target */
  leftHandleType?: 'source' | 'target';
  /** 右侧点类型，默认为 source */
  rightHandleType?: 'source' | 'target';
}

/**
 * 通用节点的数据结构
 */
export interface UniversalNodeData extends Record<string, unknown> {
  /** 节点标题 */
  title: string;
  /** 头部行列表 */
  headerRows?: NodeRowData[];
  /** 主体行列表 */
  bodyRows?: NodeRowData[];
  /** 底部行列表 */
  footerRows?: NodeRowData[];
  /** 主题颜色（用于 Header 边条） */
  themeColor?: string;
  /** 自定义类名 */
  className?: string;
}

// ======================== 具象节点数据定义 ========================

export interface DatasetNodeData extends Record<string, unknown> {
  title: string;
  count?: number;
  filesCount?: number;
  completedCount?: number;
  progressCount?: number;
  percent?: number;
  /** 多张图片画廊 URL 数组 */
  images?: string[];
}

export interface AnnotateNodeData extends Record<string, unknown> {
  title: string;
  count?: number;
  className?: string;
  assignee?: string;
}

export interface ReviewNodeData extends Record<string, unknown> {
  title: string;
  count?: number;
  assignee?: string;
}

export interface GenericWorkflowNodeData extends Record<string, unknown> {
  title: string;
  type: string;
  count?: number;
  description?: string;
  subText?: string;
}
