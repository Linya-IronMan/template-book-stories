import * as a11yAddonAnnotations from '@storybook/addon-a11y/preview';
import { setProjectAnnotations } from '@storybook/react-vite';
import * as projectAnnotations from './preview';

// 把 Storybook 里的全局配置同步给 Vitest，确保组件测试行为一致。
setProjectAnnotations([a11yAddonAnnotations, projectAnnotations]);
