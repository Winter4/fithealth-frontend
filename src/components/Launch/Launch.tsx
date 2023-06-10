import { IProduct } from "@/types";
import { CardList } from "../CardList/CardList";
import styles from "./Launch.module.scss";
import { useContext } from "react";
import { Calories } from "@/context/calories";
import { Progress } from "../Progress/Progress";

interface IProps {
  cards: IProduct[];
}

export const Launch = ({ cards }: IProps) => {
  const { value, max } = useContext(Calories);
  return (
    <div className={styles.launch}>
      <Progress value={value} max={max} />
      <CardList cards={cards} />
    </div>
  );
};
