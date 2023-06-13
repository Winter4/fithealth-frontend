import { IAllowedProduct } from "@/types";
import styles from "./SelectItem.module.scss";

interface IProps {
  product: IAllowedProduct;
}

export const SelectItem = ({ product }: IProps) => {
  return (
    <option
      key={product.id}
      className={styles.selectProduct__product}
      data-id={String(product.id)}
      value={product.name}
    >
      {product.name}
    </option>
  );
};
