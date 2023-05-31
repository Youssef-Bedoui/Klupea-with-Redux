import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../../config.json";

export const signIn = createAsyncThunk(
  "auth/signIn",
  async ({ email, password }, { dispatch }) => {
    console.log(email, password);
    try {
      const response = await axios.post(`${config.SERVER_URL}/signIn`, {
        email,
        password,
      });

      // Dispatch getItemsInBagNum using the dispatch function from createAsyncThunk
      dispatch(getItemsInBagNum({ userID: response.data.result[0]?.id }));
      return response.data;
    } catch (error) {
      console.log(error.response.data.msg);
      throw new Error(error.response.data.msg);
    }
  }
);

export const updateTokens = createAsyncThunk("tokens/update",async({id})=>{
  try {
    const response = await axios.get(`${config.SERVER_URL}/auth/getNewTokens`,{id});
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
});


export const signOut = createAsyncThunk("auth/logout", async () => {
  try {
    const response = await axios.get(`${config.SERVER_URL}/auth/logout`);
    return response.data;
  } catch (error) {
    throw new Error("An error occurred while signing out.");
  }
});

export const deleteUserAccount = createAsyncThunk(
  "auth/deleteAccount",
  async ({ userID }) => {
    try {
      const response = await axios.delete(
        `${config.SERVER_URL}/signIn/deleteAccount/${userID}`
      );
      return response.data;
    } catch (error) {
      throw new Error("Logout fail, retry!");
    }
  }
);

// Get itemsInBag
export const getItemsInBagNum = createAsyncThunk(
  "/fetch/BgItemsNum",
  async ({ userID }) => {
    const response = await axios.get(`${config.SERVER_URL}/bag/${userID}`);
    return response.data.length;
  }
);

// signUp
export const handleSignUp = createAsyncThunk(
  "auth/signUp",
  async ({
    userName,
    email,
    password,
    address,
    city,
    phone,
    activationCode,
  }) => {
    try {
      const response = await axios.post(`${config.SERVER_URL}/register`, {
        userName,
        email,
        password,
        address,
        city,
        phone,
        activationCode,
      });
      return response.data;
    } catch (error) {
      throw new Error("An error occurred while signing up.");
    }
  }
);

export const modifyUserAddress = createAsyncThunk(
  "user/modifAddress",
  async ({ userID, userName, address, city, phone }) => {
    const newInfo = {};

    if (userName) {
      newInfo.userName = userName;
    }
    if (address) {
      newInfo.address = address;
    }
    if (city) {
      newInfo.city = city;
    }
    if (phone) {
      newInfo.phone = phone;
    }
    try {
      const response = await axios.patch(
        `${config.SERVER_URL}/signIn/updateUser/${userID}`,
        newInfo
      );
      return response.data;
    } catch (error) {
      throw new Error("An error occurred, please retry!");
    }
  }
);

const initialState = {
  loading: false,
  theme: "light",
  user: null,
  token: null,
  refreshToken: null,
  isAuthenticated: false,
  itemsInBag: null,
  error: null,
  successDeleteAccount: false,
  successAddressModif: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setTheme: (state) => {
      const currTheme = localStorage.getItem("theme");
      if (currTheme && currTheme.length) {
        state.theme = currTheme;
      }
    },
    //handle bag items number
    incrementItemInBag: (state, action) => {
      state.itemsInBag += action.payload;
    },
    decrementItemInBag: (state, action) => {
      state.itemsInBag -= action.payload;
    },
  },
  extraReducers: (builder) => {
    // signIn 
    builder
      .addCase(signIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        console.log("signIn.fulfilled");
        console.log(action, "payload");
        if (action.payload.auth) {
          state.loading = false;
          state.isAuthenticated = true;
          state.user = action.payload.result[0];
          state.token = action.payload.token;
          state.refreshToken = action.payload.refreshToken;
          localStorage.setItem("theme", "light");
          console.log("auth");
          state.error = null;
        } else {
          state.loading = false;
          state.isAuthenticated = false;
          state.user = action.payload.null;
          state.token = null;
          state.refreshToken = null;
          state.error = action.payload.msg;
          setTimeout(() => {
            state.error = null;
          }, 3000);
        }
      })
      .addCase(signIn.rejected, (state, action) => {
        console.log(action);
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.refreshToken = null;
        state.error = action.error.message;
        setTimeout(() => {
          state.error = null;
        }, 3000);
      })
      //get bag items number
      .addCase(getItemsInBagNum.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getItemsInBagNum.fulfilled, (state, action) => {
        console.log(action.payload, "payload fullfill");
        state.loading = false;
        state.itemsInBag = action.payload;
        state.error = null;
      })
      .addCase(getItemsInBagNum.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      .addCase(updateTokens.pending,(state)=>{
        state.loading=false;
        state.error=null;
      })
      .addCase(updateTokens.fulfilled,(state,action)=>{
        state.loading=false;
        state.error=null;
        state.token= action.payload.token;
        state.refreshToken= action.payload.refreshToken;
      })
      .addCase(updateTokens.rejected,(state)=>{
        state.loading=false;
        state.error=null;
      })
      // sign up
      .addCase(handleSignUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(handleSignUp.fulfilled, (state, action) => {
        console.log("handleSignUp.fulfilled");
        console.log(action);
        state.loading = false;
        if (
          action.payload ===
          "A Code has been sent to your email for verification"
        ) {
          state.isAuthenticated = false;
          state.user = null;
          state.token = null;
          state.refreshToken = null;
          localStorage.setItem("theme", "light");
          state.error = null;
          state.loading = false;
        } else {
          state.loading = false;
          state.isAuthenticated = false;
          state.user = null;
          state.token = null;
          state.refreshToken = null;
          localStorage.setItem("theme", "light");
          state.error = "An Error has been occured ! Retry";
        }
      })
      .addCase(handleSignUp.rejected, (state, action) => {
        console.log(action);
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.refreshToken = null;
        state.error = action.payload.error;
      })
      // sign out
      .addCase(signOut.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signOut.fulfilled, (state) => {
        console.log(state.successDeleteAccount, "before");
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.refreshToken = null;
        localStorage.removeItem("theme");
        state.error = null;
        console.log(state.successDeleteAccount, "after");
      })
      .addCase(signOut.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.payload.error;
      })
      .addCase(deleteUserAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUserAccount.fulfilled, (state) => {
        state.successDeleteAccount = true;
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.refreshToken = null;
        localStorage.removeItem("theme");
        state.error = null;
        setTimeout(() => {
          state.successDeleteAccount = false;
        }, 1000);
      })
      .addCase(deleteUserAccount.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.payload.error;
      })
      .addCase(modifyUserAddress.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(modifyUserAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.successAddressModif = true;
        state.user = action.payload;
        state.error = null;
        setTimeout(() => {
          state.successAddressModif = null;
        }, 1000);
      })
      .addCase(modifyUserAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      });
  },
});

export const { setTheme, incrementItemInBag, decrementItemInBag } =
  authSlice.actions;
export default authSlice.reducer;
