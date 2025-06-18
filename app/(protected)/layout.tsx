import { redirect } from "next/navigation";

import { AppSidebar } from "@/components/AppSidebar";
import Header from "@/components/Header";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
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
    <SidebarProvider>
      <Header />
      <AppSidebar />
      <main className="mt-[68px]">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
