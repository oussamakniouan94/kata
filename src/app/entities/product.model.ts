export interface Product {
  quantity: number;
  id: number;
  title: string;
  price: number;
  image: string;
  description?: string;
  category?: string;
  rating?: {
    rate: number;
    count: number;
  };
}