import { MonochromeCopy } from '@icons'
import { CubeTooltip } from '@components/CubeTooltip/CubeTooltip'
import { CaptionText } from '@internals/components/CaptionText'
import { TooltipRow } from './TooltipRow'

export const HoverAndClickGrid = () => {
  return (
    <div className="flex flex-col gap-y-8">
      <CaptionText>Show different messages on hover and click.</CaptionText>
      <div className="flex flex-col gap-y-8">
        <TooltipRow title="Message">
          <CubeTooltip
            hoverContent={{
              message: 'Lorem ipsum dolot sit amet',
            }}
            clickContent={{
              message: 'You have clicked.',
            }}
          >
            <MonochromeCopy className="icon-md cursor-pointer" />
          </CubeTooltip>
        </TooltipRow>
        <TooltipRow title="w/Title & Subtext">
          <CubeTooltip
            placement="bottom-center"
            hoverContent={{
              title: 'Title Before',
              subtext: 'Subtext before',
              message: 'Lorem ipsum dolot sit amet',
            }}
            clickContent={{
              title: 'Title After',
              subtext: 'Subtext after',
              message: 'You have clicked.',
            }}
          >
            <MonochromeCopy className="icon-md cursor-pointer" />
          </CubeTooltip>
        </TooltipRow>
      </div>
      {/* Leave some space at the bottom to showcase the translate behavior. */}
      <div className="h-6" />
    </div>
  )
}
