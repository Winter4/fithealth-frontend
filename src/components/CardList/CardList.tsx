import { CardItem } from "../CardItem/CardItem";
import { IProduct } from "@/types";
import clsx from "clsx";
import styles from "./CardList.module.scss";

interface IProps {
  cards: IProduct[];
}

export const CardList = ({ cards }: IProps) => {
  return (
    <ul className={styles.cards}>
      {cards.map((card) => (
        <CardItem key={card.id} card={card} />
      ))}
      <button className={clsx(styles.button, "big")}>ОТПРАВИТЬ</button>
    </ul>
  );
};
