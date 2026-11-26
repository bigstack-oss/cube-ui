// The legacy story's examples: [title, used, total].
export const memoryAndStorageUsages: [string, number, number][] = [
  ['Memory', 0, 755.1],
  // Shows at least 1% when the percentage is above 0.
  ['Memory', 0.01, 755.1],
  ['Memory', 8.2, 755.1],
  ['Memory', 380, 755.1],
  ['Memory', 388, 755.1],
  ['Storage', 80, 100],
  ['Storage', 81, 100],
  ['Memory', 99, 100],
  ['Memory', 100, 100],
  ['Storage', 101, 100],
  ['Storage', 150, 100],
  ['Storage', 199, 100],
  ['Storage', 200, 100],
  ['Storage', 250, 100],
  ['Storage', 300, 100],
]

// [used, total], with a 400% threshold.
export const vCpuUsages: [number, number][] = [
  [0, 10],
  [0.01, 10],
  [4, 100],
  [200, 100],
  [396, 100],
  [400, 100],
  [404, 100],
  [600, 100],
  [796, 100],
  [800, 100],
  [1000, 100],
  [1200, 100],
]

export const formatCpuPercentage = (value: number) => `${value / 100}x`
