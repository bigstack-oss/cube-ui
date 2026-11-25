import { createContext } from 'react'

/**
 * The UTC offset (for example `"+08:00"`) that date components such as
 * `CubeDatePicker` use for "today". Without a provider they use local time.
 */
export const CubeTimeZoneContext = createContext<string | undefined>(undefined)
