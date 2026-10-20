import type { CubeNaggingLink } from '@components/CubeNagging/cubeNaggingTypes'

export const naggingContent = {
  title: 'Nagging Title',
  longTitle: 'Two-line title will look like this',
  longerTitle:
    'Two-line title will look like this two-line title will look like this two-line title will look like this two-line title will look like this two-line title will look like this two-line title will look like this two-line title will look like this two-line title will look like this two-line title will look like this',
  description: 'Text goes here. Text goes here. (Optional)',
  multilineDescription: [
    'Text goes here. Text goes here 1. (Optional)',
    'Text goes here. Text goes here 2. (Optional)',
    'Text goes here. Text goes here 3. (Optional)',
  ],
}

export const createLink = (): CubeNaggingLink => ({
  text: 'Call to action',
  href: `/#${Math.random()}`,
})
