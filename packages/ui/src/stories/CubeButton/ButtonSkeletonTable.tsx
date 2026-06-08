import type { PropsWithChildren } from 'react'
import { CubeButtonSkeleton } from '../../components/CubeButton/CubeButtonSkeleton'

const DescriptionText = (props: PropsWithChildren) => {
  const { children } = props
  return (
    <span className="primary-body2 font-semibold flex items-center justify-center">
      {children}
    </span>
  )
}

const ButtonSkeletonTable = () => {
  return (
    <div className="gap-x-5 grid grid-cols-[50px_126px_62px_156px_156px] gap-y-[34px]">
      <DescriptionText />
      <DescriptionText>Text only</DescriptionText>
      <DescriptionText>Icon only</DescriptionText>
      <DescriptionText>Icon left</DescriptionText>
      <DescriptionText>Icon right</DescriptionText>

      <DescriptionText>MD</DescriptionText>
      <CubeButtonSkeleton size="md" usage="text-only" />
      <CubeButtonSkeleton size="md" usage="icon-only" />
      <CubeButtonSkeleton size="md" usage="icon-left" />
      <CubeButtonSkeleton size="md" usage="icon-right" />

      <DescriptionText>SM</DescriptionText>
      <CubeButtonSkeleton size="sm" usage="text-only" />
      <CubeButtonSkeleton size="sm" usage="icon-only" />
      <CubeButtonSkeleton size="sm" usage="icon-left" />
      <CubeButtonSkeleton size="sm" usage="icon-right" />

      <DescriptionText>LG</DescriptionText>
      <CubeButtonSkeleton size="lg" usage="text-only" />
      <CubeButtonSkeleton size="lg" usage="icon-only" />
      <CubeButtonSkeleton size="lg" usage="icon-left" />
      <CubeButtonSkeleton size="lg" usage="icon-right" />
    </div>
  )
}

export default ButtonSkeletonTable
