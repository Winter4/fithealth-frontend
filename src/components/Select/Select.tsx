import { ChangeEvent } from "react";
import { SelecItem } from "../SelectItem/SelecItem";
import styles from "./Select.module.scss";

interface IProps {
  allowedProducts: string[];
  onChange: (selected: string) => void;
  id: string;
}

export const Select = ({ allowedProducts, id, onChange }: IProps) => {
  return (
    <div className={styles.wrapper}>
      <select
        className={styles.selectProduct}
        defaultValue={"Продукт"}
        placeholder={"Продукт"}
        id={id}
        onChange={(selected: ChangeEvent<HTMLSelectElement>) =>
          onChange(selected.target.value)
        }
      >
        {allowedProducts.map((product) => (
          <SelecItem key={product} product={product} />
        ))}
      </select>
    </div>
  );
};
