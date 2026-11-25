import { Fragment, useEffect, useRef, useState } from 'react'
import { CubeButton } from '@components/CubeButton'
import { CubeModal } from '@components/CubeModal'
import { CubeStroke } from '@components/CubeStroke'
import { CubeUpload } from '@components/CubeUpload/CubeUpload'
import { mockFileName, mockSlots } from './uploadMockData'

const INTERVAL = 1000
const PROGRESS_EACH_TIME = 15

type SimulatedUploadProps = {
  withSlots?: boolean
}

// Pick a file to see a simulated upload: a progress bar, then the file.
export const SimulatedUpload = (props: SimulatedUploadProps) => {
  const { withSlots = false } = props

  const [fileName, setFileName] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const [isUploaded, setIsUploaded] = useState(false)
  const [progress, setProgress] = useState(0)

  const intervalIdRef = useRef<ReturnType<typeof setInterval>>(undefined)

  useEffect(() => () => clearInterval(intervalIdRef.current), [])

  const onFileChange = (file: File | null) => {
    if (!file) return

    setFileName(file.name)
    setIsUploading(true)
    setIsUploaded(false)
    setProgress(0)

    intervalIdRef.current = setInterval(() => {
      setProgress((prev) => {
        const value = Math.min(prev + PROGRESS_EACH_TIME, 100)
        if (value === 100) {
          setIsUploading(false)
          setIsUploaded(true)
          clearInterval(intervalIdRef.current)
        }
        return value
      })
    }, INTERVAL)
  }

  const reset = () => {
    setFileName('')
    setIsUploading(false)
    setIsUploaded(false)
    setProgress(0)
    clearInterval(intervalIdRef.current)
  }

  return (
    <CubeUpload
      buttonText="Upload File"
      {...(withSlots ? mockSlots : {})}
      isUploading={isUploading}
      onFileChange={onFileChange}
    >
      {isUploading && (
        <CubeUpload.ProgressBar
          fileName={fileName}
          progress={progress}
          onAbortClick={reset}
        />
      )}
      {isUploaded && (
        <CubeUpload.File onCancel={reset}>{fileName}</CubeUpload.File>
      )}
    </CubeUpload>
  )
}

type ModalExampleProps = {
  defaultIsTesting: boolean
  defaultIsUploaded: boolean
}

// A script upload inside a modal: upload, then test the script.
export const ModalExample = (props: ModalExampleProps) => {
  const { defaultIsTesting, defaultIsUploaded } = props

  const [isOpen, setIsOpen] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [isTesting, setIsTesting] = useState(defaultIsTesting)
  const [hasTested, setHasTested] = useState(false)
  const [fileName, setFileName] = useState(() =>
    defaultIsUploaded ? mockFileName : '',
  )

  const timeoutIdsRef = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => () => timeoutIdsRef.current.forEach(clearTimeout), [])

  const later = (callback: () => void, ms: number) => {
    timeoutIdsRef.current.push(setTimeout(callback, ms))
  }

  const handleFileChange = (file: File | null) => {
    if (!file) return

    setIsUploading(true)
    setFileName('')
    later(() => {
      setFileName(file.name)
      setIsUploading(false)
    }, 3000)
  }

  const handleTestClick = () => {
    setIsTesting(true)
    later(() => {
      setHasTested(true)
      setIsTesting(false)
    }, 5000)
  }

  return (
    <Fragment>
      <CubeButton usage="text-only" onClick={() => setIsOpen(true)}>
        Open
      </CubeButton>
      <CubeModal
        title="Personalized Script"
        isOpen={isOpen}
        onCloseClick={() => setIsOpen(false)}
        onActionClick={() => setIsOpen(false)}
        actionButtonProps={{ disabled: !fileName || isTesting }}
      >
        <div className="flex flex-col gap-8">
          <CubeUpload
            isUploading={isUploading}
            disabled={isTesting}
            buttonText="Upload File"
            onFileChange={handleFileChange}
            {...mockSlots}
          >
            {fileName && (
              <CubeUpload.File
                disabled={isTesting}
                onCancel={() => setFileName('')}
              >
                {fileName}
              </CubeUpload.File>
            )}
          </CubeUpload>
          <CubeStroke type="dot" />
          <CubeButton
            usage="text-only"
            className="w-fit"
            loading={isTesting}
            disabled={!fileName || isTesting}
            onClick={handleTestClick}
          >
            Test
          </CubeButton>
          {hasTested && (
            <div className="flex flex-col">
              <div className="flex items-center justify-between rounded-t-[5px] border border-functional-border-divider bg-scene-background px-6 py-3">
                <div className="primary-body2 cursor-pointer font-semibold text-functional-text">
                  Copy
                </div>
              </div>
              <div className="primary-body3 overflow-x-auto whitespace-pre text-wrap rounded-b-[5px] bg-dark-700 px-6 py-4 text-functional-border-darker">
                {isTesting ? 'Testing...' : 'Test Result'}
              </div>
            </div>
          )}
        </div>
      </CubeModal>
    </Fragment>
  )
}
