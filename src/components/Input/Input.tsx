import { useRef, ChangeEvent } from "react";
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
        list={id}
        placeholder="Продукт"
        defaultValue={allowedProducts[0].name}
        onChange={(selected: ChangeEvent<HTMLInputElement>) =>
          onChange(selected.target.value)
        }
      />
      <datalist id={id}>
        {allowedProducts.map((product) => (
          <SelectItem key={String(product.id)} product={product} />
        ))}
      </datalist>
    </div>
  );
};
