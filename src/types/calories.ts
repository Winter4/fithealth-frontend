import { IAllowedProduct } from ".";

export interface IProductItem {
  id: string;
  name: string;
  weight: number;
  calories: number;
}

export interface IProduct {
  id: string;
  name: string;
  products: IProductItem[];
  allowedProducts: IAllowedProduct[];
}
