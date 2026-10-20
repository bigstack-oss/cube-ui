import { CubeToastWrapper } from './CubeToast'
import type { CubeToastType } from './cubeToastUtils'

type CubeToastListProps = {
  toasts: CubeToastType[]
  removeToast: (id: string) => void
}

export const CubeToastList = (props: CubeToastListProps) => {
  const { toasts, removeToast } = props

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-5">
      {toasts.map((toast) => (
        <CubeToastWrapper
          key={toast.id}
          id={toast.id}
          type={toast.type}
          title={toast.title}
          message={toast.message}
          link={toast.link}
          onToastClose={removeToast}
          time={toast.time}
        />
      ))}
    </div>
  )
}
