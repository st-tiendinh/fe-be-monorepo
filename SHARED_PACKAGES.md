# Shared Packages Documentation

## Overview

This monorepo implements shared packages that can be used by both the frontend (Next.js) and backend (NestJS) applications. This follows the core principle of monorepo architecture: **write once, use everywhere**.

## Package Structure

```
packages/
├── shared-types/          # Shared TypeScript types and interfaces
│   ├── src/
│   │   ├── product.types.ts
│   │   ├── user.types.ts
│   │   └── index.ts
│   ├── package.json
│   └── tsconfig.json
│
├── shared-utils/          # Shared utility functions
│   ├── src/
│   │   ├── product.utils.ts
│   │   ├── date.utils.ts
│   │   ├── validation.utils.ts
│   │   └── index.ts
│   ├── package.json
│   └── tsconfig.json
│
├── ui/                    # Shared React components
├── eslint-config/         # Shared ESLint configuration
└── typescript-config/     # Shared TypeScript configuration
```

## Shared Types Package (`@repo/shared-types`)

### Purpose
Defines all shared TypeScript types, interfaces, and enums used across the frontend and backend.

### Key Types

#### Product Types
```typescript
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

type Category = 'Electronics' | 'Fashion' | 'Home' | 'Sports' | 'Books';

interface CartItem {
  product: Product;
  quantity: number;
}

interface Order {
  id: string;
  userId?: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
}

enum OrderStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
}
```

#### User Types
```typescript
interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

enum UserRole {
  ADMIN = 'admin',
  CUSTOMER = 'customer',
}

interface AuthCredentials {
  email: string;
  password: string;
}

interface AuthResponse {
  user: User;
  token: string;
  expiresIn: number;
}
```

#### API Response Types
```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface PaginatedResponse<T> extends ApiResponse<T[]> {
  meta: PaginationMeta;
}
```

### Usage

**Frontend:**
```typescript
import { Product, CartItem, OrderStatus } from '@repo/shared-types';

const [cart, setCart] = useState<CartItem[]>([]);
```

**Backend:**
```typescript
import { Product, ApiResponse } from '@repo/shared-types';

@Get()
findAll(): ApiResponse<Product[]> {
  return {
    success: true,
    data: this.productsService.findAll(),
  };
}
```

## Shared Utils Package (`@repo/shared-utils`)

### Purpose
Provides reusable utility functions for common operations like formatting, validation, and calculations.

### Product Utilities (`product.utils.ts`)

```typescript
// Format price with currency
formatPrice(price: number, currency?: string): string

// Calculate discount price
calculateDiscountPrice(price: number, discountPercentage: number): number

// Calculate total cart value
calculateCartTotal(items: CartItem[]): number

// Check if product is in stock
isProductInStock(product: Product, quantity?: number): boolean

// Get discount percentage
getDiscountPercentage(originalPrice: number, salePrice: number): number
```

**Example:**
```typescript
import { formatPrice, calculateCartTotal } from '@repo/shared-utils';

// Frontend
<span>{formatPrice(product.price)}</span> // "$299.99"

const total = calculateCartTotal(cart); // 429.97
```

### Date Utilities (`date.utils.ts`)

```typescript
// Format date to readable string
formatDate(date: Date | string, locale?: string): string

// Format date with time
formatDateTime(date: Date | string, locale?: string): string

// Get relative time (e.g., "2 hours ago")
getRelativeTime(date: Date | string, locale?: string): string
```

**Example:**
```typescript
import { formatDate, getRelativeTime } from '@repo/shared-utils';

formatDate(new Date()) // "October 6, 2025"
getRelativeTime(product.createdAt) // "2 hours ago"
```

### Validation Utilities (`validation.utils.ts`)

```typescript
// Validate email format
isValidEmail(email: string): boolean

// Validate phone number
isValidPhone(phone: string): boolean

// Validate password strength
isStrongPassword(password: string): {
  isValid: boolean;
  errors: string[];
}

// Sanitize string (remove HTML tags)
sanitizeString(str: string): string

// Truncate string with ellipsis
truncate(str: string, maxLength: number): string
```

**Example:**
```typescript
import { isValidEmail, isStrongPassword } from '@repo/shared-utils';

// Frontend validation
if (!isValidEmail(email)) {
  setError('Invalid email format');
}

const passwordCheck = isStrongPassword(password);
if (!passwordCheck.isValid) {
  setErrors(passwordCheck.errors);
}
```

## Benefits of Shared Packages

