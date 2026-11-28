import { useContext } from 'react'
import { twMerge } from 'tailwind-merge'
import { testIdOf } from '@utils/testId'
import { MonochromeInformationCircle, MonochromeX } from '@icons'
import { useCubeUiTranslation } from '@i18n/useCubeUiTranslation'
import { CubeUploadTestIdContext } from './cubeUploadContext'
import {
  error,
  errorCloseButton,
  errorCloseIcon,
  errorIcon,
  truncatedText,
} from './cubeUploadStyles'
import type { CubeUploadErrorProps } from './cubeUploadTypes'

export const CubeUploadError = (props: CubeUploadErrorProps) => {
  const { message, onClose } = props

  const { t } = useCubeUiTranslation()

  const errorTestId = testIdOf(useContext(CubeUploadTestIdContext), 'error')

  return (
    <div className={error()} data-testid={errorTestId}>
      <MonochromeInformationCircle className={errorIcon()} />
      <div className={twMerge('grow', truncatedText())}>{message}</div>
      <button
        type="button"
        className={errorCloseButton()}
        onClick={onClose}
        aria-label={t('component.upload.closeError')}
        data-testid={testIdOf(errorTestId, 'close')}
      >
        <MonochromeX className={errorCloseIcon()} />
      </button>
    </div>
  )
}
