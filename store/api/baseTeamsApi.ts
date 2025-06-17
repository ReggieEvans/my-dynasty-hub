import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { BaseTeam } from "@/types";

export const baseTeamsApi = createApi({
  reducerPath: "baseTeamsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    getBaseTeams: builder.query<BaseTeam[], void>({
      query: () => "base-teams",
    }),
  }),
});

export const { useGetBaseTeamsQuery } = baseTeamsApi;
