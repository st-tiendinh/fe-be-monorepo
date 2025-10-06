'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Product, CartItem } from '@repo/shared-types';
import { formatPrice, calculateCartTotal } from '@repo/shared-utils';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState<number | null>(null);

  useEffect(() => {
    // Fetch products from backend API
    const fetchProducts = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
        const response = await fetch(`${apiUrl}/products`);
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          console.error('Failed to fetch products');
          // Fallback to mock data if API fails
          setProducts([
            {
              id: 1,
              name: 'Wireless Headphones',
              description: 'Premium noise-cancelling wireless headphones',
              price: 299.99,
              image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
              category: 'Electronics'
            },
            {
              id: 2,
              name: 'Smart Watch',
              description: 'Fitness tracking smartwatch with heart rate monitor',
              price: 199.99,
              image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
              category: 'Electronics'
            },
            {
              id: 3,
              name: 'Running Shoes',
              description: 'Comfortable running shoes with excellent support',
              price: 129.99,
              image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop',
              category: 'Fashion'
            },
            {
              id: 4,
              name: 'Backpack',
              description: 'Durable waterproof backpack for daily use',
              price: 79.99,
              image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop',
              category: 'Fashion'
            },
            {
              id: 5,
              name: 'Coffee Maker',
              description: 'Automatic coffee maker with programmable timer',
              price: 89.99,
              image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500&h=500&fit=crop',
              category: 'Home'
            },
            {
              id: 6,
              name: 'Desk Lamp',
              description: 'LED desk lamp with adjustable brightness',
              price: 49.99,
              image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&h=500&fit=crop',
              category: 'Home'
            }
          ]);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        // Use mock data as fallback
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, []);

  const addToCart = (product: Product) => {
    setAddingToCart(product.id);
    
    setTimeout(() => {
      const existingItem = cart.find(item => item.product.id === product.id);
      if (existingItem) {
        setCart(cart.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ));
      } else {
        setCart([...cart, { product, quantity: 1 }]);
      }
      setAddingToCart(null);
    }, 300);
  };

  const removeFromCart = (productId: number) => {
    setCart(cart.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(cart.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      ));
    }
  };

  const getTotalPrice = () => {
    return calculateCartTotal(cart);
  };

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(p => p.category === selectedCategory);

  const categories = ['all', ...Array.from(new Set(products.map(p => p.category)))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-40 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white text-xl font-bold">S</span>
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
                ShopMono
              </h1>
            </div>
            <button
              onClick={() => setIsCartOpen(!isCartOpen)}
              className="relative bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-2.5 rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 font-medium"
            >
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Cart
              </span>
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shadow-lg animate-pulse">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Discover Amazing Products
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Shop the latest trends in electronics, fashion, and home essentials
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-10">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
                <div className="h-72 bg-gray-200"></div>
                <div className="p-6">
                  <div className="h-4 bg-gray-200 rounded w-1/4 mb-3"></div>
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
                  <div className="flex justify-between">
                    <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                    <div className="h-10 bg-gray-200 rounded w-1/3"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Products Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product, index) => (
              <div
                key={product.id}
                style={{ animationDelay: `${index * 100}ms` }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group animate-[fadeIn_0.6s_ease-out_forwards] opacity-0"
              >
                <div className="relative h-72 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm text-primary-600 px-3 py-1 rounded-full text-xs font-bold shadow-md">
                      {product.category}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
                        {formatPrice(product.price)}
                      </span>
                    </div>
                    <button
                      onClick={() => addToCart(product)}
                      disabled={addingToCart === product.id}
                      className={`px-5 py-2.5 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${
                        addingToCart === product.id
                          ? 'bg-green-500 text-white shadow-lg'
                          : 'bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700 shadow-md hover:shadow-lg'
                      }`}
                    >
                      {addingToCart === product.id ? (
                        <span className="flex items-center gap-2">
                          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Added!
                        </span>
                      ) : (
                        'Add to Cart'
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🛍️</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600">Try selecting a different category</p>
          </div>
        )}
      </main>

      {/* Shopping Cart Sidebar */}
      {isCartOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 animate-[fadeIn_0.2s_ease-out]" 
          onClick={() => setIsCartOpen(false)}
        >
          <div
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl overflow-y-auto animate-[slideInRight_0.3s_ease-out]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6 pb-4 border-b">
                <h2 className="text-2xl font-bold text-gray-900">Shopping Cart</h2>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="text-gray-500 hover:text-gray-700 w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">🛒</div>
                  <p className="text-gray-500 text-lg">Your cart is empty</p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="mt-6 px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all duration-300 shadow-lg"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    {cart.map(item => (
                      <div key={item.product.id} className="flex gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                        <div className="relative w-24 h-24 bg-white rounded-lg overflow-hidden shadow-md flex-shrink-0">
                          <Image
                            src={item.product.image}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 mb-1 truncate">{item.product.name}</h3>
                          <p className="text-primary-600 font-bold mb-3">${item.product.price.toFixed(2)}</p>
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2 bg-white rounded-lg shadow-sm">
                              <button
                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                className="w-8 h-8 rounded-l-lg hover:bg-gray-100 flex items-center justify-center font-bold text-gray-600 transition-colors"
                              >
                                −
                              </button>
                              <span className="font-medium w-8 text-center">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                className="w-8 h-8 rounded-r-lg hover:bg-gray-100 flex items-center justify-center font-bold text-gray-600 transition-colors"
                              >
                                +
                              </button>
                            </div>
                            <button
                              onClick={() => removeFromCart(item.product.id)}
                              className="ml-auto text-red-500 hover:text-red-700 hover:bg-red-50 px-3 py-1 rounded-lg transition-all duration-200 text-sm font-medium"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-6 space-y-4">
                    <div className="flex justify-between items-center text-lg">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-semibold">${getTotalPrice().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center text-lg">
                      <span className="text-gray-600">Shipping</span>
                      <span className="text-green-600 font-semibold">FREE</span>
                    </div>
                    <div className="flex justify-between items-center text-2xl font-bold pt-4 border-t">
                      <span>Total</span>
                      <span className="bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
                        ${getTotalPrice().toFixed(2)}
                      </span>
                    </div>
                    <button className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white py-4 rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold text-lg transform hover:scale-[1.02]">
                      Proceed to Checkout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
