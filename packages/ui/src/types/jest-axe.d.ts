// `@types/jest-axe` hard-references `@types/jest`, which clobbers Vitest's own
// global `expect` types. We only use `axe` + `toHaveNoViolations`, so we type
// that surface ourselves instead of pulling in the Jest-specific package.
declare module 'jest-axe' {
  export function axe(
    html: Element | string,
    options?: Record<string, unknown>,
  ): Promise<Record<string, unknown>>

  export const toHaveNoViolations: {
    toHaveNoViolations(results: unknown): {
      pass: boolean
      message(): string
    }
  }
}
