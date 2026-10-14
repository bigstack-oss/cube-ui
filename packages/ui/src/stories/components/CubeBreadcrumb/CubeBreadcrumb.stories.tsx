import type { ComponentType } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  Controls,
  Description,
  Primary,
  Subheading,
  Title,
} from '@storybook/addon-docs/blocks'
import { StoryLayout } from '@internals/components/StoryLayout/StoryLayout'
import { PlaygroundLayout } from '@internals/components/StoryLayout/PlaygroundLayout'
import { CubeBreadcrumb } from '@components/CubeBreadcrumb/CubeBreadcrumb'
import type {
  CubeBreadcrumbItemProps,
  CubeBreadcrumbProps,
} from '@components/CubeBreadcrumb/cubeBreadcrumbTypes'
import { BreadcrumbRow } from './BreadcrumbRow'
import { items, itemsWithContainer } from './mockData'

const rootArgs = ['isLoading', 'className', 'children']
const itemArgs = ['label', 'href', 'onClick', 'itemContainer']

const CubeBreadcrumbDocs = () => {
  return (
    <>
      <Title />
      <Description />
      <Primary />
      <Subheading>CubeBreadcrumb</Subheading>
      <Controls include={rootArgs} />
      <Subheading>CubeBreadcrumb.Item</Subheading>
      <Controls include={itemArgs} />
    </>
  )
}

// Args follow the compound hierarchy: `CubeBreadcrumb`'s props, then
// `CubeBreadcrumb.Item`'s (applied to the first item, like
// CubeStepProcess.Item). The other items are static context so a full trail
// stays visible.
type CubeBreadcrumbStoryArgs = {
  // CubeBreadcrumb
  isLoading?: boolean
  className?: string
  children?: CubeBreadcrumbProps['children']
  // CubeBreadcrumb.Item
  label: string
  href?: string
  onClick?: CubeBreadcrumbItemProps['onClick']
  itemContainer?: CubeBreadcrumbItemProps['itemContainer']
}

const meta: Meta<CubeBreadcrumbStoryArgs> = {
  title: 'Molecules/Breadcrumb',
  component: CubeBreadcrumb as ComponentType<CubeBreadcrumbStoryArgs>,
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
    docs: {
      description: {
        component:
          'A trail of links showing where the current page sits in the hierarchy, ending with the current page as plain text. Up to 5 items.',
      },
      page: CubeBreadcrumbDocs,
    },
  },
  argTypes: {
    isLoading: {
      description:
        'Renders a skeleton with one placeholder per item (up to 5) instead of the trail.',
      table: { type: { summary: 'boolean' } },
      defaultValue: { summary: 'false' },
      control: 'boolean',
    },
    className: {
      description: 'Additional classes merged onto the breadcrumb container.',
      table: { type: { summary: 'string' } },
      control: { disable: true },
    },
    children: {
      description:
        'The trail, as `CubeBreadcrumb.Item` elements. More than 5 logs a warning.',
      table: { type: { summary: 'ReactElement<CubeBreadcrumbItemProps>[]' } },
      control: { disable: true },
    },
    label: {
      description: 'The item text.',
      table: { type: { summary: 'string' } },
      control: 'text',
    },
    href: {
      description:
        'Makes the item a link. Without `href`, `onClick` or `itemContainer`, the item renders as plain text (the current page).',
      table: { type: { summary: 'string' } },
      control: 'text',
    },
    onClick: {
      description: 'Called when the item is clicked; also makes it a link.',
      table: { type: { summary: '(e: MouseEvent<HTMLElement>) => void' } },
      control: { disable: true },
    },
    itemContainer: {
      description:
        'Wraps the item link in a custom component, e.g. a router link.',
      table: {
        type: {
          summary: '{ Component, props }',
          detail:
            '{ Component: ComponentType<ContainerProps>; props: ContainerProps }',
        },
      },
      control: { disable: true },
    },
  },
}

export default meta

type Story = StoryObj<CubeBreadcrumbStoryArgs>

export const Playground: Story = {
  tags: ['!dev'],
  decorators: [
    (Story) => (
      <PlaygroundLayout>
        <Story />
      </PlaygroundLayout>
    ),
  ],
  args: {
    isLoading: false,
    label: 'Breadcrumb 1',
    href: '/#1',
  },
  render: ({ isLoading, className, label, href, onClick, itemContainer }) => (
    <CubeBreadcrumb isLoading={isLoading} className={className}>
      {items.map((item, index) =>
        index === 0 ? (
          <CubeBreadcrumb.Item
            key={item.label}
            label={label}
            href={href}
            onClick={onClick}
            itemContainer={itemContainer}
          />
        ) : (
          <CubeBreadcrumb.Item key={item.label} {...item} />
        ),
      )}
    </CubeBreadcrumb>
  ),
}

export const Gallery: Story = {
  tags: ['!autodocs'],
  parameters: {
    actions: { disable: true },
    controls: { disable: true },
    interactions: { disable: true },
    options: {
      rightPanelWidth: 0,
      bottomPanelHeight: 0,
    },
  },
  render: function Render() {
    return (
      <StoryLayout title="Breadcrumb">
        <StoryLayout.Section title="Layouts">
          <div className="flex flex-col gap-y-6">
            {[1, 2, 3, 4].map((previous) => (
              <BreadcrumbRow key={previous} title={`Previous ${previous}`}>
                <CubeBreadcrumb>
                  {items.slice(4 - previous).map((item) => (
                    <CubeBreadcrumb.Item key={item.label} {...item} />
                  ))}
                </CubeBreadcrumb>
              </BreadcrumbRow>
            ))}
            <BreadcrumbRow title="Item with container and onClick">
              <CubeBreadcrumb>
                {itemsWithContainer.map((item) => (
                  <CubeBreadcrumb.Item key={item.label} {...item} />
                ))}
              </CubeBreadcrumb>
            </BreadcrumbRow>
          </div>
        </StoryLayout.Section>
        <StoryLayout.Section title="Skeleton">
          <BreadcrumbRow title="Default">
            <CubeBreadcrumb.Skeleton />
          </BreadcrumbRow>
        </StoryLayout.Section>
      </StoryLayout>
    )
  },
}
