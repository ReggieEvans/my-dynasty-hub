import { BaseTeam } from "@/types";

import { baseApi } from "./baseApi";

export const baseTeamsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBaseTeams: builder.query<BaseTeam[], void>({
      query: () => "base-teams",
    }),
  }),
});

export const { useGetBaseTeamsQuery } = baseTeamsApi;
