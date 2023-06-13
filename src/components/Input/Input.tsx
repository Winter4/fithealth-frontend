import { ChangeEvent } from "react";
import { SelectItem } from "../SelectItem/SelectItem";
import styles from "./Input.module.scss";
import { IAllowedProduct } from "@/types";

interface IProps {
  id: string;
  allowedProducts: IAllowedProduct[];
  onChange: (selected: string) => void;
}

export const Input = ({ id, allowedProducts, onChange }: IProps) => {
  return (
    <div className={styles.wrapper}>
      <input
        className={styles.selectProduct}
        list={`i${id}`}
        placeholder="Продукт"
        id={id}
        onChange={(selected: ChangeEvent<HTMLInputElement>) =>
          onChange(selected.target.value)
        }
      />
      <label className={styles.label} htmlFor={id}></label>
      <datalist id={`i${id}`}>
        {allowedProducts.map((product) => (
          <SelectItem key={String(product.id)} product={product} />
        ))}
      </datalist>
    </div>
  );
};
