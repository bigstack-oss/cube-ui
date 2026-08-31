import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { CubeTabs } from './CubeTabs'

describe('CubeTabs', () => {
  it('renders its children as tab labels', () => {
    render(
      <CubeTabs>
        <CubeTabs.Tab isActive>Label 1</CubeTabs.Tab>
        <CubeTabs.Tab isActive={false}>Label 2</CubeTabs.Tab>
      </CubeTabs>,
    )

    expect(screen.getByText('Label 1')).toBeInTheDocument()
    expect(screen.getByText('Label 2')).toBeInTheDocument()
  })

  it('renders a decorative number when the number prop is set', () => {
    render(
      <CubeTabs>
        <CubeTabs.Tab isActive number={2}>
          Label 1
        </CubeTabs.Tab>
      </CubeTabs>,
    )

    expect(screen.getByText('2')).toBeInTheDocument()
  })

  it('caps the displayed number at 99', () => {
    render(
      <CubeTabs>
        <CubeTabs.Tab isActive number={100}>
          Label 1
        </CubeTabs.Tab>
      </CubeTabs>,
    )

    expect(screen.getByText('N')).toBeInTheDocument()
    expect(screen.queryByText('100')).not.toBeInTheDocument()
  })

  it('renders as a link when href is given', () => {
    render(
      <CubeTabs>
        <CubeTabs.Tab isActive href="hello-world">
          Label 1
        </CubeTabs.Tab>
      </CubeTabs>,
    )

    expect(screen.getByRole('link', { name: 'Label 1' })).toHaveAttribute(
      'href',
      'hello-world',
    )
  })

  it('renders as a non-link element when disabled, even with an href', () => {
    render(
      <CubeTabs>
        <CubeTabs.Tab isActive href="hello-world" disabled>
          Label 1
        </CubeTabs.Tab>
      </CubeTabs>,
    )

    expect(screen.queryByRole('link')).not.toBeInTheDocument()
  })

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(
      <CubeTabs>
        <CubeTabs.Tab isActive={false} onClick={onClick}>
          Label 1
        </CubeTabs.Tab>
      </CubeTabs>,
    )

    await user.click(screen.getByText('Label 1'))

    expect(onClick).toHaveBeenCalledOnce()
  })

  it('does not call onClick when disabled', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(
      <CubeTabs>
        <CubeTabs.Tab isActive={false} disabled onClick={onClick}>
          Label 1
        </CubeTabs.Tab>
      </CubeTabs>,
    )

    await user.click(screen.getByText('Label 1'))

    expect(onClick).not.toHaveBeenCalled()
  })

  it('renders its skeleton via the compound API', () => {
    const { container } = render(
      <CubeTabs>
        <CubeTabs.Skeleton />
      </CubeTabs>,
    )

    expect(screen.queryByText(/label/i)).not.toBeInTheDocument()
    expect(container.querySelector('div > div')).toBeInTheDocument()
  })

  it('has no accessibility violations', async () => {
    const { container } = render(
      <CubeTabs>
        <CubeTabs.Tab isActive number={2}>
          Label 1
        </CubeTabs.Tab>
        <CubeTabs.Tab isActive={false} dot href="hello-world">
          Label 2
        </CubeTabs.Tab>
        <CubeTabs.Tab isActive={false} disabled>
          Label 3
        </CubeTabs.Tab>
      </CubeTabs>,
    )

    expect(await axe(container)).toHaveNoViolations()
  })
})
