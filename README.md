# cube-ui

## File Structure

```
packages/
├── theme/
│   ├── package.json
│   └── src/
│       └── index.css        ← raw CSS custom properties
└── ui/
    └── src/
        ├── styles.css        ← new; replaces tailwind.css (v3 syntax)
        └── components/
            └── Button/
                └── Button.tsx  ← refactored to use theme tokens
```