### 1. **Single Source of Truth**
- Types are defined once and used everywhere
- Changes propagate automatically to all consumers
- No type mismatches between frontend and backend

### 2. **Code Reusability**
- Write utility functions once, use in multiple apps
- Reduces code duplication
- Easier to maintain and test

### 3. **Type Safety Across Stack**
- Full TypeScript support from frontend to backend
- Compile-time error checking
- Better IDE autocomplete and IntelliSense

### 4. **Consistency**
- Uniform data structures across applications
- Consistent validation rules
- Standardized formatting functions

### 5. **Easy Refactoring**
- Change a type in one place, update everywhere
- TypeScript compiler catches breaking changes
- Safer large-scale refactoring

## Adding New Shared Code

### Adding a New Type

1. Create or update a file in `packages/shared-types/src/`:
```typescript
// packages/shared-types/src/payment.types.ts
export interface Payment {
  id: string;
  orderId: string;
  amount: number;
  status: PaymentStatus;
  createdAt: Date;
}

export enum PaymentStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
}
```

2. Export from `index.ts`:
```typescript
// packages/shared-types/src/index.ts
export * from './payment.types';
```

3. Use in apps:
```typescript
import { Payment, PaymentStatus } from '@repo/shared-types';
```

### Adding a New Utility

1. Create or update a file in `packages/shared-utils/src/`:
```typescript
// packages/shared-utils/src/string.utils.ts
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
```

2. Export from `index.ts`:
```typescript
// packages/shared-utils/src/index.ts
export * from './string.utils';
```

3. Use in apps:
```typescript
import { capitalize, slugify } from '@repo/shared-utils';
```

## Current Usage

### Frontend (`apps/frontend`)

```typescript
// app/page.tsx
import { Product, CartItem } from '@repo/shared-types';
import { formatPrice, calculateCartTotal } from '@repo/shared-utils';

// Using shared types
const [products, setProducts] = useState<Product[]>([]);
const [cart, setCart] = useState<CartItem[]>([]);

// Using shared utilities
<span>{formatPrice(product.price)}</span>
const total = calculateCartTotal(cart);
```

### Backend (`apps/backend`)

```typescript
// src/products/products.service.ts
import { Product } from '@repo/shared-types';

@Injectable()
export class ProductsService {
  private products: Product[] = [...];
  
  findAll(): Product[] {
    return this.products;
  }
}
```

## Best Practices

### 1. **Keep Packages Focused**
- Each package should have a single, clear purpose
- Don't mix unrelated functionality

### 2. **Version Control**
- Use semantic versioning for breaking changes
- Document changes in each package

### 3. **Testing**
- Test shared utilities thoroughly
- They're used by multiple applications

### 4. **Documentation**
- Document all exported types and functions
- Use JSDoc comments for better IDE support

### 5. **Dependencies**
- Minimize external dependencies in shared packages
- Keep packages lightweight

## Testing Shared Packages

```bash
# Check types
npm run check-types

# Lint code
npm run lint

# Build to verify no errors
npm run build
```

## Future Enhancements

### Potential Additions
1. **Shared Schemas** - Zod or Yup schemas for validation
2. **Shared Constants** - API endpoints, error codes, etc.
3. **Shared Hooks** - Custom React hooks
4. **Shared Services** - API client utilities
5. **Shared Middleware** - Express/NestJS middleware
6. **Shared DTOs** - Data Transfer Objects for API

### Example: Adding Validation Schemas

```typescript
// packages/shared-schemas/src/product.schema.ts
import { z } from 'zod';

export const ProductSchema = z.object({
  id: z.number(),
  name: z.string().min(3).max(100),
  description: z.string().max(500),
  price: z.number().positive(),
  image: z.string().url(),
  category: z.enum(['Electronics', 'Fashion', 'Home', 'Sports', 'Books']),
  stock: z.number().nonnegative().optional(),
});

export type ProductInput = z.infer<typeof ProductSchema>;
```

## Troubleshooting

### Issue: Module not found
```bash
# Reinstall dependencies
npm install

# Clear cache and rebuild
npx turbo clean
npm run build
```

### Issue: Type errors
```bash
# Check TypeScript configuration
npm run check-types

# Ensure all packages are built
npm run build
```

## Conclusion

Shared packages are a powerful feature of monorepos that enable:
- **Code reuse** across applications
- **Type safety** throughout the stack
- **Consistency** in business logic
- **Easier maintenance** and refactoring

By centralizing types and utilities, we create a more maintainable and scalable codebase where changes propagate automatically and errors are caught at compile-time.
