import { MonochromeHyperlink } from '@icons'
import { testIdOf } from '@utils/testId'
import { CubeSideBarBlock } from './CubeSideBarBlock'
import { CubeSideBarDivider } from './CubeSideBarDivider'
import {
  bottom,
  copyright,
  link,
  linkIcon,
  links as linksStyle,
} from './cubeSideBarStyles'
import { CubeSideBarTimeZone } from './CubeSideBarTimeZone'
import type { CubeSideBarProps } from './cubeSideBarTypes'

type CubeSideBarBottomProps = Pick<
  CubeSideBarProps,
  'isLoading' | 'utcTimeZone' | 'links'
> & {
  testId?: string
}

export const CubeSideBarBottom = (props: CubeSideBarBottomProps) => {
  const { isLoading = false, utcTimeZone, links = [], testId } = props

  return (
    <div className={bottom()}>
      <CubeSideBarTimeZone isLoading={isLoading} utcTimeZone={utcTimeZone} />
      <CubeSideBarDivider />
      <CubeSideBarBlock className={linksStyle()}>
        {links.map(({ text, href, 'data-key': testKey }) => (
          <a
            key={text}
            className={link()}
            href={href}
            target="_blank"
            data-testid={testIdOf(testId, 'link')}
            data-key={testId ? (testKey ?? text) : undefined}
          >
            {text}
            <MonochromeHyperlink className={linkIcon()} />
          </a>
        ))}
        <div className={copyright()}>Copyright©Bigstack</div>
      </CubeSideBarBlock>
    </div>
  )
}
