import { useState } from 'react'
import {
  type StoryLayoutProps,
  StoryLayout,
} from '@internals/components/StoryLayout/StoryLayout'
import type {
  CubeIconSize,
  SvgComponent,
} from '@components/CubeIcon/cubeIconTypes'
import { IconGalleryItem } from './IconGalleryItem'
import { CubeInput } from '@components/CubeInput/CubeInput'

export type IconGalleryItemProps = Omit<StoryLayoutProps, 'children'> & {
  size?: CubeIconSize
  className?: string
  icons: {
    filename: string
    Component: SvgComponent
  }[]
  onIconClick?: () => void
}

const isIgnoreCaseMatch = (filename: string, search: string) => {
  return filename.toLowerCase().includes(search.toLowerCase())
}

export const IconGallery = (props: IconGalleryItemProps) => {
  const { title, desc, size, className, icons, onIconClick } = props

  const [search, setSearch] = useState('')

  return (
    <StoryLayout title={title} desc={desc}>
      <div className="flex flex-col gap-y-8">
        {/** TODO: replace with CubeInput */}
        <CubeInput
          placeholder='Search for an icon (e.g. "home")'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex flex-wrap">
          {icons
            .filter((icon) => isIgnoreCaseMatch(icon.filename, search))
            .map((icon, index) => (
              <IconGalleryItem
                key={index}
                name={icon.filename}
                size={size}
                className={className}
                Component={icon.Component}
                onIconClick={onIconClick}
              />
            ))}
        </div>
      </div>
    </StoryLayout>
  )
}
