import type { ReactNode } from 'react'
import { cva } from 'class-variance-authority'
import { INTERNAL_StorySection } from './InternalStorySection'
import { twMerge } from 'tailwind-merge'

const storyLayout = cva('p-12 flex min-h-screen flex-col', {
  variants: {
    useSceneBgColor: {
      true: 'bg-scene-background',
    },
  },
})

export type StoryLayoutProps = {
  title: string
  desc?: string
  useSceneBgColor?: boolean
  children: ReactNode
}

export const StoryLayout = (props: StoryLayoutProps) => {
  const { title, desc, useSceneBgColor = false, children } = props

  return (
    <section className={twMerge(storyLayout({ useSceneBgColor }))}>
      <div className="mb-24 gap-y-4 flex flex-col">
        <h2 className="secondary-h2 text-6xl text-neutral-900">{title}</h2>
        {desc && <p className="primary-body1 text-dark-300">{desc}</p>}
      </div>
      <div className="gap-y-24 flex flex-col">{children}</div>
    </section>
  )
}

StoryLayout.Section = INTERNAL_StorySection
