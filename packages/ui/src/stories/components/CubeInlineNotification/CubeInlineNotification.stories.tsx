import type { ComponentType } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  Controls,
  Description,
  Primary,
  Title,
} from '@storybook/addon-docs/blocks'
import { fn } from 'storybook/test'
import { formatUnionType } from '@internals/utils/formatType'
import { StoryLayout } from '@internals/components/StoryLayout/StoryLayout'
import { PlaygroundLayout } from '@internals/components/StoryLayout/PlaygroundLayout'
import { CubeInlineNotification } from '@components/CubeNotification/CubeInlineNotification/CubeInlineNotification'
import {
  cubeNotificationTypes,
  type CubeNotificationLink,
  type CubeNotificationType,
} from '@components/CubeNotification/cubeNotificationTypes'
import { InlineNotificationRow } from './InlineNotificationRow'
import {
  createLink,
  longNotificationContent,
  notificationContent,
  notificationTitle,
} from './mockData'

const CubeInlineNotificationDocs = () => {
  return (
    <>
      <Title />
      <Description />
      <Primary />
      <Controls />
    </>
  )
}

// One-to-one with CubeInlineNotificationProps. `children` is the content
// text; any ReactNode works, a string is enough to demo it.
type CubeInlineNotificationStoryArgs = {
  type?: CubeNotificationType
  title?: string
  children?: string
  link?: CubeNotificationLink
  onClose?: () => void
  isClosable?: boolean
  isLoading?: boolean
  className?: string
  skeletonClassName?: string
}

const meta: Meta<CubeInlineNotificationStoryArgs> = {
  title: 'Molecules/Inline Notification',
  component:
    CubeInlineNotification as ComponentType<CubeInlineNotificationStoryArgs>,
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
    docs: {
      description: {
        component:
          'A message shown inline on the page, e.g. above a form. Keep it to one line where possible. For messages that pop up and dismiss themselves, use the toast notification instead.',
      },
      page: CubeInlineNotificationDocs,
    },
  },
  argTypes: {
    type: {
      description:
        'Sets the border and background colors. Every type except `neutral` shows an icon.',
      table: { type: { summary: formatUnionType(cubeNotificationTypes) } },
      defaultValue: { summary: 'neutral' },
      control: 'select',
      options: cubeNotificationTypes,
    },
    title: {
      description: 'Bold text shown before the content.',
      table: { type: { summary: 'string' } },
      control: 'text',
    },
    children: {
      description: 'The content.',
      table: { type: { summary: 'ReactNode' } },
      control: 'text',
    },
    link: {
      description:
        'A link shown at the right. `Container` wraps it, e.g. in a router link.',
      table: {
        type: {
          summary: 'CubeNotificationLink',
          detail:
            '{ text: string; href?: string; onClick?: (e: MouseEvent<HTMLElement>) => void; className?: string; Container?: ReactElement<PropsWithChildren> }',
        },
      },
      control: 'object',
    },
    onClose: {
      description:
        'Called when the close icon is clicked. The notification then hides itself.',
      table: { type: { summary: '() => void' } },
      control: { disable: true },
    },
    isClosable: {
      description: 'Shows the close icon.',
      table: { type: { summary: 'boolean' } },
      defaultValue: { summary: 'true' },
      control: 'boolean',
    },
    isLoading: {
      description:
        'Renders a skeleton shaped like the notification (icon, title, content, link) instead.',
      table: { type: { summary: 'boolean' } },
      defaultValue: { summary: 'false' },
      control: 'boolean',
    },
    className: {
      description: 'Additional classes merged onto the notification.',
      table: { type: { summary: 'string' } },
      control: { disable: true },
    },
    skeletonClassName: {
      description: 'Additional classes merged onto the skeleton.',
      table: { type: { summary: 'string' } },
      control: { disable: true },
    },
  },
}

export default meta

type Story = StoryObj<CubeInlineNotificationStoryArgs>

export const Playground: Story = {
  tags: ['!dev'],
  decorators: [
    (Story) => (
      <PlaygroundLayout>
        <div className="w-[600px]">
          <Story />
        </div>
      </PlaygroundLayout>
    ),
  ],
  args: {
    type: 'positive',
    title: notificationTitle,
    children: notificationContent,
    link: { text: 'Go to the page', href: '/#notification' },
    onClose: fn(),
    isClosable: true,
    isLoading: false,
  },
  render: (args) => <CubeInlineNotification {...args} />,
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
      <StoryLayout title="Inline Notification">
        <StoryLayout.Section title="Types">
          <div className="flex flex-col gap-y-6">
            {cubeNotificationTypes.map((type) => (
              <InlineNotificationRow key={type} title={type}>
                <CubeInlineNotification type={type}>
                  {notificationContent}
                </CubeInlineNotification>
              </InlineNotificationRow>
            ))}
          </div>
        </StoryLayout.Section>
        <StoryLayout.Section title="Layouts">
          <div className="flex flex-col gap-y-6">
            <InlineNotificationRow title="Title only">
              <CubeInlineNotification title={notificationTitle} />
            </InlineNotificationRow>
            <InlineNotificationRow title="Title + content">
              <CubeInlineNotification title={notificationTitle}>
                {notificationContent}
              </CubeInlineNotification>
            </InlineNotificationRow>
            <InlineNotificationRow title="w/Link">
              <CubeInlineNotification
                title={notificationTitle}
                link={createLink()}
              >
                {notificationContent}
              </CubeInlineNotification>
            </InlineNotificationRow>
            <InlineNotificationRow title="Long content">
              <CubeInlineNotification link={createLink()}>
                {longNotificationContent}
              </CubeInlineNotification>
            </InlineNotificationRow>
            <InlineNotificationRow title="Not closable">
              <CubeInlineNotification isClosable={false}>
                {notificationContent}
              </CubeInlineNotification>
            </InlineNotificationRow>
          </div>
        </StoryLayout.Section>
        <StoryLayout.Section title="Skeleton">
          <div className="flex flex-col gap-y-6">
            <InlineNotificationRow title="Title only">
              <CubeInlineNotification.Skeleton hasTitle />
            </InlineNotificationRow>
            <InlineNotificationRow title="Title + content">
              <CubeInlineNotification.Skeleton hasTitle hasSubtitle />
            </InlineNotificationRow>
            <InlineNotificationRow title="w/Link">
              <CubeInlineNotification.Skeleton hasTitle hasSubtitle hasLink />
            </InlineNotificationRow>
            <InlineNotificationRow title="w/Icon">
              <CubeInlineNotification.Skeleton
                hasIcon
                hasTitle
                hasSubtitle
                hasLink
              />
            </InlineNotificationRow>
          </div>
        </StoryLayout.Section>
      </StoryLayout>
    )
  },
}
