/**
 * @file CenteringDemo.stories.tsx
 * @description Storybook Story 配置，用于单独渲染 2026 CSS Centering 演示面板。
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FlexGridDemo } from './components/FlexGridDemo';
import { TextBoxDemo } from './components/TextBoxDemo';
import { AnchorDemo } from './components/AnchorDemo';
import { SafeUnsafeDemo } from './components/SafeUnsafeDemo';

const meta: Meta = {
  title: 'CSS Features/Centering Demos',
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const FlexVsGrid: StoryObj = {
  render: () => <FlexGridDemo />,
  name: '1. Flex vs Grid 折行对齐',
};

export const TextBoxTrim: StoryObj = {
  render: () => <TextBoxDemo />,
  name: '2. Text-box 文本裁剪',
};

export const AnchorPositioning: StoryObj = {
  render: () => <AnchorDemo />,
  name: '3. Anchor 锚点定位',
};

export const SafeVsUnsafe: StoryObj = {
  render: () => <SafeUnsafeDemo />,
  name: '4. Safe vs Unsafe 滚动安全',
};
