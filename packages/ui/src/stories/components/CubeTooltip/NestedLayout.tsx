import { MonochromeInformationCircle } from '@icons'
import { CubeTooltip } from '@components/CubeTooltip/CubeTooltip'
import { CaptionText } from '@internals/components/CaptionText'

export const NestedLayout = () => {
  return (
    <div className="max-h-32 w-64 overflow-auto rounded-md border">
      <div className="h-96 p-12">
        <CaptionText className="mb-24">
          Scroll down to see the tooltip.
        </CaptionText>
        <CubeTooltip
          hoverContent={{
            message: 'Lorem ipsum dolor sit amet',
          }}
        >
          <MonochromeInformationCircle className="icon-md" />
        </CubeTooltip>
      </div>
    </div>
  )
}
