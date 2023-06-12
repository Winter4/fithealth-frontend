import styles from "./Progress.module.scss";

interface IProps {
  max: number;
  value: number;
}

export const Progress = ({ max, value }: IProps) => {
  return (
    <div className={styles.progress}>
      <div
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        className={styles["progress-bar"]}
        style={{
          width: `${(value / max) * 100}%`,
          backgroundColor: value > max ? "#DA7B7B" : "#8fcf38",
        }}
      >{`${value} ккал / ${max} ккал`}</div>
    </div>
  );
};
