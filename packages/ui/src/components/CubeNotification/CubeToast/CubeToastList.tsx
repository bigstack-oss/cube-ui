import { testIdOf } from '@utils/testId'
import { CubeToastWrapper } from './CubeToast'
import type { CubeToastType } from './cubeToastUtils'

type CubeToastListProps = {
  toasts: CubeToastType[]
  removeToast: (id: string) => void
  testId?: string
}

export const CubeToastList = (props: CubeToastListProps) => {
  const { toasts, removeToast, testId } = props

  return (
    <div
      className="fixed bottom-4 right-4 z-50 flex flex-col gap-5"
      data-testid={testId}
    >
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
          testId={testIdOf(testId, 'item')}
        />
      ))}
    </div>
  )
}
