// import axios from "axios";
import {
  PayloadAction,
  createSlice,
  createAsyncThunk,
  SerializedError,
} from "@reduxjs/toolkit";
import { IUser } from "@/types";

export const FetchUserData = createAsyncThunk(
  "user/FetchUserData",
  async function (id: string, { rejectWithValue }) {
    try {
      // изначально я делал на axios , тут оно одинаково
      // const response = await axios.get<IUser>(
      //   `${import.meta.env.VITE_APP_API_URL}/report/${id}`,
      //   { withCredentials: true }
      // );
      // document.cookie = `userId=${id};`;
      // document.cookie = `report_id=${response.data.userId};`;
      // return response.data;
      // const response = await fetch(
      //   `${import.meta.env.VITE_APP_API_URL}/report/${id}`
      // );
      // const data = response.json();
      // return data;
      return fetch(`${import.meta.env.VITE_APP_API_URL}/report/${id}`)
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
  user: IUser;
  status: "pending" | "fulfilled" | "rejected" | null;
  error: SerializedError | null;
}

const initialState: IState = {
  user: { calories: 0, userId: 0 },
  status: null,
  error: null,
};

export const User = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(FetchUserData.pending, (state, action) => {
      state.status = "pending";
      state.error = null;
    });
    builder.addCase(
      FetchUserData.fulfilled,
      (state, action: PayloadAction<IUser>) => {
        state.status = "fulfilled";
        state.error = null;
        state.user = action.payload;
      }
    );
    builder.addCase(FetchUserData.rejected, (state, action) => {
      state.status = "rejected";
      state.error = action.error;
    });
  },
});

// export const {} = User.actions;

export default User.reducer;
