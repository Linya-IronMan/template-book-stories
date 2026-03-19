import type { InitLoggerOptions } from '@enableai-sdk-common/logger'
import { initLogger as commonInitLogger } from '@enableai-sdk-common/logger'
import { uploadFileS3 } from '@enableai-sdk-common/s3'

const publicConfig: InitLoggerOptions = {
  hooksAddress: 'https://open.feishu.cn/open-apis/bot/v2/hook/f68255d9-5ed3-45ef-8d41-1bc668da78c5',
  upload: {
    isEnable: true,
    isAutoUpload: true,
    uploadFunction: uploadFileS3,
  },
  isCaptureError: true,
  databaseName: 'simple-table',
}

const privateConfig: InitLoggerOptions = {
  upload: {
    isEnable: false,
  },
  isCaptureError: true,
  isEnableDownload: true,
}

const commonConfig = true ? publicConfig : privateConfig

export const initLogger = async (isDev: boolean) => {
  await commonInitLogger({ ...commonConfig, isDev })
}
