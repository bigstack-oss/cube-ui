import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  Controls,
  Description,
  Primary,
  Title,
} from '@storybook/addon-docs/blocks'
import { formatUnionType } from '@internals/utils/formatType'
import { CaptionText } from '@internals/components/CaptionText'
import { StoryLayout } from '@internals/components/StoryLayout/StoryLayout'
import { PlaygroundLayout } from '@internals/components/StoryLayout/PlaygroundLayout'
import { CubeToastProvider } from '@components/CubeNotification/CubeToast/CubeToastProvider'
import {
  MAX_VISIBLE_TOASTS_AMOUNT,
  TOAST_LIFETIME,
  type CubeToastType,
} from '@components/CubeNotification/CubeToast/cubeToastUtils'
import { cubeNotificationTypes } from '@components/CubeNotification/cubeNotificationTypes'
import { CreateToastButton } from './CreateToastButton'
import { StaticToast, ToastRow } from './ToastRow'
import { toastLink, toastMessage, toastTime, toastTitle } from './mockData'

const CubeToastDocs = () => {
  return (
    <>
      <Title />
      <Description />
      <Primary />
      <Controls />
    </>
  )
}

// The fields of `CubeToastType` you pass to `addToast`. `id` is generated
// when the toast is shown, so it is not a control.
type CubeToastStoryArgs = Omit<CubeToastType, 'id'>

const meta: Meta<CubeToastStoryArgs> = {
  title: 'Molecules/Toast Notification',
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <CubeToastProvider>
        <Story />
      </CubeToastProvider>
    ),
  ],
  parameters: {
    controls: { expanded: true },
    docs: {
      description: {
        component: `A notification that pops up at the bottom right and closes itself. Wrap the app in \`CubeToastProvider\`, then call \`useCubeToast().addToast(toast)\` with the fields below plus a unique \`id\`; call \`removeToast(id)\` to close one from code. At most ${MAX_VISIBLE_TOASTS_AMOUNT} toasts are shown at once, each for ${TOAST_LIFETIME / 1000} seconds; adding more removes the oldest.`,
      },
      page: CubeToastDocs,
    },
  },
  argTypes: {
    type: {
      description:
        'Sets the border and background colors. With a `title`, every type except `neutral` shows an icon.',
      table: { type: { summary: formatUnionType(cubeNotificationTypes) } },
      defaultValue: { summary: 'neutral' },
      control: 'select',
      options: cubeNotificationTypes,
    },
    title: {
      description: 'Bold heading. The type icon is shown next to it.',
      table: { type: { summary: 'string' } },
      control: 'text',
    },
    message: {
      description: 'The message.',
      table: { type: { summary: 'string' } },
      control: 'text',
    },
    link: {
      description:
        'A link shown at the bottom left. `Container` wraps it, e.g. in a router link.',
      table: {
        type: {
          summary: 'CubeNotificationLink',
          detail:
            '{ text: string; href?: string; onClick?: (e: MouseEvent<HTMLElement>) => void; className?: string; Container?: ReactElement<PropsWithChildren> }',
        },
      },
      control: 'object',
    },
    time: {
      description: 'Time text shown at the bottom right.',
      table: { type: { summary: 'string' } },
      control: 'text',
    },
  },
}

export default meta

type Story = StoryObj<CubeToastStoryArgs>

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
    type: 'positive',
    title: toastTitle,
    message: toastMessage,
    link: toastLink,
    time: toastTime,
  },
  render: (args) => <StaticToast {...args} id="playground-preview" />,
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
      <StoryLayout title="Toast Notification">
        <StoryLayout.Section title="Types">
          <div className="flex flex-col gap-y-6">
            {cubeNotificationTypes.map((type) => (
              <ToastRow key={type} title={type}>
                <StaticToast
                  id={`types-${type}`}
                  type={type}
                  title={toastTitle}
                  message={toastMessage}
                  time={toastTime}
                />
              </ToastRow>
            ))}
          </div>
        </StoryLayout.Section>
        <StoryLayout.Section title="Layouts">
          <div className="flex flex-col gap-y-6">
            <ToastRow title="Message only">
              <StaticToast
                id="layouts-message"
                type="positive"
                message={toastMessage}
                time={toastTime}
              />
            </ToastRow>
            <ToastRow title="w/Title">
              <StaticToast
                id="layouts-title"
                type="positive"
                title={toastTitle}
                message={toastMessage}
                time={toastTime}
              />
            </ToastRow>
            <ToastRow title="w/Link">
              <StaticToast
                id="layouts-link"
                type="positive"
                message={toastMessage}
                link={toastLink}
                time={toastTime}
              />
            </ToastRow>
            <ToastRow title="w/Title + Link">
              <StaticToast
                id="layouts-title-link"
                type="positive"
                title={toastTitle}
                message={toastMessage}
                link={toastLink}
                time={toastTime}
              />
            </ToastRow>
          </div>
        </StoryLayout.Section>
        <StoryLayout.Section title="Toast Queue">
          <ToastRow title="Live">
            <div className="flex flex-col items-start gap-3">
              <CreateToastButton />
              <CaptionText>
                {`Shows toasts at the bottom right: at most ${MAX_VISIBLE_TOASTS_AMOUNT} at once, each for ${TOAST_LIFETIME / 1000} seconds. Adding more removes the oldest.`}
              </CaptionText>
            </div>
          </ToastRow>
        </StoryLayout.Section>
      </StoryLayout>
    )
  },
}
