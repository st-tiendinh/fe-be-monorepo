# Shopping Page Monorepo# Turborepo starter



A full-stack shopping application built with Turborepo, featuring a Next.js + Tailwind CSS frontend and a NestJS backend.This Turborepo starter is maintained by the Turborepo core team.



## Project Structure## Using this example



```Run the following command:

fe-be-monorepo/

├── apps/```sh

│   ├── frontend/          # Next.js 15 + Tailwind CSSnpx create-turbo@latest

│   └── backend/           # NestJS REST API```

├── packages/

│   ├── ui/               # Shared UI components## What's inside?

│   ├── eslint-config/    # Shared ESLint config

│   └── typescript-config/ # Shared TypeScript configThis Turborepo includes the following packages/apps:

└── turbo.json            # Turborepo configuration

```### Apps and Packages



## Features- `docs`: a [Next.js](https://nextjs.org/) app

- `web`: another [Next.js](https://nextjs.org/) app

### Frontend (Next.js + Tailwind CSS)- `@repo/ui`: a stub React component library shared by both `web` and `docs` applications

- 🛍️ Product listing with category filtering- `@repo/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)

- 🛒 Shopping cart functionality- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

- 📱 Responsive design with Tailwind CSS

- 🎨 Modern UI with smooth animationsEach package/app is 100% [TypeScript](https://www.typescriptlang.org/).

- 🖼️ Image optimization with Next.js Image component

### Utilities

### Backend (NestJS)

- 🚀 RESTful API endpointsThis Turborepo has some additional tools already setup for you:

- 📦 Product management

- 🏷️ Category filtering- [TypeScript](https://www.typescriptlang.org/) for static type checking

- 🔒 CORS enabled for frontend- [ESLint](https://eslint.org/) for code linting

- 💾 In-memory data store (can be extended to use a database)- [Prettier](https://prettier.io) for code formatting



## Getting Started### Build



### PrerequisitesTo build all apps and packages, run the following command:

- Node.js 18 or higher

- npm```

cd my-turborepo

### Installation

# With [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation) installed (recommended)

1. Install dependencies:turbo build

```bash

npm install# Without [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation), use your package manager

```npx turbo build

yarn dlx turbo build

### Developmentpnpm exec turbo build

```

Run both frontend and backend in development mode:

You can build a specific package by using a [filter](https://turborepo.com/docs/crafting-your-repository/running-tasks#using-filters):

```bash

npm run dev```

```# With [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation) installed (recommended)

turbo build --filter=docs

This will start:

- Frontend: http://localhost:3000# Without [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation), use your package manager

- Backend: http://localhost:3001npx turbo build --filter=docs

yarn exec turbo build --filter=docs

### Individual App Commandspnpm exec turbo build --filter=docs

```

Run only the frontend:

```bash### Develop

cd apps/frontend

npm run devTo develop all apps and packages, run the following command:

```

```

Run only the backend:cd my-turborepo

```bash

cd apps/backend# With [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation) installed (recommended)

npm run devturbo dev

```

# Without [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation), use your package manager

### Buildnpx turbo dev

yarn exec turbo dev

Build all applications:pnpm exec turbo dev

```bash```

npm run build

```You can develop a specific package by using a [filter](https://turborepo.com/docs/crafting-your-repository/running-tasks#using-filters):



### Lint```

# With [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation) installed (recommended)

Lint all applications:turbo dev --filter=web

```bash

npm run lint# Without [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation), use your package manager

```npx turbo dev --filter=web

yarn exec turbo dev --filter=web

## API Endpointspnpm exec turbo dev --filter=web

```

### Products

- `GET /products` - Get all products### Remote Caching

- `GET /products/:id` - Get product by ID

- `GET /products/categories` - Get all categories> [!TIP]

- `GET /products/category/:category` - Get products by category> Vercel Remote Cache is free for all plans. Get started today at [vercel.com](https://vercel.com/signup?/signup?utm_source=remote-cache-sdk&utm_campaign=free_remote_cache).



## Tech StackTurborepo can use a technique known as [Remote Caching](https://turborepo.com/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.



### FrontendBy default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup?utm_source=turborepo-examples), then enter the following commands:

- **Next.js 15** - React framework with App Router

- **React 19** - UI library```

- **Tailwind CSS** - Utility-first CSS frameworkcd my-turborepo

- **TypeScript** - Type safety

# With [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation) installed (recommended)

### Backendturbo login

- **NestJS 11** - Progressive Node.js framework

- **TypeScript** - Type safety# Without [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation), use your package manager

- **Express** - HTTP servernpx turbo login

yarn exec turbo login

### Toolingpnpm exec turbo login

- **Turborepo** - Monorepo build system```

- **ESLint** - Code linting

- **Prettier** - Code formattingThis will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).



## Project ArchitectureNext, you can link your Turborepo to your Remote Cache by running the following command from the root of your Turborepo:



### Monorepo Benefits```

- 🔄 **Code Sharing**: Shared packages between frontend and backend# With [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation) installed (recommended)

- 🚀 **Fast Builds**: Turborepo's intelligent cachingturbo link

- 🧩 **Modular**: Easy to add new apps or packages

- 🎯 **Type Safety**: Shared TypeScript configurations# Without [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation), use your package manager

npx turbo link

### Future Enhancementsyarn exec turbo link

- [ ] Add database integration (PostgreSQL/MongoDB)pnpm exec turbo link

- [ ] Implement user authentication```

- [ ] Add order management system

- [ ] Implement payment integration## Useful Links

- [ ] Add admin dashboard

- [ ] Add product reviews and ratingsLearn more about the power of Turborepo:

- [ ] Implement search functionality

- [ ] Add real-time inventory updates- [Tasks](https://turborepo.com/docs/crafting-your-repository/running-tasks)

- [Caching](https://turborepo.com/docs/crafting-your-repository/caching)

## Contributing- [Remote Caching](https://turborepo.com/docs/core-concepts/remote-caching)

- [Filtering](https://turborepo.com/docs/crafting-your-repository/running-tasks#using-filters)

This is a monorepo managed with Turborepo. Each app and package can be developed independently while sharing common configurations and components.- [Configuration Options](https://turborepo.com/docs/reference/configuration)

- [CLI Usage](https://turborepo.com/docs/reference/command-line-reference)

## License

MIT
