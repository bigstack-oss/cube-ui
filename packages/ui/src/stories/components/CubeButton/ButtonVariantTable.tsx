import type { PropsWithChildren } from 'react'
import { SubHeading } from '../../../internals/components/SubHeading'
import { ButtonSizeRow } from './ButtonSizeRow'

const TypeText = (props: PropsWithChildren) => {
  const { children } = props
  return (
    <SubHeading className="flex items-center justify-center">
      {children}
    </SubHeading>
  )
}

const VariantHeaderRow = () => {
  return (
    <>
      <TypeText />
      <TypeText>Primary</TypeText>
      <TypeText>Secondary</TypeText>
      <TypeText>Ghost</TypeText>
      <TypeText>Warning</TypeText>
      <TypeText>Light</TypeText>
    </>
  )
}

type ButtonVariantTableProps = {
  buttonText: string
}

export const ButtonVariantTable = (props: ButtonVariantTableProps) => {
  const { buttonText } = props

  return (
    <div className="grid grid-cols-[repeat(6,auto)] grid-rows-[100px_repeat(auto)] gap-14">
      <VariantHeaderRow />
      <ButtonSizeRow
        sizeText="MD"
        size="md"
        buttonText={buttonText}
        showUsageHeader={true}
      />
      <ButtonSizeRow
        sizeText="SM"
        size="sm"
        buttonText={buttonText}
        showUsageHeader={false}
      />
      <ButtonSizeRow
        sizeText="LG"
        size="lg"
        buttonText={buttonText}
        showUsageHeader={false}
      />
    </div>
  )
}
