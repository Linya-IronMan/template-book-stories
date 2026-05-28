import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { CustomReactFlow } from './CustomReactFlow';

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
        position: { x: 100, y: 100 },
        data: {
          title: '故事节点',
          themeColor: '#007aff',
          bodyRows: [
            {
              id: 'content',
              content: <div style={{ padding: '8px 0' }}>这是故事的内容片段，支持多行显示...</div>,
              hasLeftHandle: true,
              hasRightHandle: true,
            }
          ],
          footerRows: [
            {
              id: 'footer-actions',
              content: <div style={{ fontSize: '10px', color: '#888' }}>ID: STORY_001</div>,
            }
          ]
        }
      },
      {
        id: 'node-2',
        type: 'universal',
        position: { x: 400, y: 100 },
        data: {
          title: '分支节点',
          themeColor: '#a855f7',
          bodyRows: [
            {
              id: 'opt-1',
              content: <button style={{ width: '100%', textAlign: 'left', background: '#333', color: '#fff', border: 'none', padding: '4px 8px', borderRadius: '4px' }}>选项 A: 继续前进</button>,
              hasRightHandle: true,
            },
            {
              id: 'opt-2',
              content: <button style={{ width: '100%', textAlign: 'left', background: '#333', color: '#fff', border: 'none', padding: '4px 8px', borderRadius: '4px', marginTop: '4px' }}>选项 B: 掉头回去</button>,
              hasRightHandle: true,
            }
          ],
          headerRows: [
             {
               id: 'input',
               content: null,
               hasLeftHandle: true,
             }
          ],
          footerRows: [
            {
              id: 'add-opt',
              content: <div style={{ color: '#a855f7', cursor: 'pointer', textAlign: 'center', paddingTop: '4px' }}>+ Add Option</div>,
            }
          ]
        }
      }
    ],
    initialEdges: [
      { id: 'e1-2', source: 'node-1', target: 'node-2', sourceHandle: 'content-right', targetHandle: 'input-left', animated: true }
    ]
  }
};
