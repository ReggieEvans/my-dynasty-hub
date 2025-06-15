import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";

import { createClient } from "@/utils/supabase/client";

export const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    getUserProfile: builder.query({
      async queryFn(userId: string) {
        console.log("userId", userId);
        const supabase = createClient();
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", userId)
          .single();

        if (error) return { error };
        return { data };
      },
    }),
  }),
});

export const { useGetUserProfileQuery } = profileApi;
