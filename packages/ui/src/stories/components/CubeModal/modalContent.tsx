import { MonochromeCheckmark } from '@icons'
import { CubeCheckbox } from '@components/CubeCheckbox/CubeCheckbox'
import { CubeInput } from '@components/CubeInput/CubeInput'

export const modalText = 'Do you want to delete this resource?'

export const shortFooterMessage = 'Lorem ipsum dolor sit.'

export const longFooterMessage =
  'Lorem ipsum dolor sit amet consectetur. Duis est netus sit aliquet. At vulputate faucibus diam arcu praesent auctor. Aliquam ipsum consequat facilisis mattis vestibulum gravida arcu.'

export const customFooter = (
  <div className="flex flex-1 items-center justify-end">
    <div className="flex items-center gap-x-1 text-status-positive-text">
      <MonochromeCheckmark className="icon-md" />
      <span className="primary-body4">Copied to clipboard.</span>
    </div>
  </div>
)

export const inputContent = (
  <CubeInput label="Label" placeholder="Input text" helpMessage="Helper text" />
)

export const multipleInputsContent = (
  <div className="flex flex-col gap-y-5">
    <p>Description</p>
    {[1, 2, 3].map((n) => (
      <CubeInput
        key={n}
        label={`Label ${n}`}
        placeholder={`Input text ${n}`}
        helpMessage={`Helper text ${n}`}
      />
    ))}
  </div>
)

export const checkboxesContent = (
  <div className="grid grid-cols-4 gap-y-3">
    {Array.from({ length: 23 }, (_, index) => (
      <CubeCheckbox key={index} label={`Item ${index + 1}`} />
    ))}
  </div>
)
