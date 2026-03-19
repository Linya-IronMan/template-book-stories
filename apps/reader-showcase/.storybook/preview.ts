import type { Preview } from '@storybook/react-vite';

const preview: Preview = {
  parameters: {
    // 为控件面板提供更友好的类型匹配能力。
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    // 让 Storybook 页面更接近真实项目中的阅读场景。
    layout: 'centered',
    backgrounds: {
      default: 'paper',
      values: [
        { name: 'paper', value: '#f5efe4' },
        { name: 'night', value: '#17151f' },
      ],
    },
    a11y: {
      // 先以 todo 模式提示无障碍问题，方便 demo 阶段逐步完善。
      test: 'todo',
    },
    docs: {
      toc: true,
    },
  },
};

export default preview;
