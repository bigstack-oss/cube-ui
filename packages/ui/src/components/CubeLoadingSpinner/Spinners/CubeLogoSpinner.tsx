import type { PropsWithClassName } from '../../../utils/react-types'
import { CubeLeft } from '../Svgs/CubeLeft'
import { CubeRight } from '../Svgs/CubeRight'
import { CubeTop } from '../Svgs/CubeTop'
import { twMerge } from 'tailwind-merge'

export const CubeLogoSpinner = (props: PropsWithClassName) => {
  const { className } = props

  return (
    // The size of container must be equal to the size of dots.
    <div
      className={twMerge(
        'text-functional-text relative inline size-[30px]',
        className,
      )}
    >
      <CubeLeft className="animate-cos-cube-spinner-vector-0 absolute" />
      <CubeTop className="animate-cos-cube-spinner-vector-1 absolute" />
      <CubeRight className="animate-cos-cube-spinner-vector-2 absolute" />
    </div>
  )
}
