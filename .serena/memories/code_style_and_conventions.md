# Code Style and Conventions

## TypeScript Configuration
- **Strict Mode**: Enabled (`"strict": true`)
- **Target**: ES2017
- **Module System**: ESNext with bundler resolution
- **Path Mapping**: `@/*` maps to `./src/*`
- **JSX**: Preserve mode for Next.js processing

## File Naming Conventions
- **Pages**: Use `.tsx` extension for React components
- **API Routes**: Use `.ts` extension for API endpoints
- **Components**: Likely `.tsx` for React components (inferred from structure)
- **Styles**: `.css` files with Tailwind directives

## Code Structure Patterns
- **Default Exports**: Used for page components (`export default function Home()`)
- **Named Functions**: Components use function declarations with PascalCase names
- **Import Organization**: 
  - External dependencies first
  - Local imports with `@/` path mapping
  - Type imports use `import type` syntax

## Styling Approach
- **Tailwind CSS**: Utility-first CSS framework
- **CSS Variables**: Used for theming (--background, --foreground)
- **Dark Mode**: Supported via `@media (prefers-color-scheme: dark)`
- **Font Management**: Google Fonts (Geist, Geist Mono) with CSS variables

## Component Patterns
- **Functional Components**: Arrow functions or function declarations
- **Props Typing**: TypeScript interfaces for component props
- **CSS Classes**: Template literals for dynamic className concatenation
- **Image Optimization**: Using Next.js `Image` component with proper alt text

## ESLint Configuration
- **Extends**: next/core-web-vitals, next/typescript
- **Ignores**: node_modules, .next, out, build, next-env.d.ts
- **Modern Config**: Uses flat config format with @eslint/eslintrc compatibility