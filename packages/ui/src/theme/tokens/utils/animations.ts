import type { KeyValuePair } from 'tailwindcss/types/config'

const skeletonAnimations = {
  'cube-skeleton': 'cube-skeleton 1.5s ease-in-out infinite',
} satisfies KeyValuePair

const dotSpinner45VectorShorthand = (vectorIndex: number) =>
  `cube-dot-spinner-45-vector-${vectorIndex} 1s linear infinite`

const dotSpinner45Animations = {
  'cube-dot-spinner-45-vector-0': dotSpinner45VectorShorthand(0),
  'cube-dot-spinner-45-vector-1': dotSpinner45VectorShorthand(1),
  'cube-dot-spinner-45-vector-2': dotSpinner45VectorShorthand(2),
  'cube-dot-spinner-45-vector-3': dotSpinner45VectorShorthand(3),
  'cube-dot-spinner-45-vector-4': dotSpinner45VectorShorthand(4),
  'cube-dot-spinner-45-vector-5': dotSpinner45VectorShorthand(5),
  'cube-dot-spinner-45-vector-6': dotSpinner45VectorShorthand(6),
  'cube-dot-spinner-45-vector-7': dotSpinner45VectorShorthand(7),
} satisfies KeyValuePair

const dotSpinner120VectorShorthand = (vectorIndex: number) =>
  `cube-dot-spinner-120-vector-${vectorIndex} 1s linear infinite`

const dotSpinner120Animations = {
  'cube-dot-spinner-120-vector-0': dotSpinner120VectorShorthand(0),
  'cube-dot-spinner-120-vector-1': dotSpinner120VectorShorthand(1),
  'cube-dot-spinner-120-vector-2': dotSpinner120VectorShorthand(2),
} satisfies KeyValuePair

const cubeSpinnerVectorShorthand = (vectorIndex: number) =>
  `cube-spinner-vector-${vectorIndex} 1.25s linear infinite`

const cubeSpinnerAnimations = {
  'cube-spinner-vector-0': cubeSpinnerVectorShorthand(0),
  'cube-spinner-vector-1': cubeSpinnerVectorShorthand(1),
  'cube-spinner-vector-2': cubeSpinnerVectorShorthand(2),
} satisfies KeyValuePair

export const cubeAnimations = {
  ...skeletonAnimations,
  ...dotSpinner45Animations,
  ...dotSpinner120Animations,
  ...cubeSpinnerAnimations,
} satisfies KeyValuePair
