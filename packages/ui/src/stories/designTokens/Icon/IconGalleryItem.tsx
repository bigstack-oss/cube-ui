import type { CubeIconSize, SvgComponent } from '../../../components/CubeIcon'
import { CubeIconFrame } from '../../../components/CubeIcon/CubeIconFrame'

type IconGalleryItemProps = {
  name: string
  size?: CubeIconSize
  className?: string
  Component: SvgComponent
  onIconClick?: () => void
}

export const IconGalleryItem = (props: IconGalleryItemProps) => {
  const { name, size, className, Component, onIconClick } = props

  return (
    <div className="h-24 w-36 gap-y-2 p-3 pt-4 hover:bg-grey-200 flex flex-col items-center justify-start border transition-colors">
      <CubeIconFrame size={size} className={className} onClick={onIconClick}>
        <Component />
      </CubeIconFrame>
      <span className="secondary-body6 text-functional-text-light max-w-full text-center break-all">
        {name}
      </span>
    </div>
  )
}
