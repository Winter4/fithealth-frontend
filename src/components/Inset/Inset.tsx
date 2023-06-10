import { ITab } from "@/types";
import { Tabs } from "../Tabs/Tabs";
import styles from "./Inset.module.scss";

interface IProps {
  tabs: ITab[];
  switchTab: (index: number) => void;
  activeIndex: number;
}

export const Inset = ({ tabs, switchTab, activeIndex }: IProps) => {
  return (
    <div className={styles.inset}>
      <Tabs tabs={tabs} switchTab={switchTab} activeIndex={activeIndex} />
      <div className={styles.inset__content}>{tabs[activeIndex].content}</div>
    </div>
  );
};
