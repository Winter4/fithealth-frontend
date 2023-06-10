import { IProduct, IProductItem } from "@/types";
import clsx from "clsx";
import styles from "./AteProduct.module.scss";
import { images } from "@/assets/images";

interface IProps {
  card: IProduct;
  product: IProductItem;
  deleteProduct: (id: string) => void;
}

export const AteProduct = ({ card, product, deleteProduct }: IProps) => {
  return (
    <tr className={styles.product} key={product.id}>
      <td className={clsx(styles.td, "medium")}>{product.name}</td>
      <td className={clsx(styles.td, "medium")}>{product.weight}</td>
      <td className={clsx(styles.td, "medium")}>
        {card.calories - card.ateColories || 0}
      </td>
      <td className={clsx(styles.td, "medium")}>
        <button
          className={styles.button}
          onClick={() => deleteProduct(product.id)}
        >
          <img className="cross" src={images.cross} alt="" />
        </button>
      </td>
    </tr>
  );
};
