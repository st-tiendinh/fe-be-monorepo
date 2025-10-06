/**
 * Product entity interface
 * Shared between frontend and backend
 */
export interface Product {
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

/**
 * Category type
 */
export type Category = 'Electronics' | 'Fashion' | 'Home' | 'Sports' | 'Books';

/**
 * Cart item interface
 */
export interface CartItem {
  product: Product;
  quantity: number;
}

/**
 * Order interface
 */
export interface Order {
  id: string;
  userId?: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Order status enum
 */
export enum OrderStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
}

/**
 * API Response wrapper
 */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

/**
 * Pagination metadata
 */
export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

/**
 * Paginated response
 */
export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  meta: PaginationMeta;
}
