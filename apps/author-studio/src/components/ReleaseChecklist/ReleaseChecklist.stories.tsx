import type { Meta, StoryObj } from '@storybook/react-vite';
import { ReleaseChecklist } from './ReleaseChecklist';

const meta = {
  title: 'Components/ReleaseChecklist',
  component: ReleaseChecklist,
  tags: ['autodocs'],
  args: {
    title: '本期发布清单',
    description: '把上线前检查点拆成独立组件后，可以直接在 Storybook 中演练不同发布状态。',
    progress: 50,
    items: [
      { label: '主线章节校对完成', done: true },
      { label: '封面文案已同步设计稿', done: true },
      { label: '会员版番外已排版', done: false },
      { label: '发布公告与预约页已创建', done: false },
    ],
  },
} satisfies Meta<typeof ReleaseChecklist>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AlmostDone: Story = {
  args: {
    progress: 85,
    items: [
      { label: '主线章节校对完成', done: true },
      { label: '封面文案已同步设计稿', done: true },
      { label: '会员版番外已排版', done: true },
      { label: '发布公告与预约页已创建', done: false },
    ],
  },
};
