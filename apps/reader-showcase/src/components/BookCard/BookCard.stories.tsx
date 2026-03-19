import type { Meta, StoryObj } from '@storybook/react-vite';
import { BookCard } from './BookCard';

const meta = {
  title: 'Components/BookCard',
  component: BookCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  args: {
    title: '雾港回声',
    author: '林舟',
    category: '悬疑 / 长篇',
    summary:
      '一名电台主持人在海雾封港的七天里，逐步拼凑出一场跨越十五年的失踪案真相。',
    rating: 4.8,
    progress: 76,
    priceTag: '连载中',
    accentColor: '#7c5cff',
  },
} satisfies Meta<typeof BookCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WarmTone: Story = {
  args: {
    title: '春山旅人',
    author: '周栖',
    category: '治愈 / 散文',
    summary:
      '围绕四季旅居写作展开，用轻巧片段记录人与小镇、植物和记忆之间的关系。',
    rating: 4.6,
    progress: 54,
    priceTag: '筹备出版',
    accentColor: '#e36f5d',
  },
};

export const Completed: Story = {
  args: {
    title: '逆光航线',
    author: '裴昼',
    category: '科幻 / 系列完结',
    summary:
      '在近地轨道城市逐层坍塌的背景下，一队维修师选择把最后一班摆渡舰驶向太阳背面。',
    rating: 4.9,
    progress: 100,
    priceTag: '已完结',
    accentColor: '#2f8f83',
  },
};
