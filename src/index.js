import React from 'react';
import ReactDOM from 'react-dom/client';
import store from './redux/app/store';
import { Provider } from 'react-redux';
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from 'redux-persist';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './index.css';
import App from "./App";
const root = ReactDOM.createRoot(document.getElementById('root'));

const persistor = persistStore(store);


root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App/>
    </PersistGate>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
