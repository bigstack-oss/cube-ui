import type { SvgComponent } from '@components/CubeIcon'
import * as Icons from '@icons'

export type IconEntry = { filename: string; Component: SvgComponent }

export const monochromeIcons: IconEntry[] = Object.entries(Icons)
  .filter(([name]) => name.startsWith('Monochrome'))
  .map(([name, Component]) => ({
    filename: name.replace('Monochrome', ''),
    Component: Component as SvgComponent,
  }))
  .sort((a, b) => a.filename.localeCompare(b.filename))

export const coloredIcons: IconEntry[] = Object.entries(Icons)
  .filter(([name]) => name.startsWith('Colored'))
  .map(([name, Component]) => ({
    filename: name.replace('Colored', ''),
    Component: Component as SvgComponent,
  }))
  .sort((a, b) => a.filename.localeCompare(b.filename))
