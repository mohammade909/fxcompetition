// store.js
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "./authSlice";
import usersReducer from "./userSlice";
import planReducer from "./planSlice";
import competitionReducer from "./competitionSlice";
import accountReducer from "./accountSlice";
import walletReducer from "./walletSlice";
import notificationReducer from "./notificationSlice";
import permissionsReducer from './permissionsSlice';
import enrollemntReducer from  './enrollmentSlice'
import orderReducer from  './orderSlice'

const rootReducer = combineReducers({
  auth: authReducer,
  users: usersReducer,// Add any other reducers here.
  plans: planReducer,// Add any other reducers here.
  orders: orderReducer,// Add any other reducers here.
  competitions: competitionReducer,
  enrollments:enrollemntReducer,// Add any other reducers here.
  accounts: accountReducer,// Add any other reducers here.
  wallet: walletReducer,// Add any other reducers here.
  notifications: notificationReducer,
  permissions: permissionsReducer// Add any other reducers here.
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
  blacklist: [],
  debug: true,
  timeout: 0,
  version: 1,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
