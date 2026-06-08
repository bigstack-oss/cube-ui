import type { PropsWithClassName } from '../../../utils/react-types'
import { Dot45 } from '../Svgs/Dot45'
import { twMerge } from 'tailwind-merge'

export const CubeDotSpinner45 = (props: PropsWithClassName) => {
  const { className } = props

  return (
    <div
      className={twMerge(
        // The size of container must be equal to the size of dots.
        'size-4 text-cosmos-primary relative inline',
        className,
      )}
    >
      <Dot45 className="animate-cos-dot-spinner-45-vector-0 absolute rotate-0" />
      <Dot45 className="animate-cos-dot-spinner-45-vector-1 absolute rotate-45" />
      <Dot45 className="animate-cos-dot-spinner-45-vector-2 absolute rotate-90" />
      <Dot45 className="animate-cos-dot-spinner-45-vector-3 absolute rotate-[135deg]" />
      <Dot45 className="animate-cos-dot-spinner-45-vector-4 absolute rotate-180" />
      <Dot45 className="animate-cos-dot-spinner-45-vector-5 absolute rotate-[225deg]" />
      <Dot45 className="animate-cos-dot-spinner-45-vector-6 absolute rotate-[270deg]" />
      <Dot45 className="animate-cos-dot-spinner-45-vector-7 absolute rotate-[315deg]" />
    </div>
  )
}
