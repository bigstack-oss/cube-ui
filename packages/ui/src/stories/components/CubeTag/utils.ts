export const tagContents = ['Basic', 'w/Close Icon', 'w/Tag Icon'] as const

export type TagContent = (typeof tagContents)[number]
