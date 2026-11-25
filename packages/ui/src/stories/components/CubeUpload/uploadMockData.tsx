import { CubeHyperlink } from '@components/CubeHyperlink'

export const mockFileName = '/Scripts/fake_automation.command'

export const mockSlots = {
  leftSlot: (
    <div className="primary-body2 text-functional-text">
      OS: Operating System
    </div>
  ),
  rightSlot: (
    <CubeHyperlink variant="text-inline" href="#" target="_blank">
      View example
    </CubeHyperlink>
  ),
}
