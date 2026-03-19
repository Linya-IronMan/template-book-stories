import type { Preview } from '@storybook/react-vite';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: 'centered',
    backgrounds: {
      default: 'studio',
      values: [
        { name: 'studio', value: '#10111a' },
        { name: 'paper', value: '#efe7dc' },
      ],
    },
    a11y: {
      test: 'todo',
    },
    docs: {
      toc: true,
    },
  },
};

export default preview;
