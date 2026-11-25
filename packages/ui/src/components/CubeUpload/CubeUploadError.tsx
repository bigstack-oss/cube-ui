import { twMerge } from 'tailwind-merge'
import { MonochromeInformationCircle, MonochromeX } from '@icons'
import { useCubeUiTranslation } from '@i18n/useCubeUiTranslation'
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

  return (
    <div className={error()}>
      <MonochromeInformationCircle className={errorIcon()} />
      <div className={twMerge('grow', truncatedText())}>{message}</div>
      <button
        type="button"
        className={errorCloseButton()}
        onClick={onClose}
        aria-label={t('component.upload.closeError')}
      >
        <MonochromeX className={errorCloseIcon()} />
      </button>
    </div>
  )
}
