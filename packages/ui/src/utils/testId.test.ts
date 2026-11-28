import { testIdOf } from './testId'

describe('testIdOf', () => {
  it('joins the test ID and the part with a hyphen', () => {
    expect(testIdOf('delete-modal', 'close')).toBe('delete-modal-close')
  })

  it.each([undefined, ''])(
    'returns undefined for a test ID of %j, so no attribute renders',
    (testId) => {
      expect(testIdOf(testId, 'close')).toBeUndefined()
    },
  )
})
