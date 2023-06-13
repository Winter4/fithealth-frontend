import { CardItem } from "../CardItem/CardItem";
import { IProduct } from "@/types";
import styles from "./CardList.module.scss";

interface IProps {
  cards: IProduct[];
}

export const CardList = ({ cards }: IProps) => {
  return (
    <ul className={styles.cards}>
      {cards.length > 0 &&
        cards.map((card) => <CardItem key={card.id} card={card} />)}
    </ul>
  );
};
