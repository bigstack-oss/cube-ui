import { useState } from 'react'
import { MonochromePower } from '@icons'
import { CubeButton } from '@components/CubeButton/CubeButton'
import { CubeOverflowMenu } from '@components/CubeOverflowMenu/CubeOverflowMenu'

// Clicking an item only closes the menu in the Gallery.
const onItemClick = () => {}

export const ActionOverflowMenu = () => {
  const [isToggleOn, setIsToggleOn] = useState(true)

  const renderFirstSection = () => (
    <>
      <CubeOverflowMenu.Title>Catalog Title</CubeOverflowMenu.Title>
      <CubeOverflowMenu.Item
        type="plain"
        title="Option Title 1"
        boldTitle={true}
        subText="Subtext"
        onClick={onItemClick}
      />
      <CubeOverflowMenu.Item
        type="plain"
        title="Option Title 2"
        subText="Subtext"
        onClick={onItemClick}
      />
      <CubeOverflowMenu.Item
        type="plain"
        title="Option Title 3"
        subText="Subtext"
        disabled={true}
        onClick={onItemClick}
      />
    </>
  )

  const renderToggles = () => (
    <>
      <CubeOverflowMenu.Item
        type="toggle"
        title="Option Title 1"
        boldTitle={true}
        subText="Subtext"
        checked={isToggleOn}
        onCheckedChange={setIsToggleOn}
      />
      <CubeOverflowMenu.Item
        type="toggle"
        title="Option Title 2"
        subText="Subtext"
        checked={false}
        disabled={true}
      />
    </>
  )

  const renderThirdSection = () => (
    <>
      <CubeOverflowMenu.Title>Catalog Title</CubeOverflowMenu.Title>
      <CubeOverflowMenu.Item
        type="plain"
        title="Option Title 1"
        boldTitle={true}
        subText="Subtext"
        onClick={onItemClick}
      />
      <CubeOverflowMenu.Item
        type="plain"
        title="Option Title 2"
        subText="Subtext"
        onClick={onItemClick}
      />
    </>
  )

  const renderFourthSection = () => (
    <>
      <CubeOverflowMenu.Item
        type="trailing-icon"
        title="Option Title 1"
        boldTitle={true}
        TrailingIcon={MonochromePower}
        onClick={onItemClick}
      />
      <CubeOverflowMenu.Item
        type="trailing-icon"
        title="Option Title 2"
        subText="No click event attached"
        TrailingIcon={MonochromePower}
      />
      <CubeOverflowMenu.Item
        type="trailing-icon"
        title="Option Title 3"
        TrailingIcon={MonochromePower}
        disabled={true}
        onClick={onItemClick}
      />
    </>
  )

  return (
    <CubeOverflowMenu
      triggerElement={
        <CubeButton className="w-[70px]" usage="text-only">
          Action
        </CubeButton>
      }
    >
      {renderFirstSection()}
      <CubeOverflowMenu.Divider />
      {renderToggles()}
      <CubeOverflowMenu.Divider />
      {renderThirdSection()}
      <CubeOverflowMenu.Divider />
      {renderFourthSection()}
    </CubeOverflowMenu>
  )
}
