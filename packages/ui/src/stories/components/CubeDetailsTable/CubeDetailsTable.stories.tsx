import type { ComponentType } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  Controls,
  Description,
  Subheading,
  Primary,
  Title,
} from '@storybook/addon-docs/blocks'
import { StoryLayout } from '@internals/components/StoryLayout/StoryLayout'
import { PlaygroundLayout } from '@internals/components/StoryLayout/PlaygroundLayout'
import { CubeDetailsTable } from '@components/CubeDetailsTable'
import { DetailsTableRow } from './DetailsTableRow'

const CubeDetailsTableDocs = () => {
  return (
    <>
      <Title />
      <Description />
      <Primary />
      <Subheading>CubeDetailsTable</Subheading>
      <Controls include={['header', 'children']} />
      <Subheading>CubeDetailsTable.Row</Subheading>
      <Controls include={['title']} />
    </>
  )
}

// Table and Row props share one Playground so a full table stays visible,
// but each name is a real prop: `header` and `children` on CubeDetailsTable,
// `title` on CubeDetailsTable.Row (applied to the first row). The Row's own
// `children` is left out because the table already owns that name.
type CubeDetailsTableStoryArgs = {
  header: string
  children?: unknown
  title: string
}

const mockRows = [
  { title: 'Title 1', content: 'Content 1' },
  { title: 'Title 2', content: 'Content 2' },
  { title: 'Title 3', content: 'Content 3' },
  { title: 'Title 4', content: 'Content 4' },
  { title: 'Title 5', content: 'Content 5' },
]

const meta: Meta<CubeDetailsTableStoryArgs> = {
  title: 'Organisms/Table/Details Table',
  component: CubeDetailsTable as ComponentType<CubeDetailsTableStoryArgs>,
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
    docs: {
      description: {
        component:
          'A two-column table of titles and values under a dark header, for showing the details of one item. Each `CubeDetailsTable.Row` is one title and its value.',
      },
      page: CubeDetailsTableDocs,
    },
  },
  argTypes: {
    header: {
      description: 'The header text, spanning both columns.',
      table: { type: { summary: 'string' } },
      control: 'text',
    },
    children: {
      description: 'The `CubeDetailsTable.Row` elements.',
      table: { type: { summary: 'ReactNode' } },
      control: { disable: true },
    },
    title: {
      description: 'The row title, shown in bold in the first column.',
      table: { type: { summary: 'string' } },
      control: 'text',
    },
  },
}

export default meta

type Story = StoryObj<CubeDetailsTableStoryArgs>

export const Playground: Story = {
  tags: ['!dev'],
  decorators: [
    (Story) => (
      <PlaygroundLayout>
        <div className="w-[480px]">
          <Story />
        </div>
      </PlaygroundLayout>
    ),
  ],
  args: {
    header: 'Header',
    title: 'Title 1',
  },
  // Only the first row reflects the Row control; the rest are static context.
  render: ({ header, title }) => (
    <CubeDetailsTable header={header}>
      {mockRows.map((row, index) => (
        <CubeDetailsTable.Row
          key={row.title}
          title={index === 0 ? title : row.title}
        >
          {row.content}
        </CubeDetailsTable.Row>
      ))}
    </CubeDetailsTable>
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
      <StoryLayout title="Details Table">
        <StoryLayout.Section title="Layouts">
          <div className="flex flex-col gap-y-8">
            <DetailsTableRow title="Default">
              <CubeDetailsTable header="Header">
                {mockRows.map((row) => (
                  <CubeDetailsTable.Row key={row.title} title={row.title}>
                    {row.content}
                  </CubeDetailsTable.Row>
                ))}
              </CubeDetailsTable>
            </DetailsTableRow>
            <DetailsTableRow title="Single row">
              <CubeDetailsTable header="Header">
                <CubeDetailsTable.Row title="Title 1">
                  Content 1
                </CubeDetailsTable.Row>
              </CubeDetailsTable>
            </DetailsTableRow>
            <DetailsTableRow title="Long content">
              <CubeDetailsTable header="Header">
                <CubeDetailsTable.Row title="Title 1">
                  A value longer than the table, such as a key:
                  7F3A-91C2-4D8E-B6A0-55E1-0C9F-2B7D-E4A8
                </CubeDetailsTable.Row>
                <CubeDetailsTable.Row title="Title 2">
                  Content 2
                </CubeDetailsTable.Row>
              </CubeDetailsTable>
            </DetailsTableRow>
          </div>
        </StoryLayout.Section>
      </StoryLayout>
    )
  },
}
