import { getStoryBookConfig } from '@enableai-tests/storybook'

export default {
  ...getStoryBookConfig(),
  async viteFinal(config: any) {
    config.server = {
      ...config.server,
      proxy: {
        '/core': {
          target: 'https://k8stestapi1.enableai.cn',
          changeOrigin: true,
          rewrite: (path: any) => path,
        },
      },
    }
    return config
  },
}
