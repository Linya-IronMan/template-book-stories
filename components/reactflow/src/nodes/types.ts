import React from 'react';
import { Position } from '@xyflow/react';

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
