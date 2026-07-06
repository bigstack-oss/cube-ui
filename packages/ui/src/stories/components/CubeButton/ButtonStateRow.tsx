import type { PropsWithChildren } from 'react'
import {
  type CubeButtonProps,
  CubeButton,
} from '../../../components/CubeButton'
import { MonochromeHome01, MonochromeChevronDown } from '@icons/index.ts'

const StateText = (props: PropsWithChildren) => {
  const { children } = props
  return (
    <span className="primary-body2 text-functional-title flex items-center justify-start">
      {children}
    </span>
  )
}

const ButtonGridItem = (props: PropsWithChildren) => {
  const { children } = props
  return <div className="flex items-center justify-start">{children}</div>
}

export type ButtonStateRowProps = Omit<CubeButtonProps, 'children'> & {
  stateText: string
  showStateText: boolean
  buttonText: string
}

export const ButtonStateRow = (props: ButtonStateRowProps) => {
  const {
    showStateText,
    stateText,
    type,
    size,
    disabled,
    onClick,
    loading,
    buttonText,
  } = props

  return (
    <>
      {showStateText && <StateText>{stateText}</StateText>}
      <ButtonGridItem>
        <CubeButton
          size={size}
          type={type}
          usage="text-only"
          loading={loading}
          disabled={disabled}
          onClick={onClick}
        >
          {buttonText}
        </CubeButton>
      </ButtonGridItem>
      <ButtonGridItem>
        <CubeButton
          size={size}
          type={type}
          usage="icon-only"
          Icon={MonochromeHome01}
          loading={loading}
          disabled={disabled}
          onClick={onClick}
        />
      </ButtonGridItem>
      <ButtonGridItem>
        <CubeButton
          size={size}
          type={type}
          usage="icon-left"
          Icon={MonochromeHome01}
          loading={loading}
          disabled={disabled}
          onClick={onClick}
        >
          {buttonText}
        </CubeButton>
      </ButtonGridItem>
      <ButtonGridItem>
        <CubeButton
          size={size}
          type={type}
          usage="icon-right"
          Icon={MonochromeChevronDown}
          loading={loading}
          disabled={disabled}
          onClick={onClick}
        >
          {buttonText}
        </CubeButton>
      </ButtonGridItem>
    </>
  )
}
