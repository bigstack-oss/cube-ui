import { useContext } from 'react'
import { twMerge } from 'tailwind-merge'
import { testIdOf } from '@utils/testId'
import { MonochromeX } from '@icons'
import { CubeProgressBar } from '../CubeProgressBar/CubeProgressBar'
import { CubeUploadTestIdContext } from './cubeUploadContext'
import {
  abortIcon,
  card,
  progressBar,
  progressBarHeader,
  truncatedText,
} from './cubeUploadStyles'
import type { CubeUploadProgressBarProps } from './cubeUploadTypes'

export const CubeUploadProgressBar = (props: CubeUploadProgressBarProps) => {
  const { fileName, progress, onAbortClick } = props

  const progressTestId = testIdOf(
    useContext(CubeUploadTestIdContext),
    'progress',
  )

  return (
    <div
      className={twMerge(progressBar(), card())}
      data-testid={progressTestId}
    >
      <div className={progressBarHeader()}>
        <div className={twMerge('w-full', truncatedText())}>{fileName}</div>
        <MonochromeX
          className={abortIcon()}
          data-testid={testIdOf(progressTestId, 'abort')}
          onClick={onAbortClick}
        />
      </div>
      <CubeProgressBar progress={progress} color="bg-chart-2" />
    </div>
  )
}
