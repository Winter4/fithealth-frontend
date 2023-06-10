import { IProduct } from "@/types";
import styles from "./CardItem.module.scss";
import { ChangeEvent, FormEvent, useState } from "react";
import { Select } from "../Select/Select";
import { Form } from "../Form/Form";
import { Table } from "../Table/Table";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { addProduct, removeProduct } from "@/store/calories";
import { v4 as uuid } from "uuid";
import clsx from "clsx";

interface IProps {
  card: IProduct;
}

export const CardItem = ({ card }: IProps) => {
  const data = useAppSelector((state) =>
    state.calories.find((e) => e.id == card.id)
  );
  const dispath = useAppDispatch();

  const [weight, setWeight] = useState<string>("");
  const [name, setName] = useState<string>(data!.allowedProducts[0]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setWeight(event.target.value);
  };

  const handleChangeSelectItem = (selected: string) => {
    setName(selected);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (name === "") return;

    dispath(addProduct({ cardId: card.id, id: uuid(), name, weight: +weight }));
  };

  const deleteProduct = (id: string) => {
    dispath(removeProduct({ cardId: card.id, id: id }));
  };

  return (
    <li className={styles.cardItem}>
      <h2 className={clsx(styles.cardItem__h1, "big")}>
        {card.name}{" "}
      </h2>
      <Select
        id={data!.id}
        allowedProducts={data!.allowedProducts}
        onChange={handleChangeSelectItem}
      />
      <Form text={weight} handleSubmit={onSubmit} handleChange={handleChange} />
      <Table deleteProduct={deleteProduct} card={data!} />
    </li>
  );
};
