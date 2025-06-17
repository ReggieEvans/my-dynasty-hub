import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { BaseTeam } from "@/types";

interface BaseTeamsState {
  baseTeams: BaseTeam[];
}

const initialState: BaseTeamsState = {
  baseTeams: [],
};

export const baseTeamsSlice = createSlice({
  name: "baseTeams",
  initialState,
  reducers: {
    setBaseTeams: (state, action: PayloadAction<BaseTeam[]>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setBaseTeams } = baseTeamsSlice.actions;
