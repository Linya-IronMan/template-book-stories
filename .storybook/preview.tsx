import { initS3 } from '@enableai-sdk-common/s3'
import { JotaiProvider, initJotaiStore } from '@enableai-sdk-common/store'
import { StoryBookProvider } from '@enableai-tests/storybook-preview'
import type { Preview } from '@storybook/react-vite'

import { initLogger } from './setup'

initJotaiStore()

initLogger(true)
initS3()
const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    layout: 'centered',
  },
  initialGlobals: {
    backgrounds: { value: 'light' },
  },
  decorators: [
    (Story, context) => {
      const isDark = context.globals.backgrounds.value === 'dark'

      return (
        <StoryBookProvider theme={{ isDark }}>
          <JotaiProvider>
            <Story />
          </JotaiProvider>
        </StoryBookProvider>
      )
    },
  ],
}

export default preview
