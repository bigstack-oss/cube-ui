import { useState } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { CubeDropdown } from './CubeDropdown'
import {
  cubeDropdownSizes,
  type CubeDropdownSize,
  type CubeDropdownVariant,
} from './cubeDropdownTypes'

type Fruit = { label: string; disabled?: boolean }

const apple: Fruit = { label: 'Apple' }
const banana: Fruit = { label: 'Banana' }
const cherry: Fruit = { label: 'Cherry', disabled: true }

const fruits: Fruit[] = [apple, banana, cherry]

type HarnessProps = {
  size?: CubeDropdownSize
  variant?: CubeDropdownVariant
  initialSelected?: Fruit[]
  disabled?: boolean
  isLoading?: boolean
  label?: string
  placeholder?: string
  items?: Fruit[]
  onItemClick?: (fruit: Fruit) => void
}

const RadioHarness = (props: HarnessProps) => {
  const {
    initialSelected = [],
    items = fruits,
    onItemClick,
    placeholder,
    ...rest
  } = props
  const [selectedItems, setSelectedItems] = useState<Fruit[]>(initialSelected)

  return (
    <CubeDropdown type="radio" selectedItems={selectedItems} {...rest}>
      <CubeDropdown.Trigger placeholder={placeholder}>
        {selectedItems[0]?.label}
      </CubeDropdown.Trigger>
      <CubeDropdown.Menu>
        {items.map((fruit) => (
          <CubeDropdown.Item
            key={fruit.label}
            item={fruit}
            disabled={fruit.disabled}
            onClick={() => {
              onItemClick?.(fruit)
              setSelectedItems([fruit])
            }}
          >
            {fruit.label}
          </CubeDropdown.Item>
        ))}
      </CubeDropdown.Menu>
    </CubeDropdown>
  )
}

const CheckboxHarness = (
  props: HarnessProps & {
    onAllCheckChange?: (checked: boolean) => void
    onClearSelection?: () => void
  },
) => {
  const {
    initialSelected = [],
    items = fruits,
    variant = 'regular',
    onAllCheckChange,
    onClearSelection,
    placeholder,
    ...rest
  } = props
  const [selectedItems, setSelectedItems] = useState<Fruit[]>(initialSelected)

  const toggle = (fruit: Fruit) =>
    setSelectedItems((prev) =>
      prev.includes(fruit) ? prev.filter((f) => f !== fruit) : [...prev, fruit],
    )

  const handleAllCheckChange = (checked: boolean) => {
    onAllCheckChange?.(checked)
    setSelectedItems(checked ? items.filter((f) => !f.disabled) : [])
  }

  const handleClearSelection = () => {
    onClearSelection?.()
    setSelectedItems([])
  }

  const trigger = (
    <CubeDropdown.Trigger placeholder={placeholder}>
      {selectedItems.map((f) => f.label).join(', ') || undefined}
    </CubeDropdown.Trigger>
  )

  const menu = (
    <CubeDropdown.Menu>
      {items.map((fruit) => (
        <CubeDropdown.Item
          key={fruit.label}
          item={fruit}
          disabled={fruit.disabled}
          onClick={() => toggle(fruit)}
        >
          {fruit.label}
        </CubeDropdown.Item>
      ))}
    </CubeDropdown.Menu>
  )

  if (variant === 'withFilter') {
    return (
      <CubeDropdown
        type="checkbox"
        variant="withFilter"
        selectedItems={selectedItems}
        onAllCheckChange={handleAllCheckChange}
        onClearSelection={handleClearSelection}
        {...rest}
      >
        {trigger}
        {menu}
      </CubeDropdown>
    )
  }

  return (
    <CubeDropdown
      type="checkbox"
      variant="regular"
      selectedItems={selectedItems}
      onAllCheckChange={handleAllCheckChange}
      {...rest}
    >
      {trigger}
      {menu}
    </CubeDropdown>
  )
}

