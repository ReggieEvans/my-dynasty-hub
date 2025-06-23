import { redirect } from "next/navigation";

import Header from "@/components/Header";
import { SidebarLayout } from "@/components/SidebarLayout";
import { createServerSupabaseClient } from "@/utils/supabase/server";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect("/login");
  }

  return (
    <>
      <Header />
      <SidebarLayout>
        <main>{children}</main>
      </SidebarLayout>
    </>
  );
}
