import { Injectable } from '@nestjs/common';
import { Product } from '@repo/shared-types';

@Injectable()
export class ProductsService {
  private products: Product[] = [
    {
      id: 1,
      name: 'Wireless Headphones',
      description: 'Premium noise-cancelling wireless headphones',
      price: 299.99,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
      category: 'Electronics',
      stock: 50
    },
    {
      id: 2,
      name: 'Smart Watch',
      description: 'Fitness tracking smartwatch with heart rate monitor',
      price: 199.99,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
      category: 'Electronics',
      stock: 30
    },
    {
      id: 3,
      name: 'Running Shoes',
      description: 'Comfortable running shoes with excellent support',
      price: 129.99,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop',
      category: 'Fashion',
      stock: 100
    },
    {
      id: 4,
      name: 'Backpack',
      description: 'Durable waterproof backpack for daily use',
      price: 79.99,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop',
      category: 'Fashion',
      stock: 75
    },
    {
      id: 5,
      name: 'Coffee Maker',
      description: 'Automatic coffee maker with programmable timer',
      price: 89.99,
      image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500&h=500&fit=crop',
      category: 'Home',
      stock: 40
    },
    {
      id: 6,
      name: 'Desk Lamp',
      description: 'LED desk lamp with adjustable brightness',
      price: 49.99,
      image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&h=500&fit=crop',
      category: 'Home',
      stock: 60
    }
  ];

  findAll(): Product[] {
    return this.products;
  }

  findOne(id: number): Product | undefined {
    return this.products.find(product => product.id === id);
  }

  findByCategory(category: string): Product[] {
    return this.products.filter(product => 
      product.category.toLowerCase() === category.toLowerCase()
    );
  }

  getCategories(): string[] {
    return Array.from(new Set(this.products.map(p => p.category)));
  }
}