// The menu is always portaled into document.body and hidden with
// `invisible` while closed.
const getMenu = () =>
  document.body.querySelector<HTMLDivElement>('body > .overflow-y-auto')!

describe('CubeDropdown', () => {
  it('renders the default translated placeholder when nothing is selected', () => {
    render(<RadioHarness />)

    expect(screen.getByRole('button', { name: 'Choose' })).toBeInTheDocument()
  })

  it('renders a custom placeholder and the label', () => {
    render(<RadioHarness label="Fruit" placeholder="Select an Item" />)

    expect(screen.getByText('Fruit')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Select an Item' }),
    ).toBeInTheDocument()
  })

  it('shows the selected item text in the trigger', () => {
    render(<RadioHarness initialSelected={[banana]} />)

    expect(screen.getByRole('button', { name: 'Banana' })).toBeInTheDocument()
  })

  it('toggles the menu open and closed when the trigger is clicked', async () => {
    const user = userEvent.setup()
    render(<RadioHarness />)

    const trigger = screen.getByRole('button', { name: 'Choose' })
    expect(getMenu()).toHaveClass('invisible')

    await user.click(trigger)
    expect(getMenu()).not.toHaveClass('invisible')

    await user.click(trigger)
    expect(getMenu()).toHaveClass('invisible')
  })

  it('closes the menu on an outside click', async () => {
    const user = userEvent.setup()
    render(
      <>
        <RadioHarness />
        <p>Outside</p>
      </>,
    )

    await user.click(screen.getByRole('button', { name: 'Choose' }))
    expect(getMenu()).not.toHaveClass('invisible')

    await user.click(screen.getByText('Outside'))
    expect(getMenu()).toHaveClass('invisible')
  })

  it('selects a radio item and closes the menu', async () => {
    const user = userEvent.setup()
    const onItemClick = vi.fn()
    render(<RadioHarness onItemClick={onItemClick} />)

    await user.click(screen.getByRole('button', { name: 'Choose' }))
    await user.click(screen.getByText('Apple'))

    expect(onItemClick).toHaveBeenCalledWith(apple)
    expect(getMenu()).toHaveClass('invisible')
    expect(screen.getByRole('button', { name: 'Apple' })).toBeInTheDocument()
  })

  it('does not select a disabled item', async () => {
    const user = userEvent.setup()
    const onItemClick = vi.fn()
    render(<RadioHarness onItemClick={onItemClick} />)

    await user.click(screen.getByRole('button', { name: 'Choose' }))
    await user.click(screen.getByText('Cherry'))

    expect(onItemClick).not.toHaveBeenCalled()
    expect(getMenu()).not.toHaveClass('invisible')
  })

  it('disables the trigger when disabled', async () => {
    const user = userEvent.setup()
    render(<RadioHarness disabled />)

    const trigger = screen.getByRole('button', { name: 'Choose' })
    expect(trigger).toBeDisabled()

    await user.click(trigger)
    expect(getMenu()).toHaveClass('invisible')
  })

  it('renders the skeleton instead of the trigger while loading', () => {
    const { container } = render(<RadioHarness isLoading label="Fruit" />)

    expect(screen.queryByRole('button')).not.toBeInTheDocument()
    expect(container.querySelectorAll('.cube-skeleton')).toHaveLength(2)
  })

  it.each(cubeDropdownSizes)('applies the %s trigger size', (size) => {
    render(<RadioHarness size={size} />)

    expect(screen.getByRole('button', { name: 'Choose' })).toHaveClass(
      size === 'md' ? 'h-[38px]' : 'h-[34px]',
    )
  })

  it('toggles checkbox items and shows the selected count', async () => {
    const user = userEvent.setup()
    render(<CheckboxHarness />)

    await user.click(screen.getByRole('button', { name: 'Choose' }))
    await user.click(screen.getByRole('checkbox', { name: 'Apple' }))
    await user.click(screen.getByRole('checkbox', { name: 'Banana' }))

    expect(screen.getByText('(2)')).toBeInTheDocument()
    expect(getMenu()).not.toHaveClass('invisible')
  })

  it('selects and clears all enabled items with the "All" checkbox', async () => {
    const user = userEvent.setup()
    const onAllCheckChange = vi.fn()
    render(<CheckboxHarness onAllCheckChange={onAllCheckChange} />)

    await user.click(screen.getByRole('button', { name: 'Choose' }))
    const all = screen.getByRole('checkbox', { name: 'All' })

    await user.click(all)
    expect(onAllCheckChange).toHaveBeenLastCalledWith(true)
    expect(screen.getByText('(2)')).toBeInTheDocument()

    await user.click(all)
    expect(onAllCheckChange).toHaveBeenLastCalledWith(false)
    expect(screen.queryByText('(2)')).not.toBeInTheDocument()
  })

  it('filters items by the search value', async () => {
    const user = userEvent.setup()
    render(<CheckboxHarness variant="withFilter" />)

    await user.click(screen.getByRole('button', { name: 'Choose' }))
    await user.type(screen.getByPlaceholderText('Search'), 'ban')

    expect(screen.getByRole('checkbox', { name: 'Banana' })).toBeInTheDocument()
    expect(screen.queryByText('Apple')).not.toBeInTheDocument()
    // The "All" checkbox is hidden while a search value is set.
    expect(
      screen.queryByRole('checkbox', { name: 'All' }),
    ).not.toBeInTheDocument()
  })

  it('shows "No Data" when nothing matches the search value', async () => {
    const user = userEvent.setup()
    render(<CheckboxHarness variant="withFilter" />)

    await user.click(screen.getByRole('button', { name: 'Choose' }))
    await user.type(screen.getByPlaceholderText('Search'), 'zzz')

    expect(screen.getByText('No Data')).toBeInTheDocument()
  })

  it('shows "No Data" when the menu has no items', async () => {
    const user = userEvent.setup()
    render(<RadioHarness items={[]} />)

    await user.click(screen.getByRole('button', { name: 'Choose' }))

    expect(screen.getByText('No Data')).toBeInTheDocument()
  })

  it('clears the selection with the clear button without opening the menu', async () => {
    const user = userEvent.setup()
    const onClearSelection = vi.fn()
    render(
      <CheckboxHarness
        variant="withFilter"
        initialSelected={[apple]}
        onClearSelection={onClearSelection}
      />,
    )

    const trigger = screen.getByRole('button', { name: /Apple/ })
    // The clear button is the first icon after the "(1)" count.
    const clearButton = trigger.querySelector('svg')!
    await user.click(clearButton)

    expect(onClearSelection).toHaveBeenCalledOnce()
    expect(screen.getByRole('button', { name: 'Choose' })).toBeInTheDocument()
    expect(getMenu()).toHaveClass('invisible')
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<CheckboxHarness label="Fruit" />)

    expect(await axe(container)).toHaveNoViolations()
  })
})

