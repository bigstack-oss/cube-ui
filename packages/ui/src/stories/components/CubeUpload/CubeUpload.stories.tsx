import type { ComponentType } from 'react'
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
import { CubeUpload } from '@components/CubeUpload/CubeUpload'
import type {
  CubeUploadErrorProps,
  CubeUploadFileProps,
  CubeUploadProgressBarProps,
  CubeUploadProps,
} from '@components/CubeUpload/cubeUploadTypes'
import { UploadRow } from './UploadRow'
import { ModalExample, SimulatedUpload } from './uploadExamples'
import { mockFileName, mockSlots } from './uploadMockData'

const CubeUploadDocs = () => (
  <>
    <Title />
    <Description />
    <Primary />
    <Subheading>CubeUpload</Subheading>
    <Controls
      include={[
        'buttonText',
        'isUploading',
        'disabled',
        'accept',
        'inputId',
        'leftSlot',
        'rightSlot',
        'className',
        'children',
        'onFileChange',
      ]}
    />
    <Subheading>CubeUpload.ProgressBar</Subheading>
    <Controls include={['fileName', 'progress', 'onAbortClick']} />
    <Subheading>CubeUpload.File</Subheading>
    <Controls include={['onCancel']} />
    <Subheading>CubeUpload.Error</Subheading>
    <Controls include={['message', 'onClose']} />
  </>
)

// Root props, then each member's: `.File`'s `disabled` and `children` share
// names with the root's, so only its `onCancel` is listed.
type CubeUploadStoryArgs = CubeUploadProps &
  Partial<
    Pick<CubeUploadProgressBarProps, 'fileName' | 'progress' | 'onAbortClick'> &
      Pick<CubeUploadFileProps, 'onCancel'> &
      Pick<CubeUploadErrorProps, 'message' | 'onClose'>
  >

const meta: Meta<CubeUploadStoryArgs> = {
  title: 'Organisms/Upload',
  component: CubeUpload as ComponentType<CubeUploadStoryArgs>,
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
    docs: {
      description: {
        component:
          "A button that picks a file, with slots next to it and room below for the upload: `CubeUpload.ProgressBar` while uploading, `CubeUpload.File` once done, and `CubeUpload.Error` when it fails. The same file can be picked again.\n\n**Test IDs:** `data-testid` goes on the wrapper; its parts get `<test-id>-button`, `-input` (the hidden file input: fill it with Playwright's `setInputFiles`), `-file` (with `-file-cancel`), `-progress` (with `-progress-abort`) and `-error` (with `-error-close`). See Overview / Test IDs.",
      },
      page: CubeUploadDocs,
    },
  },
  argTypes: {
    buttonText: {
      description: 'Text of the upload button.',
      table: { type: { summary: 'string' } },
      control: 'text',
    },
    isUploading: {
      description:
        'Shows the button as loading and blocks picking a file. The Playground shows `.ProgressBar` while it is on, `.File` otherwise.',
      table: { type: { summary: 'boolean' } },
      defaultValue: { summary: 'false' },
      control: 'boolean',
    },
    disabled: {
      description:
        'Disables the button and the input. The Playground passes it to `.File` too, which greys out and stops cancelling.',
      table: { type: { summary: 'boolean' } },
      defaultValue: { summary: 'false' },
      control: 'boolean',
    },
    accept: {
      description: 'Accepted file types, as in `<input type="file" accept>`.',
      table: { type: { summary: 'string' } },
      control: 'text',
    },
    inputId: {
      description: '`id` of the hidden file input.',
      table: { type: { summary: 'string' } },
      control: { disable: true },
    },
    leftSlot: {
      description: 'Content next to the upload button.',
      table: { type: { summary: 'ReactNode' } },
      control: { disable: true },
    },
    rightSlot: {
      description: 'Content on the right of the button row.',
      table: { type: { summary: 'ReactNode' } },
      control: { disable: true },
    },
    className: {
      description: 'Additional classes merged onto the root.',
      table: { type: { summary: 'string' } },
      control: { disable: true },
    },
    children: {
      description:
        'Shown below the button row: `CubeUpload.ProgressBar`, `CubeUpload.File` or `CubeUpload.Error`.',
      table: { type: { summary: 'ReactNode' } },
      control: { disable: true },
    },
    onFileChange: {
      description: 'Called with the picked file (`null` if none).',
      table: {
        type: { summary: '(file: File | null) => void | Promise<void>' },
      },
      control: { disable: true },
    },
    fileName: {
      description: 'The file being uploaded.',
      table: { type: { summary: 'string' } },
      control: 'text',
    },
    progress: {
      description: 'Upload progress in percent (0-100).',
      table: { type: { summary: 'number' } },
      control: { type: 'range', min: 0, max: 100, step: 1 },
    },
    onAbortClick: {
      description: 'Called when the × is clicked.',
      table: { type: { summary: '() => void' } },
      control: { disable: true },
    },
    onCancel: {
      description:
        'Called when the × is clicked to remove the file; not while disabled.',
      table: { type: { summary: '() => void' } },
      control: { disable: true },
    },
    message: {
      description: 'The error message; the Playground shows `.Error` when set.',
      table: { type: { summary: 'string' } },
      control: 'text',
    },
    onClose: {
      description: 'Called when the close button is clicked.',
      table: { type: { summary: '() => void' } },
      control: { disable: true },
    },
  },
}

