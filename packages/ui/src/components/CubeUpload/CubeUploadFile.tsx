import { useContext } from 'react'
import { testIdOf } from '@utils/testId'
import { CubeUploadTestIdContext } from './cubeUploadContext'
import {
  MonochromeCheckmarkCircleFill,
  MonochromeIncomplete,
  MonochromeX,
} from '@icons'
import {
  cancelButton,
  card,
  file,
  fileName,
  fileStatusIcon,
  fileText,
} from './cubeUploadStyles'
import type { CubeUploadFileProps } from './cubeUploadTypes'
import { twMerge } from 'tailwind-merge'

export const CubeUploadFile = (props: CubeUploadFileProps) => {
  const { children, disabled = false, onCancel } = props

  const fileTestId = testIdOf(useContext(CubeUploadTestIdContext), 'file')

  const StatusIcon = disabled
    ? MonochromeIncomplete
    : MonochromeCheckmarkCircleFill

  return (
    <div className={twMerge(card(), file())} data-testid={fileTestId}>
      <div className={fileName()}>
        <StatusIcon className={fileStatusIcon({ disabled })} />
        <p className={fileText({ disabled })}>{children}</p>
      </div>
      <MonochromeX
        className={cancelButton({ disabled })}
        data-testid={testIdOf(fileTestId, 'cancel')}
        // The legacy file called `onCancel` even while disabled.
        onClick={disabled ? undefined : onCancel}
      />
    </div>
  )
}
