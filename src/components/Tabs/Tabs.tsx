import { ITab } from "@/types";
import clsx from "clsx";
import styles from "./Tabs.module.scss";

interface IProps {
  tabs: ITab[];
  switchTab: (index: number) => void;
  activeIndex: number;
}

export const Tabs = ({ tabs, switchTab, activeIndex }: IProps) => {
  return (
    <div className={styles.tabs}>
      {tabs.map((tab, index) => (
        <button
          key={index}
          onClick={() => switchTab(index)}
          className={
            activeIndex === index
              ? clsx(styles["tab-active"], styles.tab)
              : styles.tab
          }
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};
