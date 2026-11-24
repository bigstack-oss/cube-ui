import { clamp } from 'lodash'
import { CubeCollapsiblePanelLayoutContext } from './cubeCollapsiblePanelLayoutContext'
import { CubeCollapsiblePanelLayoutLeftPanel } from './CubeCollapsiblePanelLayoutLeftPanel'
import { CubeCollapsiblePanelLayoutRightPanel } from './CubeCollapsiblePanelLayoutRightPanel'
import { layout } from './cubeCollapsiblePanelLayoutStyles'
import type { CubeCollapsiblePanelLayoutProps } from './cubeCollapsiblePanelLayoutTypes'
import { useCollapsiblePanels } from './useCollapsiblePanels'

export const CubeCollapsiblePanelLayout = (
  props: CubeCollapsiblePanelLayoutProps,
) => {
  const {
    defaultPanelOpen = true,
    isControlledPanelOpen,
    onControlledPanelOpenChange,
    rightPanelWidthPercentage = 50,
    children,
  } = props

  const [leftPanel, rightPanel] = children

  if (leftPanel.type !== CubeCollapsiblePanelLayoutLeftPanel) {
    throw new Error(
      'CubeCollapsiblePanelLayout: first child must be <CubeCollapsiblePanelLayout.LeftPanel>',
    )
  }

  if (rightPanel.type !== CubeCollapsiblePanelLayoutRightPanel) {
    throw new Error(
      'CubeCollapsiblePanelLayout: second child must be <CubeCollapsiblePanelLayout.RightPanel>',
    )
  }

  const { isOpen, toggle, close } = useCollapsiblePanels({
    defaultPanelOpen,
    isControlledPanelOpen,
    onControlledPanelOpenChange,
  })

  // Ensure the panel width percentage stays within 0-100.
  const clampedWidth = clamp(rightPanelWidthPercentage, 0, 100)
  // Convert the clamped percentage into a CSS width calculation,
  // leaving 16px as the gap between left and right panels.
  const rightPanelWidth = `calc((100% - 16px) * ${clampedWidth / 100})`

  return (
    <CubeCollapsiblePanelLayoutContext.Provider
      value={{ rightPanelWidth, isOpen, toggle, close }}
    >
      <div className={layout({ isOpen })}>{children}</div>
    </CubeCollapsiblePanelLayoutContext.Provider>
  )
}

CubeCollapsiblePanelLayout.LeftPanel = CubeCollapsiblePanelLayoutLeftPanel
CubeCollapsiblePanelLayout.RightPanel = CubeCollapsiblePanelLayoutRightPanel
