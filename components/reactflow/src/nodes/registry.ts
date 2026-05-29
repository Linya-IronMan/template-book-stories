import { NodeTypes } from '@xyflow/react';
import { UniversalNode } from './UniversalNode';
import { DatasetNode } from './DatasetNode';
import { AnnotateNode } from './AnnotateNode';
import { ReviewNode } from './ReviewNode';
import { CompleteNode } from './CompleteNode';
import { ArchiveNode } from './ArchiveNode';
import { GenericWorkflowNode } from './GenericWorkflowNode';

/**
 * 集中管理的 React Flow 自定义节点类型映射表
 */
export const builtinNodeTypes: NodeTypes = {
  universal: UniversalNode,
  dataset: DatasetNode,
  annotate: AnnotateNode,
  review: ReviewNode,
  complete: CompleteNode,
  archive: ArchiveNode,
  consensus: GenericWorkflowNode,
  aiReview: GenericWorkflowNode,
  model: GenericWorkflowNode,
  logic: GenericWorkflowNode,
  sampling: GenericWorkflowNode,
  webhook: GenericWorkflowNode,
};
