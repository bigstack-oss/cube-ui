import { useState } from 'react'
import { CubeTabs } from '@components/CubeTabs'

type Tab = {
  label: string
  href?: string
  number: number
}

const tabs: Tab[] = [
  { label: 'Label 1', number: 2 },
  { label: 'Label 2', number: 99 },
  { label: 'Label 3', number: 100 },
  { label: 'Label with Long Text Label with Long Text', number: 2 },
]

type ControlledTabsProps = {
  disabled?: boolean
  number?: boolean
  dot?: boolean
}

export const ControlledTabs = (props: ControlledTabsProps) => {
  const { disabled, number, dot } = props
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <CubeTabs>
      {tabs.map((tab, index) => {
        const label =
          number && tab.number > 99 ? `${tab.label} (over 99)` : tab.label

        const decoration = number
          ? { number: tab.number }
          : dot
            ? { dot: true as const }
            : {}

        return (
          <CubeTabs.Tab
            key={tab.label}
            href={tab.href}
            disabled={disabled}
            isActive={activeIndex === index}
            onClick={(event) => {
              if (tab.href) event.preventDefault()
              setActiveIndex(index)
            }}
            {...decoration}
          >
            {label}
          </CubeTabs.Tab>
        )
      })}
    </CubeTabs>
  )
}