describe('CubeDropdown test IDs', () => {
  type Network = { id: string; name: string }
  const webNet: Network = { id: 'n-1', name: 'web-net' }
  const dbNet: Network = { id: 'n-2', name: 'db-net' }
  const networks: Network[] = [webNet, dbNet]

  const TestIdHarness = (props: {
    type: 'radio' | 'checkbox'
    withFilter?: boolean
    testId?: string
    keyById?: boolean
    initialSelected?: Network[]
    onPick?: (network: Network) => void
  }) => {
    const {
      type,
      withFilter = false,
      testId,
      keyById = false,
      initialSelected = [],
      onPick,
    } = props
    const [selected, setSelected] = useState<Network[]>(initialSelected)
    const items = networks.map((network) => (
      <CubeDropdown.Item
        key={network.id}
        item={network}
        data-key={keyById ? network.id : undefined}
        onClick={() => {
          onPick?.(network)
          setSelected((prev) =>
            type === 'radio'
              ? [network]
              : prev.includes(network)
                ? prev.filter((n) => n !== network)
                : [...prev, network],
          )
        }}
      >
        {network.name}
      </CubeDropdown.Item>
    ))
    const children = [
      <CubeDropdown.Trigger key="trigger">
        {selected.map((n) => n.name).join(', ')}
      </CubeDropdown.Trigger>,
      <CubeDropdown.Menu key="menu">{items}</CubeDropdown.Menu>,
    ]

    if (type === 'radio') {
      return (
        <CubeDropdown
          type="radio"
          selectedItems={selected}
          data-testid={testId}
        >
          {children}
        </CubeDropdown>
      )
    }
    return withFilter ? (
      <CubeDropdown
        type="checkbox"
        variant="withFilter"
        selectedItems={selected}
        onAllCheckChange={(all) => setSelected(all ? networks : [])}
        onClearSelection={() => setSelected([])}
        data-testid={testId}
      >
        {children}
      </CubeDropdown>
    ) : (
      <CubeDropdown
        type="checkbox"
        selectedItems={selected}
        onAllCheckChange={(all) => setSelected(all ? networks : [])}
        data-testid={testId}
      >
        {children}
      </CubeDropdown>
    )
  }

  it('tags the dropdown, its trigger, and the menu rendered in a portal', () => {
    const { container } = render(
      <TestIdHarness type="radio" testId="network" />,
    )

    expect(container).toContainElement(screen.getByTestId('network'))
    expect(screen.getByTestId('network-trigger').tagName).toBe('BUTTON')
    expect(container).not.toContainElement(screen.getByTestId('network-menu'))
  })

  it('tags each option with its label as data-key by default', () => {
    render(<TestIdHarness type="radio" testId="network" />)

    const options = screen.getAllByTestId('network-option')
    expect(options.map((o) => o.getAttribute('data-key'))).toEqual([
      'web-net',
      'db-net',
    ])
  })

  it('uses the data-key an item passes, and a test can pick by it', async () => {
    const user = userEvent.setup()
    const onPick = vi.fn()
    render(
      <TestIdHarness type="radio" testId="network" keyById onPick={onPick} />,
    )

    await user.click(screen.getByTestId('network-trigger'))
    const option = document.querySelector(
      '[data-testid="network-option"][data-key="n-2"]',
    )
    if (!option) throw new Error('option n-2 not found')
    await user.click(option)

    expect(onPick).toHaveBeenCalledWith(dbNet)
  })

  it('puts a checkbox option on its visible label, which a test can click', async () => {
    const user = userEvent.setup()
    const onPick = vi.fn()
    render(<TestIdHarness type="checkbox" testId="network" onPick={onPick} />)

    await user.click(screen.getByTestId('network-trigger'))
    const first = screen.getAllByTestId('network-option')[0]
    if (!first) throw new Error('no option rendered')
    expect(first.tagName).toBe('LABEL')
    expect(first).toHaveAttribute('data-key', 'web-net')
    await user.click(first)

    expect(onPick).toHaveBeenCalledWith(webNet)
  })

  it('tags select-all, the search field, the clear button and the empty result', async () => {
    const user = userEvent.setup()
    render(
      <TestIdHarness
        type="checkbox"
        withFilter
        testId="network"
        initialSelected={[webNet]}
      />,
    )

    expect(screen.getByTestId('network-clear')).toBeInTheDocument()
    await user.click(screen.getByTestId('network-trigger'))
    expect(screen.getByTestId('network-all')).toBeInTheDocument()
    await user.type(screen.getByTestId('network-search'), 'nothing-matches')
    expect(screen.getByTestId('network-empty')).toBeInTheDocument()
  })

  it.each([undefined, ''])(
    'renders no test IDs for a data-testid of %j',
    (testId) => {
      render(
        <TestIdHarness
          type="checkbox"
          withFilter
          testId={testId}
          initialSelected={[webNet]}
        />,
      )

      expect(document.body.querySelector('[data-testid]')).toBeNull()
      expect(document.body.querySelector('[data-key]')).toBeNull()
    },
  )
})
