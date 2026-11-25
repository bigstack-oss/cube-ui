import { MonochromeHyperlink } from '@icons'
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
>

export const CubeSideBarBottom = (props: CubeSideBarBottomProps) => {
  const { isLoading = false, utcTimeZone, links = [] } = props

  return (
    <div className={bottom()}>
      <CubeSideBarTimeZone isLoading={isLoading} utcTimeZone={utcTimeZone} />
      <CubeSideBarDivider />
      <CubeSideBarBlock className={linksStyle()}>
        {links.map(({ text, href }) => (
          <a key={text} className={link()} href={href} target="_blank">
            {text}
            <MonochromeHyperlink className={linkIcon()} />
          </a>
        ))}
        <div className={copyright()}>Copyright©Bigstack</div>
      </CubeSideBarBlock>
    </div>
  )
}
