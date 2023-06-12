export interface IProductItem {
  id: string;
  name: string;
  weight: number;
}

export interface IProduct {
  id: string;
  name: string;
  products: IProductItem[];
  allowedProducts: string[];
}
