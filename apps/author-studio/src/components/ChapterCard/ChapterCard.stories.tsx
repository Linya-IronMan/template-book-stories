import type { Meta, StoryObj } from '@storybook/react-vite';
import { ChapterCard } from './ChapterCard';

const meta = {
  title: 'Components/ChapterCard',
  component: ChapterCard,
  tags: ['autodocs'],
  args: {
    title: '第 12 章：旧码头上的回声',
    status: '待精修',
    wordCount: 4280,
    updatedAt: '今天 09:20',
    summary: '主角第一次确认失踪案与港口气象站之间存在时间线冲突。',
    accentColor: '#8a6cff',
  },
} satisfies Meta<typeof ChapterCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ReadyToPublish: Story = {
  args: {
    title: '番外：灯塔值夜人手记',
    status: '可发布',
    wordCount: 2100,
    updatedAt: '昨天 22:14',
    summary: '从配角视角补足世界观细节，适合作为订阅福利内容发布。',
    accentColor: '#4cb7a5',
  },
};
