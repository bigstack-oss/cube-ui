import type { CubeViewDetailsTableDetailItem } from './cubeViewDetailsTableTypes'
import { detailCellContainer } from './cubeViewDetailsTableStyles'

type DetailCellProps = {
  isExpanded: boolean
  title?: string
  items: CubeViewDetailsTableDetailItem[]
}

export const DetailCell = (props: DetailCellProps) => {
  const { isExpanded, title, items } = props

  return (
    <div className={detailCellContainer({ isExpanded })}>
      {title && (
        <div className="primary-body4 overflow-x-auto whitespace-pre text-wrap text-functional-text-light">
          {title}
        </div>
      )}
      {items.length > 0 && (
        <div className="flex flex-wrap gap-4">
          {items.map((item, index) => (
            <div key={index} className="flex items-center gap-x-4">
              <span className="primary-body4 w-[80px] text-functional-text">
                {item.title}
              </span>
              <span className="primary-body5 w-[164px] text-functional-text-light">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
