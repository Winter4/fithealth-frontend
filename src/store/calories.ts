import {
  PayloadAction,
  createSlice,
  createAsyncThunk,
  SerializedError,
} from "@reduxjs/toolkit";
import { IProduct } from "@/types";

export const FetchCaloriesData = createAsyncThunk(
  "calories/FetchCaloriesData",
  async function (_, { rejectWithValue }) {
    // это не тести , тести через браузер я это пока делаю без 1 cookies
    try {
      return fetch(`${import.meta.env.VITE_APP_API_URL}/meal/calories/`, {
        // credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          return data;
        });
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

interface IState {
  ateCalories: number;
  status: "pending" | "fulfilled" | "rejected" | null;
  error: SerializedError | null;
  products: IProduct[];
}

const initialState: IState = {
  ateCalories: 0,
  status: null,
  error: null,
  products: [
    {
      id: "0",
      name: "Завтрак",
      allowedProducts: ["Авокадо", "Арбуз"],
      products: [],
    },
    {
      id: "1",
      name: "Нерекомендованные продукты",
      allowedProducts: ["Авокадо", "Макароны"],
      products: [],
    },
  ],
};

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
      state.products[+action.payload.cardId].products.push({
        id: action.payload.id,
        name: action.payload.name,
        weight: action.payload.weight,
      });
      // state[+action.payload.cardId].ateColories += action.payload.weight;
    },

    changeColories(
      state,
      action: PayloadAction<{ cardId: string; id: string; newColories: string }>
    ) {
      state.products[+action.payload.cardId].products.find(
        (product) => product.id === action.payload.id
      )!.weight = +action.payload.newColories;
    },

    removeProduct(
      state,
      action: PayloadAction<{ cardId: string; id: string }>
    ) {
      // state[+action.payload.cardId].ateColories -= state[
      //   +action.payload.cardId
      // ].products.find((e) => e.id === action.payload.id)!.weight;
      state.products[+action.payload.cardId].products = state.products[
        +action.payload.cardId
      ].products.filter((prod) => prod.id !== action.payload.id);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(FetchCaloriesData.pending, (state, action) => {
      state.status = "pending";
      state.error = null;
    });
    builder.addCase(
      FetchCaloriesData.fulfilled,
      (state, action: PayloadAction<{ calories: number }>) => {
        state.status = "fulfilled";
        state.error = null;
        state.ateCalories = action.payload.calories;
      }
    );
    builder.addCase(FetchCaloriesData.rejected, (state, action) => {
      state.status = "rejected";
      state.error = action.error;
    });
  },
});

export const { addProduct, changeColories, removeProduct } = Calories.actions;

export default Calories.reducer;
