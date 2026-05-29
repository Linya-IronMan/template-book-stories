import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Typography } from 'antd';
import { CustomReactFlow } from './CustomReactFlow';

const { Text } = Typography;

const meta: Meta<typeof CustomReactFlow> = {
  title: 'Components/ReactFlow',
  component: CustomReactFlow,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    onNodesChange: fn(),
    onEdgesChange: fn(),
    onConnect: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof CustomReactFlow>;

const initialNodes = [
  {
    id: '1',
    type: 'input',
    data: { label: '开始节点' },
    position: { x: 250, y: 5 },
  },
  {
    id: '2',
    data: { label: '中间处理' },
    position: { x: 100, y: 100 },
  },
  {
    id: '3',
    data: { label: '输出结果' },
    position: { x: 400, y: 100 },
  },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e1-3', source: '1', target: '3' },
];

export const Default: Story = {
  args: {
    initialNodes,
    initialEdges,
    height: '600px',
  },
};

/**
 * 演示通用节点架构的故事编辑器
 */
export const StoryEditor: Story = {
  args: {
    height: '800px',
    initialNodes: [
      {
        id: 'node-1',
        type: 'universal',
        position: { x: 100, y: 150 },
        data: {
          title: '故事节点',
          themeColor: '#1677ff',
          bodyRows: [
            {
              id: 'content',
              content: <Text type="secondary">这是故事的内容片段，支持多行显示。通过通用的行架构，我们可以轻松地在任意位置添加连接点。</Text>,
              hasLeftHandle: true,
              hasRightHandle: true,
            }
          ],
          footerRows: [
            {
              id: 'footer-id',
              content: <Text type="secondary" style={{ fontSize: 11, letterSpacing: '0.5px' }}>ID: STORY_SECTION_001</Text>,
            }
          ]
        }
      },
      {
        id: 'node-2',
        type: 'universal',
        position: { x: 500, y: 100 },
        data: {
          title: '分支节点',
          themeColor: '#722ed1',
          headerRows: [
             {
               id: 'input-header',
               content: null,
               hasLeftHandle: true,
             }
          ],
          bodyRows: [
            {
              id: 'opt-1',
              content: <button type="button" className="node-option-item">选项 A: 勇敢地继续前进</button>,
              hasRightHandle: true,
            },
            {
              id: 'opt-2',
              content: <button type="button" className="node-option-item">选项 B: 暂时撤退寻找补给</button>,
              hasRightHandle: true,
            }
          ],
          footerRows: [
            {
              id: 'add-opt',
              content: <div className="node-add-option">+ Add Option</div>,
            }
          ]
        }
      }
    ],
    initialEdges: [
      { 
        id: 'e1-2', 
        source: 'node-1', 
        target: 'node-2', 
        sourceHandle: 'content-right', 
        targetHandle: 'input-header-left', 
        animated: true,
        style: { stroke: '#1677ff', strokeWidth: 1.5 }
      }
    ]
  }
};

/**
 * 演示完整的网状故事节点结构
 */
export const StoryMesh: Story = {
  args: {
    height: '900px',
    initialNodes: [
      {
        id: 'start',
        type: 'universal',
        position: { x: 50, y: 350 },
        data: {
          title: '01. 序章：遗迹入口',
          themeColor: '#1677ff',
          bodyRows: [
            {
              id: 'content',
              content: <Text type="secondary">你站在古老的遗迹门前，尘封的大门透出神秘的气息...</Text>,
              hasRightHandle: true,
            }
          ],
          footerRows: [
            { id: 'f', content: <Text type="secondary" style={{ fontSize: 10 }}>TYPE: STORY_START</Text> }
          ]
        }
      },
      {
        id: 'choice-1',
        type: 'universal',
        position: { x: 400, y: 300 },
        data: {
          title: '抉择：如何进入？',
          themeColor: '#722ed1',
          headerRows: [
            { id: 'in', content: null, hasLeftHandle: true }
          ],
          bodyRows: [
            {
              id: 'opt-a',
              content: <button type="button" className="node-option-item">选项 A: 强行破门而入</button>,
              hasRightHandle: true,
            },
            {
              id: 'opt-b',
              content: <button type="button" className="node-option-item">选项 B: 寻找隐秘侧门</button>,
              hasRightHandle: true,
            }
          ]
        }
      },
      {
        id: 'story-path-a',
        type: 'universal',
        position: { x: 750, y: 150 },
        data: {
          title: '分支 A：陷阱触发',
          themeColor: '#1677ff',
          bodyRows: [
            {
              id: 'content',
              content: <Text type="secondary">巨响惊动了守卫，你陷入了重围！</Text>,
              hasLeftHandle: true,
              hasRightHandle: true,
            }
          ]
        }
      },
      {
        id: 'story-path-b',
        type: 'universal',
        position: { x: 750, y: 500 },
        data: {
          title: '分支 B：神秘走廊',
          themeColor: '#1677ff',
          bodyRows: [
            {
              id: 'content',
              content: <Text type="secondary">你发现了一条布满壁画的走廊，似乎通向主殿。</Text>,
              hasLeftHandle: true,
              hasRightHandle: true,
            }
          ]
        }
      },
      {
        id: 'end-node',
        type: 'universal',
        position: { x: 1100, y: 350 },
        data: {
          title: '结局：揭开秘密',
          themeColor: '#f5222d',
          bodyRows: [
            {
              id: 'ending-input',
              content: <Text type="secondary">无论过程如何，你最终触碰到了核心。</Text>,
              hasLeftHandle: true,
            }
          ],
          footerRows: [
             { id: 'end-label', content: <Text strong type="danger" style={{ display: 'block', textAlign: 'center' }}>THE END</Text> }
          ]
        }
      }
    ],
    initialEdges: [
      { 
        id: 'e1', source: 'start', target: 'choice-1', 
        sourceHandle: 'content-right', targetHandle: 'in-left',
        animated: true, style: { stroke: '#1677ff' }
      },
      { 
        id: 'e-opt-a', source: 'choice-1', target: 'story-path-a', 
        sourceHandle: 'opt-a-right', targetHandle: 'content-left',
        style: { stroke: '#722ed1' }
      },
      { 
        id: 'e-opt-b', source: 'choice-1', target: 'story-path-b', 
        sourceHandle: 'opt-b-right', targetHandle: 'content-left',
        style: { stroke: '#722ed1' }
      },
      { 
        id: 'e-a-end', source: 'story-path-a', target: 'end-node', 
        sourceHandle: 'content-right', targetHandle: 'ending-input-left',
        animated: true 
      },
      { 
        id: 'e-b-end', source: 'story-path-b', target: 'end-node', 
        sourceHandle: 'content-right', targetHandle: 'ending-input-left',
        animated: true 
      }
    ]
  }
};

const mockImages = Array.from({ length: 30 }, (_, i) => {
  const urls = [
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=150&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=150&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=150&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=150&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=150&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=150&auto=format&fit=crop&q=60'
  ];
  return urls[i % urls.length];
});

/**
 * AI 数据标注与清洗管道工作流演示
 */
export const DataPipeline: Story = {
  args: {
    height: '650px',
    initialNodes: [
      {
        id: 'dataset-1',
        type: 'dataset',
        position: { x: 50, y: 150 },
        data: {
          title: 'Image dataset',
          count: 13,
          filesCount: 17,
          completedCount: 1,
          progressCount: 5,
          percent: 29.41,
          images: mockImages,
        },
      },
      {
        id: 'review-1',
        type: 'review',
        position: { x: 340, y: 320 },
        data: {
          title: 'Review - 1',
          count: 2,
          assignee: 'Anyone',
        },
      },
      {
        id: 'annotate-1',
        type: 'annotate',
        position: { x: 340, y: 80 },
        data: {
          title: 'Annotate',
          count: 2,
          className: 'Any class',
          assignee: 'Anyone',
        },
      },
      {
        id: 'review-2',
        type: 'review',
        position: { x: 680, y: 120 },
        data: {
          title: 'Review',
          count: 2,
          assignee: 'Anyone',
        },
      },
      {
        id: 'complete-1',
        type: 'complete',
        position: { x: 1000, y: 150 },
        data: {
          title: 'Complete',
          count: 1,
        },
      },
      {
        id: 'archive-1',
        type: 'archive',
        position: { x: 680, y: 400 },
        data: {
          title: 'Archive',
          count: 1,
        },
      },
    ],
    initialEdges: [
      {
        id: 'e-data-to-rev1',
        source: 'dataset-1',
        target: 'review-1',
        sourceHandle: 'dataset-type-right',
        targetHandle: 'review-input-left',
        style: { stroke: '#096dd9', strokeWidth: 1.5 },
      },
      {
        id: 'e-rev1-acc-to-ann',
        source: 'review-1',
        target: 'annotate-1',
        sourceHandle: 'review-accepted-right',
        targetHandle: 'annotate-class-left',
        style: { stroke: '#fa8c16', strokeWidth: 1.5 },
      },
      {
        id: 'e-rev1-rej-to-arc',
        source: 'review-1',
        target: 'archive-1',
        sourceHandle: 'review-rejected-right',
        targetHandle: 'archive-input-left',
        style: { stroke: '#fa8c16', strokeWidth: 1.5 },
      },
      {
        id: 'e-ann-to-rev2',
        source: 'annotate-1',
        target: 'review-2',
        sourceHandle: 'annotate-class-right',
        targetHandle: 'review-input-left',
        style: { stroke: '#1890ff', strokeWidth: 1.5 },
      },
      {
        id: 'e-rev2-acc-to-cmp',
        source: 'review-2',
        target: 'complete-1',
        sourceHandle: 'review-accepted-right',
        targetHandle: 'complete-input-left',
        style: { stroke: '#fa8c16', strokeWidth: 1.5 },
      },
      {
        id: 'e-rev2-rej-to-ann',
        source: 'review-2',
        target: 'annotate-1',
        sourceHandle: 'review-rejected-right',
        targetHandle: 'annotate-class-left',
        style: { stroke: '#fa8c16', strokeWidth: 1.5 },
      },
    ],
  },
};
