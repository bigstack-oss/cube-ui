import type { ComponentType, PropsWithChildren, ReactNode } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  Controls,
  Description,
  Primary,
  Subheading,
  Title,
} from '@storybook/addon-docs/blocks'
import { noop } from 'lodash'
import { StoryLayout } from '@internals/components/StoryLayout/StoryLayout'
import { PlaygroundLayout } from '@internals/components/StoryLayout/PlaygroundLayout'
import { CubeBackButton } from '@components/CubeBackButton/CubeBackButton'
import { CubeLoadingSpinner } from '@components/CubeLoadingSpinner'
import { CubeSkeleton } from '@components/CubeSkeleton'
import { BackButtonRow } from './BackButtonRow'

const CubeBackButtonDocs = () => {
  return (
    <>
      <Title />
      <Description />
      <Primary />
      <Subheading>CubeBackButton</Subheading>
      <Controls
        include={[
          'children',
          'isLoading',
          'href',
          'onClick',
          'backButtonContainer',
          'titleRightContent',
          'titleBottomContent',
        ]}
      />
      <Subheading>CubeBackButton.BarChart</Subheading>
      <Controls include={['label', 'progress']} />
    </>
  )
}

// Root and `.BarChart` props share one Playground. `.Details` and `.Link` take
// only `children` (and link props), so they are described in `titleRightContent`.
type CubeBackButtonStoryArgs = {
  children?: string
  isLoading?: boolean
  href?: string
  onClick?: unknown
  backButtonContainer?: unknown
  titleRightContent?: unknown
  titleBottomContent?: unknown
  label?: string
  progress?: number
}

const meta: Meta<CubeBackButtonStoryArgs> = {
  title: 'Molecules/Back Button',
  component: CubeBackButton as ComponentType<CubeBackButtonStoryArgs>,
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
    docs: {
      description: {
        component:
          'A page header with a back button and the page title. Details, links and resource usage bars can sit next to or below the title, and every part shows a skeleton while loading.',
      },
      page: CubeBackButtonDocs,
    },
  },
  argTypes: {
    children: {
      description: 'The page title.',
      table: { type: { summary: 'string' } },
      control: 'text',
    },
    isLoading: {
      description:
        'Shows skeletons for the back button, the title and the `.BarChart`, `.Details` and `.Link` members.',
      table: { type: { summary: 'boolean' } },
      defaultValue: { summary: 'false' },
      control: 'boolean',
    },
    href: {
      description:
        'Where the back button goes; the button is wrapped in an `<a>`. One of `href`, `onClick` or `backButtonContainer` is required.',
      table: { type: { summary: 'string' } },
      control: 'text',
    },
    onClick: {
      description: 'Called when the back button is clicked.',
      table: { type: { summary: '(e: MouseEvent<HTMLElement>) => void' } },
      control: { disable: true },
    },
    backButtonContainer: {
      description:
        'Wraps the back button in a custom component (for example a router link) instead of the default `<a>`.',
      table: {
        type: {
          summary: '{ Component: ComponentType<P>; props: P }',
        },
      },
      control: { disable: true },
    },
    titleRightContent: {
      description:
        'Content right of the title, such as `CubeBackButton.Details` (`children: string`), `CubeBackButton.Divider` and `CubeBackButton.Link` (`children`, `href`, `target`, `onClick`).',
      table: { type: { summary: 'ReactNode' } },
      control: { disable: true },
    },
    titleBottomContent: {
      description:
        'Content below the title, such as `CubeBackButton.BarChart` and `CubeBackButton.Divider`. Aligns the back button to the top.',
      table: { type: { summary: 'ReactNode' } },
      control: { disable: true },
    },
    label: {
      description: 'The resource name before the usage bar.',
      table: { type: { summary: 'string' } },
      control: 'text',
    },
    progress: {
      description: 'Usage in percent (0-100).',
      table: { type: { summary: 'number' } },
      control: { type: 'range', min: 0, max: 100, step: 1 },
    },
  },
}

export default meta

type Story = StoryObj<CubeBackButtonStoryArgs>

const Links = (props: { count?: 1 | 2 }) => (
  <>
    <CubeBackButton.Divider />
    <CubeBackButton.Link target="_blank" href="#">
      Grafana
    </CubeBackButton.Link>
    {props.count === 2 && (
      <>
        <CubeBackButton.Divider />
        <CubeBackButton.Link target="_blank" href="#">
          Detail Link
        </CubeBackButton.Link>
      </>
    )}
  </>
)

const MonitorLink = () => (
  <>
    <CubeBackButton.Divider />
    <CubeBackButton.Link onClick={noop}>Monitor</CubeBackButton.Link>
  </>
)

