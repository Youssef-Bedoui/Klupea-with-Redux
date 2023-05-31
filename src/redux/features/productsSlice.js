import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../../config.json";

export const fetchProductsByCategory = createAsyncThunk(
  "products/fetch",
  async ({ forHome, category }) => {
    console.log(forHome, category);
    try {
      const response = await axios.get(
        `${config.SERVER_URL}/products/${category}`
      );
      console.log(response.data);
      if (forHome) {
        return {
          forHome: true,
          category: category,
          data: response.data.slice(0, 15),
        };
      } else {
        return {
          forHome: false,
          category: category,
          data: response.data,
        };
      }
    } catch (error) {
      throw new Error("An error occurred");
    }
  }
);

export const fetchNewArrival = createAsyncThunk(
  "products/newArrival",
  async () => {
    try {
      const response = await axios.get(
        `${config.SERVER_URL}/products/newArrival`
      );
      console.log(response.data);
      return response.data.slice(0, 15);
    } catch (error) {
      throw new Error("An error occurred");
    }
  }
);

export const handleSearch = createAsyncThunk("/search", async ({ name }) => {
  try {
    const response = await axios.get(
      `${config.SERVER_URL}/products/search/${name}`
    );
    return response.data;
  } catch (error) {
    throw new Error("An error occurred");
  }
});

const initialState = {
  loading: false,
  products: [],
  newArrival: [],
  men: [],
  women: [],
  kids: [],
  search: [],
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    updateProducts: (state, action) => {
      if (action.payload.filter === "ByAscPrice") {
        const productsArray = action.payload.filterSearch
          ? state.search.slice()
          : state.products.slice();
        const sortedProducts = productsArray.sort((a, b) => {
          return a.price - b.price;
        });
        return {
          ...state,
          search: action.payload.filterSearch ? sortedProducts : state.search,
          products: action.payload.filterSearch
            ? state.products
            : sortedProducts,
        };
      } else if (action.payload.filter === "ByDescPrice") {
        const productsArray = action.payload.filterSearch
          ? state.search.slice()
          : state.products.slice();
        const sortedProducts = productsArray.sort((a, b) => {
          return b.price - a.price;
        });
        return {
          ...state,
          search: action.payload.filterSearch ? sortedProducts : state.search,
          products: action.payload.filterSearch
            ? state.products
            : sortedProducts,
        };
      }
      return state;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsByCategory.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.loading = false;
        const { forHome, category, data } = action.payload;
        if (forHome) {
          state[category] = data;
          state.error = null;
        } else {
          state.products = data;
          state.error = null;
        }
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.products = [];
        state.collections = {
          newArrival: [],
          men: [],
          women: [],
          kids: [],
        };
        state.error = action.payload.error;
      })
      .addCase(fetchNewArrival.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNewArrival.fulfilled, (state, action) => {
        state.loading = false;
        state.newArrival = action.payload;
      })
      .addCase(fetchNewArrival.rejected, (state, action) => {
        state.loading = false;
        state.newArrival = [];
        state.error = action.payload.error;
      })
      .addCase(handleSearch.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(handleSearch.fulfilled, (state, action) => {
        state.loading = false;
        state.search = action.payload;
      })
      .addCase(handleSearch.rejected, (state, action) => {
        state.loading = false;
        state.search = [];
        state.error = action.payload.error;
      });
  },
});

export const { updateProducts } = productsSlice.actions;
export default productsSlice.reducer;
