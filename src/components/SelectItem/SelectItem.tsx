import styles from "./SelectItem.module.scss";

interface IProps {
  product: string;
}

export const SelectItem = ({ product }: IProps) => {
  return (
    <option
      key={product}
      className={styles.selectProduct__product}
      id={product}
      value={product}
    >
      {product}
    </option>
  );
};
