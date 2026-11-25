import { twMerge } from 'tailwind-merge'
import { MonochromeX } from '@icons'
import { CubeProgressBar } from '../CubeProgressBar/CubeProgressBar'
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

  return (
    <div className={twMerge(progressBar(), card())}>
      <div className={progressBarHeader()}>
        <div className={twMerge('w-full', truncatedText())}>{fileName}</div>
        <MonochromeX className={abortIcon()} onClick={onAbortClick} />
      </div>
      <CubeProgressBar progress={progress} color="bg-chart-2" />
    </div>
  )
}
