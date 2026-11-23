import { stackCard } from './cubeStackCardStyles'
import type { CubeStackCardProps } from './cubeStackCardTypes'

export const CubeStackCard = (props: CubeStackCardProps) => {
  const { title, subtext, children } = props
  return (
    <div className={stackCard()}>
      <div className="flex items-center gap-3">
        <h5 className="primary-h5 text-functional-title">{title}</h5>
        {subtext && (
          <p className="primary-body3 text-functional-text">{subtext}</p>
        )}
      </div>
      <div className="primary-body5 text-functional-text-light">{children}</div>
    </div>
  )
}
