// Augments Vitest's own `Assertion` (not `@types/jest`'s) with the
// `jest-axe` matcher registered in vitest.setup.ts via `expect.extend`.
import 'vitest'

declare module 'vitest' {
  interface Assertion<T = unknown> {
    toHaveNoViolations(): T extends Promise<unknown> ? Promise<void> : void
  }
}
