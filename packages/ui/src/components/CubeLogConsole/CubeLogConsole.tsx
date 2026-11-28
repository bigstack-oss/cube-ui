import { twMerge } from 'tailwind-merge'
import type { PropsWithClassName } from '@shared-types/react-types'
import type { CubeTestIdProps } from '@shared-types/test-id-types'
import { testIdOf } from '@utils/testId'
import { useCubeUiTranslation } from '@i18n/useCubeUiTranslation'
import { CubeHyperlink } from '../CubeHyperlink/CubeHyperlink'
import { CubeTooltip } from '../CubeTooltip/CubeTooltip'
import {
  copyButton,
  logConsole,
  logConsoleHeader,
  logConsoleLog,
} from './cubeLogConsoleStyles'

export type CubeLogConsoleProps = PropsWithClassName &
  CubeTestIdProps & {
    title?: {
      label: string
      href?: string
    }
    copyTooltip?: string
    logWrapperClassName?: string
    children: string
  }

export const CubeLogConsole = (props: CubeLogConsoleProps) => {
  const {
    title,
    copyTooltip,
    className,
    logWrapperClassName,
    children,
    'data-testid': testIdProp,
  } = props

  const testId = testIdProp || undefined

  const { t } = useCubeUiTranslation()

  const onCopyClick = () => {
    if ('navigator' in window && children) {
      window.navigator.clipboard.writeText(children)
    }
  }

  const renderTitle = () => {
    if (!title) {
      // Empty span used as a placeholder to maintain the layout.
      return <span />
    }

    if (title.href) {
      return (
        <CubeHyperlink
          variant="text-only"
          href={title.href}
          target="_blank"
          data-testid={testIdOf(testId, 'title')}
        >
          {title.label}
        </CubeHyperlink>
      )
    }
    return (
      <span
        className="primary-body2 font-medium text-primary"
        data-testid={testIdOf(testId, 'title')}
      >
        {title.label}
      </span>
    )
  }

  return (
    <div className={twMerge(logConsole(), className)} data-testid={testId}>
      <div className={logConsoleHeader()}>
        {renderTitle()}
        <CubeTooltip
          hoverContent={{
            message: copyTooltip ?? t('component.logConsole.copyDetails'),
          }}
          clickContent={{
            message: t('component.logConsole.copied'),
          }}
        >
          <button
            type="button"
            className={copyButton()}
            onClick={onCopyClick}
            data-testid={testIdOf(testId, 'copy')}
          >
            {t('component.logConsole.copy')}
          </button>
        </CubeTooltip>
      </div>
      <div
        className={twMerge(logConsoleLog(), logWrapperClassName)}
        data-testid={testIdOf(testId, 'log')}
      >
        {children}
      </div>
    </div>
  )
}
