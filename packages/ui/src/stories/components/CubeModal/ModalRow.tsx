import { Fragment, useState, type ReactNode } from 'react'
import { SubHeading } from '@internals/components/SubHeading'
import { CubeButton } from '@components/CubeButton/CubeButton'
import { CubeModal } from '@components/CubeModal/CubeModal'
import type { CubeModalProps } from '@components/CubeModal/cubeModalTypes'

export type ModalRowProps = {
  title: string
  content: ReactNode
} & Pick<CubeModalProps, 'className' | 'size' | 'footerMessage' | 'actionText'>

/**
 * One Gallery row: a title and an "Open" button for a modal titled the same.
 * The action button closes the modal.
 */
export const ModalRow = (props: ModalRowProps) => {
  const { title, content, className, size, footerMessage, actionText } = props

  const [isOpen, setIsOpen] = useState(false)

  const handleClose = () => setIsOpen(false)

  return (
    <div className="grid grid-cols-[220px_auto] items-center justify-start gap-x-8">
      <SubHeading>{title}</SubHeading>
      <CubeButton usage="text-only" onClick={() => setIsOpen(true)}>
        Open
      </CubeButton>
      <CubeModal
        className={className}
        size={size}
        isOpen={isOpen}
        title={title}
        actionText={actionText}
        footerMessage={footerMessage}
        onActionClick={handleClose}
        onCloseClick={handleClose}
      >
        {/* A key per open resets field states each time the modal opens. */}
        <Fragment key={String(isOpen)}>{content}</Fragment>
      </CubeModal>
    </div>
  )
}
