# Project Structure Details

## Directory Structure
```
customer-management/
├── .serena/                 # Serena AI assistant files
├── src/                     # Source code
│   ├── pages/              # Next.js pages (Pages Router)
│   │   ├── index.tsx       # Home page component
│   │   ├── _app.tsx        # App wrapper for global providers
│   │   ├── _document.tsx   # Custom document for HTML structure
│   │   └── api/            # API routes
│   │       └── hello.ts    # Example API endpoint
│   └── styles/             # CSS styles
│       └── globals.css     # Global styles with Tailwind
├── pages/                  # Additional pages directory (legacy or backup)
├── public/                 # Static assets (images, icons, etc.)
├── styles/                 # Additional styles directory
└── Configuration files
```

## Configuration Files
- **package.json**: Dependencies and npm scripts
- **tsconfig.json**: TypeScript configuration
- **eslint.config.mjs**: ESLint configuration (flat config)
- **next.config.ts**: Next.js configuration
- **postcss.config.mjs**: PostCSS configuration for Tailwind
- **netlify.toml**: Netlify deployment configuration
- **.env.example**: Environment variables template
- **.gitignore**: Git ignore patterns

## Key Files and Their Purpose
- **src/pages/index.tsx**: Main landing page with Next.js starter content
- **src/pages/_app.tsx**: Global app wrapper for providers and global styles
- **src/styles/globals.css**: Global CSS with Tailwind imports and CSS variables
- **src/pages/api/hello.ts**: Example API route for backend functionality

## Import Patterns
- `@/*` resolves to `src/*` (configured in tsconfig.json)
- External dependencies imported before local modules
- Type imports use `import type` syntax

## Asset Management
- Static assets in `public/` directory
- Next.js `Image` component used for optimized images
- SVG icons referenced from public directory

## Development Environment
- Uses Next.js Pages Router (not App Router)
- TypeScript with strict mode enabled
- Tailwind CSS v4 for styling
- ESLint for code quality
- LINE LIFF for LINE app integration