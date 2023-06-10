import { IProduct } from "@/types";
import clsx from "clsx";
import styles from "./Table.module.scss";
import { AteProduct } from "../AteProduct/AteProduct";

interface IProps {
  card: IProduct;
  deleteProduct: (id: string) => void;
}

export const Table = ({ card, deleteProduct }: IProps) => {
  return (
    <>
      {card.products.map((product) => (
        <table key={product.id} className={styles.product}>
          <thead>
            <tr>
              <th className={clsx(styles.th, "small")}>Продукт</th>
              <th className={clsx(styles.th, "small")}>Съедено, г</th>
              <th className={clsx(styles.th, "small")}>Калорий</th>
            </tr>
          </thead>
          <tbody>
            <AteProduct
              deleteProduct={deleteProduct}
              card={card}
              product={product}
            />
          </tbody>
        </table>
      ))}
    </>
  );
};
