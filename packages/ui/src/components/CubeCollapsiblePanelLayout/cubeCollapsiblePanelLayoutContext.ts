import { createContext } from 'react'

export type CubeCollapsiblePanelLayoutContextValue = {
  rightPanelWidth: string
  isOpen: boolean
  toggle: (open?: boolean) => void
  close: () => void
}

export const CubeCollapsiblePanelLayoutContext =
  createContext<CubeCollapsiblePanelLayoutContextValue>({
    rightPanelWidth: '',
    isOpen: true,
    toggle: () => {},
    close: () => {},
  })
