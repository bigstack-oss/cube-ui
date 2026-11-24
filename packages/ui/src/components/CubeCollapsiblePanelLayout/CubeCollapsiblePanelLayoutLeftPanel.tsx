import {
  cloneElement,
  isValidElement,
  useContext,
  type MouseEvent,
  type MouseEventHandler,
  type ReactElement,
} from 'react'
import { isNil } from 'lodash'
import { MonochromeInformationCircle } from '@icons'
import { useCubeUiTranslation } from '@i18n/useCubeUiTranslation'
import { CubeGeneralPanel } from '../CubeGeneralPanel/CubeGeneralPanel'
import { CubeCollapsiblePanelLayoutContext } from './cubeCollapsiblePanelLayoutContext'
import { toggleButton } from './cubeCollapsiblePanelLayoutStyles'
import type { CubeCollapsiblePanelLayoutLeftPanelProps } from './cubeCollapsiblePanelLayoutTypes'

export const CubeCollapsiblePanelLayoutLeftPanel = (
  props: CubeCollapsiblePanelLayoutLeftPanelProps,
) => {
  const { customToggleButton, rightSlot, children, ...restProps } = props

  const { isOpen, toggle } = useContext(CubeCollapsiblePanelLayoutContext)
  const { t } = useCubeUiTranslation()

  const renderButton = () => {
    const defaultButton = (
      <button
        type="button"
        className={toggleButton()}
        onClick={() => toggle()}
        aria-label={t('component.collapsiblePanelLayout.togglePanel')}
        aria-expanded={isOpen}
      >
        <MonochromeInformationCircle className="icon-lg text-functional-text" />
      </button>
    )

    if (isNil(customToggleButton)) {
      return defaultButton
    }

    if (!isValidElement(customToggleButton)) {
      console.warn(
        'CubeCollapsiblePanelLayout.LeftPanel: `customToggleButton` is not a valid React element. Falling back to default button.',
      )
      return defaultButton
    }

    return cloneElement(
      customToggleButton as ReactElement<{ onClick?: MouseEventHandler }>,
      {
        onClick: (e: MouseEvent) => {
          customToggleButton.props.onClick?.(e)
          toggle()
        },
      },
    )
  }

  return (
    <CubeGeneralPanel
      {...restProps}
      containerClassName="min-w-0 flex-1"
      rightSlot={
        <>
          {rightSlot}
          {renderButton()}
        </>
      }
    >
      {children}
    </CubeGeneralPanel>
  )
}
