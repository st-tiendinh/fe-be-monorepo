# Monorepo Architecture Overview

## Structure Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        FE-BE-MONOREPO                            │
│                     (Turborepo Workspace)                        │
└─────────────────────────────────────────────────────────────────┘
                                 │
                 ┌───────────────┴───────────────┐
                 │                               │
           ┌─────▼─────┐                  ┌──────▼──────┐
           │   APPS    │                  │  PACKAGES   │
           └───────────┘                  └─────────────┘
                 │                               │
      ┌──────────┴──────────┐         ┌─────────┼─────────────┐
      │                     │         │         │             │
┌─────▼──────┐    ┌────────▼─────┐   │    ┌────▼────┐   ┌────▼────┐
│  FRONTEND  │    │   BACKEND    │   │    │  SHARED │   │  SHARED │
│  Next.js   │    │   NestJS     │   │    │  TYPES  │   │  UTILS  │
│  Port 3000 │    │   Port 3001  │   │    └────┬────┘   └────┬────┘
└─────┬──────┘    └────────┬─────┘   │         │             │
      │                    │          │         └──────┬──────┘
      │                    │          │                │
      └────────────────────┼──────────┘                │
                           │                           │
                           └───────────────────────────┘
                                  imports
```

## Data Flow

```
┌──────────────────────────────────────────────────────────────────┐
│                        SHARED PACKAGES                            │
│                                                                   │
│  @repo/shared-types          @repo/shared-utils                  │
│  ┌──────────────────┐        ┌──────────────────┐               │
│  │ • Product        │        │ • formatPrice()  │               │
│  │ • CartItem       │        │ • calculateTotal()│               │
│  │ • Order          │        │ • isValidEmail() │               │
│  │ • User           │        │ • formatDate()   │               │
│  │ • ApiResponse    │        │ • truncate()     │               │
│  └──────────────────┘        └──────────────────┘               │
└──────────────────────────────────────────────────────────────────┘
            ▲                              ▲
            │                              │
            │         imports              │
            │                              │
    ┌───────┴───────┐           ┌─────────┴────────┐
    │               │           │                  │
┌───▼────────┐  ┌───▼───────┐  │                  │
│  FRONTEND  │  │  BACKEND  │  │                  │
│            │  │           │  │                  │
│  Uses:     │  │  Uses:    │  │                  │
│  • Product │  │  • Product│  │                  │
│  • CartItem│  │  • format │  │                  │
│  • format  │  │  • types  │  │                  │
│  • utils   │  │           │  │                  │
└────────────┘  └───────────┘  │                  │
                                │                  │
                        ┌───────▼──────┐          │
                        │   API        │          │
                        │   HTTP/REST  │◄─────────┘
                        └──────────────┘
```

## Package Dependencies

```
┌─────────────────────────────────────────────────────────────────┐
│                      Package Dependency Graph                    │
└─────────────────────────────────────────────────────────────────┘

@repo/typescript-config ──┐
                          │
@repo/eslint-config ──────┼───────┐
                          │       │
                          ▼       ▼
                    @repo/shared-types
                          │
                          ▼
                    @repo/shared-utils
                          │
                ┌─────────┴─────────┐
                │                   │
                ▼                   ▼
            frontend            backend
          (Next.js)           (NestJS)
```

## File Sharing Example

```
┌────────────────────────────────────────────────────────────────┐
│                    SHARED TYPE DEFINITION                       │
│  packages/shared-types/src/product.types.ts                    │
│                                                                 │
│  export interface Product {                                    │
│    id: number;                                                 │
│    name: string;                                               │
│    price: number;                                              │
│    category: string;                                           │
│  }                                                             │
└────────────────────────────────────────────────────────────────┘
                          │
          ┌───────────────┴───────────────┐
          │                               │
          ▼                               ▼
