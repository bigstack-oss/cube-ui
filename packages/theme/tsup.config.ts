import { type Options, defineConfig } from 'tsup'

const config: Options = {
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: {
    compilerOptions: {
      ignoreDeprecations: '6.0',
    },
  },
  splitting: false,
  sourcemap: true,
  clean: true,
  treeshake: true,
  outDir: 'dist',
  outExtension({ format }) {
    return { js: format === 'cjs' ? '.js' : '.mjs' }
  },
}

export default defineConfig(config)
