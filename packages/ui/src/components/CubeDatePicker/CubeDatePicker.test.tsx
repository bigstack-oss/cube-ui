import { useState } from 'react'
import { act, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import dayjs, { type Dayjs } from 'dayjs'
import i18n from '@i18n/i18n'
import { CubeDatePicker } from './CubeDatePicker'
import type { CubeDatePickerDates } from './cubeDatePickerTypes'
import { CubeTimeZoneContext } from './CubeTimeZoneContext'
import { useCubeDatePickerDisplayDates } from './useCubeDatePickerDisplayDates'

type ExampleProps = {
  initialDates?: CubeDatePickerDates
  disabled?: boolean
  isLoading?: boolean
  onApply?: (dates: CubeDatePickerDates) => void
}

// The usual setup: applied dates in state, display dates from the hook.
const DatePickerExample = (props: ExampleProps) => {
  const {
    initialDates = { start: undefined, end: undefined },
    disabled,
    isLoading,
    onApply = () => {},
  } = props

  const [dates, setDates] = useState(initialDates)

  const { displayDates, onChange, onCancel, onReset } =
    useCubeDatePickerDisplayDates({
      initialStartDate: dates.start,
      initialEndDate: dates.end,
    })

  return (
    <CubeDatePicker
      disabled={disabled}
      isLoading={isLoading}
      displayDates={displayDates}
      onChange={onChange}
      onCancel={onCancel}
      onApply={() => {
        setDates(displayDates)
        onApply(displayDates)
      }}
      onReset={() => {
        onReset()
        setDates({ start: undefined, end: undefined })
      }}
    />
  )
}

const getTrigger = () => screen.getAllByRole('button')[0] as HTMLButtonElement

// The menu is portaled to `document.body` and hidden while closed.
const getMenu = () =>
  document.body.querySelector<HTMLElement>(':scope > div.z-10')!

const isMenuOpen = () => getMenu().style.visibility !== 'hidden'

const getDay = (day: number) =>
  within(getMenu()).getByRole('button', { name: String(day), hidden: true })

const getMonthTitle = () => getMenu().querySelector('.secondary-h5')!

const getInputs = () =>
  within(getMenu()).getAllByRole('textbox', {
    hidden: true,
  }) as HTMLInputElement[]

const getApply = () =>
  within(getMenu()).getByRole('button', { name: 'Apply', hidden: true })

const ymd = (date: Dayjs | undefined) => date?.format('YYYY-MM-DD')

describe('CubeDatePicker', () => {
  beforeEach(() => {
    // Fake only `Date`, so "today" is fixed and user events keep real timers.
    vi.useFakeTimers({ toFake: ['Date'] })
    vi.setSystemTime(new Date('2026-11-25T12:00:00'))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('shows "Time" in a closed trigger by default', () => {
    render(<DatePickerExample />)

    expect(getTrigger()).toHaveTextContent('Time')
    expect(getTrigger()).toHaveAttribute('type', 'button')
    expect(getTrigger()).toHaveClass('border-blue-700', 'text-blue-700')
    expect(getTrigger().querySelector('svg')).toHaveClass('icon-md')
    expect(isMenuOpen()).toBe(false)
  })

  it('shows the selected range in the trigger', () => {
    render(
      <DatePickerExample
        initialDates={{ start: dayjs('2025-04-15'), end: dayjs('2025-05-31') }}
      />,
    )

    expect(getTrigger()).toHaveTextContent('2025/04/15 - 2025/05/31')
    expect(getTrigger()).toHaveClass('bg-secondary-50', 'text-blue-850')
  })

  it('opens on the current month with today highlighted', async () => {
    const user = userEvent.setup()
    render(<DatePickerExample />)

    await user.click(getTrigger())

    expect(isMenuOpen()).toBe(true)
    expect(getMonthTitle()).toHaveTextContent('November 2026')
    expect(getMenu()).toHaveTextContent('SMTWTFS')
    expect(getDay(25)).toHaveClass('font-semibold', 'text-blue-700')
    expect(getDay(24)).toHaveClass('text-functional-title')
    expect(getInputs().map((i) => i.placeholder)).toEqual([
      'Choose Start',
      'Choose End',
    ])
    expect(getApply()).toBeDisabled()
  })

  it('opens on the month of the selected start date', async () => {
    const user = userEvent.setup()
    render(
      <DatePickerExample
        initialDates={{ start: dayjs('2025-04-15'), end: dayjs('2025-05-31') }}
      />,
    )

    await user.click(getTrigger())

    expect(getMonthTitle()).toHaveTextContent('April 2025')
    expect(getDay(15)).toHaveClass('rounded-l-[5px]', 'bg-secondary-100')
    expect(getDay(20)).toHaveClass('bg-secondary-100')
    expect(getDay(20)).not.toHaveClass('rounded-[5px]')
  })

  it('picks a range and applies it', async () => {
    const user = userEvent.setup()
    const onApply = vi.fn()
    render(<DatePickerExample onApply={onApply} />)

    await user.click(getTrigger())
    await user.click(getDay(10))

    expect(getInputs()[0]).toHaveValue('2026/11/10')
    expect(getInputs()[1]).toHaveValue('')
    expect(getApply()).toBeDisabled()

    await user.click(getDay(20))

    expect(getInputs()[1]).toHaveValue('2026/11/20')
    expect(getDay(10)).toHaveClass('rounded-l-[5px]')
    expect(getDay(15)).toHaveClass('bg-secondary-100')
    expect(getDay(20)).toHaveClass('rounded-r-[5px]')
    expect(getTrigger()).toHaveTextContent('2026/11/10 - 2026/11/20')

    await user.click(getApply())

    const [dates] = onApply.mock.calls[0]!
    expect([ymd(dates.start), ymd(dates.end)]).toEqual([
      '2026-11-10',
      '2026-11-20',
    ])
    expect(isMenuOpen()).toBe(false)
    expect(getTrigger()).toHaveTextContent('2026/11/10 - 2026/11/20')
  })

  it('swaps the dates when the second click is earlier', async () => {
    const user = userEvent.setup()
    render(<DatePickerExample />)

    await user.click(getTrigger())
    await user.click(getDay(20))
    await user.click(getDay(10))

    expect(getInputs().map((i) => i.value)).toEqual([
      '2026/11/10',
      '2026/11/20',
    ])
  })

  it('shows a single selected day when both dates are the same', async () => {
    const user = userEvent.setup()
    render(<DatePickerExample />)

    await user.click(getTrigger())
    await user.click(getDay(12))
    await user.click(getDay(12))

    expect(getDay(12)).toHaveClass('rounded-[5px]', 'bg-secondary-100')
  })

  it('reverts to the applied dates on an outside click', async () => {
    const user = userEvent.setup()
    render(
      <>
        <DatePickerExample
          initialDates={{
            start: dayjs('2026-11-01'),
            end: dayjs('2026-11-08'),
          }}
        />
        <button type="button">Outside</button>
      </>,
    )

    await user.click(getTrigger())
    await user.click(getDay(18))
    expect(getTrigger()).toHaveTextContent('2026/11/18')

    await user.click(screen.getByRole('button', { name: 'Outside' }))

    expect(isMenuOpen()).toBe(false)
    expect(getTrigger()).toHaveTextContent('2026/11/01 - 2026/11/08')
  })

  it('resets the dates', async () => {
    const user = userEvent.setup()
    render(
      <DatePickerExample
        initialDates={{ start: dayjs('2026-11-01'), end: dayjs('2026-11-08') }}
      />,
    )

    await user.click(getTrigger())
    await user.click(
      within(getMenu()).getByRole('button', { name: 'Reset', hidden: true }),
    )

    expect(getInputs().map((i) => i.value)).toEqual(['', ''])
    expect(getTrigger()).toHaveTextContent('Time')
  })

  it('moves between months', async () => {
    const user = userEvent.setup()
    render(<DatePickerExample />)

    await user.click(getTrigger())
    const [previous, next] = Array.from(
      getMenu().querySelectorAll<HTMLElement>('.cursor-pointer.p-\\[10px\\]'),
    )

    await user.click(next!)
    expect(getMonthTitle()).toHaveTextContent('December 2026')

    await user.click(previous!)
    await user.click(previous!)
    expect(getMonthTitle()).toHaveTextContent('October 2026')
  })

  it('does not open while disabled', async () => {
    const user = userEvent.setup()
    render(
      <DatePickerExample
        disabled
        initialDates={{ start: dayjs('2025-04-15'), end: dayjs('2025-05-31') }}
      />,
    )

    expect(getTrigger()).toBeDisabled()
    expect(getTrigger()).toHaveClass('text-functional-disable-text')

    await user.click(getTrigger())

    expect(isMenuOpen()).toBe(false)
  })

  it('shows a skeleton while loading', () => {
    const { container } = render(<DatePickerExample isLoading />)

    expect(screen.queryByRole('button')).not.toBeInTheDocument()
    expect(container.firstChild).toHaveClass(
      'cube-skeleton',
      'h-[34px]',
      'w-[91px]',
    )
  })

  it('uses the time zone from CubeTimeZoneContext for today', async () => {
    const user = userEvent.setup()
    // 2026-11-25 22:00 UTC is already 26 November at UTC+14.
    vi.setSystemTime(new Date('2026-11-25T22:00:00Z'))
    render(
      <CubeTimeZoneContext.Provider value="+14:00">
        <DatePickerExample />
      </CubeTimeZoneContext.Provider>,
    )

    await user.click(getTrigger())

    expect(getDay(26)).toHaveClass('text-blue-700', 'font-semibold')
    expect(getDay(25)).toHaveClass('text-functional-title')
  })

  it('translates the labels and the month in zh-TW', async () => {
    const user = userEvent.setup()
    await act(() => i18n.changeLanguage('zh-TW'))
    render(<DatePickerExample />)

    expect(getTrigger()).toHaveTextContent('時間')
    await user.click(getTrigger())

    expect(getMonthTitle()).toHaveTextContent('十一月 2026')
    expect(getMenu()).toHaveTextContent('日一二三四五六')
    expect(getMenu()).toHaveTextContent('開始')
    expect(getInputs()[0]).toHaveAttribute('placeholder', '選擇起始時間')

    await act(() => i18n.changeLanguage('en-US'))
  })

  it('has no axe violations', async () => {
    const user = userEvent.setup()
    const { container } = render(<DatePickerExample />)

    await user.click(getTrigger())

    expect(await axe(container)).toHaveNoViolations()
    expect(await axe(getMenu())).toHaveNoViolations()
  })
})
