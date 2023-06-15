import { IAdminProductItem } from "@/types";
import clsx from "clsx";
import styles from "./AdminProduct.module.scss";
import { images } from "@/assets/images";

interface IProps {
  product: IAdminProductItem;
  handleChecked: (id: number) => void;
  handleDelete: (id: number) => void;
}

export const AdminProduct = ({
  product,
  handleChecked,
  handleDelete,
}: IProps) => {
  return (
    <tr className={styles.product}>
      <td
        scope="row"
        className={clsx(styles.td, "medium")}
        data-label="Продукт"
      >
        {product.name}
      </td>
      <td className={clsx(styles.td, "medium")} data-label="Калории">
        {product.calories}
      </td>
      <td className={clsx(styles.td, "medium")} data-label="Белки, г">
        {product.proteins}
      </td>
      <td className={clsx(styles.td, "medium")} data-label="Жиры, г">
        {product.fats}
      </td>
      <td className={clsx(styles.td, "medium")} data-label="Углеводы, г">
        {product.carbs}
      </td>
      <td className={styles.checkbox__wrapper} data-label="Рек.">
        <input
          type="checkbox"
          checked={product.healthy}
          className={styles["custom-checkbox"]}
          id={`${product.name}custom-checkbox`}
          onChange={() => handleChecked(product.id)}
        />
        <label
          htmlFor={`${product.name}custom-checkbox`}
          className={styles["custom-checkbox-label"]}
          id="custom-checkbox-label"
        ></label>
      </td>
      <td className={clsx(styles.td, "medium")}>
        <button
          className={styles.button}
          onClick={() => handleDelete(product.id)}
        >
          <img className="cross" src={images.cross} alt="" />
        </button>
      </td>
    </tr>
  );
};
