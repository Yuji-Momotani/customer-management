# Customer Management - Project Overview

## Project Purpose
This is a customer management application built with Next.js. The project appears to be a LINE app integration (based on the @line/liff dependency) for managing customers. The project name suggests it's designed for customer relationship management functionality.

## Tech Stack
- **Frontend Framework**: Next.js 15.5.3 with React 19.1.0
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4
- **LINE Integration**: @line/liff 2.27.2 for LINE app functionality
- **Build Tool**: Next.js with Turbopack support
- **Linting**: ESLint 9 with Next.js configuration

## Project Structure
```
customer-management/
├── src/
│   ├── pages/           # Next.js pages (App Router style)
│   │   ├── index.tsx    # Home page
│   │   ├── _app.tsx     # App wrapper
│   │   ├── _document.tsx # Document wrapper
│   │   └── api/         # API routes
│   │       └── hello.ts # Example API endpoint
│   └── styles/
│       └── globals.css  # Global styles with Tailwind
├── public/              # Static assets
├── pages/               # Additional pages directory
└── styles/              # Additional styles directory
```

## Key Features
- LINE LIFF integration for mobile LINE app compatibility
- Customer management functionality (to be developed)
- Responsive design with Tailwind CSS
- TypeScript for type safety
- Modern React 19 with Next.js 15