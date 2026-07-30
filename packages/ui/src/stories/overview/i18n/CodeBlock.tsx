import type { PropsWithChildren } from 'react'
import { Highlight, themes } from 'prism-react-renderer'
import type { Language } from 'prism-react-renderer'

type CodeBlockProps = PropsWithChildren & { language?: Language }

export const CodeBlock = (props: CodeBlockProps) => {
  const { children, language = 'tsx' } = props

  const code = typeof children === 'string' ? children.trim() : ''

  return (
    <Highlight code={code} language={language} theme={themes.nightOwl}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={`${className} w-full overflow-x-auto rounded-lg p-4 text-sm`}
          style={style}
        >
          <code className="font-mono">
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </code>
        </pre>
      )}
    </Highlight>
  )
}
