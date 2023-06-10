import styles from "./LineProducts.module.scss";
import { images } from "@/assets/images";

export const LineProducts = () => {
  return (
    <div className={styles.lineProducts}>
      <img
        className={styles.lineProducts__line}
        src={images.greenLine}
        alt="Line"
      />
      <img
        className={styles.lineProducts__products}
        src={images.products}
        alt="Products"
      />
      <img
        className={styles.lineProducts__greyLine}
        src={images.line}
        alt="Line"
      />
    </div>
  );
};
