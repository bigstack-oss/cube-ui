import type { ReactNode } from 'react'
import type { PropsWithClassName } from '@shared-types/react-types'

export type CubeUploadProps = PropsWithClassName & {
  buttonText: string
  /**
   * `id` of the hidden file input.
   */
  inputId?: string
  /**
   * Accepted file types, as in `<input type="file" accept>`.
   */
  accept?: string
  /**
   * Content next to the upload button.
   */
  leftSlot?: ReactNode
  /**
   * Content on the right of the button row.
   */
  rightSlot?: ReactNode
  /**
   * Shows the button as loading and blocks picking a file.
   * @default false
   */
  isUploading?: boolean
  /**
   * @default false
   */
  disabled?: boolean
  /**
   * Shown below the button row, such as `CubeUpload.ProgressBar`,
   * `CubeUpload.File` or `CubeUpload.Error`.
   */
  children?: ReactNode
  /**
   * Called with the picked file (`null` if none). The same file can be
   * picked again.
   */
  onFileChange?: (file: File | null) => void | Promise<void>
}

export type CubeUploadFileProps = {
  /**
   * Greys out the file and blocks `onCancel`.
   * @default false
   */
  disabled?: boolean
  /**
   * The file name.
   */
  children: string
  onCancel: () => void
}

export type CubeUploadProgressBarProps = {
  fileName: string
  /**
   * An integer between 0 and 100.
   */
  progress: number
  onAbortClick: () => void
}

export type CubeUploadErrorProps = {
  message: string
  onClose?: () => void
}
