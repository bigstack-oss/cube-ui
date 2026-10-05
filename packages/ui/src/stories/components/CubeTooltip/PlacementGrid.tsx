import { twMerge } from 'tailwind-merge'
import { MonochromeInformationCircle } from '@icons'
import { CubeTooltip } from '@components/CubeTooltip/CubeTooltip'
import type {
  CubeTooltipInformation,
  CubeTooltipPlacement,
} from '@components/CubeTooltip/cubeTooltipTypes'
import { SubHeading } from '@internals/components/SubHeading'

const hoverContent: CubeTooltipInformation = {
  message: 'Lorem ipsum dolor sit amet',
}

const columnClass = twMerge('flex flex-col items-center gap-y-4 [&>*]:h-6')

const horizontalColumns = [
  { title: 'Left', top: 'top-left', bottom: 'bottom-left' },
  { title: 'Center', top: 'top-center', bottom: 'bottom-center' },
  { title: 'Right', top: 'top-right', bottom: 'bottom-right' },
  {
    title: 'Follow Cursor',
    top: 'top-follow-cursor',
    bottom: 'bottom-follow-cursor',
  },
] as const satisfies readonly {
  title: string
  top: CubeTooltipPlacement
  bottom: CubeTooltipPlacement
}[]

export const PlacementGrid = () => {
  return (
    <div className="grid w-[560px] grid-cols-[96px_repeat(4,1fr)]">
      <div className="flex flex-col gap-y-4 [&>*]:h-6">
        <span />
        <SubHeading className="flex items-center">Top</SubHeading>
        <SubHeading className="flex items-center">Bottom</SubHeading>
      </div>
      {horizontalColumns.map(({ title, top, bottom }) => (
        <div key={title} className={columnClass}>
          <SubHeading className="flex items-center text-center">
            {title}
          </SubHeading>
          {[top, bottom].map((placement) => (
            <div key={placement} className="flex items-center">
              <CubeTooltip hoverContent={hoverContent} placement={placement}>
                <MonochromeInformationCircle className="icon-md" />
              </CubeTooltip>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
