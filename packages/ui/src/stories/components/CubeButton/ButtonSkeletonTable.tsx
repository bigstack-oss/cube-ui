import type { PropsWithChildren } from 'react'
import { CubeButton } from '@components/CubeButton'
import { SubHeading } from '@internals/components/SubHeading'

const DescriptionText = (props: PropsWithChildren) => {
  const { children } = props
  return (
    <SubHeading className="flex items-center justify-center text-nowrap">
      {children}
    </SubHeading>
  )
}

export const ButtonSkeletonTable = () => {
  return (
    <div className="grid grid-cols-[50px_126px_62px_156px_156px] gap-x-5 gap-y-[34px]">
      <DescriptionText />
      <DescriptionText>Text only</DescriptionText>
      <DescriptionText>Icon only</DescriptionText>
      <DescriptionText>Icon left</DescriptionText>
      <DescriptionText>Icon right</DescriptionText>

      <DescriptionText>MD</DescriptionText>
      <CubeButton.Skeleton size="md" usage="text-only" />
      <CubeButton.Skeleton size="md" usage="icon-only" />
      <CubeButton.Skeleton size="md" usage="icon-left" />
      <CubeButton.Skeleton size="md" usage="icon-right" />

      <DescriptionText>SM</DescriptionText>
      <CubeButton.Skeleton size="sm" usage="text-only" />
      <CubeButton.Skeleton size="sm" usage="icon-only" />
      <CubeButton.Skeleton size="sm" usage="icon-left" />
      <CubeButton.Skeleton size="sm" usage="icon-right" />

      <DescriptionText>LG</DescriptionText>
      <CubeButton.Skeleton size="lg" usage="text-only" />
      <CubeButton.Skeleton size="lg" usage="icon-only" />
      <CubeButton.Skeleton size="lg" usage="icon-left" />
      <CubeButton.Skeleton size="lg" usage="icon-right" />
    </div>
  )
}
