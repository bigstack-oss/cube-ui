import { useRef, type ChangeEventHandler } from 'react'
import { twMerge } from 'tailwind-merge'
import { MonochromeUpload } from '@icons'
import { CubeButton } from '../CubeButton/CubeButton'
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
  } = props

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
    <div className={twMerge(upload(), className)}>
      <div className={buttonRow()}>
        <div className={buttonGroup()}>
          <CubeButton
            size="lg"
            type="secondary"
            usage="icon-left"
            loading={isUploading}
            disabled={disabled}
            Icon={MonochromeUpload}
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
          />
          {leftSlot}
        </div>
        {rightSlot}
      </div>
      {children}
    </div>
  )
}

CubeUpload.File = CubeUploadFile
CubeUpload.ProgressBar = CubeUploadProgressBar
CubeUpload.Error = CubeUploadError
