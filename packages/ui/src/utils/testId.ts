/**
 * The parts a component may tag, appended to the consumer's test ID as
 * `<test-id>-<part>`. Keep this list short and shared, so the same part has
 * the same name in every component.
 */
export const cubeTestIdParts = [
  'title',
  'body',
  'close',
  'cancel',
  'action',
  'help',
  'error',
  'trigger',
  'menu',
  'option',
  'row',
  'cell',
  'select',
  'sort',
  'tab',
  'item',
  'prev',
  'next',
  'page',
] as const

export type CubeTestIdPart = (typeof cubeTestIdParts)[number]

/**
 * The test ID of one part of a component, or `undefined` when the consumer set
 * no test ID, so the component renders no attribute at all.
 */
export const testIdOf = (testId: string | undefined, part: CubeTestIdPart) =>
  testId ? `${testId}-${part}` : undefined
