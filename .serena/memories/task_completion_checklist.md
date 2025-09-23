# Task Completion Checklist

## When a Development Task is Completed

### 1. Code Quality Checks
```bash
# Run linting to check for code style issues
npm run lint

# Fix any linting errors automatically if possible
npm run lint -- --fix
```

### 2. Build Verification
```bash
# Ensure the project builds successfully
npm run build
```

### 3. TypeScript Verification
- TypeScript compilation is included in the build process
- Check for any TypeScript errors during build
- Ensure all types are properly defined

### 4. Testing (if tests exist)
- Currently no test scripts are defined in package.json
- If tests are added later, run them before task completion

### 5. Development Server Check
```bash
# Verify development server starts without errors
npm run dev
```

### 6. Git Operations (if requested)
```bash
# Stage changes
git add .

# Commit with descriptive message
git commit -m "descriptive message"

# Push if working on a branch
git push
```

## Pre-Deployment Checklist
1. ✅ Code passes ESLint checks
2. ✅ Project builds without errors
3. ✅ TypeScript compilation succeeds
4. ✅ Development server runs cleanly
5. ✅ All imports resolve correctly
6. ✅ LINE LIFF integration works (if applicable)

## Notes
- This project uses strict TypeScript, so all type errors must be resolved
- ESLint is configured with Next.js best practices
- Tailwind CSS classes should be valid and not produce warnings
- Always test LINE LIFF functionality if modifying LINE-related features