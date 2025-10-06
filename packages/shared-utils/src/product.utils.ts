import { Product } from '@repo/shared-types';

/**
 * Format price with currency symbol
 */
export function formatPrice(price: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(price);
}

/**
 * Calculate discount price
 */
export function calculateDiscountPrice(
  price: number,
  discountPercentage: number
): number {
  return price - (price * discountPercentage) / 100;
}

/**
 * Calculate total cart value
 */
export function calculateCartTotal(items: { product: Product; quantity: number }[]): number {
  return items.reduce((total, item) => total + item.product.price * item.quantity, 0);
}

/**
 * Check if product is in stock
 */
export function isProductInStock(product: Product, quantity: number = 1): boolean {
  return (product.stock ?? 0) >= quantity;
}

/**
 * Get discount percentage
 */
export function getDiscountPercentage(originalPrice: number, salePrice: number): number {
  return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
}
