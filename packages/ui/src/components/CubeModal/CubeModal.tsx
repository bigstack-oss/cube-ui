import type { ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { twMerge } from 'tailwind-merge'
import { MonochromeX } from '@icons'
import { useCubeUiTranslation } from '@i18n/useCubeUiTranslation'
import { CubeButton } from '../CubeButton/CubeButton'
import type { CubeModalProps } from './cubeModalTypes'
import { backdrop, modal } from './cubeModalStyles'
import MemoChildren from './MemoChildren'
import { useCloseModalWithEsc } from './useCloseModalWithEsc'

export const CubeModal = (props: CubeModalProps) => {
  const { t } = useCubeUiTranslation()

  const {
    children,
    className: classNameProp,
    size = 'md',
    isOpen,
    title,
    footerMessage,
    isActionButtonVisible = true,
    actionText = t('component.modal.action'),
    actionButtonProps,
    isCancelButtonVisible = true,
    cancelButtonProps,
    bodyRef,
    onActionClick,
    onCloseClick,
  } = props

  useCloseModalWithEsc({
    isOpen,
    onCloseClick,
  })

  const renderFooterMessage = (footerMessage: ReactNode) => {
    if (!footerMessage) {
      return null
    }

    if (typeof footerMessage === 'string') {
      return (
        <div className="primary-body3 flex-1 text-functional-text-light">
          {footerMessage}
        </div>
      )
    }

    return footerMessage
  }

  return createPortal(
    <>
      <div className={backdrop({ isOpen })} onClick={onCloseClick} />
      <div
        className={twMerge(modal({ size, isOpen }), classNameProp)}
        style={{
          boxShadow: '0px 0px 2px 0px rgba(0, 0, 0, 0.20)',
        }}
      >
        <MemoChildren shouldUpdate={isOpen}>
          <div className="flex items-center justify-between border-b border-functional-border-divider px-7 py-4 pr-5">
            <div className="primary-h4 truncate text-cosmos-primary">
              {title}
            </div>
            <CubeButton
              className="rounded-full text-functional-text"
              usage="icon-only"
              type="ghost"
              Icon={MonochromeX}
              aria-label={t('component.modal.close')}
              onClick={onCloseClick}
            />
          </div>
          <div ref={bodyRef} className="flex-1 overflow-auto p-7">
            {children}
          </div>
          <div className="flex items-center justify-end gap-x-2.5 border-t border-functional-border-divider px-7 py-4">
            {renderFooterMessage(footerMessage)}
            {isCancelButtonVisible && (
              <CubeButton
                type="ghost"
                usage="text-only"
                size="lg"
                onClick={onCloseClick}
                {...cancelButtonProps}
              >
                {t('component.modal.cancel')}
              </CubeButton>
            )}
            {isActionButtonVisible && (
              <CubeButton
                usage="text-only"
                size="lg"
                onClick={onActionClick}
                {...actionButtonProps}
              >
                {actionText}
              </CubeButton>
            )}
          </div>
        </MemoChildren>
      </div>
    </>,
    document.body,
  )
}
