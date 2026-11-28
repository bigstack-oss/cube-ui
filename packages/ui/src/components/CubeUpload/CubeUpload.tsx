import { useRef, type ChangeEventHandler } from 'react'
import { twMerge } from 'tailwind-merge'
import { MonochromeUpload } from '@icons'
import { testIdOf } from '@utils/testId'
import { CubeButton } from '../CubeButton/CubeButton'
import { CubeUploadTestIdContext } from './cubeUploadContext'
import { CubeUploadError } from './CubeUploadError'
import { CubeUploadFile } from './CubeUploadFile'
import { CubeUploadProgressBar } from './CubeUploadProgressBar'
import { buttonGroup, buttonRow, fileInput, upload } from './cubeUploadStyles'
import type { CubeUploadProps } from './cubeUploadTypes'

export const CubeUpload = (props: CubeUploadProps) => {
  const {
    className,
    buttonText,
    inputId,
    accept,
    leftSlot,
    rightSlot,
    isUploading = false,
    disabled = false,
    children,
    onFileChange,
    'data-testid': testIdProp,
  } = props

  const testId = testIdProp || undefined

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0] || null

    if (onFileChange) {
      onFileChange(file)
    }
    // Allow re-uploading the same file
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <CubeUploadTestIdContext.Provider value={testId}>
      <div className={twMerge(upload(), className)} data-testid={testId}>
        <div className={buttonRow()}>
          <div className={buttonGroup()}>
            <CubeButton
              size="lg"
              type="secondary"
              usage="icon-left"
              loading={isUploading}
              disabled={disabled}
              Icon={MonochromeUpload}
              data-testid={testIdOf(testId, 'button')}
              onClick={handleButtonClick}
            >
              {buttonText}
            </CubeButton>
            <input
              ref={fileInputRef}
              id={inputId}
              type="file"
              accept={accept}
              disabled={isUploading || disabled}
              onChange={handleFileChange}
              className={fileInput()}
              data-testid={testIdOf(testId, 'input')}
            />
            {leftSlot}
          </div>
          {rightSlot}
        </div>
        {children}
      </div>
    </CubeUploadTestIdContext.Provider>
  )
}

CubeUpload.File = CubeUploadFile
CubeUpload.ProgressBar = CubeUploadProgressBar
CubeUpload.Error = CubeUploadError
