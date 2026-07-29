/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />
/// <reference types="vitest/globals" />

// Side-effect CSS imports (fonts, Tailwind entry). Vite only ships types for
// `*.module.css`; plain `.css` needs an ambient module declaration.
declare module '*.css'
