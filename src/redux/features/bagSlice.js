import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../../config.json";

export const getProductSizes = createAsyncThunk(
  "/bag/getSizes",
  async ({ productID }) => {
    try {
      const response = await axios.get(
        `${config.SERVER_URL}/products/getSizes/${productID}`
      );
      // console.log(response.data);
      return response.data;
      // setSizes(response.data);
    } catch (error) {
      console.log(error);
      throw new Error("An error occurred!");
    }
  }
);

export const getBagProducts = createAsyncThunk(
  "/bag/fetchProducts",
  async ({ userID }) => {
    try {
      const response = await axios.get(`${config.SERVER_URL}/bag/${userID}`);
      return response.data;
    } catch (error) {
      throw new Error("An error occurred!");
    }
  }
);

export const deleteBagItem = createAsyncThunk(
  "bag/deleteItem",
  async ({ id }) => {
    try {
      const response = await axios.delete(
        `${config.SERVER_URL}/bag/deleteItem/${id}`
      );
      //   handleOpenSnack();
      return response.data;
    } catch (error) {
      throw new Error("An error occurred!");
    }
  }
);

//modif size or quantity
export const modifBagProduct = createAsyncThunk(
  "bag/modifItem",
  async ({ dataModified, newData, id }) => {
    if (dataModified === "size") {
      try {
        const response = await axios.patch(
          `${config.SERVER_URL}/bag/updateItem/${id}`,
          { orderSize: newData }
        );
        console.log(response);
        return response.data;
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const response = await axios.patch(
          `${config.SERVER_URL}/bag/updateItem/${id}`,
          { orderQuantity: newData }
        );
        console.log(response);
        return response.data;
      } catch (error) {
        console.error(error);
      }
    }
  }
);

//add item to bag
export const addItemToBag = createAsyncThunk(
  "/bag/addItem",
  async ({ productID, orderSize, orderQuantity, userID }) => {
    try {
      const response = await axios.post(`${config.SERVER_URL}/bag/addItem`, {
        productID,
        orderSize,
        orderQuantity,
        userID,
      });
      return response.data;
    } catch (error) {
      throw new Error("An error occurred!");
    }
  }
);

//handle payment

export const handlePayment = createAsyncThunk(
  "/handlePayment",
  async ({ lineItems, bagProducts, userID }) => {
    if (!lineItems || !lineItems.length) {
      console.error("lineItems are not set or empty");
      return;
    }

    const orders = bagProducts.map((item) => ({
      productID: item.ID,
      quantity: item.orderQuantity,
    }));

    try {
      const response = await axios.post(
        `${config.SERVER_URL}/stripe/create-checkout-session`,
        lineItems,
        { headers: { "Content-Type": "application/json" } }
      );
      window.location.href = response.data.url;

      const res = await axios.post(
        `${config.SERVER_URL}/orders/placeOrder/${userID}`,
        { orders }
      );
      localStorage.setItem("orderID", res.data.orderID);

      console.log("Orders placed successfully");
    } catch (error) {
      console.error(error);
    }
  }
);

const initialState = {
  loading: false,
  bagProducts: [],
  sizes: [],
  error: null,
  lineItems: [], //for stripe process
  productNumber: null,
  totalPrice: null,
  priceWithDelivery: null,
  successOperation: false,
};

const bagSlice = createSlice({
  name: "bag",
  initialState,
  reducers: {
    closeSuccess: (state) => {
      state.successOperation = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // getSizes
      .addCase(getProductSizes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductSizes.fulfilled, (state, action) => {
        state.loading = false;
        state.sizes = action.payload;
      })
      .addCase(getProductSizes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // get bag products
      .addCase(getBagProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBagProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.bagProducts = action.payload;
        let productNum = 0;
        let total = 0;
        for (let i = 0; i < action.payload.length; i++) {
          total +=
            parseInt(action.payload[i].price) * action.payload[i].orderQuantity;
          productNum += action.payload[i].orderQuantity;
        }
        state.totalPrice = total;
        state.productNumber = productNum;
        state.priceWithDelivery = total += 7;

        state.lineItems = action.payload.map((product) => {
          return {
            price_data: {
              currency: "usd",
              product_data: {
                name: product.name,
              },
              unit_amount: parseInt(product.price) * 100,
            },
            quantity: product.orderQuantity,
          };
        });
      })
      .addCase(getBagProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // delete bag item
      .addCase(deleteBagItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBagItem.fulfilled, (state) => {
        state.loading = false;
        state.successOperation = true;
        setTimeout(() => {
          state.successOperation = false;
        }, 1000);
      })
      .addCase(deleteBagItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // modif bag item
      .addCase(modifBagProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(modifBagProduct.fulfilled, (state) => {
        state.loading = false;
        state.successOperation = true;
        setTimeout(() => {
          state.successOperation = false;
        }, 1000);
      })
      .addCase(modifBagProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // add item to bag
      .addCase(addItemToBag.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addItemToBag.fulfilled, (state) => {
        state.loading = false;
        state.successOperation = true;
      })
      .addCase(addItemToBag.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { closeSuccess } = bagSlice.actions;
export default bagSlice.reducer;
