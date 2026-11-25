import { hexToRGBA } from './hexToRGBA'

describe('hexToRGBA', () => {
  it.each([
    ['#647dff', 0.3, 'rgba(100, 125, 255, 0.3)'],
    ['#FFFFFF', 1, 'rgba(255, 255, 255, 1)'],
    ['#abc', 0.5, 'rgba(170, 187, 204, 0.5)'],
  ])('converts %s with alpha %s', (hex, alpha, expected) => {
    expect(hexToRGBA(hex, alpha)).toBe(expected)
  })

  it.each(['rgb(1, 2, 3)', 'var(--x)', '', '#12345'])(
    'returns %j unchanged',
    (value) => {
      expect(hexToRGBA(value, 0.3)).toBe(value)
    },
  )
})
