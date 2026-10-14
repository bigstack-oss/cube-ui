import { MonochromeInformationCircle } from '@icons'
import { CubeTooltip } from '@components/CubeTooltip/CubeTooltip'
import { TooltipRow } from './TooltipRow'

const longText =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed ' +
  'do eiusmod tempor incididunt ut labore et dolore magna aliqua. ' +
  'Ut enim ad minim veniam, quis nostrud exercitation ullamco ' +
  'laboris nisi ut aliquip ex ea commodo consequat. Duis aute ' +
  'irure dolor in reprehenderit in voluptate velit esse cillum ' +
  'dolore eu fugiat nulla pariatur. Excepteur sint occaecat ' +
  'cupidatat non proident, sunt in culpa qui officia deserunt ' +
  'mollit anim id est laborum.'

export const LayoutGrid = () => {
  const icon = <MonochromeInformationCircle className="icon-md" />

  return (
    <div className="flex flex-col gap-y-8">
      <TooltipRow title="w/Title & Subtext">
        <CubeTooltip
          hoverContent={{
            title: 'Title',
            subtext: 'Subtext',
            message: 'Lorem ipsum dolor sit amet',
          }}
        >
          {icon}
        </CubeTooltip>
      </TooltipRow>
      <TooltipRow title="Multiple Rows">
        <CubeTooltip
          hoverContent={{
            message: longText,
          }}
        >
          {icon}
        </CubeTooltip>
      </TooltipRow>
      <TooltipRow title="Multiple Rows w/Title">
        <CubeTooltip
          hoverContent={{
            title: 'Title',
            message: longText,
          }}
        >
          {icon}
        </CubeTooltip>
      </TooltipRow>
    </div>
  )
}
