export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  lastRestockDate: string; // ISO string
}
