import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../../config.json";

// Async thunk to get favorites
export const getFavorites = createAsyncThunk(
  "favorite/fetch",
  async ({ userID }) => {
    try {
      const response = await axios.get(
        `${config.SERVER_URL}/wishList/getWishList/${userID}`
      );
      return response.data;
    } catch (error) {
      throw new Error("An error occurred");
    }
  }
);

// delete a favorite
export const deleteFavorite = createAsyncThunk(
  "favorite/delete",
  async ({ itemID, userID }) => {
    try {
      const response = await axios.delete(
        `${config.SERVER_URL}/wishList/deleteItem/${itemID}/${userID}`
      );
      return response.data;
    } catch (error) {
      throw new Error("An error occurred");
    }
  }
);

const initialState = {
  loading: false,
  favorites: [],
  successDelete: null,
  error: null,
};

// Create the favorites slice
const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    closeDeleteAlert: (state) => {
      state.successDelete = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFavorites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFavorites.fulfilled, (state, action) => {
        state.loading = false;
        state.favorites = action.payload;
        state.error = null;
      })
      .addCase(getFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      .addCase(deleteFavorite.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteFavorite.fulfilled, (state) => {
        state.loading = false;
        state.successDelete = true;
        state.error = null;
      })
      .addCase(deleteFavorite.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      });
  },
});

export const { closeDeleteAlert } = favoritesSlice.actions;
export default favoritesSlice.reducer;
