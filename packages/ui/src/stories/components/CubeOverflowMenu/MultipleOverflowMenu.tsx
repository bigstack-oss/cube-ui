import { MonochromeHome01 } from '@icons'
import { CubeOverflowMenu } from '@components/CubeOverflowMenu/CubeOverflowMenu'
import { OverflowMenuTrigger } from './OverflowMenuTrigger'

// Clicking an item only closes the menu in the Gallery.
const onItemClick = () => {}

export const MultipleOverflowMenu = () => {
  return (
    <CubeOverflowMenu triggerElement={<OverflowMenuTrigger />}>
      <CubeOverflowMenu.Title>Catalog Title 1</CubeOverflowMenu.Title>
      <CubeOverflowMenu.Item
        type="menu-icon"
        title="Option Title 1"
        boldTitle={true}
        subText="Subtext"
        MenuIcon={MonochromeHome01}
        onClick={onItemClick}
      />
      <CubeOverflowMenu.Item
        type="menu-icon"
        title="Option Title 2"
        subText="Subtext"
        MenuIcon={MonochromeHome01}
        onClick={onItemClick}
      />
      <CubeOverflowMenu.Item
        type="menu-icon"
        title="Option Title 3"
        subText="Subtext"
        MenuIcon={MonochromeHome01}
        disabled={true}
        onClick={onItemClick}
      />
      <CubeOverflowMenu.Divider />
      <CubeOverflowMenu.Title>Catalog Title 2</CubeOverflowMenu.Title>
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
    </CubeOverflowMenu>
  )
}