┌─────────────────────┐         ┌─────────────────────┐
│    FRONTEND USE     │         │    BACKEND USE      │
│                     │         │                     │
│ import { Product }  │         │ import { Product }  │
│ from '@repo/...';   │         │ from '@repo/...';   │
│                     │         │                     │
│ const product:      │         │ findAll():         │
│   Product = {...}   │         │   Product[] {...}   │
└─────────────────────┘         └─────────────────────┘
```

## Benefits Visualization

```
┌────────────────────────────────────────────────────────────────┐
│                  WITHOUT SHARED PACKAGES                        │
├────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Frontend                    Backend                           │
│  ┌──────────────┐            ┌──────────────┐                 │
│  │ Product {    │            │ Product {    │                 │
│  │   id: number │            │   id: string │ ❌ Type Mismatch│
│  │   name: str  │            │   title: str │ ❌ Different    │
│  │ }            │            │ }            │                 │
│  └──────────────┘            └──────────────┘                 │
│                                                                 │
│  ❌ Duplicate code                                             │
│  ❌ Inconsistent types                                         │
│  ❌ No compile-time safety                                     │
└────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────┐
│                   WITH SHARED PACKAGES                          │
├────────────────────────────────────────────────────────────────┤
│                                                                 │
│              ┌────────────────────┐                            │
│              │  @repo/shared-types│                            │
│              │  Product {         │                            │
│              │    id: number      │                            │
│              │    name: string    │                            │
│              │  }                 │                            │
│              └─────────┬──────────┘                            │
│                        │                                        │
│              ┌─────────┴─────────┐                             │
│              ▼                   ▼                             │
│         Frontend              Backend                          │
│      Uses Product         Uses Product                         │
│                                                                 │
│  ✅ Single source of truth                                     │
│  ✅ Type safety across stack                                   │
│  ✅ Automatic updates                                          │
│  ✅ No duplication                                             │
└────────────────────────────────────────────────────────────────┘
```

## Development Workflow

```
┌────────────────────────────────────────────────────────────────┐
│                    TYPICAL DEVELOPMENT FLOW                     │
└────────────────────────────────────────────────────────────────┘

1. Define Types
   │
   ├─► packages/shared-types/src/product.types.ts
   │   export interface Product { ... }
   │
   ▼

2. Create Utils
   │
   ├─► packages/shared-utils/src/product.utils.ts
   │   import { Product } from '@repo/shared-types'
   │   export function formatPrice(product: Product) { ... }
   │
   ▼

3. Use in Backend
   │
   ├─► apps/backend/src/products/products.service.ts
   │   import { Product } from '@repo/shared-types'
   │   findAll(): Product[] { ... }
   │
   ▼

4. Use in Frontend
   │
   └─► apps/frontend/app/page.tsx
       import { Product } from '@repo/shared-types'
       import { formatPrice } from '@repo/shared-utils'
       
       const products: Product[] = await fetch(...)
       <span>{formatPrice(product)}</span>
```

## Turborepo Build Pipeline

```
┌────────────────────────────────────────────────────────────────┐
│                        BUILD PIPELINE                           │
└────────────────────────────────────────────────────────────────┘

Command: npm run build

┌───────────────┐
│ Turborepo     │
│ Orchestrator  │
└───────┬───────┘
        │
        ├─► Step 1: Build shared packages (parallel)
        │   ├─► @repo/shared-types ✓
        │   └─► @repo/shared-utils ✓
        │
        ├─► Step 2: Build applications (parallel)
        │   ├─► backend  ✓ (depends on shared-types, shared-utils)
        │   └─► frontend ✓ (depends on shared-types, shared-utils)
        │
        └─► Step 3: Cache results ✓
            (Next build reuses cache)
```

## Real-World Example

```
┌────────────────────────────────────────────────────────────────┐
│              ADDING A NEW PRODUCT FEATURE                       │
└────────────────────────────────────────────────────────────────┘

Task: Add "rating" field to products

Step 1: Update Type (ONE PLACE)
├─► packages/shared-types/src/product.types.ts
│   export interface Product {
│     ...existing fields...
│     rating?: number;  // ← Add here
│   }
│
Step 2: Automatic Propagation
├─► Frontend gets type automatically
│   • TypeScript knows about rating
│   • Autocomplete works
│   • Type-safe access
│
└─► Backend gets type automatically
    • Service methods updated
    • API response includes rating
    • Type-safe operations

✨ One change, everywhere updated!
```

This architecture ensures:
- **Type Safety**: Compile-time checks across the entire stack
- **Consistency**: Same data structures everywhere
- **Maintainability**: Change once, update everywhere
- **Developer Experience**: Great autocomplete and IntelliSense
- **Scalability**: Easy to add new shared code
