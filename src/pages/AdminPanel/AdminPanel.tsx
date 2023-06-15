import { images } from "@/assets/images";
import "./AdminPanel.scss";
import { AdminProducts } from "@/components";
import { useAppSelector } from "@/hooks/useRedux";
import { useAppDispatch } from "@/hooks/useRedux";
import { ChangeEvent, useEffect, useState } from "react";
import {
  FetchAddProduct,
  FetchDeleteProduct,
  FetchProducts,
  FetchToggleChecked,
} from "@/store/products";

export const AdminPanel = () => {
  const products = useAppSelector((state) => state.products.products);
  const [checked, setChecked] = useState<boolean>(false);

  const [data, setData] = useState<{
    calories: string;
    proteins: string;
    fats: string;
    carbs: string;
    name: string;
  }>({ calories: "", proteins: "", fats: "", carbs: "", name: "" });
  const dispath = useAppDispatch();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispath(
      FetchAddProduct({
        healthy: checked,
        fats: +data.fats,
        carbs: +data.carbs,
        proteins: +data.proteins,
        calories: +data.calories,
        name: data.name,
      })
    );
    console.log(products);
  };

  useEffect(() => {
    dispath(FetchProducts());
  }, [dispath]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const handleChecked = () => {
    setChecked(!checked);
  };

  const handleCheckedProduct = (id: number) => {
    dispath(FetchToggleChecked({ id, healthy: products[id].healthy }));
  };

  const handleDeleteProduct = (id: number) => {
    dispath(FetchDeleteProduct(id));
  };

  return (
    <main className="admin">
      <div className="admin__container container">
        <div className="logoBlock">
          <img className="logoBlock__logo" src={images.logo} alt="FitHealth" />
          <div className="logoBlock__info">
            <h1 className="logoBlock__h1">
              <span className="logoBlock__span">Fit</span>Health
            </h1>
            <p className="logoBlock__p">Nutrition сontrol system</p>
          </div>
        </div>
        <div className="user">
          <div className="user__img-bg">
            <img className="user__img" src={images.user} alt="User" />
          </div>
          <div className="styles.user__info">
            <p className="user__p medium">adminname</p>
          </div>
        </div>
        <div className="line"></div>
        <form className="addProductForm" onSubmit={handleSubmit}>
          <p className="addProductForm__p">
            Все параметры считаются на 1г массы
          </p>
          <input
            type="text"
            className="addProductForm__field addProductForm__field_name"
            name="name"
            placeholder="Имя"
            required
            onChange={handleChange}
          />
          <div className="addProductForm__fields">
            <input
              type="text"
              className="addProductForm__field"
              name="calories"
              placeholder="Калорийность.."
              required
              onChange={handleChange}
            />
            <input
              type="text"
              className="addProductForm__field"
              name="fats"
              placeholder="Жиры.."
              required
              onChange={handleChange}
            />
            <input
              type="text"
              className="addProductForm__field"
              name="carbs"
              placeholder="Белки.."
              required
              onChange={handleChange}
            />
            <input
              type="text"
              className="addProductForm__field"
              name="proteins"
              placeholder="Углеводы.."
              required
              onChange={handleChange}
            />
          </div>
          <div className="addProductForm__recommend">
            <p className="addProductForm__recommend__p">Рекомендуемый</p>
            <div className="checkbox__wrapper">
              <input
                checked={checked}
                type="checkbox"
                className="custom-checkbox"
                onChange={handleChecked}
                id="custom-checkbox"
              />
              <label
                htmlFor="custom-checkbox"
                className="custom-checkbox-label"
                id="custom-checkbox-label"
              ></label>
            </div>
          </div>
          <button className="addProductForm__button">Добавить</button>
        </form>
        <div className="line"></div>
        <AdminProducts
          products={products}
          handleChecked={handleCheckedProduct}
          handleDelete={handleDeleteProduct}
        />
      </div>
    </main>
  );
};
