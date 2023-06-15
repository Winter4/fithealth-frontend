/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  PayloadAction,
  createSlice,
  createAsyncThunk,
  SerializedError,
} from "@reduxjs/toolkit";
import { IAllowedProduct, IProduct, IProductItem } from "@/types";
import axios from "axios";

export const FetchCaloriesData = createAsyncThunk(
  "calories/FetchCaloriesData",
  async function (_, { rejectWithValue }) {
    try {
      return fetch(`${import.meta.env.VITE_APP_API_URL}/meal/calories/`, {
        credentials: "include",
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

export const FetchAllowedFoodData = createAsyncThunk(
  "calories/FetchAllowedFoodData",
  async function (_, { rejectWithValue }) {
    try {
      return fetch(`${import.meta.env.VITE_APP_API_URL}/food/`, {
        credentials: "include",
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

export const FetchFoodData = createAsyncThunk(
  "calories/FetchFoodData",
  async function (activeTab: number, { rejectWithValue }) {
    try {
      return Promise.all([
        axios.get<IProductItem[]>(
          `${import.meta.env.VITE_APP_API_URL}/meal/healthy?tab=${activeTab}`,
          {
            withCredentials: true,
          }
        ),

        axios.get<IProductItem[]>(
          `${import.meta.env.VITE_APP_API_URL}/meal/unhealthy`,
          {
            withCredentials: true,
          }
        ),
      ]).then((data) => [data[0].data, data[1].data]);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const FetchRemoveProduct = createAsyncThunk(
  "calories/FetchRemoveProduct",
  async function (id: string, { rejectWithValue }) {
    try {
      return fetch(`${import.meta.env.VITE_APP_API_URL}/meal/${id}`, {
        method: "DELETE",
        body: JSON.stringify({ id }),
        credentials: "include",
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

export const FetchAddProduct = createAsyncThunk(
  "calories/FetchAddProduct",
  async function (
    {
      tab,
      weight,
      foodId,
      cardId,
      name,
    }: {
      tab: number;
      weight: number;
      foodId: number;
      cardId: string;
      name: string;
    },
    { rejectWithValue, dispatch }
  ) {
    try {
      return fetch(
        `${import.meta.env.VITE_APP_API_URL}/meal/${
          Number(cardId) ? "unhealthy" : "healthy"
        }?tab=${tab}`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ tab, weight, foodId }),
          credentials: "include",
        }
      )
        .then((res) => res.json())
        .then((data: IProductItem) => {
          dispatch(
            addProduct({
              cardId,
              name,
              id: data.id,
              calories: data.calories,
              weight,
            })
          );
          return data;
        });
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const FetchСhangeColories = createAsyncThunk(
  "calories/FetchСhangeColories",
  async function (
    { id, weight, cardId }: { cardId: string; id: string; weight: number },
    { rejectWithValue }
  ) {
    try {
      return fetch(`${import.meta.env.VITE_APP_API_URL}/meal/${id}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ id, weight }),
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data: IProductItem) => {
          return { cardId, data };
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
      allowedProducts: [],
      products: [],
    },
    {
      id: "1",
      name: "Нерекомендованные продукты",
      allowedProducts: [],
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
        calories: number;
      }>
    ) {
      state.products[+action.payload.cardId].products.push({
        id: action.payload.id,
        name: action.payload.name,
        weight: action.payload.weight,
        calories: action.payload.calories,
      });
      state.ateCalories += action.payload.calories;
    },

    changeColories(
      state,
      action: PayloadAction<{ cardId: string; id: string; newColories: string }>
    ) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      state.products[+action.payload.cardId].products.find(
        (product) => product.id === action.payload.id
      )!.weight = +action.payload.newColories;
    },

    removeProduct(
      state,
      action: PayloadAction<{ cardId: string; id: string }>
    ) {
      state.ateCalories -= state.products[+action.payload.cardId].products.find(
        (e) => e.id === action.payload.id
      )!.calories;
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

    builder.addCase(FetchAllowedFoodData.pending, (state, action) => {
      state.status = "pending";
      state.error = null;
    });

    builder.addCase(
      FetchAllowedFoodData.fulfilled,
      (
        state,
        action: PayloadAction<{
          healthy: IAllowedProduct[];
          unhealthy: IAllowedProduct[];
        }>
      ) => {
        state.status = "fulfilled";
        state.error = null;
        state.products[0].allowedProducts = action.payload.healthy;
        state.products[1].allowedProducts = action.payload.unhealthy;
      }
    );

    builder.addCase(FetchAllowedFoodData.rejected, (state, action) => {
      state.status = "rejected";
      state.error = action.error;
    });

    builder.addCase(FetchFoodData.pending, (state, action) => {
      state.status = "pending";
      state.error = null;
    });

    builder.addCase(FetchFoodData.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.error = null;
      state.products[0].products = action.payload[0];
      state.products[1].products = action.payload[1];
    });

    builder.addCase(FetchFoodData.rejected, (state, action) => {
      state.status = "rejected";
      state.error = action.error;
    });

    builder.addCase(FetchRemoveProduct.pending, (state, action) => {
      state.status = "pending";
      state.error = null;
    });

    builder.addCase(FetchRemoveProduct.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.error = null;
    });
    builder.addCase(FetchRemoveProduct.rejected, (state, action) => {
      state.status = "rejected";
      state.error = action.error;
    });

    builder.addCase(FetchAddProduct.pending, (state, action) => {
      state.status = "pending";
      state.error = null;
    });

    builder.addCase(FetchAddProduct.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.error = null;
    });
    builder.addCase(FetchAddProduct.rejected, (state, action) => {
      state.status = "rejected";
      state.error = action.error;
    });

    builder.addCase(FetchСhangeColories.pending, (state, action) => {
      state.status = "pending";
      state.error = null;
    });

    builder.addCase(FetchСhangeColories.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.error = null;
      state.products[+action.payload.cardId].products.find(
        (e) => e.id == action.payload.data.id
      )!.weight = action.payload.data.weight;

      state.products[+action.payload.cardId].products.find(
        (e) => e.id == action.payload.data.id
      )!.calories = action.payload.data.calories;
    });
    builder.addCase(FetchСhangeColories.rejected, (state, action) => {
      state.status = "rejected";
      state.error = action.error;
    });
  },
});

export const { addProduct, changeColories, removeProduct } = Calories.actions;

export default Calories.reducer;
