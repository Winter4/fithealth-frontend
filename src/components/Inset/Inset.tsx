import { ITab } from "@/types";
import { Tabs } from "../Tabs/Tabs";
import styles from "./Inset.module.scss";
import { useContext } from "react";
import { Calories } from "@/context/calories";
import { Progress } from "../Progress/Progress";

interface IProps {
  tabs: ITab[];
  switchTab: (index: number) => void;
  activeIndex: number;
}

export const Inset = ({ tabs, switchTab, activeIndex }: IProps) => {
  const { value, max } = useContext(Calories);
  return (
    <div className={styles.inset}>
      <Tabs tabs={tabs} switchTab={switchTab} activeIndex={activeIndex} />
      <div className={styles.inset__content}>
        <Progress value={value} max={max} />
        {tabs[activeIndex].content}
      </div>
    </div>
  );
};
