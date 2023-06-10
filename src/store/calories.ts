import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IProduct } from "@/types";

const initialState: IProduct[] = [
  {
    id: "0",
    name: "Завтрак",
    ateColories: 0,
    allowedProducts: ["Авокадо", "Арбуз"],
    calories: 612,
    products: [],
  },
  {
    id: "1",
    name: "Нерекомендованные продукты",
    allowedProducts: ["Авокадо", "Макароны"],
    ateColories: 0,
    calories: 145,
    products: [],
  },
];

export const Calories = createSlice({
  name: "calories",
  initialState,
  reducers: {
    addProduct(
      state,
      action: PayloadAction<{
        cardId: string;
        id: string;
        weight: number;
        name: string;
      }>
    ) {
      state[+action.payload.cardId].products.push({
        id: action.payload.id,
        name: action.payload.name,
        weight: action.payload.weight,
      });
      state[+action.payload.cardId].ateColories += action.payload.weight;
    },

    removeProduct(
      state,
      action: PayloadAction<{ cardId: string; id: string }>
    ) {
      state[+action.payload.cardId].ateColories -= state[
        +action.payload.cardId
      ].products.find((e) => e.id === action.payload.id)!.weight;
      state[+action.payload.cardId].products = state[
        +action.payload.cardId
      ].products.filter((prod) => prod.id !== action.payload.id);
    },
  },
});

export const { addProduct, removeProduct } = Calories.actions;

export default Calories.reducer;
