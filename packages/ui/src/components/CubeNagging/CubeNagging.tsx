import { isArray } from 'lodash'
import { twMerge } from 'tailwind-merge'
import {
  MonochromeWarningAltFilled,
  MonochromeWarningFilled,
  MonochromeXSmall,
} from '@icons'
import { CubeHyperlink } from '../CubeHyperlink/CubeHyperlink'
import type { SvgElement } from '../CubeIcon/cubeIconTypes'
import type { CubeNaggingProps, CubeNaggingType } from './cubeNaggingTypes'
import { nagging } from './cubeNaggingStyles'

const descriptionContainerClass = twMerge('primary-body4 text-functional-text')
const typeIconBaseClass = twMerge('icon-md shrink-0')
const typeIcons: Record<CubeNaggingType, SvgElement> = {
  error: (
    <MonochromeWarningFilled
      className={twMerge(typeIconBaseClass, 'text-status-negative')}
    />
  ),
  warning: (
    <MonochromeWarningAltFilled
      className={twMerge(typeIconBaseClass, 'text-status-warning')}
    />
  ),
}

export const CubeNagging = (props: CubeNaggingProps) => {
  const { className, type, variant, title, titleClassName, description, link } =
    props

  const isVariantSidebar = variant === 'sidebar'

  const icon = typeIcons[type]

  const renderTitle = () => {
    const titleElement = (
      <div
        className={twMerge(
          'primary-body4 font-semibold text-functional-title',
          titleClassName,
        )}
      >
        {title}
      </div>
    )

    if (!isVariantSidebar) {
      const { link } = props
      return (
        <div className="flex flex-wrap items-center gap-2">
          {titleElement}
          {link && (
            <CubeHyperlink
              variant="text-inline"
              size="sm"
              href={link.href}
              onClick={link.onClick}
            >
              {link.text}
            </CubeHyperlink>
          )}
        </div>
      )
    } else {
      return titleElement
    }
  }

  const renderCloseIcon = () => {
    if (isVariantSidebar) {
      return undefined
    }

    const { onClose } = props

    if (!onClose) {
      return null
    }

    return (
      <MonochromeXSmall
        className="icon-md cursor-pointer text-functional-text"
        onClick={onClose}
      />
    )
  }

  const renderDescription = () => {
    if (!description) {
      return null
    }

    const renderSingleDescription = (description?: string) => {
      if (!description) {
        return null
      }

      return <div className={descriptionContainerClass}>{description}</div>
    }

    const renderDescriptionList = (description: string[]) => {
      if (description.length === 1) {
        return renderSingleDescription(description[0])
      }

      return (
        <div className={descriptionContainerClass}>
          <ul className="list-outside list-disc pl-4">
            {description.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      )
    }

    return isArray(description)
      ? renderDescriptionList(description)
      : renderSingleDescription(description)
  }

  const renderBottomLink = () => {
    if (isVariantSidebar) {
      return (
        link && (
          <CubeHyperlink
            variant="text-inline"
            size="sm"
            href={link.href}
            onClick={link.onClick}
          >
            {link.text}
          </CubeHyperlink>
        )
      )
    }
    return undefined
  }

  return (
    <div className={twMerge(nagging({ type }), className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-start gap-2">
          {icon}
          {renderTitle()}
        </div>
        {renderCloseIcon()}
      </div>
      {renderDescription()}
      {renderBottomLink()}
    </div>
  )
}
