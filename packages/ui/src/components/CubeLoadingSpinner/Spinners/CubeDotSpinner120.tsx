import type { PropsWithClassName } from '../../../utils/react-types'
import { Dot120 } from '../Svgs/Dot120'
import { twMerge } from 'tailwind-merge'

export const CubeDotSpinner120 = (props: PropsWithClassName) => {
  const { className } = props

  return (
    // The size of container must be equal to the size of dots.
    <div
      className={twMerge(
        'size-4 text-cosmos-primary relative inline',
        className,
      )}
    >
      <Dot120 className="animate-cos-dot-spinner-120-vector-0 absolute rotate-0" />
      <Dot120 className="animate-cos-dot-spinner-120-vector-1 absolute rotate-[135deg]" />
      <Dot120 className="animate-cos-dot-spinner-120-vector-2 absolute rotate-[270deg]" />
    </div>
  )
}
