import { images } from "@/assets/images";
import styles from "./Header.module.scss";
import { Calories } from "@/context/calories";
import { useContext } from "react";
import { useAppSelector } from "@/hooks/useRedux";

/* TODO: Пользователь: ID 1.
 При загрузке страницы: GET /report/:uuid. Ответ - ID юзера, кол-во калорий на день. 
 В этот момент можно кинуть uuid в куки, чтоб не вставлять его каждый раз в куери или куда-то там
 */
export const Header = () => {
  const user = useAppSelector((state) => state.user.user.userId);
  const { max, value } = useContext(Calories);
  return (
    <header className={styles.header}>
      <div className={styles.header__container + " container"}>
        <div className={styles.logoBlock}>
          <img
            className={styles.logoBlock__logo}
            src={images.logo}
            alt="FitHealth"
          />
          <div className={styles.logoBlock__info}>
            <h1 className={styles.logoBlock__h1}>
              <span className={styles.logoBlock__span}>Fit</span>Health
            </h1>
            <p className={styles.logoBlock__p}>Nutrition сontrol system</p>
          </div>
        </div>
        <div className={styles.user}>
          <div className={styles["user__img-bg"]}>
            <img className={styles.user__img} src={images.user} alt="User" />
          </div>
          <div className={styles.user__info}>
            <h1 className={styles.user__h1 + " big"}>Пользователь: {user}</h1>
            <p className={styles.user__p + " medium"}>
              калорий за сегодня:{" "}
              <span
                className={styles.user__span}
                style={{
                  color: value > max ? "#DA7B7B" : "#8BC53D",
                }}
              >
                {`${value} из ${max}`}
              </span>
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};
