import { NextResponse } from "next/server";

import { createServerSupabaseClient } from "@/utils/supabase/server";

export async function GET() {
  const supabase = await createServerSupabaseClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: dynasty, error } = await supabase
    .from("dynasties")
    .select("*")
    .eq("user_id", user.id)
    .eq("is_active", true)
    .single();

  if (error && error.code !== "PGRST116") {
    // not found is fine, anything else = error
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(dynasty ?? null);
}
