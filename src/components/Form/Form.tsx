import { ChangeEvent, FormEvent } from "react";
import clsx from "clsx";
import styles from "./Form.module.scss";

interface IProps {
  text: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export const Form = ({ text, handleChange, handleSubmit }: IProps) => {
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        className={styles.form__input}
        type="number"
        onChange={handleChange}
        value={text}
        placeholder="Масса, г"
      />
      <button className={clsx(styles.form__button, "big")}>Добавить</button>
    </form>
  );
};
