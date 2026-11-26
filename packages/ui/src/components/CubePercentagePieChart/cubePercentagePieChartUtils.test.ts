import {
  calculatePercentage,
  getChartPercentage,
  getOverThresholdSvgPercentage,
  getPercentageColor,
  getSvgPercentage,
} from './cubePercentagePieChartUtils'

describe('calculatePercentage', () => {
  it.each([
    [50, 100, 50],
    [380, 755.1, (380 / 755.1) * 100],
    [0, 0, 0],
    // Legacy behavior: `|| 0` only catches 0 / 0, so a used amount over a
    // zero total gives Infinity.
    [5, 0, Infinity],
  ])('%s of %s is %s%%', (used, total, expected) => {
    expect(calculatePercentage(used, total)).toBe(expected)
  })
})

describe('getChartPercentage', () => {
  it.each([
    [0, 0],
    [0.001, 1],
    [1.09, 1],
    [50.3, 50],
    [99.99, 99],
    [150.6, 150],
  ])('shows %s as %s', (percentage, expected) => {
    expect(getChartPercentage(percentage)).toBe(expected)
  })
})

describe('getPercentageColor', () => {
  it.each([
    [0, 'stroke-chart-1'],
    [50, 'stroke-chart-1'],
    [51, 'stroke-status-warning'],
    [80, 'stroke-status-warning'],
    [81, 'stroke-status-negative'],
    [300, 'stroke-status-negative'],
  ])('uses %s%% → %s', (percentage, expected) => {
    expect(getPercentageColor(percentage)).toBe(expected)
  })
})

describe('getSvgPercentage', () => {
  it.each([
    [50, 100, 50],
    [99, 100, 98],
    [100, 100, 100],
    [150, 100, 100],
    [-5, 100, 0],
    [200, 400, 50],
  ])('draws %s%% of threshold %s as %s', (percentage, threshold, expected) => {
    expect(getSvgPercentage(percentage, threshold)).toBe(expected)
  })
})

describe('getOverThresholdSvgPercentage', () => {
  it.each([
    [100, 100, 0],
    [150, 100, 50],
    [250, 100, 100],
    [600, 400, 50],
  ])('draws %s%% of threshold %s as %s', (percentage, threshold, expected) => {
    expect(getOverThresholdSvgPercentage(percentage, threshold)).toBe(expected)
  })
})
