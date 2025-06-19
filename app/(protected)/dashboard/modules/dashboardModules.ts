import { QuickActions } from "./QuickActions";
import { RecentAwards } from "./RecentAwards";
import { RecentTrophies } from "./RecentTrophies";
import { Standings } from "./Standings";
import { TeamOverview } from "./TeamOverview";
import { TopPlayers } from "./TopPlayers";
import { TopRecruits } from "./TopRecruits";

export type DashboardMode = "immersive" | "essentials";

export type DashboardModule = {
  id: string;
  name: string;
  component: React.ComponentType<{ teamColor: string }>;
  removable: boolean;
  draggable: boolean;
  defaultWidth?: number;
  defaultHeight: number;
  navLink?: string;
};

export const dashboardModules: Record<DashboardMode, DashboardModule[]> = {
  immersive: [
    {
      id: "quickActions",
      name: "Quick Actions",
      component: QuickActions,
      removable: false,
      draggable: false,
      defaultHeight: 15,
      defaultWidth: 2,
    },
    {
      id: "teamOverview",
      name: "Team Overview",
      component: TeamOverview,
      removable: false,
      draggable: false,
      defaultHeight: 15,
      defaultWidth: 4,
    },
    {
      id: "topPlayers",
      name: "Top Players",
      component: TopPlayers,
      removable: true,
      draggable: true,
      defaultHeight: 6,
      defaultWidth: 3,
      navLink: "/dashboard/roster",
    },
    {
      id: "topRecruits",
      name: "Top Recruits",
      component: TopRecruits,
      removable: true,
      draggable: true,
      defaultHeight: 6,
      defaultWidth: 3,
      navLink: "/dashboard/recruits",
    },
    {
      id: "recentTrophies",
      name: "Recent Trophies",
      component: RecentTrophies,
      removable: true,
      draggable: true,
      defaultHeight: 6,
      defaultWidth: 3,
    },
    {
      id: "recentAwards",
      name: "Recent Awards",
      component: RecentAwards,
      removable: true,
      draggable: true,
      defaultHeight: 6,
      defaultWidth: 3,
    },

    // more immersive modules...
  ],
  essentials: [
    {
      id: "quickActions",
      name: "Quick Actions",
      component: QuickActions,
      removable: false,
      draggable: false,
      defaultHeight: 6,
      defaultWidth: 4,
    },
    {
      id: "standings",
      name: "Standings",
      component: Standings,
      removable: false,
      draggable: true,
      defaultHeight: 4,
      defaultWidth: 4,
    },
    // fewer modules...
  ],
};
