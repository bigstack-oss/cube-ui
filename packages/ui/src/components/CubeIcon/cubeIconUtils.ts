import { twMerge } from 'tailwind-merge'
import { type CubeIconSize } from './cubeIconTypes'

const sizeClasses: Record<
  CubeIconSize,
  Record<'container' | 'icon', string>
> = {
  xs: {
    container: twMerge('icon-frame-xs'),
    icon: twMerge('icon-xs'),
  },
  sm: {
    container: twMerge('icon-frame-sm'),
    icon: twMerge('icon-sm'),
  },
  'md-sm': {
    container: twMerge('icon-frame-md-sm'),
    icon: twMerge('icon-md-sm'),
  },
  md: {
    container: twMerge('icon-frame-md'),
    icon: twMerge('icon-md'),
  },
  lg: {
    container: twMerge('icon-frame-lg'),
    icon: twMerge('icon-lg'),
  },
  xl: {
    container: twMerge('icon-frame-xl'),
    icon: twMerge('icon-xl'),
  },
}

export const getIconSizeClass = (size: CubeIconSize) => {
  return sizeClasses[size].icon
}

export const getContainerClasses = (
  size: CubeIconSize,
  classNameProps?: string,
) => {
  return twMerge(
    'inline-flex items-center justify-center',
    classNameProps,
    sizeClasses[size].container,
  )
}

export const getIconClasses = (size: CubeIconSize, classNameProps?: string) => {
  return twMerge(classNameProps, getIconSizeClass(size))
}
