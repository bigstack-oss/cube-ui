export const mockOptions = [
  { label: 'Suggestion', option: '[0,0,0]', description: 'Description' },
  { label: 'Recommendation', option: '[1,1,1]', description: 'Description' },
  { label: 'Alternative', option: '[2,2,2]', description: 'Description' },
  { label: 'Popular Choice', option: '[3,3,3]', description: 'Description' },
  { label: 'Recent Search', option: '[4,4,4]', description: 'Description' },
  { label: 'Trending', option: '[5,5,5]', description: 'Description' },
]

export const mockCategories = ['Category 1', 'Category 2', 'Category 3']

export const mockSuggestions = ['Suggestion 1', 'Suggestion 2']

export const mockRecentSuggestions = [
  'Recent Suggestion 1',
  'Recent Suggestion 2',
]

export const matches = (text: string, keyword: string) =>
  text.toLowerCase().includes(keyword.toLowerCase())
