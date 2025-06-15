import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  id: string | null;
  email: string | null;
  displayName: string | null;
}

const initialState: AuthState = {
  id: null,
  email: null,
  displayName: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<AuthState>) => {
      return { ...state, ...action.payload };
    },
    clearAuth: () => initialState,
  },
});

export const { setAuth, clearAuth } = authSlice.actions;
