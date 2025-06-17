import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { createClient } from "@/utils/supabase/client";

// import { Dynasty } from "@/types";

export const dynastyApi = createApi({
  reducerPath: "dynastyApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["Dynasty"],
  endpoints: (builder) => ({
    getActiveDynasty: builder.query<any | null, void>({
      query: () => "dynasty/active",
      providesTags: [{ type: "Dynasty", id: "LIST" }],
    }),
    getUserTeamByDynastyId: builder.query<any, string>({
      queryFn: async (dynastyId) => {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("teams")
          .select("*")
          .eq("dynasty_id", dynastyId)
          .eq("is_user_team", true)
          .single();

        if (error) return { error: { status: 500, data: error.message } };
        return { data };
      },
      providesTags: [{ type: "Dynasty", id: "LIST" }],
    }),
    createDynasty: builder.mutation<
      string,
      {
        userId: string;
        dynastyName: string;
        typeId: number;
        baseTeamId: string;
        startYear: number;
      }
    >({
      queryFn: async ({
        userId,
        dynastyName,
        typeId,
        baseTeamId,
        startYear,
      }) => {
        const supabase = createClient();
        const { data, error } = await supabase.rpc("create_dynasty_full", {
          p_user_id: userId,
          p_dynasty_name: dynastyName,
          p_dynasty_type_id: typeId,
          p_base_team_id: baseTeamId,
          p_start_year: startYear,
        });

        if (error) {
          return { error: { status: 500, data: error.message } };
        }

        return { data };
      },
      invalidatesTags: [{ type: "Dynasty", id: "LIST" }],
    }),
  }),
});

export const {
  useGetActiveDynastyQuery,
  useCreateDynastyMutation,
  useGetUserTeamByDynastyIdQuery,
} = dynastyApi;
