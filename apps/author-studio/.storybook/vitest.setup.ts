import * as a11yAddonAnnotations from '@storybook/addon-a11y/preview';
import { setProjectAnnotations } from '@storybook/react-vite';
import * as projectAnnotations from './preview';

// 让组件测试继承 Storybook 中的背景、addon 和全局参数配置。
setProjectAnnotations([a11yAddonAnnotations, projectAnnotations]);
