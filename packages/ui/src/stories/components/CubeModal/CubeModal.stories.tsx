import type { ComponentType } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  Controls,
  Description,
  Primary,
  Title,
} from '@storybook/addon-docs/blocks'
import { useArgs } from 'storybook/preview-api'
import { fn } from 'storybook/test'
import { formatUnionType } from '@internals/utils/formatType'
import { StoryLayout } from '@internals/components/StoryLayout/StoryLayout'
import { PlaygroundLayout } from '@internals/components/StoryLayout/PlaygroundLayout'
import { CubeButton } from '@components/CubeButton/CubeButton'
import { CubeModal } from '@components/CubeModal/CubeModal'
import {
  cubeModalSizes,
  type CubeModalProps,
} from '@components/CubeModal/cubeModalTypes'
import { ModalRow } from './ModalRow'
import {
  checkboxesContent,
  customFooter,
  inputContent,
  longFooterMessage,
  modalText,
  multipleInputsContent,
  shortFooterMessage,
} from './modalContent'

const CubeModalDocs = () => {
  return (
    <>
      <Title />
      <Description />
      <Primary />
      <Controls />
    </>
  )
}

const meta: Meta<CubeModalProps> = {
  title: 'Organisms/Modal',
  component: CubeModal as ComponentType<CubeModalProps>,
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
    docs: {
      description: {
        component:
          'A dialog shown over the page, with a title, a scrollable body, and Cancel / action buttons. It closes on the close icon, Cancel, a backdrop click, or Esc (Esc first blurs a focused input). It stays mounted while closed and fades in and out.',
      },
      page: CubeModalDocs,
    },
  },
  argTypes: {
    children: {
      description: 'The modal body. It scrolls when taller than the modal.',
      table: { type: { summary: 'ReactNode' } },
      control: 'text',
    },
    size: {
      description: 'The modal width: `sm` is 40% and `md` 70% of the viewport.',
      table: { type: { summary: formatUnionType(cubeModalSizes) } },
      defaultValue: { summary: 'md' },
      control: 'select',
      options: cubeModalSizes,
    },
    isOpen: {
      description: 'Whether the modal is shown.',
      table: { type: { summary: 'boolean' } },
      control: 'boolean',
    },
    title: {
      description: 'The header title.',
      table: { type: { summary: 'string' } },
      control: 'text',
    },
    footerMessage: {
      description:
        'Shown at the left of the footer. A string gets the default text style; any other node renders as-is.',
      table: { type: { summary: 'ReactNode' } },
      control: 'text',
    },
    isActionButtonVisible: {
      description: 'Shows the action button.',
      table: { type: { summary: 'boolean' } },
      defaultValue: { summary: 'true' },
      control: 'boolean',
    },
    actionText: {
      description: 'The action button text.',
      table: { type: { summary: 'string' } },
      defaultValue: { summary: 'Action (translated)' },
      control: 'text',
    },
    actionButtonProps: {
      description: 'Passed to the action button.',
      table: {
        type: {
          summary: "Pick<CubeButtonProps, 'loading' | 'disabled'>",
          detail: '{ loading?: boolean; disabled?: boolean }',
        },
      },
      control: 'object',
    },
    isCancelButtonVisible: {
      description: 'Shows the Cancel button.',
      table: { type: { summary: 'boolean' } },
      defaultValue: { summary: 'true' },
      control: 'boolean',
    },
    cancelButtonProps: {
      description: 'Passed to the Cancel button.',
      table: {
        type: {
          summary: "Pick<CubeButtonProps, 'disabled'>",
          detail: '{ disabled?: boolean }',
        },
      },
      control: 'object',
    },
    bodyRef: {
      description: 'A ref to the body container, e.g. to scroll it.',
      table: { type: { summary: 'RefObject<HTMLDivElement | null>' } },
      control: { disable: true },
    },
    onActionClick: {
      description: 'Called when the action button is clicked.',
      table: { type: { summary: '() => void' } },
      control: { disable: true },
    },
    onCloseClick: {
      description:
        'Called on the close icon, Cancel, a backdrop click, or Esc. The caller sets `isOpen` to false.',
      table: { type: { summary: '() => void' } },
      control: { disable: true },
    },
    className: {
      description:
        'Additional classes merged onto the modal panel, e.g. a custom width or height.',
      table: { type: { summary: 'string' } },
      control: { disable: true },
    },
  },
}

export default meta

type Story = StoryObj<CubeModalProps>

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
    children: modalText,
    size: 'md',
    isOpen: false,
    title: 'Delete resource',
    footerMessage: shortFooterMessage,
    isActionButtonVisible: true,
    actionText: 'Delete',
    actionButtonProps: { loading: false, disabled: false },
    isCancelButtonVisible: true,
    cancelButtonProps: { disabled: false },
    onActionClick: fn(),
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs()

    const close = () => updateArgs({ isOpen: false })

    return (
      <>
        <CubeButton
          usage="text-only"
          onClick={() => updateArgs({ isOpen: true })}
        >
          Open modal
        </CubeButton>
        <CubeModal
          {...args}
          onActionClick={() => {
            args.onActionClick?.()
            close()
          }}
          onCloseClick={close}
        />
      </>
    )
  },
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
      <StoryLayout title="Modal">
        <StoryLayout.Section title="Sizes">
          <div className="flex flex-col gap-y-4">
            {cubeModalSizes.map((size) => (
              <ModalRow
                key={size}
                title={size}
                size={size}
                content={`This is a ${size} modal.`}
              />
            ))}
          </div>
        </StoryLayout.Section>
        <StoryLayout.Section title="Layouts">
          <div className="flex flex-col gap-y-4">
            <ModalRow title="Default" content={modalText} />
            <ModalRow title="w/Input" content={inputContent} />
            <ModalRow
              title="w/Multiple Inputs"
              content={multipleInputsContent}
            />
            <ModalRow
              title="w/Checkboxes"
              content={checkboxesContent}
              actionText="Add Attribute"
            />
            <ModalRow
              title="w/Footer Message"
              content={modalText}
              footerMessage={shortFooterMessage}
            />
            <ModalRow
              title="w/Long Footer Message"
              content={modalText}
              footerMessage={longFooterMessage}
            />
            <ModalRow
              title="w/Custom Footer"
              content={modalText}
              footerMessage={customFooter}
            />
          </div>
        </StoryLayout.Section>
        <StoryLayout.Section title="Overflow">
          <div className="flex flex-col gap-y-4">
            <ModalRow
              title="sm, x-axis"
              size="sm"
              content={
                <div className="w-[150dvw]">
                  This container overflows on the x-axis.
                </div>
              }
            />
            <ModalRow
              title="sm, y-axis"
              size="sm"
              content={
                <div className="h-[150dvh]">
                  This container overflows on the y-axis.
                </div>
              }
            />
            <ModalRow
              title="md, both axes"
              size="md"
              content={
                <div className="h-[150dvh] w-[150dvw]">
                  This container overflows on both axes.
                </div>
              }
            />
          </div>
        </StoryLayout.Section>
        <StoryLayout.Section title="Custom Size">
          <div className="flex flex-col gap-y-4">
            <ModalRow
              title="Custom height"
              size="sm"
              content="This is a custom height modal."
              // The default max height is `calc(100dvh - 80px)`, so it is
              // overridden too to reach 780px.
              className="h-[780px] max-h-screen"
            />
            <ModalRow
              title="Custom width"
              size="sm"
              content="This is a custom width modal."
              className="min-w-[min(1000px,_100dvw)]"
            />
          </div>
        </StoryLayout.Section>
      </StoryLayout>
    )
  },
}
