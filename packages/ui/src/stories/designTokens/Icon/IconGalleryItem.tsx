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
    <div className="flex h-24 w-36 flex-col items-center justify-start gap-y-2 border p-3 pt-4 transition-colors hover:bg-grey-200">
      <CubeIconFrame size={size} className={className} onClick={onIconClick}>
        <Component />
      </CubeIconFrame>
      <span className="secondary-body6 max-w-full break-all text-center text-functional-text-light">
        {name}
      </span>
    </div>
  )
}
