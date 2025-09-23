# Tech Stack and Dependencies

## Core Dependencies
- **next**: 15.5.3 - React framework for production
- **react**: 19.1.0 - JavaScript library for building user interfaces
- **react-dom**: 19.1.0 - React DOM bindings
- **@line/liff**: 2.27.2 - LINE Front-end Framework for LINE app integration

## Development Dependencies
- **typescript**: ^5 - TypeScript language support
- **@types/node**: ^20 - Node.js type definitions
- **@types/react**: ^19 - React type definitions
- **@types/react-dom**: ^19 - React DOM type definitions
- **eslint**: ^9 - JavaScript/TypeScript linter
- **eslint-config-next**: 15.5.3 - Next.js ESLint configuration
- **@eslint/eslintrc**: ^3 - ESLint configuration utilities
- **tailwindcss**: ^4 - Utility-first CSS framework
- **@tailwindcss/postcss**: ^4 - PostCSS plugin for Tailwind

## Build Tools and Configuration
- **PostCSS**: For CSS processing (postcss.config.mjs)
- **Turbopack**: Fast bundler (enabled in dev script)
- **TypeScript**: Strict mode enabled with path mapping (@/* -> ./src/*)
- **ESLint**: Next.js core web vitals and TypeScript configurations

## Runtime Environment
- **Target**: ES2017
- **Node.js**: Version ^20 (inferred from @types/node)
- **Browser Support**: Modern browsers with DOM, DOM iterable, and ESNext features