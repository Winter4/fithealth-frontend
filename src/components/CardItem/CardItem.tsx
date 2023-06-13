/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { IProduct } from "@/types";
import styles from "./CardItem.module.scss";
import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { Form } from "../Form/Form";
import { Table } from "../Table/Table";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import {
  FetchAddProduct,
  FetchRemoveProduct,
  changeColories,
  removeProduct,
} from "@/store/calories";
import { v4 as uuid } from "uuid";
import clsx from "clsx";
import { Input } from "../Input/Input";
import { Tab } from "@/context/tab";

interface IProps {
  card: IProduct;
}

export const CardItem = ({ card }: IProps) => {
  const data = useAppSelector((state) =>
    state.calories.products.find((e) => e.id == card.id)
  )!;
  const tab = useContext(Tab);
  const dispath = useAppDispatch();

  const [weight, setWeight] = useState<string>("");
  const [name, setName] = useState<string>(
    data?.allowedProducts[0]?.name || ""
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setWeight(event.target.value);
  };

  const handleChangeSelectItem = (selected: string) => {
    setName(selected);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (name === "") return;
    dispath(
      FetchAddProduct({
        cardId: card.id,
        id: uuid(),
        name,
        weight: +weight,
        foodId: +data?.allowedProducts.find((e) => e.name === name)?.id!,
        tab,
      })
    );

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
    dispath(FetchRemoveProduct(id));
    dispath(removeProduct({ cardId: card.id, id }));
  };

  return (
    <li className={styles.cardItem}>
      <h2 className={clsx(styles.cardItem__h1, "big")}>{data.name} </h2>
      <Input
        id={data.id || uuid()}
        allowedProducts={data.allowedProducts}
        onChange={handleChangeSelectItem}
      />
      <Form text={weight} handleSubmit={onSubmit} handleChange={handleChange} />
      {data.products.length > 0 && (
        <Table
          changeColories={handleChangeColories}
          deleteProduct={deleteProduct}
          card={data}
        />
      )}
    </li>
  );
};
