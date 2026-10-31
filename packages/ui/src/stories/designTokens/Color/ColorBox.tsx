import classNames from 'classnames'
import { useContext, useMemo } from 'react'
import { PinnedThemeContext, resolveThemeColor } from './utils'

export type ColorBoxProps = {
  colorName: string
  bgClassName: string
}

export const ColorBox = (props: ColorBoxProps) => {
  const { colorName, bgClassName } = props

  const theme = useContext(PinnedThemeContext)

  const hex = useMemo<string | undefined>(() => {
    return resolveThemeColor(bgClassName, theme)
  }, [bgClassName, theme])

  return (
    <div className="flex flex-col gap-y-2">
      <div className={classNames('h-[60px] w-[140px] rounded', bgClassName)} />
      <div>
        <p className="primary-body2 font-medium text-functional-text">
          {colorName}
        </p>
        {hex && (
          <p className="primary-body2 text-functional-text-light">{hex}</p>
        )}
      </div>
    </div>
  )
}
