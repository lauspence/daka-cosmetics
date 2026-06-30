export type StockStatus = "in_stock" | "sold_out";

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  category: Category;
  images: string[];
  stockStatus: StockStatus;
  featured: boolean;
}
