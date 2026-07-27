import { type Options, defineConfig } from 'tsup'

const config: Options = {
  entry: {
    index: 'src/index.ts',
    icons: 'src/icons/index.ts',
    theme: 'src/theme/index.ts',
  },
  format: ['cjs', 'esm'],
  dts: {
    compilerOptions: {
      ignoreDeprecations: '6.0',
    },
  },
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom'],
  treeshake: true,
  outExtension({ format }) {
    return { js: format === 'cjs' ? '.js' : '.mjs' }
  },
}

export default defineConfig(config)
