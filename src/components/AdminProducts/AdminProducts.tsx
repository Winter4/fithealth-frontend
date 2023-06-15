import { IAdminProductItem } from "@/types";
import { AdminProduct } from "../AdminProduct/AdminProduct";
import styles from "./AdminProducts.module.scss";
import clsx from "clsx";
import { memo } from "react";

interface IProps {
  products: IAdminProductItem[];
  handleChecked: (id: number) => void;
  handleDelete: (id: number) => void;
}

export const AdminProducts = memo(function ({
  products,
  handleChecked,
  handleDelete,
}: IProps) {
  return (
    <>
      {products.map((product) => (
        <table className={styles.product} key={product.name}>
          <thead>
            <tr>
              <th className={clsx(styles.th, "small")} scope="col">
                Продукт
              </th>
              <th className={clsx(styles.th, "small")} scope="col">
                Калории
              </th>
              <th className={clsx(styles.th, "small")} scope="col">
                Белки, г
              </th>
              <th className={clsx(styles.th, "small")} scope="col">
                Жиры, г
              </th>
              <th className={clsx(styles.th, "small")} scope="col">
                Углеводы, г
              </th>
              <th className={clsx(styles.th, "small")} scope="col">
                Рек.
              </th>
            </tr>
          </thead>
          <tbody>
            <AdminProduct
              product={product}
              handleChecked={handleChecked}
              handleDelete={handleDelete}
            />
          </tbody>
        </table>
      ))}
    </>
  );
});
