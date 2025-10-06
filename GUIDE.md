# Monorepo Setup Guide

## Overview
This monorepo contains a full-stack shopping application with:
- **Frontend**: Next.js 15 + Tailwind CSS (Port 3000)
- **Backend**: NestJS (Port 3001)
- **Build System**: Turborepo

## Directory Structure

```
fe-be-monorepo/
├── apps/
│   ├── frontend/                    # Next.js Frontend
│   │   ├── app/                     # App Router pages
│   │   │   ├── page.tsx            # Main shopping page
│   │   │   ├── layout.tsx          # Root layout
│   │   │   └── globals.css         # Global styles with Tailwind
│   │   ├── public/                 # Static assets
│   │   ├── tailwind.config.ts      # Tailwind configuration
│   │   ├── postcss.config.js       # PostCSS configuration
│   │   ├── next.config.js          # Next.js configuration
│   │   ├── .env.local              # Environment variables
│   │   └── package.json
│   │
│   └── backend/                     # NestJS Backend
│       ├── src/
│       │   ├── main.ts             # Application entry point
│       │   ├── app.module.ts       # Root module
│       │   └── products/           # Products module
│       │       ├── products.controller.ts
│       │       ├── products.service.ts
│       │       └── products.module.ts
│       └── package.json
│
├── packages/                        # Shared packages
│   ├── ui/                         # Shared UI components
│   ├── eslint-config/              # Shared ESLint config
│   └── typescript-config/          # Shared TypeScript config
│
├── package.json                     # Root package.json
├── turbo.json                       # Turborepo configuration
└── README.md

```

## Key Features

### Frontend Features
1. **Product Display**: Grid layout with product cards
2. **Category Filter**: Filter products by category
3. **Shopping Cart**: Add/remove items, update quantities
4. **Responsive Design**: Mobile-first approach with Tailwind
5. **Image Optimization**: Next.js Image component
6. **API Integration**: Connects to NestJS backend

### Backend Features
1. **RESTful API**: Standard REST endpoints
2. **Products Management**: CRUD operations
3. **Category Filtering**: Get products by category
4. **CORS Enabled**: Configured for frontend access
5. **Type Safety**: Full TypeScript support

## Development Workflow

### Starting Development
```bash
# Start both apps simultaneously
npm run dev

# Or start individually
cd apps/frontend && npm run dev
cd apps/backend && npm run dev
```

### Building
```bash
# Build all apps
npm run build

# Build specific app
cd apps/frontend && npm run build
cd apps/backend && npm run build
```

### Linting
```bash
# Lint all apps
npm run lint

# Lint specific app
cd apps/frontend && npm run lint
cd apps/backend && npm run lint
```

## Configuration Files

### Root Configuration
- **package.json**: Defines workspaces and root scripts
- **turbo.json**: Configures Turborepo pipeline
- **.gitignore**: Standard ignores for Node.js monorepo

### Frontend Configuration
- **next.config.js**: Next.js settings, image domains
- **tailwind.config.ts**: Tailwind theme and content paths
- **postcss.config.js**: PostCSS plugins
- **.env.local**: Environment variables (API URL)
- **tsconfig.json**: TypeScript configuration

### Backend Configuration
- **nest-cli.json**: NestJS CLI configuration
- **tsconfig.json**: TypeScript configuration
- **eslint.config.mjs**: ESLint configuration

## API Documentation

### Base URL
```
http://localhost:3001
```

### Endpoints

#### Get All Products
```
GET /products
```
Response:
```json
[
  {
    "id": 1,
    "name": "Wireless Headphones",
    "description": "Premium noise-cancelling wireless headphones",
    "price": 299.99,
    "image": "...",
    "category": "Electronics",
    "stock": 50
  }
]
```

#### Get Product by ID
```
GET /products/:id
```

#### Get All Categories
```
GET /products/categories
```
Response:
```json
["Electronics", "Fashion", "Home"]
```

#### Get Products by Category
```
GET /products/category/:category
```

## Turborepo Features

### Caching
Turborepo caches build outputs to speed up subsequent builds:
```bash
# First build - full execution
npm run build

# Second build - from cache (instant)
npm run build
```

### Parallel Execution
Tasks run in parallel when possible:
```bash
# Runs both frontend and backend dev servers simultaneously
npm run dev
```

### Task Pipeline
Defined in `turbo.json`:
- **build**: Depends on `^build` (build dependencies first)
- **dev**: Persistent task (keeps running)
- **lint**: Lints all packages
- **check-types**: Type checking

## Adding New Features

### Adding a New Frontend Page
1. Create file in `apps/frontend/app/`
2. Use Tailwind classes for styling
3. Import shared components from `@repo/ui`

### Adding a New Backend Module
```bash
cd apps/backend
npx @nestjs/cli generate module feature-name
npx @nestjs/cli generate controller feature-name
npx @nestjs/cli generate service feature-name
```

### Adding a Shared Package
1. Create folder in `packages/`
2. Add `package.json` with package name
3. Reference in apps using workspace protocol

## Environment Variables

### Frontend (.env.local)
```bash
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### Backend (optional .env)
```bash
PORT=3001
```

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Kill process on port 3001
lsof -ti:3001 | xargs kill -9
```

### Clear Turborepo Cache
```bash
npx turbo clean
rm -rf node_modules
npm install
```

### Frontend Not Connecting to Backend
1. Check if backend is running on port 3001
2. Verify CORS is enabled in `apps/backend/src/main.ts`
3. Check `.env.local` has correct API URL

### Tailwind Styles Not Applying
1. Ensure `@tailwind` directives are in `globals.css`
2. Check `tailwind.config.ts` content paths
3. Restart dev server

## Best Practices

### Code Organization
- Keep business logic in services
- Use controllers for HTTP handling
- Share types between frontend and backend
- Use absolute imports

### Git Workflow
- Commit from root directory
- Use conventional commits
- Keep commits focused

### Performance
- Use Turborepo caching
- Optimize images with Next.js Image
- Use React.memo for expensive components
- Implement pagination for large datasets

## Next Steps

1. **Database Integration**: Add PostgreSQL or MongoDB
2. **Authentication**: Implement JWT-based auth
3. **Testing**: Add Jest and Cypress tests
4. **Docker**: Containerize applications
5. **CI/CD**: Set up GitHub Actions
6. **Monitoring**: Add error tracking
7. **Admin Panel**: Create admin dashboard

## Resources

- [Turborepo Docs](https://turbo.build/repo/docs)
- [Next.js Docs](https://nextjs.org/docs)
- [NestJS Docs](https://docs.nestjs.com)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
