import { LayoutDashboard } from "lucide-react";
import { redirect } from "next/navigation";

import { AppSidebar } from "@/components/AppSidebar";
import Header from "@/components/Header";
import { SidebarLayout } from "@/components/SidebarLayout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
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
    <>
      <Header />
      <SidebarLayout>
        <main>{children}</main>
      </SidebarLayout>
    </>
  );
}
