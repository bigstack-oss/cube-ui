import type { PropsWithChildren } from 'react'
import type { CubeButtonSize } from '../../../components/CubeButton/cubeButtonTypes'
import { ButtonTypeSizeTable } from './ButtonTypeSizeTable'

const SizeText = (props: PropsWithChildren) => {
  const { children } = props
  return (
    <span className="primary-body1 font-semibold text-functional-title flex items-center justify-start">
      {children}
    </span>
  )
}

export type ButtonSizeRowProps = {
  sizeText: string
  size: CubeButtonSize
  buttonText: string
  showUsageHeader: boolean
}

export const ButtonSizeRow = (props: ButtonSizeRowProps) => {
  const { sizeText, size, buttonText, showUsageHeader = false } = props

  return (
    <>
      <SizeText>{sizeText}</SizeText>
      <ButtonTypeSizeTable
        showUsageHeader={showUsageHeader}
        showState={true}
        size={size}
        type="primary"
        buttonText={buttonText}
      />
      <ButtonTypeSizeTable
        showUsageHeader={showUsageHeader}
        showState={false}
        size={size}
        type="secondary"
        buttonText={buttonText}
      />
      <ButtonTypeSizeTable
        showUsageHeader={showUsageHeader}
        showState={false}
        size={size}
        type="ghost"
        buttonText={buttonText}
      />
      <ButtonTypeSizeTable
        showUsageHeader={showUsageHeader}
        showState={false}
        size={size}
        type="warning"
        buttonText={buttonText}
      />
      <ButtonTypeSizeTable
        showUsageHeader={showUsageHeader}
        showState={false}
        size={size}
        type="light"
        buttonText={buttonText}
      />
    </>
  )
}
