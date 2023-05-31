import { configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "../features/authSlice";
import productsReducer from "../features/productsSlice";
import ordersReducer from "../features/ordersSlice";
import favoritesReducer from "../features/favoriteSlice";
import bagReducer from "../features/bagSlice";


// Configure the persistConfig for authReducer
const persistConfig = {
  key: "auth",
  storage,
};

const productsPersistConfig = {
  key: "products",
  storage,
};
const ordersPersistConfig = {
  key: "orders",
  storage,
};
const favoritesPersistConfig = {
  key: "favorites",
  storage,
};
const bagPersistConfig = {
  key: "bag",
  storage,
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);
const persistedProductsReducer = persistReducer(
  productsPersistConfig,
  productsReducer
);
const persistedOrdersReducer = persistReducer(
  ordersPersistConfig,
  ordersReducer
);
const persistedFavoritesReducer = persistReducer(
  favoritesPersistConfig,
  favoritesReducer
);
const persistedBagReducer = persistReducer(
  bagPersistConfig,
  bagReducer
);

export default configureStore({
  reducer: {
    auth: persistedAuthReducer, 
    products: persistedProductsReducer,
    orders: persistedOrdersReducer,
    favorites: persistedFavoritesReducer,
    bag: persistedBagReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializability check
    }),
});
