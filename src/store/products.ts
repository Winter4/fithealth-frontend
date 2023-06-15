import {
  PayloadAction,
  createSlice,
  createAsyncThunk,
  SerializedError,
} from "@reduxjs/toolkit";
import { IAdminProductItem } from "@/types";

export const FetchAddProduct = createAsyncThunk(
  "products/FetchAddProduct",
  async function (
    {
      healthy,
      fats,
      carbs,
      proteins,
      calories,
      name,
    }: Omit<IAdminProductItem, "id">,
    { rejectWithValue }
  ) {
    try {
      return fetch(`${import.meta.env.VITE_APP_API_URL}/food`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          healthy,
          fats,
          carbs,
          proteins,
          calories,
          name,
        }),
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data: IAdminProductItem) => data);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const FetchProducts = createAsyncThunk(
  "products/FetchProducts",
  async function (_, { rejectWithValue }) {
    try {
      return fetch(`${import.meta.env.VITE_APP_API_URL}/food`, {
        credentials: "include",
      })
        .then((res) => res.json())
        .then(
          (data: {
            unhealthy: IAdminProductItem[];
            healthy: IAdminProductItem[];
          }) => [...data.healthy, ...data.unhealthy]
        );
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const FetchToggleChecked = createAsyncThunk(
  "products/FetchToggleChecked",
  async function (
    { id, healthy }: Pick<IAdminProductItem, "id" | "healthy">,
    { rejectWithValue }
  ) {
    try {
      return fetch(`${import.meta.env.VITE_APP_API_URL}/food/${id}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ healthy: !healthy }),
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data: IAdminProductItem) => data);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const FetchDeleteProduct = createAsyncThunk(
  "products/FetchDeleteProduct",
  async function (id: number, { rejectWithValue }) {
    try {
      return fetch(`${import.meta.env.VITE_APP_API_URL}/food/${id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ id }),
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data: IAdminProductItem) => data);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

interface IState {
  products: IAdminProductItem[];
  status: "pending" | "fulfilled" | "rejected" | null;
  error: SerializedError | null;
}

const initialState: IState = {
  products: [],
  status: null,
  error: null,
};

export const Products = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(FetchAddProduct.pending, (state, action) => {
      state.status = "pending";
      state.error = null;
    });
    builder.addCase(FetchAddProduct.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.error = null;
      state.products.push(action.payload);
    });
    builder.addCase(FetchAddProduct.rejected, (state, action) => {
      state.status = "rejected";
      state.error = action.error;
    });

    builder.addCase(FetchProducts.pending, (state, action) => {
      state.status = "pending";
      state.error = null;
    });
    builder.addCase(FetchProducts.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.error = null;
      state.products = action.payload;
    });
    builder.addCase(FetchProducts.rejected, (state, action) => {
      state.status = "rejected";
      state.error = action.error;
    });

    builder.addCase(FetchToggleChecked.pending, (state, action) => {
      state.status = "pending";
      state.error = null;
    });
    builder.addCase(FetchToggleChecked.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.error = null;
      state.products.find(
        (product) => product.id === action.payload.id
      )!.healthy = action.payload.healthy;
    });
    builder.addCase(FetchToggleChecked.rejected, (state, action) => {
      state.status = "rejected";
      state.error = action.error;
    });

    builder.addCase(FetchDeleteProduct.pending, (state, action) => {
      state.status = "pending";
      state.error = null;
    });
    builder.addCase(FetchDeleteProduct.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.error = null;
      state.products = state.products.filter(
        (product) => product.id !== action.payload.id
      );
    });
    builder.addCase(FetchDeleteProduct.rejected, (state, action) => {
      state.status = "rejected";
      state.error = action.error;
    });
  },
});

export default Products.reducer;
