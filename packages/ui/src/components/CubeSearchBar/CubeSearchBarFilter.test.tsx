import { useState, type ReactNode } from 'react'
import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import i18n from '@i18n/i18n'
import { CubeSearchBarFilter } from './CubeSearchBarFilter'
import type { CubeSearchBarFilterProps } from './cubeSearchBarTypes'

const options = ['Suggestion', 'Recommendation', 'Alternative']

type FilterProps = Omit<CubeSearchBarFilterProps, 'value' | 'children'> & {
  initialValue?: string
  onItemClick?: (option: string) => void
  renderItems?: (value: string) => ReactNode
}

// A controlled filter whose items match the typed value.
const ControlledFilter = (props: FilterProps) => {
  const { initialValue = '', onItemClick, renderItems, ...rest } = props
  const [value, setValue] = useState(initialValue)

  return (
    <CubeSearchBarFilter
      {...rest}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onInputClear={() => setValue('')}
    >
      {renderItems
        ? (renderItems(value) as CubeSearchBarFilterProps['children'])
        : options
            .filter((o) => o.toLowerCase().includes(value.toLowerCase()))
            .map((o) => (
              <CubeSearchBarFilter.Item
                key={o}
                onClick={() => onItemClick?.(o)}
              >
                {o}
              </CubeSearchBarFilter.Item>
            ))}
    </CubeSearchBarFilter>
  )
}

const getInput = () => screen.getByRole('textbox')

// The menu is portaled to `document.body` and hidden with
// `visibility: hidden` while closed.
const getMenu = () =>
  document.body.querySelector<HTMLElement>(':scope > div.z-10')!

const isMenuOpen = () => getMenu().style.visibility !== 'hidden'

describe('CubeSearchBarFilter', () => {
  it('renders a text input with the default placeholder and no clear icon', () => {
    render(<ControlledFilter />)

    expect(getInput()).toHaveAttribute('type', 'text')
    expect(getInput()).toHaveAttribute('placeholder', 'Search')
    expect(getInput()).toHaveAttribute('autocomplete', 'off')
    expect(getInput()).toHaveClass('pr-9', 'rounded-[5px]', 'bg-grey-100')
    expect(document.querySelectorAll('svg')).toHaveLength(1)
    expect(isMenuOpen()).toBe(false)
  })

  it('opens the menu with matching items while typing', async () => {
    const user = userEvent.setup()
    render(<ControlledFilter />)

    await user.type(getInput(), 'al')

    expect(isMenuOpen()).toBe(true)
    expect(getMenu()).toHaveTextContent('Alternative')
    expect(getMenu()).not.toHaveTextContent('Suggestion')
    expect(getInput()).toHaveClass('pr-[56px]')
  })

  it('calls an item onClick', async () => {
    const user = userEvent.setup()
    const onItemClick = vi.fn()
    render(<ControlledFilter onItemClick={onItemClick} />)

    await user.type(getInput(), 'rec')
    await user.click(screen.getByText('Recommendation'))

    expect(onItemClick).toHaveBeenCalledWith('Recommendation')
  })

  it('stays closed without items', async () => {
    const user = userEvent.setup()
    render(<ControlledFilter renderItems={() => []} />)

    await user.type(getInput(), 'abc')

    expect(isMenuOpen()).toBe(false)
  })

  it('closes on an outside click and keeps the value', async () => {
    const user = userEvent.setup()
    render(
      <>
        <ControlledFilter />
        <button type="button">Outside</button>
      </>,
    )

    await user.type(getInput(), 'a')
    expect(isMenuOpen()).toBe(true)

    await user.click(screen.getByRole('button', { name: 'Outside' }))

    expect(isMenuOpen()).toBe(false)
    expect(getInput()).toHaveValue('a')
  })

  it('clears the value with the clear icon', async () => {
    const user = userEvent.setup()
    render(<ControlledFilter initialValue="alt" />)

    // Clear icon, then search icon.
    const [clear] = document.querySelectorAll('svg')
    await user.click(clear!)

    expect(getInput()).toHaveValue('')
    expect(document.querySelectorAll('svg')).toHaveLength(1)
  })

  it('uses a custom placeholder, id and className', () => {
    render(
      <ControlledFilter
        placeholder="Find a node"
        id="node-search"
        className="w-[300px]"
      />,
    )

    expect(getInput()).toHaveAttribute('placeholder', 'Find a node')
    expect(getInput()).toHaveAttribute('id', 'node-search')
    expect(getInput()).toHaveClass('w-[300px]')
  })

  it('shows a skeleton while loading', () => {
    const { container } = render(<ControlledFilter isLoading />)

    expect(screen.queryByRole('textbox')).not.toBeInTheDocument()
    expect(container.firstChild).toHaveClass(
      'cube-skeleton',
      'h-[34px]',
      'rounded-[5px]',
    )
  })

  it('translates the placeholder in zh-TW', async () => {
    await act(() => i18n.changeLanguage('zh-TW'))
    render(<ControlledFilter />)

    expect(getInput()).toHaveAttribute('placeholder', '搜尋')

    await act(() => i18n.changeLanguage('en-US'))
  })

  it('has no axe violations', async () => {
    const { container } = render(<ControlledFilter initialValue="a" />)

    expect(await axe(container)).toHaveNoViolations()
  })
})

describe('CubeSearchBarFilter test IDs', () => {
  const Harness = (props: { testId?: string }) => {
    const [value, setValue] = useState('')
    return (
      <CubeSearchBarFilter
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onInputClear={() => setValue('')}
        data-testid={props.testId}
      >
        <CubeSearchBarFilter.Item onClick={vi.fn()}>
          web-net
        </CubeSearchBarFilter.Item>
        <CubeSearchBarFilter.Item data-key="n-2" onClick={vi.fn()}>
          db-net
        </CubeSearchBarFilter.Item>
      </CubeSearchBarFilter>
    )
  }

  it('puts data-testid on the input and tags the clear icon, menu and options', async () => {
    const user = userEvent.setup()
    const { container } = render(<Harness testId="filter" />)

    const input = screen.getByTestId('filter')
    expect(input.tagName).toBe('INPUT')
    await user.type(input, 'net')

    expect(screen.getByTestId('filter-clear')).toBeInTheDocument()
    expect(container).not.toContainElement(screen.getByTestId('filter-menu'))
    expect(
      screen
        .getAllByTestId('filter-option')
        .map((o) => o.getAttribute('data-key')),
    ).toEqual(['web-net', 'n-2'])
  })

  it.each([undefined, ''])(
    'renders no test IDs for a data-testid of %j',
    async (testId) => {
      const user = userEvent.setup()
      render(<Harness testId={testId} />)

      await user.type(screen.getByRole('textbox'), 'net')

      expect(document.body.querySelector('[data-testid]')).toBeNull()
      expect(document.body.querySelector('[data-key]')).toBeNull()
    },
  )
})
