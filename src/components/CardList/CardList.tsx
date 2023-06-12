import { CardItem } from "../CardItem/CardItem";
import { IProduct } from "@/types";
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
    </ul>
  );
};
