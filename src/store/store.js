import { configureStore, combineReducers } from "@reduxjs/toolkit";
import AuthReducer from "store/slice/AuthSlice";
import UserReducer from "store/slice/UserSlice";
import ClinicReducer from "store/slice/ClinicSlice";
import NotificationKeyReducer from "store/slice/NotificationKeySlice";
import scrollerReducer from "store/slice/scrollerSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";
// import Authnumber from "./slice/Authnumber";
const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const reducer = combineReducers({
  auth: AuthReducer,
  user: UserReducer,
  currentClinic: ClinicReducer,
  notificationKey: NotificationKeyReducer,
  scroller: scrollerReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

export default store;
