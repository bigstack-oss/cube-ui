/** @type {import('@svgr/core').Config} */
export default {
  typescript: true,
  ref: true,
  titleProp: true,
  expandProps: 'end',
  dimensions: false,
  filenameCase: 'pascal',
  prettier: false,
  jsxRuntime: 'automatic',
  template: (variables, { tpl }) => tpl`
import type { Ref, SVGProps } from 'react'
import { forwardRef } from 'react'

${variables.interfaces}

const ${variables.componentName} = (${variables.props}) => ${variables.jsx}

const ForwardRef = forwardRef(${variables.componentName})
export default ForwardRef
`,
}
