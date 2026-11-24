import { useContext } from 'react'
import { twMerge } from 'tailwind-merge'
import { MonochromeX } from '@icons'
import { useCubeUiTranslation } from '@i18n/useCubeUiTranslation'
import { CubeGeneralPanel } from '../CubeGeneralPanel/CubeGeneralPanel'
import { CubeCollapsiblePanelLayoutContext } from './cubeCollapsiblePanelLayoutContext'
import {
  closeButton as closeButtonStyle,
  rightPanelContainer,
} from './cubeCollapsiblePanelLayoutStyles'
import type { CubeCollapsiblePanelLayoutRightPanelProps } from './cubeCollapsiblePanelLayoutTypes'

export const CubeCollapsiblePanelLayoutRightPanel = (
  props: CubeCollapsiblePanelLayoutRightPanelProps,
) => {
  const { rightSlot, children, className, ...restProps } = props

  const { rightPanelWidth, isOpen, close } = useContext(
    CubeCollapsiblePanelLayoutContext,
  )
  const { t } = useCubeUiTranslation()

  const closeButton = (
    <button
      type="button"
      className={closeButtonStyle()}
      onClick={close}
      aria-label={t('component.collapsiblePanelLayout.closePanel')}
    >
      <MonochromeX className="icon-lg text-functional-text" />
    </button>
  )

  return (
    <div
      className={twMerge(rightPanelContainer({ isOpen }), className)}
      style={{
        width: isOpen ? rightPanelWidth : '0',
        height: isOpen ? '100%' : '0',
        minWidth: isOpen ? rightPanelWidth : '0',
        maxWidth: isOpen ? rightPanelWidth : '0',
      }}
    >
      <CubeGeneralPanel
        {...restProps}
        className="overflow-hidden"
        rightSlot={
          <>
            {rightSlot}
            {closeButton}
          </>
        }
      >
        {children}
      </CubeGeneralPanel>
    </div>
  )
}
