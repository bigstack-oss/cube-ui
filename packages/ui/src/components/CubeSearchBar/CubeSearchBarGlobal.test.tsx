import { useState } from 'react'
import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import i18n from '@i18n/i18n'
import { CubeSearchBarGlobal } from './CubeSearchBarGlobal'
import type { CubeSearchBarGlobalProps } from './cubeSearchBarTypes'

type GlobalProps = {
  variant?: CubeSearchBarGlobalProps['variant']
  initialValue?: string
  categories?: string[]
  isLoading?: boolean
  withItems?: boolean
  onSuggestionClick?: (value: string) => void
  onSuggestionClear?: (value: string) => void
  onCategoryClick?: (category: string) => void
}

// A controlled global search bar with one suggestion and one recent suggestion.
const ControlledGlobal = (props: GlobalProps) => {
  const {
    variant = 'regular',
    initialValue = '',
    categories = ['Nodes', 'Instances'],
    isLoading,
    withItems = true,
    onSuggestionClick = () => {},
    onSuggestionClear = () => {},
    onCategoryClick = () => {},
  } = props

  const [value, setValue] = useState(initialValue)
  const [category, setCategory] = useState<string>()

  const items = withItems
    ? [
        <CubeSearchBarGlobal.Item
          key="node-1"
          type="suggestion"
          onClick={() => onSuggestionClick('node-1')}
        >
          node-1
        </CubeSearchBarGlobal.Item>,
        <CubeSearchBarGlobal.Item
          key="node-2"
          type="recentSuggestion"
          onClick={() => onSuggestionClick('node-2')}
          onSuggestionClear={() => onSuggestionClear('node-2')}
        >
          node-2
        </CubeSearchBarGlobal.Item>,
      ]
    : []

  const common = {
    isLoading,
    value,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      setValue(e.target.value),
    onInputClear: () => setValue(''),
  }

  if (variant === 'regular') {
    return (
      <CubeSearchBarGlobal {...common} variant="regular">
        {items}
      </CubeSearchBarGlobal>
    )
  }

  return (
    <CubeSearchBarGlobal
      {...common}
      variant="category"
      categories={categories}
      selectedCategory={category}
      onCategoryClick={(c) => {
        setCategory(c)
        onCategoryClick(c)
      }}
    >
      {items}
    </CubeSearchBarGlobal>
  )
}

const getInput = () => screen.getByRole('textbox')

// Portaled menus are hidden with `visibility: hidden` while closed.
const getOpenMenus = () =>
  Array.from(
    document.body.querySelectorAll<HTMLElement>(':scope > div.z-10'),
  ).filter((menu) => menu.style.visibility !== 'hidden')

describe('CubeSearchBarGlobal', () => {
  it('renders a rounded input with the default placeholder', () => {
    render(<ControlledGlobal />)

    expect(getInput()).toHaveAttribute('placeholder', 'Search')
    expect(getInput()).toHaveClass('rounded-full', 'pr-[42px]')
    expect(getOpenMenus()).toHaveLength(0)
  })

  it('opens the suggestions while typing, then clears', async () => {
    const user = userEvent.setup()
    render(<ControlledGlobal />)

    await user.type(getInput(), 'node')

    expect(getOpenMenus()).toHaveLength(1)
    expect(getOpenMenus()[0]).toHaveTextContent('node-1node-2')
    expect(getInput()).toHaveClass('pr-[64px]')

    // Clear icon, then search icon.
    await user.click(getInput().parentElement!.querySelector('svg')!)

    expect(getInput()).toHaveValue('')
    expect(getOpenMenus()).toHaveLength(0)
  })

  it('treats a whitespace-only value as empty', async () => {
    const user = userEvent.setup()
    render(<ControlledGlobal />)

    await user.type(getInput(), '   ')

    expect(getOpenMenus()).toHaveLength(0)
    expect(getInput()).toHaveClass('pr-[42px]')
  })

  it('stays closed without items', async () => {
    const user = userEvent.setup()
    render(<ControlledGlobal withItems={false} />)

    await user.type(getInput(), 'node')

    expect(getOpenMenus()).toHaveLength(0)
  })

  it('calls a suggestion onClick once per click', async () => {
    const user = userEvent.setup()
    const onSuggestionClick = vi.fn()
    render(
      <ControlledGlobal
        initialValue="node"
        onSuggestionClick={onSuggestionClick}
      />,
    )

    await user.click(screen.getByText('node-1'))

    expect(onSuggestionClick).toHaveBeenCalledTimes(1)
    expect(onSuggestionClick).toHaveBeenCalledWith('node-1')
  })

  it('clears a recent suggestion without selecting it', async () => {
    const user = userEvent.setup()
    const onSuggestionClick = vi.fn()
    const onSuggestionClear = vi.fn()
    render(
      <ControlledGlobal
        initialValue="node"
        onSuggestionClick={onSuggestionClick}
        onSuggestionClear={onSuggestionClear}
      />,
    )

    const recent = screen.getByText('node-2').closest('.primary-body3')!
    // Recently icon, then clear icon.
    expect(recent.querySelectorAll('svg')).toHaveLength(2)
    await user.click(recent.querySelectorAll('svg')[1]!)

    expect(onSuggestionClear).toHaveBeenCalledWith('node-2')
    expect(onSuggestionClick).not.toHaveBeenCalled()
  })

  it('closes the suggestions on an outside click', async () => {
    const user = userEvent.setup()
    render(
      <>
        <ControlledGlobal />
        <button type="button">Outside</button>
      </>,
    )

    await user.type(getInput(), 'node')
    await user.click(screen.getByRole('button', { name: 'Outside' }))

    expect(getOpenMenus()).toHaveLength(0)
  })

  it('picks a category from the category menu', async () => {
    const user = userEvent.setup()
    const onCategoryClick = vi.fn()
    render(
      <ControlledGlobal variant="category" onCategoryClick={onCategoryClick} />,
    )

    expect(getInput()).toHaveClass('rounded-l-full')
    await user.click(screen.getByText('Category'))
    expect(getOpenMenus()).toHaveLength(1)

    await user.click(screen.getByText('Instances'))

    expect(onCategoryClick).toHaveBeenCalledWith('Instances')
    expect(getOpenMenus()).toHaveLength(0)
    // The trigger shows the selected category.
    expect(document.querySelector('.max-w-\\[100px\\]')).toHaveTextContent(
      'Instances',
    )
  })

  it('shows "No Category" without categories', async () => {
    const user = userEvent.setup()
    render(<ControlledGlobal variant="category" categories={[]} />)

    await user.click(screen.getByText('Category'))

    expect(getOpenMenus()[0]).toHaveTextContent('No Category')
  })

  it('shows a rounded skeleton while loading', () => {
    const { container } = render(<ControlledGlobal isLoading />)

    expect(screen.queryByRole('textbox')).not.toBeInTheDocument()
    expect(container.firstChild).toHaveClass('cube-skeleton', 'rounded-full')
  })

  it('translates the labels in zh-TW', async () => {
    const user = userEvent.setup()
    await act(() => i18n.changeLanguage('zh-TW'))
    render(<ControlledGlobal variant="category" categories={[]} />)

    expect(getInput()).toHaveAttribute('placeholder', '搜尋')
    await user.click(screen.getByText('類別'))
    expect(getOpenMenus()[0]).toHaveTextContent('無類別')

    await act(() => i18n.changeLanguage('en-US'))
  })

  it('has no axe violations', async () => {
    const { container } = render(
      <ControlledGlobal variant="category" initialValue="node" />,
    )

    expect(await axe(container)).toHaveNoViolations()
  })
})
