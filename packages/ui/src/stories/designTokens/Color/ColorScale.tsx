import { cubePreset } from '../../../theme'
import classNames from 'classnames'
import { useMemo } from 'react'
import { hexToRgb, resolveCssVar } from './utils'
import { SubHeading } from '../../../internals/components/SubHeading'

const { colors } = cubePreset.theme.extend

export type ColorScaleProps = {
  title: string
  category: keyof typeof colors
}

const hexToRgbSum = (hex: string): number => {
  const rgb = hexToRgb(hex)
  if (!rgb) {
    return 0
  }
  return rgb.reduce((sum, value) => sum + value, 0)
}

export const ColorScale = (props: ColorScaleProps) => {
  const { title, category } = props

  const scales = useMemo<[property: string, hex: string][]>(() => {
    return Object.entries(colors[category]).filter(
      ([property]) => property !== 'DEFAULT',
    )
  }, [category])

  return (
    <div className="flex w-[240px] flex-col gap-y-2">
      <SubHeading>{title}</SubHeading>
      <div>
        {scales.map(([property, rawValue]) => {
          const bgClassName = `bg-${category}-${property}`
          const hex = resolveCssVar(rawValue)
          const rgbSum = hexToRgbSum(hex)
          const shouldShowDarkText = rgbSum > 400
          return (
            <div
              key={property}
              className={classNames(
                'primary-body6 flex h-12 items-center justify-between px-4',
                bgClassName,
                shouldShowDarkText ? 'text-dark-850' : 'text-grey-0',
              )}
            >
              <span>{property}</span>
              <span>{hex}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
