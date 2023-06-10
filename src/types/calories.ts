export interface IProductItem {
  id: string;
  name: string;
  weight: number;
}

export interface IProduct {
  id: string;
  name: string;
  ateColories: number;
  calories: number;
  products: IProductItem[];
  allowedProducts: string[];
}
