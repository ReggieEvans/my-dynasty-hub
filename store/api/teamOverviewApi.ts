import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { TeamOverviewRow } from "@/types/TeamOverview";
import { createClient } from "@/utils/supabase/client";

export const teamOverviewApi = createApi({
  reducerPath: "teamOverviewApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["TeamOverview"],
  endpoints: (builder) => ({
    getTeamOverview: builder.query<
      TeamOverviewRow[],
      {
        teamId: string;
        dynastyId: number;
        startYear: string;
        includeRecruiting: boolean;
      }
    >({
      queryFn: async ({ teamId, dynastyId, startYear, includeRecruiting }) => {
        const supabase = createClient();
        const { data, error } = await supabase.rpc("get_team_roster_summary", {
          p_team_id: teamId,
          p_dynasty_id: dynastyId,
          p_season_year: startYear,
          p_include_recruiting: includeRecruiting,
        });

        if (error) {
          return { error: { status: 500, data: error.message } };
        }

        return { data };
      },
    }),
  }),
});

export const { useGetTeamOverviewQuery } = teamOverviewApi;
