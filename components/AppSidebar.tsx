"use client";

import {
  Award,
  BookOpen,
  Clipboard,
  FolderCheck,
  GraduationCap,
  LayoutDashboard,
  Settings,
  Trophy,
  User,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      title: "Roster",
      url: "#",
      icon: User,
    },
    {
      title: "Recruiting",
      url: "#",
      icon: Clipboard,
    },
    {
      title: "Trophy Case",
      url: "#",
      icon: Trophy,
    },
    {
      title: "Awards",
      url: "#",
      icon: Award,
    },
    {
      title: "Record Book",
      url: "#",
      icon: BookOpen,
    },
    {
      title: "Alumni",
      url: "#",
      icon: GraduationCap,
    },
    {
      title: "History",
      url: "#",
      icon: FolderCheck,
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings,
    },
  ],
};

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon" className="mt-[68px] h-[calc(100vh-68px)]">
      <SidebarContent className="bg-card p-2">
        <SidebarMenu>
          {data.navMain.map((item) => (
            <SidebarMenuItem key={item.title} className="py-1">
              <SidebarMenuButton tooltip={item.title}>
                {item.icon && <item.icon className="text-muted" />}
                <span className="ml-1">{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      {/* <SidebarFooter>User Info Here</SidebarFooter> */}
    </Sidebar>
  );
}
