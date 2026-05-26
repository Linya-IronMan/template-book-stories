import type { Meta, StoryObj } from '@storybook/react';
import { BaseButton } from './BaseButton';

const meta: Meta<typeof BaseButton> = {
  title: 'Components/BaseButton',
  component: BaseButton,
};

export default meta;
type Story = StoryObj<typeof BaseButton>;

export const Primary: Story = {
  args: {
    label: 'Primary Button',
    primary: true,
  },
};

export const Secondary: Story = {
  args: {
    label: 'Secondary Button',
    primary: false,
  },
};
