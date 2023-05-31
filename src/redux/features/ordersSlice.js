import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../../config.json";

export const getOrders = createAsyncThunk(
  "orders/fetch",
  async ({ userID }) => {
    try {
      const response = await axios.get(
        `${config.SERVER_URL}/orders/getUserOrders/${userID}`
      );
      return response.data;
    } catch (error) {
      throw new Error("An error occurred");
    }
  }
);

const initialState = {
  loading: false,
  orders: [],
  error: null,
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
        state.error = null;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      });
  },
});

export const {} = ordersSlice.actions;
export default ordersSlice.reducer;