const BarCharts = (props: { withPartition?: boolean; extra?: ReactNode }) => (
  <>
    <CubeBackButton.BarChart label="CPU" progress={12} />
    <CubeBackButton.Divider />
    <CubeBackButton.BarChart label="RAM" progress={34} />
    {props.withPartition && (
      <>
        <CubeBackButton.Divider />
        <CubeBackButton.BarChart label="Partition" progress={56} />
      </>
    )}
    {props.extra && (
      <>
        <CubeBackButton.Divider />
        {props.extra}
      </>
    )}
  </>
)

const PoweringOff = () => (
  <div className="flex items-center gap-x-1.5 text-status-negative">
    <span className="secondary-body6 font-semibold">Powering Off</span>
    <CubeLoadingSpinner variant="dot45" className="text-status-negative" />
  </div>
)

const CustomBackLinkContainer = (
  props: PropsWithChildren<{ href: string }>,
) => (
  <a className="border-2 border-green-600" href={props.href} target="_blank">
    {props.children}
  </a>
)

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
    children: 'Page Title',
    isLoading: false,
    href: '#',
    label: 'CPU',
    progress: 12,
  },
  render: ({ children = '', isLoading, href, label = '', progress = 0 }) => (
    <CubeBackButton
      isLoading={isLoading}
      href={href}
      titleRightContent={
        <>
          <CubeBackButton.Details>Detail text</CubeBackButton.Details>
          <MonitorLink />
        </>
      }
      titleBottomContent={
        <>
          <CubeBackButton.BarChart label={label} progress={progress} />
          <CubeBackButton.Divider />
          <CubeBackButton.BarChart label="RAM" progress={34} />
        </>
      }
    >
      {children}
    </CubeBackButton>
  ),
}

type ExampleProps = { isLoading?: boolean }

const examples: {
  title: string
  render: (props: ExampleProps) => ReactNode
}[] = [
  {
    title: 'w/Details',
    render: ({ isLoading }) => (
      <CubeBackButton
        isLoading={isLoading}
        titleRightContent={
          <CubeBackButton.Details>Detail text</CubeBackButton.Details>
        }
        onClick={noop}
      >
        Page Title
      </CubeBackButton>
    ),
  },
  {
    title: 'w/Links',
    render: ({ isLoading }) => (
      <CubeBackButton
        isLoading={isLoading}
        titleRightContent={<Links count={2} />}
        onClick={noop}
      >
        Page Title
      </CubeBackButton>
    ),
  },
  {
    title: 'w/Bar charts',
    render: ({ isLoading }) => (
      <CubeBackButton
        isLoading={isLoading}
        titleBottomContent={<BarCharts />}
        onClick={noop}
      >
        Page Title
      </CubeBackButton>
    ),
  },
  {
    title: 'w/Link and bar charts',
    render: ({ isLoading }) => (
      <CubeBackButton
        isLoading={isLoading}
        titleRightContent={<MonitorLink />}
        titleBottomContent={<BarCharts />}
        onClick={noop}
      >
        Page Title
      </CubeBackButton>
    ),
  },
  {
    title: 'w/Link, bar charts and custom element',
    render: ({ isLoading }) => (
      <CubeBackButton
        isLoading={isLoading}
        titleRightContent={<MonitorLink />}
        titleBottomContent={
          <BarCharts
            withPartition
            extra={
              isLoading ? (
                <CubeSkeleton className="h-4 w-[83px]" />
              ) : (
                <PoweringOff />
              )
            }
          />
        }
        onClick={noop}
      >
        Page Title
      </CubeBackButton>
    ),
  },
]

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
  render: () => (
    <StoryLayout title="Back Button">
      <StoryLayout.Section title="States">
        <div className="flex flex-col gap-y-8">
          <BackButtonRow title="Default">
            <CubeBackButton onClick={noop}>Page Title</CubeBackButton>
          </BackButtonRow>
        </div>
      </StoryLayout.Section>
      <StoryLayout.Section title="Layouts">
        <div className="flex flex-col gap-y-8">
          {examples.map((example) => (
            <BackButtonRow key={example.title} title={example.title}>
              {example.render({})}
            </BackButtonRow>
          ))}
          <BackButtonRow title="w/Custom back button container">
            <CubeBackButton
              backButtonContainer={{
                Component: CustomBackLinkContainer,
                props: { href: '#' },
              }}
            >
              Custom Back Button Container
            </CubeBackButton>
          </BackButtonRow>
        </div>
      </StoryLayout.Section>
      <StoryLayout.Section title="Skeleton">
        <div className="flex flex-col gap-y-8">
          {examples.map((example) => (
            <BackButtonRow key={example.title} title={example.title}>
              {example.render({ isLoading: true })}
            </BackButtonRow>
          ))}
        </div>
      </StoryLayout.Section>
    </StoryLayout>
  ),
}