export default meta

type Story = StoryObj<CubeUploadStoryArgs>

export const Playground: Story = {
  tags: ['!dev'],
  decorators: [
    (Story) => (
      <PlaygroundLayout>
        <div className="w-[720px]">
          <Story />
        </div>
      </PlaygroundLayout>
    ),
  ],
  args: {
    buttonText: 'Upload File',
    isUploading: false,
    disabled: false,
    fileName: mockFileName,
    progress: 40,
    message: '',
  },
  render: ({
    buttonText,
    isUploading,
    disabled,
    accept,
    fileName = '',
    progress = 0,
    message,
  }) => (
    <CubeUpload
      buttonText={buttonText}
      isUploading={isUploading}
      disabled={disabled}
      accept={accept}
      onFileChange={noop}
      {...mockSlots}
    >
      {isUploading ? (
        <CubeUpload.ProgressBar
          fileName={fileName}
          progress={progress}
          onAbortClick={noop}
        />
      ) : (
        <CubeUpload.File disabled={disabled} onCancel={noop}>
          {mockFileName}
        </CubeUpload.File>
      )}
      {message && <CubeUpload.Error message={message} onClose={noop} />}
    </CubeUpload>
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
  render: () => (
    <StoryLayout title="Upload">
      <StoryLayout.Section title="States">
        <div className="flex flex-col gap-y-10">
          <UploadRow title="Uploading">
            <CubeUpload buttonText="Upload file" {...mockSlots} isUploading>
              <CubeUpload.ProgressBar
                fileName={mockFileName}
                progress={87}
                onAbortClick={noop}
              />
            </CubeUpload>
          </UploadRow>
          <UploadRow title="Uploaded">
            <CubeUpload buttonText="Upload file" {...mockSlots}>
              <CubeUpload.File onCancel={noop}>{mockFileName}</CubeUpload.File>
            </CubeUpload>
          </UploadRow>
          <UploadRow title="Error">
            <CubeUpload buttonText="Upload file" {...mockSlots}>
              <CubeUpload.Error
                message={`Failed to upload ${mockFileName}, reason: Something went wrong.`}
              />
            </CubeUpload>
          </UploadRow>
          <UploadRow title="Disabled">
            <CubeUpload buttonText="Upload file" {...mockSlots} disabled>
              <CubeUpload.File disabled onCancel={noop}>
                {mockFileName}
              </CubeUpload.File>
            </CubeUpload>
          </UploadRow>
        </div>
      </StoryLayout.Section>
      <StoryLayout.Section title="Layouts">
        <div className="flex flex-col gap-y-10">
          <UploadRow title="Default">
            <SimulatedUpload />
          </UploadRow>
          <UploadRow title="w/Slots">
            <SimulatedUpload withSlots />
          </UploadRow>
        </div>
      </StoryLayout.Section>
      <StoryLayout.Section title="In a Modal">
        <div className="flex flex-col gap-y-10">
          <UploadRow title="Default">
            <ModalExample defaultIsTesting={false} defaultIsUploaded={false} />
          </UploadRow>
          <UploadRow title="Uploaded">
            <ModalExample defaultIsTesting={false} defaultIsUploaded />
          </UploadRow>
          <UploadRow title="Testing">
            <ModalExample defaultIsTesting defaultIsUploaded />
          </UploadRow>
        </div>
      </StoryLayout.Section>
    </StoryLayout>
  ),
}
