import { IProduct } from "@/types";
import clsx from "clsx";
import styles from "./Table.module.scss";
import { AteProduct } from "../AteProduct/AteProduct";

interface IProps {
  card: IProduct;
  changeColories: (id: string) => void;
  deleteProduct: (id: string) => void;
}

export const Table = ({ card, changeColories, deleteProduct }: IProps) => {
  return (
    <>
      <table className={styles.product}>
        <thead>
          <tr>
            <th className={clsx(styles.th, "small")}>Продукт</th>
            <th className={clsx(styles.th, "small")}>Масса, г</th>
            <th className={clsx(styles.th, "small")}>Калорий</th>
          </tr>
        </thead>
        <tbody>
          {card.products.map((product) => (
            <AteProduct
              key={product.id}
              changeColories={changeColories}
              deleteProduct={deleteProduct}
              card={card}
              product={product}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};
