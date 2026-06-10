import { Product } from './types';

const NAMES = ["Widget", "Gadget", "Thingamajig", "Doohickey", "Gizmo", "Sprocket", "Bolt", "Nut", "Washer", "Spring"];

export const generateMockProducts = (count: number): Product[] => {
  const products: Product[] = [];
  const now = new Date();

  for (let i = 1; i <= count; i++) {
    const lastRestockDate = new Date();
    lastRestockDate.setDate(now.getDate() - Math.floor(Math.random() * 365));

    products.push({
      id: i.toString(),
      name: `${NAMES[Math.floor(Math.random() * NAMES.length)]} #${i}`,
      price: Math.random() * 990 + 10,
      stock: Math.floor(Math.random() * 100),
      lastRestockDate: lastRestockDate.toISOString(),
    });
  }
  return products;
};

export const calculatePriority = (product: Product): number => {
  const now = new Date();
  const lastRestock = new Date(product.lastRestockDate);
  const diffTime = Math.abs(now.getTime() - lastRestock.getTime());
  const daysSinceRestock = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  const priceWeight = 0.4;
  const stockWeight = 0.4;
  const dateWeight = 0.2;

  const maxPrice = 1000.0;
  const maxStock = 100.0;
  const maxDays = 365.0;

  const normalizedPrice = Math.min(Math.max(product.price / maxPrice, 0), 1);
  const normalizedStock = Math.min(Math.max(1.0 - (product.stock / maxStock), 0), 1);
  const normalizedDate = Math.min(Math.max(daysSinceRestock / maxDays, 0), 1);

  return (normalizedPrice * priceWeight) + (normalizedStock * stockWeight) + (normalizedDate * dateWeight);
};

export const getSortedProducts = (products: Product[]): Product[] => {
  // Heavy sorting logic
  return [...products].sort((a, b) => calculatePriority(b) - calculatePriority(a));
};
