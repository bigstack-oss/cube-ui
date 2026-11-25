import { utcTimeZoneToDisplay } from './cubeSideBarUtils'

describe('utcTimeZoneToDisplay', () => {
  it.each([
    ['+08:00', '+8'],
    ['-05:00', '-5'],
    ['+00:00', '+0'],
    // Only the hours are shown (legacy behavior).
    ['+05:30', '+5'],
    [undefined, '-'],
  ])('shows %s as %s', (utcTimeZone, expected) => {
    expect(utcTimeZoneToDisplay(utcTimeZone)).toBe(expected)
  })

  it('returns an invalid value as-is with a warning', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})

    expect(utcTimeZoneToDisplay('GMT+8')).toBe('GMT+8')
    expect(warn).toHaveBeenCalledWith('Invalid timezone GMT+8')

    warn.mockRestore()
  })
})
