import type { Meta, StoryObj } from '@storybook/react';
import { CustomReactFlow } from './CustomReactFlow';

const meta: Meta<typeof CustomReactFlow> = {
  title: 'Components/ReactFlow',
  component: CustomReactFlow,
  parameters: {
    layout: 'fullscreen',
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
