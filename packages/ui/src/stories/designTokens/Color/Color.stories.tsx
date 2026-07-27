import type { Meta, StoryObj } from '@storybook/react-vite'
import type { CubeThemeName } from '@cube/theme'
import { StoryLayout } from '../../../internals/components/StoryLayout/StoryLayout'
import { ColorScale } from './ColorScale'
import { ColorPaletteRow } from './ColorPaletteRow'
import { ColorBox } from './ColorBox'

const meta: Meta = {
  title: 'Design Tokens/Color Palettes',
}

export default meta

type Story = StoryObj

// Pure content — no StoryLayout wrapper, so each pinned story can own its own.
const ColorSections = () => (
  <>
    <StoryLayout.Section title="Color Palette">
      <div className="flex flex-col gap-y-6">
        <ColorPaletteRow title="COSMOS">
          <ColorBox colorName="Primary" bgClassName="bg-cosmos-primary" />
          <ColorBox colorName="Secondary" bgClassName="bg-cosmos-secondary" />
        </ColorPaletteRow>
        <ColorPaletteRow title="Scene Color">
          <ColorBox
            colorName="Theme gradient"
            bgClassName="background-scene-gradient"
          />
          <ColorBox
            colorName="Background / Table-header"
            bgClassName="bg-scene-background"
          />
        </ColorPaletteRow>
        <ColorPaletteRow
          title="Functional Color"
          desc="Supporting secondary colors used in backgrounds, text, separators, and modals."
        >
          <ColorBox colorName="Title" bgClassName="bg-functional-title" />
          <ColorBox colorName="Text" bgClassName="bg-functional-text" />
          <ColorBox
            colorName="Text-light"
            bgClassName="bg-functional-text-light"
          />
          <ColorBox
            colorName="Hover-primary"
            bgClassName="bg-functional-hover-primary"
          />
          <ColorBox
            colorName="Hover-secondary"
            bgClassName="bg-functional-hover-secondary"
          />
          <ColorBox
            colorName="Hover-grey"
            bgClassName="bg-functional-hover-grey"
          />
          <ColorBox
            colorName="Hover-grey-darker"
            bgClassName="bg-functional-hover-grey-darker"
          />
          <ColorBox
            colorName="Border / Divider"
            bgClassName="bg-functional-border-divider"
          />
          <ColorBox
            colorName="Border-darker"
            bgClassName="bg-functional-border-darker"
          />
          <ColorBox colorName="Disable" bgClassName="bg-functional-disable" />
          <ColorBox
            colorName="Disable-text"
            bgClassName="bg-functional-disable-text"
          />
          <ColorBox
            colorName="Disable-light"
            bgClassName="bg-functional-disable-light"
          />
          <ColorBox colorName="Skeleton" bgClassName="bg-functional-skeleton" />
        </ColorPaletteRow>
        <ColorPaletteRow
          title="Status Color"
          desc="Colors used to communicate state."
        >
          <ColorBox colorName="Positive" bgClassName="bg-status-positive" />
          <ColorBox
            colorName="Positive-text"
            bgClassName="bg-status-positive-text"
          />
          <ColorBox colorName="Negative" bgClassName="bg-status-negative" />
          <ColorBox colorName="Warning" bgClassName="bg-status-warning" />
          <ColorBox colorName="Paused" bgClassName="bg-status-paused" />
          <ColorBox
            colorName="Neutral / Active"
            bgClassName="bg-status-neutral"
          />
        </ColorPaletteRow>
        <ColorPaletteRow
          title="Chart Color"
          desc="Colors used in meter charts."
        >
          {Array.from({ length: 32 }, (_, i) => i + 1).map((n) => (
            <ColorBox
              key={n}
              colorName={String(n)}
              // Dynamically generated - the rule can't statically resolve it.
              // eslint-disable-next-line tailwindcss/no-custom-classname
              bgClassName={`bg-chart-${n}`}
            />
          ))}
        </ColorPaletteRow>
      </div>
    </StoryLayout.Section>

    <StoryLayout.Section title="Color Scale">
      <div className="flex flex-wrap items-start gap-8">
        <ColorScale title="Primary" category="primary" />
        <ColorScale title="Secondary" category="secondary" />
        <ColorScale title="Dark" category="dark" />
        <ColorScale title="Grey" category="grey" />
        <ColorScale title="Blue" category="blue" />
        <ColorScale title="Green" category="green" />
        <ColorScale title="Yellow" category="yellow" />
        <ColorScale title="Red" category="red" />
      </div>
    </StoryLayout.Section>
  </>
)

// Each story is pinned to one palette via `data-cube-theme` on a wrapper div,
// independent of whatever the toolbar is currently set to — so both pages can
// be opened side by side to compare directly.
const pinnedThemeStory = (theme: CubeThemeName, title: string): Story => ({
  name: theme,
  render: () => (
    <div data-cube-theme={theme}>
      <StoryLayout
        title={title}
        desc={`Color palette for ${theme}. Pinned independently of the toolbar 'Theme' setting.`}
      >
        <ColorSections />
      </StoryLayout>
    </div>
  ),
})

export const CubeCOS: Story = pinnedThemeStory('cubeCOS', 'CubeCOS Palette')
export const CubeEMP: Story = pinnedThemeStory('cubeEMP', 'CubeEMP Palette')
