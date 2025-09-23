# Suggested Commands

## Development Commands
```bash
# Start development server with Turbopack
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Export static site
npm run export
```

## Code Quality Commands
```bash
# Run ESLint
npm run lint

# Fix ESLint issues automatically
npm run lint -- --fix
```

## System Commands (macOS/Darwin)
```bash
# List files and directories
ls -la

# Change directory
cd <directory_name>

# Search for files
find . -name "*.tsx" -type f

# Search content in files (use ripgrep if available)
rg "pattern" --type typescript

# Git operations
git status
git add .
git commit -m "message"
git push
```

## Package Management
```bash
# Install dependencies
npm install

# Install new dependency
npm install <package_name>

# Install dev dependency
npm install --save-dev <package_name>

# Update dependencies
npm update
```

## Next.js Specific
```bash
# Create new page (manual - create file in src/pages/)
touch src/pages/new-page.tsx

# Check Next.js info
npx next info

# Build and start production
npm run build && npm start
```

## Development Workflow
1. `npm run dev` - Start development
2. Edit files in `src/` directory
3. `npm run lint` - Check code quality
4. `npm run build` - Test production build
5. Commit changes with git