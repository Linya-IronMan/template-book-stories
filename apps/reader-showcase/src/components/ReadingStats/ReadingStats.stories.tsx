import type { Meta, StoryObj } from '@storybook/react-vite';
import { ReadingStats } from './ReadingStats';

const meta = {
  title: 'Components/ReadingStats',
  component: ReadingStats,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'night',
    },
  },
  args: {
    title: '本周创作面板',
    description:
      '把组件状态和文案拆分清楚后，设计、产品、前端都能在 Storybook 中直接对齐细节。',
    totalWords: 18600,
    chapters: 12,
    activeReaders: 328,
    completionRate: 68,
  },
} satisfies Meta<typeof ReadingStats>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const EarlyStage: Story = {
  args: {
    title: '新书筹备面板',
    description: '适合验证低完成度场景下，进度条、说明文案和数据卡片的排版表现。',
    totalWords: 4200,
    chapters: 3,
    activeReaders: 86,
    completionRate: 21,
  },
};
