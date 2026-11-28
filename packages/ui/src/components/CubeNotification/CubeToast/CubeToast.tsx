import { useEffect } from 'react'
import { testIdOf } from '@utils/testId'
import {
  renderCloseButton,
  renderIcon,
  renderLink,
  renderTitle,
} from '../cubeNotificationUtils'
import { TOAST_LIFETIME, type CubeToastType } from './cubeToastUtils'
import { toast } from './cubeToastStyles'

export type CubeToastProps = CubeToastType & {
  onToastClose: (id: string) => void
  /** The toast's own test ID; it is keyed by its `id`. */
  testId?: string
}

export const CubeToast = (props: CubeToastProps) => {
  const {
    id,
    type = 'neutral',
    title,
    message,
    link,
    onToastClose,
    time,
    testId,
  } = props

  const renderHeader = () => {
    if (!title) return null

    return (
      <div className="flex items-center gap-[6px]">
        {renderIcon(type)}
        {renderTitle(title)}
      </div>
    )
  }

  const renderTime = () => {
    return <div className="primary-body5 ml-auto">{time}</div>
  }

  const handleClose = () => onToastClose(id)

  return (
    <div
      className={toast({ type })}
      data-testid={testId}
      data-key={testId ? id : undefined}
    >
      <div className="flex gap-4">
        <div className="flex flex-1 flex-col gap-3 break-all">
          {renderHeader()}
          {message}
        </div>
        {renderCloseButton(handleClose, testIdOf(testId, 'close'))}
      </div>
      <div className="flex w-full items-center">
        {renderLink(link)}
        {renderTime()}
      </div>
    </div>
  )
}

export const CubeToastWrapper = (props: CubeToastProps) => {
  const { id, onToastClose, ...restProps } = props

  useEffect(() => {
    const timer = setTimeout(() => {
      onToastClose(id)
    }, TOAST_LIFETIME)

    return () => clearTimeout(timer)
  }, [id, onToastClose])

  return <CubeToast {...restProps} id={id} onToastClose={onToastClose} />
}
