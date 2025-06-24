import { TeamOverviewRow } from "@/types/TeamOverview";
import { TopPlayer } from "@/types/topPlayer";
import { createClient } from "@/utils/supabase/client";

import { baseApi } from "./baseApi";

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTeamOverview: builder.query<
      TeamOverviewRow[],
      {
        teamId: string;
        dynastyId: string;
        startYear: number;
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
    getTopPlayers: builder.query<
      TopPlayer[],
      {
        teamId: string;
        dynastyId: string;
      }
    >({
      queryFn: async ({ teamId, dynastyId }) => {
        const supabase = createClient();
        const { data, error } = await supabase.rpc("get_top_roster_players", {
          p_team_id: teamId,
          p_dynasty_id: dynastyId,
        });

        if (error) {
          return { error: { status: 500, data: error.message } };
        }

        return { data };
      },
    }),
  }),
});

export const { useGetTeamOverviewQuery, useGetTopPlayersQuery } = dashboardApi;
