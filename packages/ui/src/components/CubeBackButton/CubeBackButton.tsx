import { useMemo, type PropsWithChildren } from 'react'
import { CubeBackButtonBackLink } from './CubeBackButtonBackLink'
import { CubeBackButtonBarChart } from './CubeBackButtonBarChart'
import { CubeBackButtonContext } from './cubeBackButtonContext'
import { CubeBackButtonDetails } from './CubeBackButtonDetails'
import { CubeBackButtonDivider } from './CubeBackButtonDivider'
import { CubeBackButtonLink } from './CubeBackButtonLink'
import { backButton, titleColumn, titleRow } from './cubeBackButtonStyles'
import { CubeBackButtonTitle } from './CubeBackButtonTitle'
import type { CubeBackButtonProps } from './cubeBackButtonTypes'

export const CubeBackButton = <
  ContainerProps extends PropsWithChildren = PropsWithChildren,
>(
  props: CubeBackButtonProps<ContainerProps>,
) => {
  const {
    children,
    isLoading = false,
    titleRightContent,
    titleBottomContent,
    href,
    onClick,
    backButtonContainer,
    'data-testid': testIdProp,
  } = props

  const testId = testIdProp || undefined

  const contextValue = useMemo(
    () => ({ isLoading, testId }),
    [isLoading, testId],
  )

  return (
    <CubeBackButtonContext.Provider value={contextValue}>
      <div
        className={backButton({
          // TODO: Find a better way to check if `titleBottomContent` renders
          // empty, instead of relying on the React node's value.
          hasBottomContent: Boolean(titleBottomContent),
        })}
        data-testid={testId}
      >
        <CubeBackButtonBackLink
          href={href}
          onClick={onClick}
          backButtonContainer={backButtonContainer}
        />
        <div className={titleColumn()}>
          <div className={titleRow()}>
            <CubeBackButtonTitle>{children}</CubeBackButtonTitle>
            {titleRightContent}
          </div>
          {titleBottomContent && (
            <div className={titleRow()}>{titleBottomContent}</div>
          )}
        </div>
      </div>
    </CubeBackButtonContext.Provider>
  )
}

CubeBackButton.BarChart = CubeBackButtonBarChart
CubeBackButton.Details = CubeBackButtonDetails
CubeBackButton.Divider = CubeBackButtonDivider
CubeBackButton.Link = CubeBackButtonLink
