import { ChangeEvent } from "react";
import { SelectItem } from "../SelectItem/SelectItem";
import styles from "./Input.module.scss";

interface IProps {
  allowedProducts: string[];
  onChange: (selected: string) => void;
}

export const Input = ({ allowedProducts, onChange }: IProps) => {
  return (
    <div className={styles.wrapper}>
      <input
        className={styles.selectProduct}
        list="products"
        placeholder="Продукт"
        defaultValue={allowedProducts[0]}
        onChange={(selected: ChangeEvent<HTMLInputElement>) =>
          onChange(selected.target.value)
        }
      />
      <datalist id="products">
        {allowedProducts.map((product) => (
          <SelectItem key={product} product={product} />
        ))}
      </datalist>
    </div>
  );
};
