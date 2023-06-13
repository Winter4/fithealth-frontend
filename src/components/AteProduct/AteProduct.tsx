import { IProduct, IProductItem } from "@/types";
import clsx from "clsx";
import styles from "./AteProduct.module.scss";
import { images } from "@/assets/images";

interface IProps {
  card: IProduct;
  product: IProductItem;
  changeColories: (id: string) => void;
  deleteProduct: (id: string) => void;
}

export const AteProduct = ({
  card,
  product,
  changeColories,
  deleteProduct,
}: IProps) => {
  return (
    <tr className={styles.product} key={product.id}>
      <td className={clsx(styles.td, "medium")}>{product.name}</td>
      <td
        className={clsx(styles.td, "medium")}
        onClick={() => changeColories(product.id)}
      >
        {product.weight}
      </td>
      <td className={clsx(styles.td, "medium")}>{product.calories}</td>
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
