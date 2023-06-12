import { IProduct } from "@/types";
import styles from "./CardItem.module.scss";
import { ChangeEvent, FormEvent, useState } from "react";
import { Form } from "../Form/Form";
import { Table } from "../Table/Table";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { addProduct, changeColories, removeProduct } from "@/store/calories";
import { v4 as uuid } from "uuid";
import clsx from "clsx";
import { Input } from "../Input/Input";

interface IProps {
  card: IProduct;
}

export const CardItem = ({ card }: IProps) => {
  const data = useAppSelector((state) =>
    state.calories.products.find((e) => e.id == card.id)
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

    setWeight("");
  };

  const handleChangeColories = (id: string) => {
    console.log(id);
    const newColories = prompt(
      "Измените калории",
      String(data?.products.find((product) => product.id === id)?.weight)
    )!;

    dispath(changeColories({ cardId: card.id, id, newColories }));
  };

  const deleteProduct = (id: string) => {
    dispath(removeProduct({ cardId: card.id, id }));
  };

  return (
    <li className={styles.cardItem}>
      <h2 className={clsx(styles.cardItem__h1, "big")}>{card.name} </h2>
      <Input
        allowedProducts={data!.allowedProducts}
        onChange={handleChangeSelectItem}
      />
      <Form text={weight} handleSubmit={onSubmit} handleChange={handleChange} />
      {data!.products!.length > 0 && (
        <Table
          changeColories={handleChangeColories}
          deleteProduct={deleteProduct}
          card={data!}
        />
      )}
    </li>
  );
};
