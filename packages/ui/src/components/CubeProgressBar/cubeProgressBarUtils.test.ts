import { calculateFillWidthPercentage } from './cubeProgressBarUtils'

describe('calculateFillWidthPercentage', () => {
  it('caps at 100', () => {
    expect(calculateFillWidthPercentage(100, 200)).toBe(100)
    expect(calculateFillWidthPercentage(150, 200)).toBe(100)
  })

  it('returns 0 or less as is', () => {
    expect(calculateFillWidthPercentage(0, 200)).toBe(0)
    expect(calculateFillWidthPercentage(-5, 200)).toBe(-5)
  })

  it('returns the progress as is for a bar of 16px or less', () => {
    expect(calculateFillWidthPercentage(1, 16)).toBe(1)
  })

  it('leaves a progress that is wide enough on both ends unchanged', () => {
    expect(calculateFillWidthPercentage(50, 200)).toBe(50)
  })

  it('widens a fill narrower than 4px', () => {
    // 1% of 100px is 1px; 4% is the first value that reaches 4px.
    expect(calculateFillWidthPercentage(1, 100)).toBe(4)
  })

  it('narrows a fill that leaves less than 4px blank', () => {
    // 99% of 100px leaves 1px; 96% is the first value that leaves 4px.
    expect(calculateFillWidthPercentage(99, 100)).toBe(96)
  })
})
