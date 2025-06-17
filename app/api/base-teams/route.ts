import { NextResponse } from "next/server";

import { createClient } from "@/utils/supabase/client";

export async function GET() {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("base_teams")
    .select(
      "id, school_name, logo, conference, conference_logo, team_overall, offense_overall, defense_overall, program_prestige",
    )
    .order("school_name", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
