export const checkboxText = 'Checkbox item'
export const longCheckboxText = 'Checkbox item with longer text'

export const checkboxCheckStates = [
  'Unchecked',
  'Checked',
  'Indeterminate',
] as const

export type CheckboxCheckState = (typeof checkboxCheckStates)[number]
