import React, { FC, useRef, useEffect, useState } from 'react';
import { NodeProps, Node } from '@xyflow/react';
import { Typography, Flex, Progress } from 'antd';
import { DatasetNodeData, HandleConfig } from './types';
import { NodeLayout } from './NodeLayout';
import { NodeRow } from './NodeRow';

const { Text } = Typography;

/**
 * 数据集节点组件
 * 呈现数据类别、支持3列虚拟滚动（Virtual Scroll）的图片网格画廊、三列状态数量统计以及进度条
 * 其输出 Handle (dataset-type-right) 声明式地定位在 Header 的右侧
 */
export const DatasetNode: FC<NodeProps<Node<DatasetNodeData>>> = ({
  data,
  selected,
}) => {
  // 声明式定义：数据集节点只有一个右侧输出 Handle，挂载在 Header 右侧
  const handles: HandleConfig[] = [
    { id: 'dataset-type-right', type: 'source', position: 'right' },
  ];

  const galleryRef = useRef<HTMLDivElement>(null);
  const galleryImages = data.images || [];

  // ================= 极简高性能虚拟滚动算法 =================
  const containerHeight = 82; // 滚动区域视口高度
  const rowHeight = 48; // 单行总高（44px 图片高 + 4px 下边距）
  const cols = 3; // 每行 3 列
  const [scrollTop, setScrollTop] = useState(0);

  const totalRows = Math.ceil(galleryImages.length / cols);
  const totalHeight = totalRows * rowHeight;

  // 动态锁定可见行边界（含上下各多缓冲 1 行，防止极速滑动出现瞬时白屏）
  const startRow = Math.max(0, Math.floor(scrollTop / rowHeight) - 1);
  const endRow = Math.min(
    totalRows - 1,
    Math.floor((scrollTop + containerHeight) / rowHeight) + 1
  );

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  };

  const visibleImages: { url: string; index: number; x: number; y: number }[] = [];
  for (let rowIndex = startRow; rowIndex <= endRow; rowIndex++) {
    for (let colIndex = 0; colIndex < cols; colIndex++) {
      const imgIndex = rowIndex * cols + colIndex;
      if (imgIndex < galleryImages.length) {
        visibleImages.push({
          url: galleryImages[imgIndex],
          index: imgIndex,
          x: colIndex * (68 + 4), // 列水平偏移 (图片宽 68px + 左右间距 4px)
          y: rowIndex * rowHeight, // 行绝对定位垂直偏移
        });
      }
    }
  }
  // ==========================================================

  // 关键修复：通过原生 DOM 捕获阶段事件处理，彻底阻止 wheel 事件到达 React Flow（阻止画布缩放），并以 JS 手动驱动内部滚动
  useEffect(() => {
    const slider = galleryRef.current;
    if (!slider) return;

    const handleWheelNative = (e: WheelEvent) => {
      // 1. 强力阻止捕获和冒泡传播，防止外层 React Flow (d3-zoom) 捕获此事件缩放画布
      e.stopPropagation();
      // 2. 阻止事件的默认行为，防止整个页面被联动滚动
      e.preventDefault();
      // 3. 用 JS 手动驱动容器纵向滚动，保证滚动速度与系统偏好精确同步
      slider.scrollTop += e.deltaY;
    };

    // 必须在原生级别以捕获模式 (capture: true) 进行监听，从而赶在 React Flow 的原生捕获前吞掉事件
    slider.addEventListener('wheel', handleWheelNative, {
      capture: true,
      passive: false,
    });

    return () => {
      slider.removeEventListener('wheel', handleWheelNative, { capture: true });
    };
  }, [galleryImages]);

  return (
    <NodeLayout
      type="dataset"
      title={data.title}
      count={data.count}
      selected={selected}
      handles={handles}
    >
      <NodeRow
        id="dataset-type"
        content={
          <Text type="secondary" style={{ fontSize: 11 }}>
            Image
          </Text>
        }
      />

      {/* 虚拟滚动三列网格画廊 */}
      {galleryImages.length > 0 && (
        <div
          ref={galleryRef}
          className="dataset-gallery-vscroll nodrag"
          style={{ height: containerHeight }}
          onScroll={handleScroll}
        >
          <div style={{ height: totalHeight, position: 'relative', width: '100%' }}>
            {visibleImages.map((img) => (
              <img
                key={img.index}
                src={img.url}
                className="dataset-gallery-vscroll-item"
                style={{
                  position: 'absolute',
                  left: img.x,
                  top: img.y,
                  width: 68,
                  height: 44,
                }}
                alt={`dataset-img-${img.index}`}
                draggable={false}
              />
            ))}
          </div>
        </div>
      )}

      {/* 统计指标 */}
      <Flex justify="space-between" align="center" style={{ marginBottom: 8 }}>
        <Flex vertical align="center">
          <Text strong style={{ fontSize: 12 }}>
            {data.filesCount || 0}
          </Text>
          <Text type="secondary" style={{ fontSize: 9 }}>
            Files
          </Text>
        </Flex>
        <Flex vertical align="center">
          <Text strong style={{ fontSize: 12 }}>
            {data.completedCount || 0}
          </Text>
          <Text type="secondary" style={{ fontSize: 9 }}>
            Completed
          </Text>
        </Flex>
        <Flex vertical align="center">
          <Text strong style={{ fontSize: 12 }}>
            {data.progressCount || 0}
          </Text>
          <Text type="secondary" style={{ fontSize: 9 }}>
            In progress
          </Text>
        </Flex>
      </Flex>

      {/* 进度条 */}
      <Progress
        percent={data.percent || 0}
        size="small"
        strokeColor="#096dd9"
        style={{ margin: 0 }}
      />
    </NodeLayout>
  );
};
