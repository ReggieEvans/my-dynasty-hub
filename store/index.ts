import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { baseApi } from "./api/baseApi";
import { profileApi } from "./api/profileApi";
import { authSlice } from "./slices/authSlice";
import { dynastySlice } from "./slices/dynastySlice";

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  [profileApi.reducerPath]: profileApi.reducer,
  [baseApi.reducerPath]: baseApi.reducer,
  dynasty: dynastySlice.reducer,
});

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("authState");
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state: RootState) => {
  try {
    const serializedState = JSON.stringify({ auth: state.auth });
    localStorage.setItem("authState", serializedState);
  } catch {
    // ignore
  }
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
  preloadedState: typeof window !== "undefined" ? loadState() : undefined,
  devTools: process.env.NODE_ENV !== "production",
});

store.subscribe(() => {
  if (typeof window !== "undefined") {
    saveState(store.getState());
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
